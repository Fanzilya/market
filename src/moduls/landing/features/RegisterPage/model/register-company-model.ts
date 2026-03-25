import { createCompanyApi, fnsSearchCompany, getCompanyByInnApi, getCompanyTypesApi, getFNSCompany } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { employerRegisterApi, registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import axios from "axios";
import { action, makeAutoObservable, values } from "mobx";
import { toast } from "react-toastify";
import { dataRes } from "./data";

type CompanyErrorsKeys = keyof ICreateCompany | 'fnsValue' | 'searchInn';

class RegisterCompanyModel {

    companyData: ICreateCompany = {
        fullCompanyName: "",
        shortCompanyName: "",
        inn: "",
        kpp: "",
        jurAdress: "",
        companyTypeId: "",
    };

    fnsValue: string = ""
    error: string = ""
    openCompanyForm: boolean = false
    isCompanyCreate: boolean = true

    typeForm: "searchInn" | "form" = "searchInn"

    isLoadingCompanySearch: boolean = false
    types: SeletectItemInterface[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    errorsCompany: Partial<Record<keyof (ICreateCompany & { fnsValue: string; searchInn: string }), string>> = {}

    setError<K extends keyof (ICreateCompany & { fnsValue: string; searchInn: string; })>(key: K, message: string) {
        this.errorsCompany[key] = message
    }

    removeError<K extends keyof (ICreateCompany & { fnsValue: string })>(key: K) {
        delete this.errorsCompany[key]
    }

    clearErrors() {
        this.errorsCompany = {}
    }

    setFormCompanyData<K extends keyof typeof this.companyData>(name: K, value: typeof this.companyData[K]) {

        if (name === "inn" && value?.length! > 12) return

        this.companyData[name] = value;
    }

    setFnsValue(value: string) {
        if (value.length <= 12) {
            this.fnsValue = value
        }
    }

    setTypeForm(value: "searchInn" | "form") {
        this.typeForm = value
    }

    setOpenCompanyForm(value: boolean) {
        this.openCompanyForm = value
    }

    async init() {
        try {
            const res = await getCompanyTypesApi()

            this.types = res.data.map((item: CompanyTypes) => {
                return {
                    value: item.id,
                    title: item.typeName,
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    validateCompanyForm() {
        this.clearErrors()

        if (this.typeForm == "searchInn" && !this.checkFnsValue()) return Object.keys(this.errorsCompany).length === 0

        if (!this.companyData.fullCompanyName.trim()) {
            this.setError("fullCompanyName", 'Укажите полное название компании')
        }
        
        if (!this.companyData.shortCompanyName.trim()) {
            this.setError("shortCompanyName", 'Укажите короткое название компании')
        }

        if (!this.companyData.inn.trim()) {
            this.setError("inn", 'Укажите ИНН')
        } else if (this.companyData.inn.length !== 10 && this.companyData.inn.length !== 12) {
            this.setError("inn", 'ИНН должен содержать 10 или 12 цифр')
        } else if (!/^\d+$/.test(this.companyData.inn)) {
            this.setError("inn", 'ИНН должен содержать только цифры')
        }

        if (this.companyData.kpp.trim()) {
            if (this.companyData.kpp.length !== 9) {
                this.setError("kpp", 'КПП должен содержать 9 цифр')
            } else if (!/^\d+$/.test(this.companyData.kpp)) {
                this.setError("kpp", 'КПП должен содержать только цифры')
            }
        }

        if (!this.companyData.jurAdress.trim()) {
            this.setError("jurAdress", 'Укажите юридический адрес')
        }

        if (!this.companyData.companyTypeId.trim()) {
            this.setError("companyTypeId", 'Укажите тип компании')
        }

        if (!this.companyData.fullCompanyName.trim() && this.fnsValue.length !== 10 && this.fnsValue.length !== 12) {
            this.setError("searchInn", 'Заполните данные компании')
            console.log("searchInn")
        }

        return Object.keys(this.errorsCompany).length === 0
    }

    clearCompanyData() {
        this.clearErrors()

        this.companyData = {
            fullCompanyName: "",
            shortCompanyName: "",
            inn: "",
            kpp: "",
            jurAdress: "",
            companyTypeId: "",
        }
    }

    async createCompany() {

        this.clearErrors()


        if (!this.validateCompanyForm()) return

        try {
            const res = await createCompanyApi({
                fullCompanyName: this.companyData.fullCompanyName,
                shortCompanyName: this.companyData.shortCompanyName,
                inn: this.companyData.inn,
                kpp: this.companyData.kpp,
                jurAdress: this.companyData.jurAdress,
                companyTypeId: this.companyData.companyTypeId,
            })

            return res.data

        } catch (error) {
            console.log('Ошибка при создании компании:', error)
            throw error // Пробрасываем ошибку дальше
        }
    }

    checkFnsValue() {
        if (this.fnsValue.length !== 10 && this.fnsValue.length !== 12) {
            this.setError('fnsValue', 'ИНН должен содержать 10 или 12 цифр')
            return false
        }
        return true
    }

    async getCompanyData(actions: any) {

        this.clearCompanyData()

        if (!this.checkFnsValue()) return

        this.isLoadingCompanySearch = true

        try {

            const res = await new Promise((resolve) => {
                setTimeout(() => {
                    console.log('sd')
                    resolve()
                }, 3000)
            })


            // 1. Сначала ищем в БД
            const dbResult = await this.searchCompanyByBD()
            if (dbResult) {
                // Нашли в БД - заполняем модель
                this.isCompanyCreate = false
                this.fillCompanyDataFromDB(dbResult)
                this.openCompanyForm = true
                return
            }

            // 2. Если в БД нет, ищем в ФНС
            const fnsResult = await this.searchCompanyByFns()
            if (fnsResult?.items.length > 0) {
                // Нашли в ФНС - заполняем модель
                this.isCompanyCreate = true
                this.fillCompanyDataFromFNS(fnsResult)
                this.openCompanyForm = true
                return
            }

            // 3. Если нигде не нашли
            this.isCompanyCreate = true
            this.setError('fnsValue', 'Компания с таким ИНН не существует')

        } catch (error: any) {
            console.error('Ошибка при поиске компании:', error)

            // Обработка специфических ошибок
            if (error.response?.status === 404) {
                this.setError('fnsValue', 'Компания с таким ИНН не найдена')
            } else if (error.response?.status === 400) {
                this.setError('fnsValue', 'Неверный формат ИНН')
            } else {
                this.setError('fnsValue', 'Ошибка при поиске компании. Попробуйте позже')
            }

        } finally {
            this.isLoadingCompanySearch = false
        }
    }

    async searchCompanyByBD() {
        try {
            const res = await getCompanyByInnApi({ inn: this.fnsValue })

            if (res.data && Object.keys(res.data).length > 0) {
                console.log('Компания найдена в БД:', res.data)
                return res.data
            }

            return null
        } catch (error) {
            // Если 404 - просто возвращаем null (компании нет в БД)
            if (error.response?.status === 404) {
                console.log('Компания не найдена в БД')
                return null
            }
            // Другие ошибки пробрасываем дальше
            throw error
        }
    }

    async searchCompanyByFns() {
        try {
            const res = await fnsSearchCompany(this.fnsValue)

            if (res.data && Object.keys(res.data).length > 0) {
                console.log('Компания найдена в ФНС:', res.data)
                return res.data
            }

            return null
        } catch (error) {
            if (error.response?.status === 404) {
                console.log('Компания не найдена в ФНС')
                return null
            }
            throw error
        }
    }

    fillCompanyDataFromDB(data: any) {
        this.companyData = {
            fullCompanyName: data.fullCompanyName || '',
            shortCompanyName: data.shortCompanyName || '',
            inn: data.inn || this.fnsValue,
            kpp: data.kpp || '',
            jurAdress: data.jurAdress || '',
            companyTypeId: data.companyTypeId || '',
            id: data.id,
        }
    }

    fillCompanyDataFromFNS(data: any) {
        if (!!data.items?.[0]?.['ИП']) {

            const ipData = data.items[0]['ИП']

            this.companyData = {
                fullCompanyName: ipData?.['ФИОПолн'] || "",
                shortCompanyName: ipData?.['ФИОПолн'] || "",
                inn: ipData?.['ИННФЛ'] || "",
                kpp: '',
                jurAdress: ipData?.['Адрес']?.['АдресПолн'] || "",
                companyTypeId: '',
            }

            return

            // console.log("ИП: " + !!data.items[0]['ИП'])
            // console.log("fullCompanyName:" + data.items[0]['ИП']['ФИОПолн'])
            // console.log("shortCompanyName:" + data.items[0]['ИП']['ФИОПолн'])
            // console.log("inn:" + data.items[0]['ИП']['ИННФЛ'])
            // console.log("kpp:" + "Нету")
            // console.log("jurAdress:" + data.items[0]['ИП']['Адрес']['АдресПолн'])
        }

        if (!!data.items?.[0]?.['ЮЛ']) {
            const ipData = data.items[0]['ЮЛ']

            this.companyData = {
                fullCompanyName: ipData?.['НаимПолнЮЛ'] || "",
                shortCompanyName: ipData?.['НаимСокрЮЛ'] || "",
                inn: ipData?.['ИНН'] || "",
                kpp: ipData?.['КПП'] || "",
                jurAdress: ipData?.['Адрес']?.['АдресПолн'] || "",
                companyTypeId: '',
            }

            // console.log("ЮЛ: " + !!data.items[0]['ЮЛ'])
            // console.log("fullCompanyName:" + data.items[0]['ЮЛ']['НаимПолнЮЛ'])
            // console.log("shortCompanyName:" + data.items[0]['ЮЛ']['НаимСокрЮЛ'])
            // console.log("inn:" + data.items[0]['ЮЛ']['ИНН'])
            // console.log("kpp:" + data.items[0]['ЮЛ']['КПП'])
            // console.log("jurAdress:" + data.items[0]['ЮЛ']['Адрес']['АдресПолн'])

            return
        }
    }
}

export const registerCompanyModel = new RegisterCompanyModel();