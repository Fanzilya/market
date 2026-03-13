import { IRequest, RequestRes } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';
import { countOffersByRequestId } from '@/shared/data/offers';
import { RequestStatus } from '@/entities/request/config';
import { allByUserApi, allRequestPublicApi, requestSingleApi } from '@/entities/request/api';
import { offersByRequestsApi } from '@/entities/offer/api';
import { OfferFull } from '@/entities/offer/type';


class RequestListModel {

    model: {
        data: RequestRes,
        offers: OfferFull
    }[] = []
    isLoader: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init() {
        try {
            const response = await allRequestPublicApi();
            const requests = response.data;

            const promises = requests.map(async (request) => {
                try {
                    const [singleData, offersData] = await Promise.all([
                        requestSingleApi({ id: request.id }),
                        offersByRequestsApi({ requestId: request.id })
                    ]);

                    return {
                        data: singleData.data,
                        offers: offersData.data
                    };
                } catch (error) {
                    console.error(`Ошибка при обработке request ${request.id}:`, error);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            this.model = results.filter(result => result !== null) as typeof this.model;

        } catch (error) {
            console.error('Ошибка при получении списка запросов:', error);
        } finally {
            this.isLoader = false;
        }

        console.log(this.model)

    }
}

export const requestListModel = new RequestListModel()