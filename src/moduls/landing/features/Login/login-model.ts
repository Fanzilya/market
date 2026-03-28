import { getAccountManyApi, getCurrentUserApi, loginApi } from "@/entities/user/api";
import { ACCOUNT_SUPPLY } from "@/entities/user/config";
import { Role } from "@/entities/user/role";
import { ILogin, RegisterRequestDTO } from "@/entities/user/type";
import { useAuth } from "@/features/user/context/context";
import { makeAutoObservable } from "mobx";


interface IErrorLogin extends ILogin {
    all: string
}

class LoginModel {

    model: ILogin = {
        email: "",
        password: ""
    }
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        this.model[name] = value;
    }

    errors: Partial<Record<keyof IErrorLogin, string>> = {}
    setError<K extends keyof IErrorLogin>(key: K, message: string) {
        this.errors[key] = message
    }

    removeError<K extends keyof IErrorLogin>(key: K) {
        delete this.errors[key]
    }

    clearErrors() {
        this.errors = {}
    }
    validateForm() {
        this.clearErrors()
        if (!this.model.email.trim()) {
            this.setError("email", "Укажите email")
        }
        if (!this.model.password.trim()) {
            this.setError("password", "Укажите пароль")
        }
        return Object.keys(this.errors).length === 0
    }

    async onSubmit(signIn: any, signInAccount: any) {

        if (!this.validateForm()) return

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
                    await this.accountMany(res.data.user.id, signInAccount)
                    window.location.href = '/supplier/dashboard'
                    break
                case Role.Admin:
                    window.location.href = '/admin'
                    break
            }
        } catch {
            this.setError('all', "Ошибка авторизации. Проверьте данные и попробуйте снова.")
        } finally {
            this.isLoading = false
        }
    }


    async accountMany(userId: string, signInAccount: any) {
        try {

            const resUser = await getAccountManyApi({ userId: userId })
            signInAccount(resUser.data)

        } catch (error) {
            console.log(error)
        }
    }
}

export const loginModel = new LoginModel();