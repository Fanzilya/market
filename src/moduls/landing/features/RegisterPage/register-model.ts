import { getCompanyTypesApi } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
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

    error: string = ""
    isLoading: boolean = false

    types: SeletectItemInterface[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {
        this.formData[name] = value;
    }

    setFormCompanyData<K extends keyof typeof this.companyData>(name: K, value: typeof this.companyData[K]) {
        this.companyData[name] = value;
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

        const res = await registerApi(this.formData)

        console.log(res)

        this.isLoading = (false)
        navigate('/login', {
            state: {
                message: 'Регистрация успешна! Теперь вы можете войти в систему.'
            }
        })
    }
}

export const registerModel = new RegisterModel();