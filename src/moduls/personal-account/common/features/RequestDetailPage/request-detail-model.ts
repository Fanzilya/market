import { offersByRequestsApi } from '@/entities/offer/api';
import { OfferFull } from '@/entities/offer/type';
import { currentKnsApi, equipmentCurrentKnsApi, requestSingleApi } from '@/entities/request/api';
import { ApiResponse, IRequest } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';


class RequestDetailModel {

    model: ApiResponse = {
        request: null,
        current: null,
        equipmentCurrent: null,
    }

    offers: OfferFull[] = []

    isLoader: boolean = true
    schemeIsActive: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get requestModel() {
        return this.model.request!
    }
    get currentModel() {
        return this.model.current!
    }
    get equipmentCurrentModel() {
        return this.model.equipmentCurrent!
    }


    async init(id: string) {
        this.isLoader = true
        this.schemeIsActive = false

        try {
            const [resquestRes, currentRes, equipmentCurrentRes, offersRes] = await Promise.all([
                requestSingleApi({ id: id }),
                currentKnsApi({ requestId: id }),
                equipmentCurrentKnsApi({ requestId: id }),
                offersByRequestsApi({ requestId: id })
            ])

            this.model = {
                request: resquestRes.data,
                current: currentRes.data,
                equipmentCurrent: equipmentCurrentRes.data,
            }

            this.offers = offersRes.data


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

export const requestDetailModel = new RequestDetailModel()