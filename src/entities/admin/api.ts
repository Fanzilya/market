import { instance } from "@/app/api/instances"
import { AdminRouter } from "@/app/routers/api-router"
import { IArhiveChange, IStatusChange } from "./type"


export const usersAllApi = () => {
    return instance.get(AdminRouter.usersAll)
}
export const companiesAllApi = () => {
    return instance.get(AdminRouter.companiesAll)
}
export const requestsAllApi = () => {
    return instance.get(AdminRouter.requestsAll)
}
export const requestArhivApi = (params: IArhiveChange) => {
    return instance.put(AdminRouter.requestArhiv + "/?id=" + params.id)
}
export const requestStatusChangeApi = (params: IStatusChange) => {
    return instance.put(AdminRouter.requestStatusChange, params)
}