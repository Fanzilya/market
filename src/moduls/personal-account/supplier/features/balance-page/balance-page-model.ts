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
            
            const res = await getAccountManyApi({ userId: "019ce0b8-4b01-7e56-bd5e-c9ea3a5d4e0f" })

            console.log(res.data)

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }
}

export const balancePageModel = new BalancePageModel()