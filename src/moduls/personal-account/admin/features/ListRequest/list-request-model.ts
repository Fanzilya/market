import { IRequest } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';
import { IRequestStats, RequestStatus } from '@/entities/request/config';
import { allByUserApi, requestSingleApi } from '@/entities/request/api';
import { offersByRequestsApi } from '@/entities/offer/api';


class ListRequestModel {

    model: IRequest[] = []
    filterModel: IRequest[] = []
    isLoader: boolean = true
    stats: IRequestStats = { all: 0, news: 0, moderation: 0, rejected: 0, published: 0, archived: 0 }

    selectedStatus: 'all' | 'news' | 'moderation' | 'rejected' | 'published' | 'archived' = "all"


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    filteredRequests(selectedStatus: 'all' | 'news' | 'moderation' | 'rejected' | 'published' | 'archived') {
        this.selectedStatus = selectedStatus

        this.filterModel = this.model.filter(r => {
            // 1. Фильтр по статусам
            let statusMatch = false;

            if (selectedStatus === 'all') {
                statusMatch = true; // все записи проходят
            } else if (selectedStatus === 'archived') {
                statusMatch = r.data.archived === true;
            } else {
                statusMatch = r.data.status === this.selectedStatus;
            }

            return statusMatch;
        });
    }

    async init() {
        try {
            // const response = await allByUserApi({ userId: userId });
            // const requests = response.data;

            // const promises = requests.map(async (request) => {
            //     try {
            //         const [singleData, offersData] = await Promise.all([
            //             requestSingleApi({ id: request.id }),
            //             offersByRequestsApi({ requestId: request.id })
            //         ]);

            //         return {
            //             data: singleData.data,
            //             offers: offersData.data
            //         };
            //     } catch (error) {
            //         console.error(`Ошибка при обработке request ${request.id}:`, error);
            //         return null;
            //     }
            // });

            // const results = await Promise.all(promises);
            // this.model = results.filter(result => result !== null) as typeof this.model;
            // this.sortStats()
            // this.filteredRequests("all")

        } catch (error) {
            console.error('Ошибка при получении списка запросов:', error);
        } finally {
            this.isLoader = false;
        }

        console.log(this.model)

    }

    sortStats() {
        let news = 0
        let moderation = 0
        let rejected = 0
        let published = 0
        let archived = 0

        this.model.forEach(r => {
            if (r.data.isArchived) {
                archived++
            } else {
                switch (r.data.status) {
                    case RequestStatus.Moderation:
                        moderation++
                        break
                    case RequestStatus.Rejected:
                        rejected++
                        break
                    case RequestStatus.Published:
                        published++
                        break
                    case RequestStatus.New:
                        news++
                        break
                }
            }
        })

        this.stats = {
            all: this.model.length,
            moderation,
            rejected,
            published,
            archived,
            news,
        }
    }
}

export const listRequestModel = new ListRequestModel()