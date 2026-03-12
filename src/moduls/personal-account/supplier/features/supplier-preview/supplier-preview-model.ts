import { currentKnsApi, equipmentCurrentKnsApi, requestSingleApi } from '@/entities/request/api';
import { ApiResponse } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';


class SupplierPreviewModel {

    model: ApiResponse = {
        request: null,
        current: null,
        equipmentCurrent: null,
    }

    schemeIsActive: boolean = false

    isLoader: boolean = true
    hasResponded: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    get request() {
        return this.model.request!
    }
    get currentModel() {
        return this.model.current!
    }
    get equipmentCurrentModel() {
        return this.model.equipmentCurrent!
    }

    setHasResponded(value: boolean) {
        this.hasResponded = value
    }

    async init(id: string) {
        this.isLoader = true
        this.schemeIsActive = false
        try {

            const [resquestRes, currentRes, equipmentCurrentRes] = await Promise.all([
                requestSingleApi({ id: id }),
                currentKnsApi({ requestId: id }),
                equipmentCurrentKnsApi({ requestId: id })
            ])

            this.model = {
                request: resquestRes.data,
                current: currentRes.data,
                equipmentCurrent: equipmentCurrentRes.data,
            }


            const respondedRequests = JSON.parse(localStorage.getItem('respondedRequests') || '[]')
            if (this.model.request!.id && respondedRequests.includes(this.model.request!.id)) {
                this.hasResponded = true
            }

            equipmentCurrentRes.data.forEach(element => {
                if (element.id == "019cdcda-a923-724b-8e29-3a6d7ea2d655") {
                    this.schemeIsActive = true
                }
            });

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }

    }
}

export const supplierPreviewModel = new SupplierPreviewModel()