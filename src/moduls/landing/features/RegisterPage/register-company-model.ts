import { createCompanyApi, getCompanyByInnApi, getCompanyTypesApi, getFNSCompany } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { employerRegisterApi, registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import axios from "axios";
import { makeAutoObservable, values } from "mobx";

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

    isLoadingCompanySearch: boolean = false

    types: SeletectItemInterface[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    clearFormsData() {
        this.companyData = {
            fullCompanyName: "",
            shortCompanyName: "",
            inn: "",
            kpp: "",
            jurAdress: "",
            companyTypeId: "",
        };
    }

    setFormCompanyData<K extends keyof typeof this.companyData>(name: K, value: typeof this.companyData[K]) {
        this.companyData[name] = value;
    }

    setFnsValue(value: string) {
        if (value.length <= 12) {
            this.fnsValue = value
        }
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
        if (!this.companyData.fullCompanyName.trim()) {
            this.error = ('Укажите полное название компании')
            return false
        }
        if (!this.companyData.shortCompanyName.trim()) {

            this.error = ('Укажите короткое название компании')
            return false
        }
        if (!this.companyData.inn.trim()) {
            this.error = ('Укажите ИНН')
            return false
        }
        if (!this.companyData.kpp.trim()) {
            this.error = ('Укажите КПП')
            return false
        }
        if (!this.companyData.jurAdress.trim()) {

            this.error = ('Укажите юридический адрес')
            return false
        }
        if (!this.companyData.companyTypeId.trim()) {
            this.error = ('Укажите тип компании')
            return false
        }
        return true
    }

    get canNextForm() {
        return this.validateCompanyForm()
    }

    clearCompanyData() {
        this.companyData = {
            fullCompanyName: "",
            shortCompanyName: "",
            inn: "",
            kpp: "",
            jurAdress: "",
            companyTypeId: "",
        }
    }

    async getCompanyByInn(action: any) {
        this.isLoadingCompanySearch = true
        try {

            const res = await new Promise(() => {
                setTimeout(() => {
                    action()

                }, 2000)
            })

            this.isLoadingCompanySearch = false

            // const reska = await getCompanyByInnApi({ inn: this.fnsValue })
            // console.log(reska)
            // return

        } catch (error) {
            console.log(error)
        } finally {
            console.log('ed')
            this.isLoadingCompanySearch = false
        }
    }

    async searchCompany() {
        try {
            // const res = await axios.get('/egr', {
            //     params: {
            //         req: this.fnsValue,
            //         key: "67e284756d190b3b9d42e1791c5094e62e47a5be",
            //     },
            // });

            // console.log(res.data);
        } catch (error) {
            console.error('FNS error:', error);
            throw error;
        }

    }

    async createCompany() {
        const res = await createCompanyApi(this.companyData)
        return res.data.companyTypeId
    }
}

export const registerCompanyModel = new RegisterCompanyModel();