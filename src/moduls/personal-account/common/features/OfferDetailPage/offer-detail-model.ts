import { offersSingleApi } from '@/entities/offer/api';
import { OfferFull } from '@/entities/offer/type';
import { makeAutoObservable } from 'mobx';


class OfferDetailModel {

    offer: OfferFull = {
        offersNumber: "",
        nameByProject: 0,
        nameBySupplier: "",
        currentPriceNDS: 0,
        currentPriceNoNDS: 0,
        supportingDocumentDate: "",
        manufacturerCountry: "",
        warehouseLocation: "",
        supplierSiteURL: "",
        requestId: "",
        request: "",
        bussinessAccId: "",
        bussinessAccount: "",
        id: "",
        deliveryTerms: "",
        garantyPeriod: 0,
        paymentTerms: "",
    }
    isLoader: boolean = true


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: string) {

        this.isLoader = true

        try {
            const res = await offersSingleApi({ id: id })

            this.offer = res.data


            // {
            //     "offersNumber": null,
            //     "nameByProject": "1",
            //     "nameBySupplier": "supplier",
            //     "currentPriceNDS": 122,
            //     "currentPriceNoNDS": 100,
            //     "supportingDocumentDate": "2026-03-12T00:00:00Z",
            //     "warehouseLocation": "test",
            //     "manufacturerCountry": "test",
            //     "supplierSiteURL": "test",
            //     "fullCompanyName": "ООО ПромСтройИнвестХим",
            //     "inn": "12341234",
            //     "kpp": "100500600",
            //     "offerFileId": null,
            //     "passportFileId": null,
            //     "certificateFileId": null,
            //     "planFileId": null
            // }


        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }
}

export const offerDetailModel = new OfferDetailModel()