import { instance } from "@/app/api/instances"
import { KnsRequest, RequestRouter } from "@/app/routers/api-router"
import { CreateRequest, IRequestId, IRequestIdFull, IUserId } from "./type"


export const equipmentsApi = () => {
    return instance.get(KnsRequest.equipments)
}

export const createRequestApi = (params: CreateRequest) => {
    return instance.post(KnsRequest.create, params)
}

export const currentKnsApi = (params: IRequestIdFull) => {
    return instance.get(KnsRequest.current, { params })
}

export const equipmentCurrentKnsApi = (params: IRequestIdFull) => {
    return instance.get(KnsRequest.equipmentCurrent, { params })
}

export const allByUserApi = (params: IUserId) => {
    return instance.get(RequestRouter.allByUser, { params })
}

export const requestSingleApi = (params: IRequestId) => {
    return instance.get(RequestRouter.single, { params })
}

export const allRequestPublicApi = () => {
    return instance.get(RequestRouter.allPublic)
}