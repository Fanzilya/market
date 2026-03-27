// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, User } from "@/entities/user/type";
import { userModel } from "@/features/user/models/user-model";
import { accountSupplyModel } from "../models/account-supply";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const value: AuthContextType = {
        user: userModel.user,
        setUser: userModel.setUser,
        signIn: userModel.signIn,
        signOut: userModel.signOut,
        changePassword: userModel.changePassword,
        getAllUsers: userModel.getAllUsers,

        accountData: accountSupplyModel.accountData,
        setAccount: accountSupplyModel.setAccount,
        signInAccount: accountSupplyModel.signInAccount,
        signOutAccount: accountSupplyModel.signOutAccount,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider >
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};