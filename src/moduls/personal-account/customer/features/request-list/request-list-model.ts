import { IRequest } from '@/entities/request/type';
import { makeAutoObservable } from 'mobx';
import { IRequestStats } from './config';
import { countOffersByRequestId } from '@/shared/data/offers';
import { RequestStatus } from '@/entities/request/config';
import { allByUserApi } from '@/entities/request/api';


class RequestListModel {

    model: IRequest[] = []
    isLoader: boolean = true
    stats: IRequestStats = { all: 0, news: 0, moderation: 0, rejected: 0, published: 0, archived: 0 }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(userId: string) {

        try {
            const res = await allByUserApi({ userId: userId })
            this.model = res.data
            this.sortStats()
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }

    sortStats() {
        let news = 0
        let moderation = 0
        let rejected = 0
        let published = 0
        let archived = 0

        this.model.forEach(r => {
            if (r.isArchived) {
                archived++
            } else {
                switch (r.status) {
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

export const requestListModel = new RequestListModel()