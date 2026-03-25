import { ErrorText } from "@/shared/components/error-text";
import { Input } from "@/shared/ui-kits/Input";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { RegistrRoleButton } from "../../../widgets/register-page/register-role-button";
import { Role } from "@/entities/user/role";


interface Props {
    formData: any,
    setFormData: any,
    styles: any,
    isLoading: any,
    errors: any,
    bottom: React.ReactNode
}

export const RegisterUserForm = observer(({ formData, setFormData, styles, isLoading, errors, bottom }: Props) => {
    return (
        <>
            <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData("name", e)}
                placeholder="Имя"
                classNames={{ input: styles.input }}
                disabled={isLoading}
                required
                label="Имя"
                error={errors.name}
            />
            <Input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData("surname", e)}
                placeholder="Фамилия"
                classNames={{ input: styles.input }}
                disabled={isLoading}
                required
                label="Фамилия"
                error={errors.surname}
            />
            <Input
                required
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData("email", e)}
                placeholder="@mail.ru"
                classNames={{ input: styles.input }}
                disabled={isLoading}
                error={errors.email}
            />

            <Input
                required
                label="Номер телефона"
                type="phone"
                value={formData.phoneNumber}
                onChange={(e) => setFormData("phoneNumber", e)}
                placeholder="+79963363058"
                classNames={{ input: styles.input }}
                disabled={isLoading}
                error={errors.phoneNumber}
            />

            <div className={styles.roleSelector}>
                <RegistrRoleButton
                    name='Заказчик'
                    styles={styles}
                    onClick={() => setFormData("roleName", Role.Customer)}
                    isActive={formData.roleName === Role.Customer}
                    description="Проектная или Подрядная организация"
                />

                <RegistrRoleButton
                    name='Исполнитель'
                    styles={styles}
                    onClick={() => setFormData("roleName", Role.Supplier)}
                    isActive={formData.roleName === Role.Supplier}
                    description="Поставщик или Производитель"
                />
            </div>

            {bottom}
        </>
    );
})