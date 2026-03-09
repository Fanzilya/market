import { ReactNode } from "react";
import { Role } from "./role";
import { Company } from "../company/type";

export interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => User | null;
    setUser: (data: User | null) => void;
    signOut: () => void;
    changePassword: (email: string, currentPassword: string, newPassword: string) => void,
    getAllUsers: () => Omit<DemoUser, 'password'>[]
}


export interface User {
    role: Role;
    roleLabel: string;
    fullName: string;
    email: string;
    phone: string;
    company?: Company;
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
