import { listOffersByRequestId } from "@/shared/data/offers"
import { getRequestById } from "@/shared/data/requests"

export function RequestDetailData(requestId) {
    const request = requestId ? getRequestById(requestId) : null

    const offers = !requestId ? [] : listOffersByRequestId(requestId)

    // Проверяем, есть ли КП и находится ли заявка в архиве
    const hasOffers = offers.length > 0
    const isArchived = request?.archived === true

    // Редактирование доступно только если нет КП И заявка не в архиве
    const canEdit = !hasOffers && !isArchived

    // Функция для перехода к списку КП
    const goToOffers = () => {
        navigate(`/customer/request/${requestId}/offers`)
    }

    // Опции для отображения
    const motorStartOptions = {
        direct: 'Прямой пуск',
        soft: 'Плавный пуск (свыше 45 кВт)',
        frequency: 'Частотное регулирование'
    }

    const directionLabels = {
        '12': '12 часов (вверх)',
        '1': '1 час (30°)',
        '2': '2 часа (60°)',
        '3': '3 часа (вправо)',
        '4': '4 часа (120°)',
        '5': '5 часов (150°)',
        '6': '6 часов (вниз)',
        '7': '7 часов (210°)',
        '8': '8 часов (240°)',
        '9': '9 часов (влево)',
        '10': '10 часов (300°)',
        '11': '11 часов (330°)',
    }


    return {
        request,
        offers,
        hasOffers,
        isArchived,
        canEdit,
        goToOffers,
        motorStartOptions,
        directionLabels,
    }
}