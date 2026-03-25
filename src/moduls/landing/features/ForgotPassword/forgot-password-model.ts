import { recoveryApi } from '@/entities/user/api';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

class ForgotPasswordModel {

    email: string = ""
    isLoader: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setFormData(value: string) {
        this.email = value;
    }


    clearFormsData() {
        this.clearErrors()
        this.email = ""
    }

    errors: string = ""
    success: boolean = false

    setError(message: string) {
        this.errors = message
    }

    clearErrors() {
        this.errors = ""
    }

    validateForm() {
        this.clearErrors()

        if (!this.email.trim()) {
            this.setError("Укажите email")
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(this.email)) {
                this.setError("Введите корректную почту")
            }
        }

        return this.errors.length == 0
    }


    async onSubmit() {
        if (!this.validateForm()) return
        this.isLoader = true
        try {
            const res = await recoveryApi({ email: this.email })
            toast.success("Новый пароль отправлен на почту")
            this.success = true
        } catch (error) {
            console.log(error)
            toast.error("Ошибка при восстановлении пароля")
        } finally {
            this.isLoader = false
        }
    }
}

export const forgotPasswordModel = new ForgotPasswordModel()