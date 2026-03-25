import { getCurrentUserApi, loginApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { useAuth } from "@/features/user/context/context";
import { makeAutoObservable } from "mobx";

class LoginModel {

    email: string = ""
    password: string = ""
    error: string = ""

    isLoading: boolean = false
    isValidEmail: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setEmail = (value: string) => {
        this.email = value
        this.isValidEmail = this.email.includes('@') && this.email.includes('.') && this.email.length > 5

    }

    setPassword = (value: string) => {
        this.password = value
    }

    setError(value: string) {
        this.email = value;
    }

    async onSubmit(signIn: any) {
        this.error = ""

        if (!this.email || !this.password) {
            this.error = "Пожалуйста, заполните все поля"
            return
        }
        if (!this.email.includes('@')) {
            this.error = "Введите корректный email адрес"
            return
        }

        this.isLoading = true

        try {
            const res = await loginApi({
                email: this.email,
                password: this.password,
            })

            signIn(res.data)

            switch (res.data.user.role) {
                case Role.Customer:
                    window.location.href = '/customer/dashboard'
                    break
                case Role.Supplier:
                    window.location.href = '/supplier/dashboard'
                    break
                case Role.Admin:
                    window.location.href = '/admin'
                    break
            }
        } catch {
            this.error = "Ошибка авторизации. Проверьте данные и попробуйте снова."
        } finally {
            this.isLoading = false
        }
    }
}

export const loginModel = new LoginModel();