import { countOffersByRequestId } from "@/shared/data/offers"
import { RequestStatus } from "./config"
import { IRequest } from "./type"

// Получить класс статуса для отображения
export const getStatusClass = (request: IRequest) => {
    if (request.isArchived) return "bg-[rgba(100,_116,_139,_0.1)] text-[#64748B]"

    switch (request.status) {
        case RequestStatus.Moderation:
            return "bg-[rgba(245,_158,_11,_0.1)] text-[#F59E0B]"
        case RequestStatus.New:
            return "bg-blue-200 text-blue-700"
        case RequestStatus.Rejected:
            return "bg-[rgba(239,_68,_68,_0.1)] text-[#F59E0B]"
        case RequestStatus.Published:
            return countOffersByRequestId(request.id) > 0 ? "bg-[rgba(16,_185,_129,_0.1)] text-[#10B981]" : "bg-[rgba(74,_133,_246,_0.1)] text-[#4A85F6]"
        default:
            return "bg-[rgba(100,_116,_139,_0.1)] text-[#64748B]"
    }
}


export function getStatusText(request: IRequest) {
    if (request.isArchived) {
        return 'В архиве'
    }

    switch (request.status) {
        case RequestStatus.Moderation:
            return 'На модерации'
        case RequestStatus.New:
            return 'Новое'
        case RequestStatus.Rejected:
            return 'Отклонена'
        case RequestStatus.Published:
            return 'Опубликована'
        default:
            return 'Черновик'
    }
}