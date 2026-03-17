import { instance } from "@/app/api/instances"
import { CompanyRouter, FSNRouter } from "@/app/routers/api-router"
import { ICompanyInn, ICreateCompany } from "./type"



export const createCompanyApi = (params: ICreateCompany) => {
    return instance.post(CompanyRouter.cerate, params)
}

export const getCompanyByInnApi = (params: ICompanyInn) => {
    return instance.get(CompanyRouter.inn, { params })
}

export const getCompanyTypesApi = () => {
    return instance.get(CompanyRouter.companyTypes)
}