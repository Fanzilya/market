import { createCompanyApi, getCompanyByInnApi, getCompanyTypesApi } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { employerRegisterApi, registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import axios from "axios";
import { makeAutoObservable, values } from "mobx";
import { toast } from "react-toastify";

class RegisterUserModel {

    formData: RegisterRequestDTO = {
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        roleName: Role.Customer
    };

    isLoading: boolean = false

    _canRegisterUser: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {

        if (name == "roleName") { this.clearFormsData() }

        this.formData[name] = value;
    }

    clearFormsData() {

        this.clearErrors()
        this.formData = {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            roleName: Role.Customer
        };
    }


    errors: Partial<Record<keyof RegisterRequestDTO, string>> = {}
    setError<K extends keyof RegisterRequestDTO>(key: K, message: string) {
        this.errors[key] = message
    }

    removeError<K extends keyof RegisterRequestDTO>(key: K) {
        delete this.errors[key]
    }

    clearErrors() {
        this.errors = {}
    }

    validateForm() {
        this.clearErrors()

        if (!this.formData.fullName.trim()) {
            this.setError("fullName", "Укажите ФИО")
        }

        // Использование
        if (!this.formData.email.trim()) {
            this.setError("email", "Укажите email")
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!emailRegex.test(this.formData.email)) {
                this.setError("email", "Введите корректную почту")
            }
        }


        if (!this.formData.phoneNumber.trim()) {
            this.setError("phoneNumber", "Укажите номер телефона")
        } else {
            const digits = this.formData.phoneNumber.replace(/\D/g, '')
            if (digits.length !== 11 || digits[0] !== '7') {
                this.setError("phoneNumber", "Введите корректный номер")
            }
        }

        if (!this.formData.password) {
            this.setError("password", "Введите пароль")
        }

        if (this.formData.password.length < 6) {
            this.setError("password", "Минимум 6 символов")
        }

        if (this.formData.password !== this.formData.confirmPassword) {
            this.setError("confirmPassword", "Пароли не совпадают")
        }

        return Object.keys(this.errors).length === 0
    }


    get canRegisterUser() {
        return Object.keys(this.errors).length === 0
    }

    async handleSubmit(navigate: any, companyId?: string) {
        if (!this.validateForm()) return

        try {
            if (this.formData.roleName === Role.Supplier) {
                const res = await employerRegisterApi({
                    fullName: this.formData.fullName,
                    email: this.formData.email,
                    phoneNumber: this.formData.phoneNumber,
                    password: this.formData.password,
                    roleName: this.formData.roleName,
                    companyId: companyId!,
                    // companyId: "019ce0b3-ccde-7207-afe5-62764ff98668",
                })
            } else {
                const res = await registerApi(this.formData)
                toast.success("Регистрация прошла успешно!")
            }

            this.isLoading = (false)
            navigate('/login')
        } catch (error) {
            console.log('Ошибка при регистрации:', error)
            throw error
        }
    }
}

export const registerUserModel = new RegisterUserModel();