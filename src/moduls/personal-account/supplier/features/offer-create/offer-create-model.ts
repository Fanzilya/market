import { certificateFileUploadApi, createRequestApi, offerFileUploadApi, passportFileUploadApi, schemeFileUploadApi } from '@/entities/offer/api';
import { IOfferCreate, IOfferDocs, OfferFull } from '@/entities/offer/type';
import { requestSingleApi } from '@/entities/request/api';
import { makeAutoObservable } from 'mobx';
import { ChangeEvent } from 'react';


class CreateOfferModel {

    request: OfferFull | null = null
    isLoader: boolean = true
    isSubmitting: boolean = false

    model: IOfferCreate = {

        currentPriceNDS: 0,
        warehouseLocation: "",
        supplierSiteURL: "",

        nameByProject: "",
        nameBySupplier: "",
        bussinessAccId: "019ce105-1aa3-737d-ba51-4b09419e2c9e",
        requestId: "",

        currentPriceNoNDS: 0,
        supportingDocumentDate: null,
        manufacturerCountry: "",
    }

    docsModel: IOfferDocs = { offer: null, passport: null, certificate: null, scheme: null }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setModel<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        if (name === "currentPriceNoNDS") {
            this.model[name] = value;
            this.model['currentPriceNDS'] = (Number(value) + (Number(value) * 0.22))
        } else {
            this.model[name] = value;
        }
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


    async init(id: string) {
        this.isLoader = true

        try {
            const res = await requestSingleApi({ id: id })

            this.request = res.data

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }

    async create(userName: string, navigate: any) {

        this.isSubmitting = true

        try {
            this.model.requestId = this.request.id
            this.model.nameBySupplier = userName
            this.model.nameByProject = this.request.nameByProjectDocs

            const res = await createRequestApi(this.model)
            await this.createDocs(res.data)

            navigate("/supplier")

        } catch (error) {
            console.log(error)
        } finally {
            this.isSubmitting = false
        }
    }

    async createDocs(OfferId: string) {

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

        console.log(results)

        // const uploadedFiles = results.filter(r => r.success).map(r => r.type)

        // const failedFiles = results.filter(r => !r.success).map(r => ({ type: r.type, error: r.error! }))

        // return {
        //     success: failedFiles.length === 0,
        //     uploadedFiles,
        //     failedFiles
        // }
    }
}

export const createOfferModel = new CreateOfferModel()