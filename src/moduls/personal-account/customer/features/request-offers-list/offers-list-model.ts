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
    isLoader: boolean = true


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init() {
        try {
            // const res = await requestSingleApi(this.model)

        } catch (error) {
            console.log(error)
        }
    }
}

export const offersListModel = new OffersListModel()