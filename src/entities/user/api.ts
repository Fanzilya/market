import { instance } from "@/app/api/instances"
import { Auth } from "@/app/routers/api-router"
import { LoginRequest, RefreshTokenRequestDTO, RegisterRequestDTO } from "./type"

export const registerApi = (data: RegisterRequestDTO) => {
    return instance.post(Auth.register, data)
}

export const loginApi = (data: LoginRequest) => {
    return instance.post(Auth.login, data)
}

export const refreshTokenApi = (data: RefreshTokenRequestDTO) => {
    return instance.post(Auth.refresh, data)
}

export const createRoleApi = (data: any) => {
    return instance.post(Auth.createRole, data)
}

export const logoutApi = () => {
    return instance.post(Auth.logout)
}

export const getCurrentUserApi = () => {
    return instance.get(Auth.me)
}