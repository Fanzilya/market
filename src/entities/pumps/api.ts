import { instance } from "@/app/api/instances"
import { PumpConfiguration } from "@/app/routers/api-router"
import { IPumpsCreate } from "./type"

export const getPumpTypes = () => {
    return instance.get(PumpConfiguration.types)
}
export const getPumpSingle = (params: { requestId: string }) => {
    return instance.get(PumpConfiguration.single, { params })
}
export const createPumpApi = (params: IPumpsCreate) => {
    return instance.post(PumpConfiguration.create, params)
}