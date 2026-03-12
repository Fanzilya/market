import { instance } from "@/app/api/instances"
import { OfferRouter } from "@/app/routers/api-router"
import { IACC, IOfferCreate, IRequestId, IUserId } from "./type"

export const createRequestApi = (params: IOfferCreate) => {
    return instance.post(OfferRouter.create, params)
}
export const offersByUserApi = (params: IUserId) => {
    return instance.get(OfferRouter.offersByUser, { params })
}
export const businessaccApi = (params: IACC) => {
    return instance.get(OfferRouter.businessacc, { params })
}
export const offersByRequestsApi = (params: IRequestId) => {
    return instance.get(OfferRouter.offersByRequests, { params })
}