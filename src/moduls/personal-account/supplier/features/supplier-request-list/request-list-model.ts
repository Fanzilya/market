import { IRequest } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';
import { countOffersByRequestId } from '@/shared/data/offers';
import { RequestStatus } from '@/entities/request/config';
import { allByUserApi, allRequestPublicApi } from '@/entities/request/api';


class RequestListModel {

    model: IRequest[] = []
    isLoader: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init() {
        try {
            const res = await allRequestPublicApi()
            this.model = res.data
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }
}

export const requestListModel = new RequestListModel()