import { IRequestStats, RequestStatus } from '@/entities/request/config'
import { RequestRes } from '@/entities/request/type'
import { useMemo, useState } from 'react'

export const useRequestsListPageUI = () => {
    // UI состояние
    // const [activeTab, setActiveTab] = useState('requests')
    const [statusFilter, setStatusFilter] = useState<RequestStatus | "all" | "arhive">("all")
    const [searchTerm, setSearchTerm] = useState('')
    // const [selectedItems, setSelectedItems] = useState([])

    // // Логика фильтрации (будет применена к данным)
    const getFilteredRequests = (requests) => {
        if (!Array.isArray(requests) || requests.length === 0) {
            return []
        }

        return requests.filter(item => {
            const request = item.data // получаем данные заявки из структуры


            const matchesStatus = statusFilter != "arhive" ? ((statusFilter === 'all' || request.status == statusFilter) && (!request.isArchived)) : request.isArchived

            const matchesSearch = searchTerm
                ? request.nameByProjectDocs?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.id?.toString().includes(searchTerm) ||
                // Дополнительно можно искать по предложениям
                item.offers.some(offer =>
                    offer.title?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : true

            return matchesStatus && matchesSearch
        })
    }


    // // UI методы для выбора
    // const handleSelectAll = (items) => {
    //     if (selectedItems.length === items.length) {
    //         setSelectedItems([])
    //     } else {
    //         setSelectedItems(items.map(item => item.id))
    //     }
    // }

    // const handleSelectItem = (id) => {
    //     setSelectedItems(prev =>
    //         prev.includes(id)
    //             ? prev.filter(itemId => itemId !== id)
    //             : [...prev, id]
    //     )
    // }

    // const clearSelection = () => setSelectedItems([])

    // // Форматтеры
    // const formatDate = (date) => {
    //     return new Date(date).toLocaleDateString('ru-RU', {
    //         day: 'numeric',
    //         month: 'long',
    //         year: 'numeric'
    //     })
    // }

    // const getStatusBadge = (status) => {
    //     const badges = {
    //         active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Активен' },
    //         archived: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Архив' },
    //         pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Ожидает' },
    //         published: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Опубликован' }
    //     }
    //     return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status }
    // }

    return {
        // // UI состояние
        // activeTab,
        // setActiveTab,
        statusFilter,
        setStatusFilter,
        searchTerm,
        setSearchTerm,
        // selectedItems,
        // setSelectedItems,

        // // UI методы
        // handleSelectAll,
        // handleSelectItem,
        // clearSelection,
        // formatDate,
        // getStatusBadge,

        // // Функции фильтрации (применяются к данным)
        getFilteredRequests,
    }
}