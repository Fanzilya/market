import { getAccountManyApi } from '@/entities/user/api';
import { makeAutoObservable } from 'mobx';


class BalancePageModel {

    model: any = []
    isLoader: boolean = true


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: string) {
        try {
            const res = await getAccountManyApi({ userId: id })

            console.log(res.data)

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }
}

export const balancePageModel = new BalancePageModel()