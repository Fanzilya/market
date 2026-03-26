import { instance } from "@/app/api/instances"
import { KnsRequest, RequestRouter } from "@/app/routers/api-router"
import { CreateRequest, FavouritesAddIds, IBiznesView, IRequestId, IRequestIdFull, IUserId } from "./type"


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

export const favouritesByUserApi = (params: IUserId) => {
    return instance.get(RequestRouter.favouritesByUser, { params })
}

export const requestSingleApi = (params: IRequestId) => {
    return instance.get(RequestRouter.single, { params })
}

export const requestSupplierSingleApi = (params: IBiznesView) => {
    return instance.post(RequestRouter.supplierSingle, params)
}

export const favouritesAddApi = (params: FavouritesAddIds) => {
    return instance.post(RequestRouter.favouritesAdd, params)
}

export const favouriteRemoveApi = (params: FavouritesAddIds) => {
    return instance.post(RequestRouter.favouriteRemove, params)
}

export const allRequestPublicApi = () => {
    return instance.get(RequestRouter.allPublic)
}

export const requestArhivCustomerApi = (params: FavouritesAddIds) => {
    return instance.post(RequestRouter.requestArhiv, params)
}

export const viewUserApi = (params: IBiznesView) => {
    return instance.post(RequestRouter.viewAccount, params)
}

export const clickAccountApi = (params: IBiznesView) => {
    return instance.put(RequestRouter.clickAccount, params)
}