import { listOffersByRequestId } from "@/shared/data/offers"
import { getRequestById, requestRevision } from "@/shared/data/requests"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

export function DataOffersListModel(requestId: string) {
    const navigate = useNavigate()
    const [selectedOffers, setSelectedOffers] = useState([])
    const [sortBy, setSortBy] = useState('price')
    const [sortOrder, setSortOrder] = useState('asc')
    const [filterCompany, setFilterCompany] = useState('all')
    const [selectAll, setSelectAll] = useState(false)
    const [viewMode, setViewMode] = useState('table')

    const request = useMemo(() => {
        return requestId ? getRequestById(requestId) : null
    }, [requestId])

    const offers = useMemo(() => {
        if (!requestId) return []
        return listOffersByRequestId(requestId).map((offer, index) => ({
            ...offer,
            analysisData: {
                number: index + 1,
                unit: offer.unit || 'шт',
                priceWithVAT: offer.priceWithVAT || offer.price,
                priceWithoutVAT: offer.priceWithoutVAT || Math.round(parseFloat(offer.price) / 1.2 * 100) / 100,
                documentDate: offer.documentDate || new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
                supplierFullName: offer.supplierCompany || offer.supplierFullName,
                supplierShortName: offer.supplierShortName || (offer.supplierCompany || offer.supplierFullName).substring(0, 30),
                country: offer.country || 'Россия',
                kpp: offer.kpp || '770101001',
                inn: offer.inn || '7701234567',
                website: offer.website || 'www.example.com',
                location: offer.location || 'г. Москва',
                status: offer.status || '2',
            }
        }))
    }, [requestId])

    const sortedOffers = useMemo(() => {
        let sorted = [...offers]
        sorted.sort((a, b) => {
            if (sortBy === 'price') {
                const priceA = parseFloat(a.price) || 0
                const priceB = parseFloat(b.price) || 0
                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
            }
            if (sortBy === 'date') {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            }
            if (sortBy === 'company') {
                const nameA = (a.supplierCompany || a.supplierFullName || '').toLowerCase()
                const nameB = (b.supplierCompany || b.supplierFullName || '').toLowerCase()
                return sortOrder === 'asc'
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA)
            }
            return 0
        })
        return sorted
    }, [offers, sortBy, sortOrder])

    const companies = useMemo(() => {
        const unique = [...new Set(offers.map(o => o.supplierCompany || o.supplierFullName))]
        return ['all', ...unique]
    }, [offers])

    const filteredOffers = useMemo(() => {
        if (filterCompany === 'all') return sortedOffers
        return sortedOffers.filter(o =>
            (o.supplierCompany || o.supplierFullName) === filterCompany
        )
    }, [sortedOffers, filterCompany])

    const exportToExcel = async () => {
        const offersToExport = selectedOffers.length > 0
            ? filteredOffers.filter(o => selectedOffers.includes(o.id))
            : filteredOffers

        if (offersToExport.length === 0) {
            alert('Нет предложений для экспорта')
            return
        }

        try {
            // Загружаем шаблон
            const templateUrl = '/export_template.xlsx' // или '/export_template.xlsx'
            const response = await fetch(templateUrl)
            const templateData = await response.arrayBuffer()

            // Читаем шаблон
            const wb = XLSX.read(templateData, { type: 'array' })
            const ws = wb.Sheets['Лист1'] // или нужный лист

            // Находим строку, с которой начинаются данные
            // Например, данные начинаются с 16 строки (после всех заголовков)
            XLSX.utils.sheet_add_aoa(ws, [[` ${request?.objectName || ''}`]], { origin: 'A3' })
            const startRow = 12

            // Вставляем данные
            offersToExport.forEach((offer, index) => {
                const rowNum = startRow + index
                const priceWithVAT = parseFloat(offer.price) || 0



                // Заполняем ячейки
                XLSX.utils.sheet_add_aoa(ws, [[
                    index + 1, // №
                    '', // Код
                    request?.objectName || '', // Наименование из заявки
                    offer.supplierCompany || offer.supplierFullName || '', // Из КП
                    offer.unit || 'шт', // Ед. изм. заявка
                    offer.unit || 'шт', // Ед. изм. КП
                    priceWithVAT, // Цена с НДС
                    priceWithVAT / 1.2, // Цена без НДС
                    new Date(offer.createdAt).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }), // Дата
                    '', // Индекс
                    1, // Коэффициент
                    priceWithVAT / 1.2, // Текущая цена
                    '', '', '', '', '', '', '', '', // Затраты (пусто)
                    offer.supplierCompany || offer.supplierFullName || '', // Поставщик
                    offer.analysisData?.country || 'Россия', // Страна
                    offer.analysisData?.kpp || '', // КПП
                    offer.analysisData?.inn || '', // ИНН
                    offer.analysisData?.website || '', // Сайт
                    offer.analysisData?.location || '', // Населенный пункт
                    offer.analysisData?.status || '2' // Статус
                ]], { origin: `A${rowNum}` })
            })

            // Сохраняем файл
            const fileName = `Конъюктурный анализ _${request?.id || 'заявка'}_${new Date().toISOString().slice(0, 10)}.xlsx`
            XLSX.writeFile(wb, fileName)

        } catch (error) {
            console.error('Ошибка при загрузке шаблона:', error)
            alert('Не удалось загрузить шаблон')
        }
    }

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedOffers([])
        } else {
            setSelectedOffers(filteredOffers.map(o => o.id))
        }
        setSelectAll(!selectAll)
    }

    const handleSelectOffer = (offerId) => {
        if (selectedOffers.includes(offerId)) {
            setSelectedOffers(selectedOffers.filter(id => id !== offerId))
            setSelectAll(false)
        } else {
            setSelectedOffers([...selectedOffers, offerId])
            if (selectedOffers.length + 1 === filteredOffers.length) {
                setSelectAll(true)
            }
        }
    }

    // Функция для перехода на детали предложения
    const handleViewOffer = (offerId) => {
        navigate(`/customer/offer/${offerId}`)
    }


    return {
        navigate,
        selectedOffers,
        setSelectedOffers,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        filterCompany,
        setFilterCompany,
        selectAll,
        setSelectAll,
        viewMode,
        setViewMode,
        request,
        offers,
        sortedOffers,
        companies,
        filteredOffers,
        
        exportToExcel,
        handleSelectAll,
        handleSelectOffer,
        handleViewOffer,
    }

}