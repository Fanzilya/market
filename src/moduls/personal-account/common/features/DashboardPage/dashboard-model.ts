import { allByUserApi } from '@/entities/request/api';
import { makeAutoObservable } from 'mobx';


class DashboardModel {

    count: number = 0
    isLoader: boolean = true


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(userId: string) {
        try {
            const response = await allByUserApi({ userId: userId });
            this.count = response.data.length
        } catch (error) {
            console.error('Ошибка при получении списка запросов:', error);
        } finally {
            this.isLoader = false;
        }
    }
}

export const dashboardModel = new DashboardModel()