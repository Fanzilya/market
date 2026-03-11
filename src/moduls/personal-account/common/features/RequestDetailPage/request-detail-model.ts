import { requestSingleApi } from '@/entities/request/api';
import { IRequest } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';


class RequestDetailModel {

    model: IRequest = {
        nameByProjectDocs: 0,
        objectName: 0,
        locationRegion: 0,
        customerName: '',
        contactName: 0,
        phoneNumber: 0,
        createdAt: null,
        status: 0,
        isArchived: false,
        userId: "",
        configTypeId: "",
        id: "",
    }

    isLoader: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: string) {
        this.isLoader = true

        try {
            const res = await requestSingleApi({ id: id })
            this.model = res.data

            console.log(res.data)

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }
}

export const requestDetailModel = new RequestDetailModel()