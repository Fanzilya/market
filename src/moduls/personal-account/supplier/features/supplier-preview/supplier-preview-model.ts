import { getPumpSingle } from '@/entities/pumps/api';
import { getAllRegionsApi } from '@/entities/regions/api';
import { IRegion } from '@/entities/regions/type';
import { clickAccountApi, currentKnsApi, equipmentCurrentKnsApi, requestSingleApi, requestSupplierSingleApi, viewUserApi } from '@/entities/request/api';
import { BaseInfoFull } from '@/entities/request/type';
import { ACCOUNT_SUPPLY } from '@/entities/user/config';
import { ISupplierAccount } from '@/entities/user/type';
import { makeAutoObservable } from 'mobx';


class SupplierPreviewModel {


    request: BaseInfoFull = {
        id: "",
        objectName: "",
        govCustomerName: "",
        regionId: "",
        configType: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        projectOrganizationName: "",
        regionName: "",
        innerId: "",
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


    async clickRequestUser() {
        try {
            const res = await clickAccountApi({
                requestId: this.request?.id!,
                accountId: this.accountData.id,
            })

            const newData = {
                ...this.accountData,
                coins: (Number(this.accountData.coins) - 1)
            }

            localStorage.setItem(ACCOUNT_SUPPLY, JSON.stringify(newData))
            this.accountData = newData

            // this.request.supplierRequestStatus = "Payed"

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

    async init(id: string, accountData: any, type: string) {
        this.isLoader = true
        this.schemeIsActive = false
        this.accountData = accountData

        try {

            if (type == "kns") {
                const [resquestRes, configRes, equipmentCurrentRes] = await Promise.all([
                    requestSupplierSingleApi({ requestId: id, accountId: this.accountData.id }),
                    currentKnsApi({ requestId: id }),
                    equipmentCurrentKnsApi({ requestId: id })
                ])

                console.log(resquestRes, configRes, equipmentCurrentRes)
                this.request = {
                    objectName: resquestRes.data.objectName,
                    govCustomerName: resquestRes.data.customerName,
                    regionId: resquestRes.data.locationRegion, // СДЕЛАТЬ ДОБАВЛЕНИЕ РЕГИОНА
                    configType: resquestRes.data.configTypeId,
                    contactPerson: resquestRes.data.contactName,
                    contactPhone: resquestRes.data.phoneNumber,
                    contactEmail: "",
                    projectOrganizationName: resquestRes.data.projectOrganizationName,
                    regionName: resquestRes.data.locationRegion, // СДЕЛАТЬ ДОБАВЛЕНИЕ РЕГИОНА
                    innerId: resquestRes.data.innerId,
                }
            } else {
                const [resquestRes, configRes] = await Promise.all([
                    requestSupplierSingleApi({ requestId: id, accountId: this.accountData.id }),
                    getPumpSingle({ requestId: id })
                ])

                console.log(resquestRes, configRes)
            }


            // console.log(resquestRes.data)

            // this.model = {
            //     request: { ...resquestRes.data, id },
            //     current: currentRes.data,
            //     equipmentCurrent: equipmentCurrentRes.data,
            // }


            // if (resquestRes.data.supplierRequestStatus == "New") {
            //     this.viewUser(id)
            // }



        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }

    }
}

export const supplierPreviewModel = new SupplierPreviewModel()  