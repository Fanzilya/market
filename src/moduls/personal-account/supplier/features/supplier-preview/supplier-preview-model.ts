import { clickAccountApi, currentKnsApi, equipmentCurrentKnsApi, requestSingleApi, requestSupplierSingleApi, viewUserApi } from '@/entities/request/api';
import { ApiResponse } from '@/entities/request/type';
import { getAccountManyApi } from '@/entities/user/api';
import { ACCOUNT_SUPPLY } from '@/entities/user/config';
import { ISupplierAccount } from '@/entities/user/type';
import { makeAutoObservable } from 'mobx';


class SupplierPreviewModel {

    model: ApiResponse = {
        request: null,
        current: null,
        equipmentCurrent: null,
    }

    schemeIsActive: boolean = false
    accountData: ISupplierAccount = {
        coins: 0,
        userId: "",
        user: "",
        accountRequests: "",
        id: "",
    }

    isLoader: boolean = true

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

    async clickRequestUser() {
        try {
            const res = await clickAccountApi({
                requestId: this.model.request?.id!,
                accountId: this.accountData.id,
            })

            const newData = {
                ...this.accountData,
                coins: (Number(this.accountData.coins) - 1)
            }

            localStorage.setItem(ACCOUNT_SUPPLY, JSON.stringify(newData))
            this.accountData = newData


            this.request.supplierRequestStatus = "Payed"



        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }

    async viewUser(requestId: string) {
        try {
            const res = await viewUserApi({
                requestId: requestId,
                accountId: this.accountData.id,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async init(id: string) {
        this.isLoader = true
        this.schemeIsActive = false

        try {
            this.accountData = JSON.parse(localStorage.getItem(ACCOUNT_SUPPLY) || "")

            const [resquestRes, currentRes, equipmentCurrentRes] = await Promise.all([
                requestSupplierSingleApi({ requestId: id, accountId: this.accountData.id }),
                currentKnsApi({ requestId: id }),
                equipmentCurrentKnsApi({ requestId: id })
            ])

            this.model = {
                request: { ...resquestRes.data, id },
                current: currentRes.data,
                equipmentCurrent: equipmentCurrentRes.data,
            }


            if (resquestRes.data.supplierRequestStatus == "New") {
                this.viewUser(id)
            }

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }

    }
}

export const supplierPreviewModel = new SupplierPreviewModel()  