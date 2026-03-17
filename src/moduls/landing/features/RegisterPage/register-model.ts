import { createCompanyApi, getCompanyByInnApi, getCompanyTypesApi, getFNSCompany } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { employerRegisterApi, registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import axios from "axios";
import { makeAutoObservable, values } from "mobx";

class RegisterModel {

    formData: RegisterRequestDTO = {
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        roleName: Role.Customer
    };

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

    isLoading: boolean = false
    isLoadingCompanySearch: boolean = false

    types: SeletectItemInterface[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {

        if (name == "roleName") { this.clearFormsData() }

        this.formData[name] = value;
    }

    clearFormsData() {
        this.formData = {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            roleName: Role.Customer
        };

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

    validateForm() {
        // Общие проверки
        if (!this.formData.email.trim()) {
            this.error = ('Укажите email')
            return false
        }
        if (this.formData.phoneNumber.length < 10) {
            this.error = ('Введите корректный номер телефона')
            return false
        }
        if (!this.formData.password) {
            this.error = ('Введите пароль')
            return false
        }
        if (this.formData.password.length < 6) {
            this.error = ('Пароль должен содержать минимум 6 символов')
            return false
        }
        if (this.formData.password !== this.formData.confirmPassword) {
            this.error = ('Пароли не совпадают')
            return false
        }
        return true
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

    async handleSubmit(navigate: any) {
        this.error = ('')

        if (!this.validateForm()) return

        if (this.formData.roleName === Role.Supplier) {

            if (!this.validateCompanyForm()) return
            // const companyId: string = await this.createCompany()
            const res = await employerRegisterApi({
                fullName: this.formData.fullName,
                email: this.formData.email,
                phoneNumber: this.formData.phoneNumber,
                password: this.formData.password,
                roleName: this.formData.roleName,
                companyId: "019ce0b3-ccde-7207-afe5-62764ff98668",
            })
        } else {
            const res = await registerApi(this.formData)
            console.log(res)
        }


        this.isLoading = (false)
        // navigate('/login', {
        //     state: {
        //         message: 'Регистрация успешна! Теперь вы можете войти в систему.'
        //     }
        // })
    }


    async validateCompanyForm() {
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


    async getCompanyByInn() {
        this.isLoadingCompanySearch = true
        try {

            await setTimeout(() => {
                console.log('asd')
            }, 2000)

            // const reska = await getCompanyByInnApi({ inn: this.fnsValue })
            // console.log(reska)
            // return

        } catch (error) {
            console.log(error)
        } finally {
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

export const registerModel = new RegisterModel();