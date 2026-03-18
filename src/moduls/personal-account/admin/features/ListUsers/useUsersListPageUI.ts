import { IRequestStats, RequestStatus } from '@/entities/request/config'
import { RequestRes } from '@/entities/request/type'
import { useMemo, useState } from 'react'

export const useUsersListPageUI = () => {
    // UI состояние
    // const [activeTab, setActiveTab] = useState('requests')
    const [statusFilter, setStatusFilter] = useState<RequestStatus | "all" | "arhive">("all")
    const [searchTerm, setSearchTerm] = useState('')
    // const [selectedItems, setSelectedItems] = useState([])

    // // Логика фильтрации (будет применена к данным)
    const getFiltered = (requests) => {
        if (!Array.isArray(requests) || requests.length === 0) {
            return []
        }

        return requests.filter(item => {
            const request = item

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


    return {
        statusFilter,
        setStatusFilter,
        searchTerm,
        setSearchTerm,
        getFiltered,
    }
}