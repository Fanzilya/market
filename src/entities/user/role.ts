// export enum Role {
//     Admin = 1,
//     Customer = 2,
//     Supplier = 3,
// }   
export enum Role {
    Admin = "SuperAdmin",
    Customer = "Customer",
    Supplier = "Supplier",
}

export enum RoleIds {
    Admin = "019cdd1c-58e6-72f2-87e6-2b7d7ab70056",
    Customer = "019cdd1c-9fad-7221-8ed7-0a3d97a93083",
    Supplier = "019cdd1c-df76-716f-a681-267d0f102b6f",
}




export const RoleName: Record<RoleIds, string> = {
    [RoleIds.Admin]: 'Админ',
    [RoleIds.Customer]: 'Заказчик',
    [RoleIds.Supplier]: 'Исполнитель',
};

export const RoleStyle: Record<RoleIds, string> = {
    [RoleIds.Admin]: ' bg-[rgba(239,_68,_68,_0.1)] text-[#EF4444]',
    [RoleIds.Customer]: ' bg-[rgba(74,_133,_246,_0.1)] text-[#4A85F6]',
    [RoleIds.Supplier]: ' bg-[rgba(16,_185,_129,_0.1)] text-[#10B981]',
};

