import { certificateFileUploadApi, createRequestApi, offerFileUploadApi, passportFileUploadApi, schemeFileUploadApi } from '@/entities/offer/api';
import { IOfferCreate, IOfferDocs, OfferFull } from '@/entities/offer/type';
import { requestSingleApi } from '@/entities/request/api';
import { makeAutoObservable } from 'mobx';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';


class CreateOfferModel {

    isSubmitting: boolean = false

    model: IOfferCreate = {
        currentPriceNDS: 0,
        warehouseLocation: "Москва",
        supplierSiteURL: "",

        nameByProject: "",
        nameBySupplier: "",
        bussinessAccId: "",
        requestId: "",

        proccent: 0.22,
        currentPriceNoNDS: 0,
        supportingDocumentDate: null,
        manufacturerCountry: "Россия",

        offerNumber: "13212231231",
        deliveryTerms: "Никаких",
        garantyPeriod: 24,
        paymentTerms: "Никаких",
    }
    docsModel: IOfferDocs = { offer: null, passport: null, certificate: null, scheme: null }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setModel<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        if (name === "currentPriceNoNDS") {
            this.model[name] = value;
            this.model['currentPriceNDS'] = (Number(value) + (Number(value) * this.model.proccent!))
        } else if (name == "proccent") {
            this.model['currentPriceNDS'] = (Number(this.model.currentPriceNoNDS) + (Number(this.model.currentPriceNoNDS) * Number(this.model.proccent!)))
        }
        this.model[name] = value;

        console.log(name)
    }

    setDocsModel<K extends keyof typeof this.docsModel>(name: K, value: typeof this.docsModel[K]) {
        this.docsModel[name] = value
    }

    get isValid(): boolean {
        return (
            this.model.warehouseLocation.length > 0 &&
            this.model.supplierSiteURL.length > 0 &&
            this.model.supportingDocumentDate != null &&
            this.model.manufacturerCountry.length > 0 &&
            this.model.currentPriceNoNDS > 0
        )
    }


    clear() {
        this.model = {
            currentPriceNDS: 0,
            warehouseLocation: "",
            supplierSiteURL: "",

            nameByProject: "",
            nameBySupplier: "",
            bussinessAccId: "",
            requestId: "",

            proccent: 0.22,
            currentPriceNoNDS: 0,
            supportingDocumentDate: null,
            manufacturerCountry: "",

            offerNumber: "",
            deliveryTerms: "",
            garantyPeriod: "",
            paymentTerms: "",
        }
        this.docsModel = { offer: null, passport: null, certificate: null, scheme: null }
        this.isSubmitting = false
    }


    async create(userName: string, requestId: string, requestName: string, bussinessAccId: string, onCancle: () => void, setIsPay: () => void) {

        this.isSubmitting = true

        try {
            this.model.requestId = requestId
            this.model.nameBySupplier = userName
            this.model.nameByProject = requestName

            const res = await createRequestApi({
                currentPriceNDS: this.model.currentPriceNDS,
                warehouseLocation: this.model.warehouseLocation,
                supplierSiteURL: this.model.supplierSiteURL,

                nameByProject: this.model.nameByProject,
                nameBySupplier: this.model.nameBySupplier,
                bussinessAccId: bussinessAccId,
                requestId: this.model.requestId,

                currentPriceNoNDS: this.model.currentPriceNoNDS,
                supportingDocumentDate: this.model.supportingDocumentDate,
                manufacturerCountry: this.model.manufacturerCountry,

                offerNumber: this.model.offerNumber,
                deliveryTerms: this.model.deliveryTerms,
                garantyPeriod: Number(this.model.garantyPeriod),
                paymentTerms: this.model.paymentTerms,
            })
            const resDoc = await this.createDocs(res.data)


            this.clear()
            onCancle()
            setIsPay()

            toast.success("Коммерческое предложение отправлено!")

        } catch (error) {
            console.log(error)
        } finally {
            this.isSubmitting = false
        }
    }

    async createDocs(OfferId: string) {
        try {
            const uploadPromises: Promise<{ type: string, success: boolean, error?: string }>[] = []

            const fileMappings = [
                { type: 'offer', file: this.docsModel.offer, api: offerFileUploadApi, key: 'OfferFile' },
                { type: 'passport', file: this.docsModel.passport, api: passportFileUploadApi, key: 'PassportFile' },
                { type: 'certificate', file: this.docsModel.certificate, api: certificateFileUploadApi, key: 'CertificateFile' },
                { type: 'scheme', file: this.docsModel.scheme, api: schemeFileUploadApi, key: 'PlanFile' }
            ] as const

            for (const mapping of fileMappings) {
                if (mapping.file) {
                    const formData = new FormData()
                    formData.append('OfferId', OfferId)
                    formData.append(mapping.key, mapping.file)

                    uploadPromises.push(
                        mapping.api(formData)
                            .then(() => ({ type: mapping.type, success: true }))
                            .catch(error => ({
                                type: mapping.type,
                                success: false,
                                error: error.message
                            }))
                    )
                }
            }

            const results = await Promise.all(uploadPromises)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export const createOfferModel = new CreateOfferModel()