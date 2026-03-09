import { Role } from "../../../entities/user/role";
import { useAuth } from "../context/context";

export const RoleLabel = {
    [Role.Admin]: "Администратор",
    [Role.Supplier]: "Поставщик",
    [Role.Customer]: "Заказчик",
}

export function isAdmin() {
    const { user } = useAuth()
    return user?.role === Role.Admin
}