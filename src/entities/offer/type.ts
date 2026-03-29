export interface IOfferCreate {
    nameByProject: string,
    nameBySupplier: string,
    currentPriceNDS: number,
    warehouseLocation: string,
    supplierSiteURL: string,
    bussinessAccId: string,
    requestId: string


    proccent?: number,
    currentPriceNoNDS: number,
    supportingDocumentDate: Date | null,
    manufacturerCountry: string,
    offerNumber: string,
    deliveryTerms: string,
    garantyPeriod: number | string,
    paymentTerms: string,
}


// string  offerNumber
// string  nameBySupplier 
// double currentPriceNDS
// double currentPriceNoNDS
// DateTime supportingDocumentDate
// string  warehouseLocation
// string  supplierSiteURL
// string  manufacturerCountry
// string  deliveryTerms условия доставки
// string  garantyPeriod гарантированный период 
// string  paymentTerms условия оплаты
// Guid bussinessAccId
// Guid requestId

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