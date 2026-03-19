import { instance } from "@/app/api/instances"
import { CompanyRouter, FSNRouter } from "@/app/routers/api-router"
import { ICompanyInn, ICreateCompany } from "./type"
import axios from "axios"



export const createCompanyApi = (params: ICreateCompany) => {
    return instance.post(CompanyRouter.cerate, params)
}

export const getCompanyByInnApi = (params: ICompanyInn) => {
    return instance.get(CompanyRouter.inn, { params })
}

export const getCompanyTypesApi = () => {
    return instance.get(CompanyRouter.companyTypes)
}

export const fnsSearchCompany = ( req: string) => {
    return axios.get('/egr', {
        params: {
            req: req,
            key: "67e284756d190b3b9d42e1791c5094e62e47a5be",
        },
    });
}