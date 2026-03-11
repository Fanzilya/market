import { instance } from "@/app/api/instances"
import { KnsRequest, RequestRouter } from "@/app/routers/api-router"
import { CreateRequest, IRequestId, IUserId } from "./type"


export const equipmentsApi = () => {
    return instance.get(KnsRequest.equipments)
}

export const createRequestApi = (params: CreateRequest) => {
    return instance.post(KnsRequest.create, params)
}

export const requestSingleApi = (params: IRequestId) => {
    return instance.get(RequestRouter.single, { params })
}

export const allByUserApi = (params: IUserId) => {
    return instance.get(RequestRouter.allByUser, { params })
}