import { instance } from "@/app/api/instances"
import { KnsRequest } from "@/app/routers/api-router"
import { CreateRequest } from "./type"


export const equipmentsApi = () => {
    return instance.get(KnsRequest.equipments)
}

export const createRequestApi = (data: CreateRequest) => {
    return instance.post(KnsRequest.create, data)
}