import { instance } from "@/app/api/instances"
import { RegionsRouter } from "@/app/routers/api-router"

export const getAllRegionsApi = () => {
    return instance.get(RegionsRouter.all)
}