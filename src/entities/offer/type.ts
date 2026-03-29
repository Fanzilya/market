export interface IOfferCreate {
    nameByProject: string,
    nameBySupplier: string,
    currentPriceNDS: number,
    warehouseLocation: string,
    supplierSiteURL: string,
    bussinessAccId: string,
    requestId: string


    proccent?: number,
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

export interface IOfferId {
    id: string
}

export interface IOfferFullId {
    OfferId: string
}




export interface OfferFull {
    offersNumber: null | string,
    nameByProject: number,
    nameBySupplier: string,
    inn?: string,
    kpp?: string,
    fullCompanyName?: string,
    currentPriceNDS: number,
    currentPriceNoNDS: number,
    supportingDocumentDate: Date | null | string,
    manufacturerCountry: string,
    warehouseLocation: string,
    supplierSiteURL: string,
    requestId: string,
    request: null | string,
    bussinessAccId: string,
    bussinessAccount: null | string,
    offerFileId?: null | string,
    businesOfferFile?: null | string,
    passportFileId?: null | string,
    passportFile?: null | string,
    certificateFileId?: null | string,
    certificateFile?: null | string,
    planFileId?: null | string,
    planFile?: null | string,
    id: string
    innerId?: string
}


// Documents interface
export interface IOfferDocs {
    offer: File | null,
    passport: File | null,
    certificate: File | null,
    scheme: File | null
}


export interface IOfferFileOffer extends IOfferFullId {
    OfferFile: File
}
export interface IOfferFilePassport extends IOfferFullId {
    PassportFile: File
}
export interface IOfferFileCertificate extends IOfferFullId {
    CertificateFile: File
}
export interface IOfferFileScheme extends IOfferFullId {
    PlanFile: File
}