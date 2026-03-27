import { makeAutoObservable } from "mobx";

// Самый распространенный способ
export class ErrorModelClass<T> {

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    errors: Partial<Record<keyof T, string>> = {}

    setError<K extends keyof T>(key: K, message: string) {
        this.errors[key] = message
    }

    clearErrors() {
        this.errors = {}
    }

    getError<K extends keyof T>(key: K): string | undefined {
        return this.errors[key]
    }

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidName(name: string): boolean {
        const nameRegex = /^[а-яА-Яa-zA-Z\s-]+$/;
        return nameRegex.test(name);
    }

    isValidPhone(phone: string): boolean {
        return phone.length == 18;
    }
}
