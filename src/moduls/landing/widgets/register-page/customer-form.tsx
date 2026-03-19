import { RegisterRequestDTO } from "@/entities/user/type";
import { Input } from "@/shared/ui-kits/Input";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { registerUserModel } from "../../features/RegisterPage/register-user-model";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui-kits/button";
import ErrorBox from "@/moduls/personal-account/supplier/features/offer-create/old-src/components/ErrorBox";
import { ErrorText } from "@/shared/components/error-text";
import { RegisterUserForm } from "./register-user-form";
import { Role } from "@/entities/user/role";



interface Props {
    styles: any,
}


export const CustomerForm = observer(({ styles }: Props) => {

    const { formData, setFormData, isLoading, handleSubmit, clearFormsData, canRegisterUser, errors } = registerUserModel

    const navigate = useNavigate()

    const onSubmit = () => {
        handleSubmit(navigate)
    }

    useEffect(() => {
        clearFormsData()
        setFormData("roleName", Role.Customer)
    }, [])

    return (
        <>
            <RegisterUserForm
                formData={formData}
                setFormData={setFormData}
                styles={styles}
                isLoading={isLoading}
                errors={errors}
            />

            <Button onClick={onSubmit} className={`from-[#4A85F6] to-[#3A6BC9] bg-gradient-to-br p-4 mt-2 hover:shadow-lg`}
            >
                {isLoading ? (
                    <>
                        <span className={styles.spinner} />
                        Регистрация...
                    </>
                ) : (
                    'Зарегистрироваться'
                )}
            </Button >
        </>
    );
})