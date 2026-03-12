import { createRequestApi } from '@/entities/offer/api';
import { IOfferCreate } from '@/entities/offer/type';
import { requestSingleApi } from '@/entities/request/api';
import { makeAutoObservable } from 'mobx';


class CreateOfferModel {

    request: any = []
    isLoader: boolean = true

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
        try {
            this.model.requestId = this.request.id
            this.model.nameBySupplier = userName
            this.model.nameByProject = this.request.nameByProjectDocs

            const res = await createRequestApi(this.model)

            navigate("/supplier")

        } catch (error) {
            console.log(error)
        }
    }
}

export const createOfferModel = new CreateOfferModel()