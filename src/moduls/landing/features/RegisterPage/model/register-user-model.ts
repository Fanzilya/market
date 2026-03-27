import { createCompanyApi, getCompanyByInnApi, getCompanyTypesApi } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { emailCheckApi, employerRegisterApi, registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import axios from "axios";
import { makeAutoObservable, values } from "mobx";
import { toast } from "react-toastify";

class RegisterUserModel {

    formData: RegisterRequestDTO = {
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        roleName: Role.Customer
    };

    isLoading: boolean = false
    private debounceTimer: NodeJS.Timeout | null = null;
    _canRegisterUser: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {
        this.formData[name] = value;

        if (name === 'email') {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }

            this.debounceTimer = setTimeout(() => {
                this.checkEmailAvailability(value as string);
            }, 1000);
        }
    }
    
    private async checkEmailAvailability(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!this.formData.email.trim()) {
            this.setError("email", "Укажите email")
            return
        } else if (!emailRegex.test(this.formData.email)) {
            this.setError("email", "Введите корректную почту")
            return
        } else {
            this.setError("email", "")
        }



        try {
            const result = await emailCheckApi({ email });

            if (result.data) {
                this.setError("email", "Почта занята другим пользователем")
            }
        } catch (error) {
            console.error('Email check failed:', error);
        }
    }



    clearFormsData() {
        this.clearErrors()
        this.formData = {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
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

        if (!this.formData.name.trim()) {
            this.setError("name", "Укажите имя")
        }

        if (!this.formData.surname.trim()) {
            this.setError("surname", "Укажите фамилию")
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

        return Object.keys(this.errors).length === 0
    }

    canRegisterUser() {
        return this.validateForm()
    }

    setIsLoading(value: boolean) {
        this.isLoading = value
    }

    async handleSubmit(navigate: any, companyId?: string) {

        if (!this.validateForm()) return
        this.isLoading = true

        try {
            // if (this.formData.roleName === Role.Supplier) {
            const res = await employerRegisterApi({
                fullName: this.formData.surname + " " + this.formData.name,
                email: this.formData.email,
                phoneNumber: this.formData.phoneNumber,
                roleName: this.formData.roleName,
                companyId: companyId!,
                // companyId: "019ce0b3-ccde-7207-afe5-62764ff98668",
            })
            // } else {
            //     const res = await registerApi(this.formData)
            // }

            toast.success("Регистрация прошла успешно!")
            navigate('/login')
        } catch (error) {
            console.log('Ошибка при регистрации:', error)
            throw error
        } finally {
            this.isLoading = false
        }
    }
}

export const registerUserModel = new RegisterUserModel();