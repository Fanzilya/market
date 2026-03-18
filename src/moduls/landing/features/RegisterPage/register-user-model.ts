import { createCompanyApi, getCompanyByInnApi, getCompanyTypesApi } from "@/entities/company/api";
import { CompanyTypes, ICreateCompany } from "@/entities/company/type";
import { employerRegisterApi, registerApi } from "@/entities/user/api";
import { Role } from "@/entities/user/role";
import { RegisterRequestDTO } from "@/entities/user/type";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import axios from "axios";
import { makeAutoObservable, values } from "mobx";

class RegisterUserModel {

    formData: RegisterRequestDTO = {
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        roleName: Role.Customer
    };

    error: string = ""

    isLoading: boolean = false

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

    async handleSubmit(navigate: any) {
        this.error = ('')

        if (!this.validateForm()) return

        if (this.formData.roleName === Role.Supplier) {

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
}

export const registerUserModel = new RegisterUserModel();