export interface ICompanyInn {
    inn: string
}
export interface ICreateCompany {
    fullCompanyName: string,
    shortCompanyName: string,
    inn: string,
    kpp: string,
    jurAdress: string,
    companyTypeId: string
}
export interface Company {
    name: string,
    shortName: string,
    typeId: number,
    typeName: string,
    inn: string,
    kpp: string,
    ogrn: string,
    legalAddress: string,
    about: string,
}



export interface CompanyTypes {
    id: string,
    companies: string,
    typeName: string,
}