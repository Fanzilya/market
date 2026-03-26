import { ReactNode } from "react";
import { Role } from "./role";
import { Company } from "../company/type";

export interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextType {
    user: User | null;
    signIn: (data: RegisterResult) => void;
    setUser: (data: User | null) => void;
    signOut: () => void;
    changePassword: (email: string, currentPassword: string, newPassword: string) => void,
    getAllUsers: () => Omit<DemoUser, 'password'>[]
}


export interface User {
    id?: number | string;
    email: string;
    fullName: string;
    phoneNumber: string;
    role: Role;
    company?: Company;
}

export interface RegisterResult {
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    user: User,
}

export interface DemoUser extends User {
    password: string;
}

export interface PasswordChangeResult {
    ok: boolean;
    message?: string;
}

export interface PasswordOverrides {
    [email: string]: string;
}

export interface ILogin {
    email: string,
    password: string
}

export interface RegisterRequestDTO {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    roleName: Role.Customer | Role.Supplier,
}

export interface EmployerRegisterRequestDTO {
    fullName: string,
    email: string,
    phoneNumber: string,
    roleName: Role.Customer | Role.Supplier,
    companyId: string,
}

export interface LoginRequest {
    email: string | null
    password: string | null
    twoFactorCode?: string,
    twoFactorRecoveryCode?: string,
}

export interface RefreshTokenRequestDTO {
    accessToken?: string | null
    refreshToken?: string | null
}

export interface AuthResponseDTO {
    accessToken?: string | null
    refreshToken?: string | null
    user?: UserInfoDTO
}

export interface UserInfoDTO {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    middleName?: string | null
    roles?: string[] | null
}



export interface IUserId {
    userId: string
}

export interface IEmail {
    email: string
}

