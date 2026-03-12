export interface IOfferCreate {
    nameByProject: string,
    nameBySupplier: string,
    currentPriceNDS: number,
    warehouseLocation: string,
    supplierSiteURL: string,
    bussinessAccId: string,
    requestId: string


    currentPriceNoNDS: 0,
    supportingDocumentDate: Date | null,
    manufacturerCountry: string,
}


export interface IUserId {
    userId: string
}

export interface IACC {
    acc: string
}

export interface IRequestId {
    requestId: string
}

