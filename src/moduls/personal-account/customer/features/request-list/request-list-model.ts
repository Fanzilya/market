import { IRequest } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';


class RequestListModel {

    model: IRequest[] = []
    isLoader: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init() {
    }
}

export const requestListModel = new RequestListModel()