import { getCurrentUserApi, loginApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { useAuth } from "@/features/user/context/context";
import { makeAutoObservable } from "mobx";

class LoginModel {
    model: { email: string, password: string } = { email: "", password: "" }

    error: string = ""

    isLoading: boolean = false
    isValidEmail: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        this.model[name] = value;
    }

    errors: Partial<Record<keyof RegisterRequestDTO, string>> = {}
    setError<K extends keyof RegisterRequestDTO>(key: K, message: string) {
        this.errors[key] = message
    }

    async onSubmit(signIn: any) {
        this.error = ""

        if (!this.model.email || !this.model.password) {
            this.error = "Пожалуйста, заполните все поля"
            return
        }
        if (!this.model.email.includes('@')) {
            this.error = "Введите корректный email адрес"
            return
        }

        this.isLoading = true

        try {
            const res = await loginApi({
                email: this.model.email,
                password: this.model.password,
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