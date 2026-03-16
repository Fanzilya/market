import { fileInstance, instance } from "@/app/api/instances"
import { OfferRouter } from "@/app/routers/api-router"
import { IACC, IOfferCreate, IOfferFileCertificate, IOfferFileOffer, IOfferFilePassport, IOfferFileScheme, IOfferId, IUserId } from "./type"
import { IRequestId, IRequestIdFull } from "../request/type"

export const createRequestApi = (params: IOfferCreate) => {
    return instance.post(OfferRouter.create, params)
}
export const offersByUserApi = (params: IUserId) => {
    return instance.get(OfferRouter.offersByUser, { params })
}
export const businessaccApi = (params: IACC) => {
    return instance.get(OfferRouter.businessacc, { params })
}
export const offersByRequestsApi = (params: IRequestIdFull) => {
    return instance.get(OfferRouter.offersByRequests, { params })
}
export const offersSingleApi = (params: IOfferId) => {
    return instance.get(OfferRouter.single, { params })
}


export const offerFileUploadApi = (params: IOfferFileOffer) => {
    return fileInstance.post(OfferRouter.offerFileUpload, params)
}
export const passportFileUploadApi = (params: IOfferFilePassport) => {
    return fileInstance.post(OfferRouter.passportFileUpload, params)
}
export const certificateFileUploadApi = (params: IOfferFileCertificate) => {
    return fileInstance.post(OfferRouter.certificateFileUpload, params)
}
export const schemeFileUploadApi = (params: IOfferFileScheme) => {
    return fileInstance.post(OfferRouter.schemeFileUpload, params)
}