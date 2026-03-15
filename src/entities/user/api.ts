import { instance } from "@/app/api/instances"
import { Auth } from "@/app/routers/api-router"
import { EmployerRegisterRequestDTO, IUserId, LoginRequest, RefreshTokenRequestDTO, RegisterRequestDTO } from "./type"

export const registerApi = (params: RegisterRequestDTO) => {
    return instance.post(Auth.register, params)
}

export const employerRegisterApi = (params: EmployerRegisterRequestDTO) => {
    return instance.post(Auth.employeRegister, params)
}

export const loginApi = (params: LoginRequest) => {
    return instance.post(Auth.login, params)
}

export const refreshTokenApi = (params: RefreshTokenRequestDTO) => {
    return instance.post(Auth.refresh, params)
}

export const createRoleApi = (params: any) => {
    return instance.post(Auth.createRole, params)
}

export const logoutApi = () => {
    return instance.post(Auth.logout)
}

export const getCurrentUserApi = () => {
    return instance.get(Auth.me)
}

export const getAccountManyApi = (params: IUserId) => {
    return instance.get(Auth.accountMany, { params })
}