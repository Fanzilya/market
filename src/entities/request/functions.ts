import { countOffersByRequestId } from "@/shared/data/offers"

// Получить класс статуса для отображения
export const getStatusClass = (request) => {
    if (request.archived) return "bg-[rgba(100,_116,_139,_0.1)] text-[#64748B]"

    switch (request.status) {
        case 'moderation':
            return "bg-[rgba(245,_158,_11,_0.1)] text-[#F59E0B]"
        case 'revision':
            return "bg-[rgba(139,_92,_246,_0.1)] text-[#F59E0B]"
        case 'rejected':
            return "bg-[rgba(239,_68,_68,_0.1)] text-[#F59E0B]"
        case 'published':
            return countOffersByRequestId(request.id) > 0 ? styles.statusSuccess : styles.statusPublished
        default:
            return styles.statusDraft
    }
}