import { offersByRequestsApi } from '@/entities/offer/api';
import { OfferFull } from '@/entities/offer/type';
import { requestSingleApi } from '@/entities/request/api';
import { IRequest, RequestRes } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';


class OffersListModel {

    request: RequestRes = {
        nameByProjectDocs: "",
        objectName: "",
        locationRegion: "",
        customerName: "",
        contactName: "",
        phoneNumber: "",
        createdAt: "",
        status: null,
        isArchived: false,
        userId: "",
        user: null,
        configTypeId: "",
        requestConfigType: null,
        knsConfigs: null,
        equipRequest: null,
        favoriteRequests: null,
        id: "",
    }


    offers: OfferFull[] = []

    isLoader: boolean = true

    stats: { total: number, minPrice: number, maxPrice: number, avgPrice: number } = {
        total: 0,
        minPrice: 0,
        maxPrice: 0,
        avgPrice: 0,
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(requestId: string) {
        try {
            const res = await requestSingleApi({ id: requestId })
            this.request = res.data

            const resOffers = await offersByRequestsApi({ requestId: requestId })
            this.offers = resOffers.data

            const prices = this.offers.map(o => parseFloat(o.currentPriceNDS) || 0).filter(p => p > 0)

            this.stats.total = this.offers.length
            this.stats.minPrice = prices.length ? Math.min(...prices) : 0
            this.stats.maxPrice = prices.length ? Math.max(...prices) : 0
            this.stats.avgPrice = prices.length ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : 0

        } catch (error) {
            console.log(error)
        }
    }
}

export const offersListModel = new OffersListModel()