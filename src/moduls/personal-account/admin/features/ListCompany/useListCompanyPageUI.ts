import { IRequestStats, RequestStatus } from '@/entities/request/config'
import { RequestRes } from '@/entities/request/type'
import { RoleIds } from '@/entities/user/role'
import { useMemo, useState } from 'react'

export const useListCompanyPageUI = () => {

    const [statusFilter, setStatusFilter] = useState<keyof typeof RoleIds | "all">("all")
    const [searchTerm, setSearchTerm] = useState('')

    const getFiltered = (list) => {
        if (!Array.isArray(list) || list.length === 0) {
            return []
        }

        return list.filter(item => {
            const matchesStatus = (statusFilter === 'all' || item.roleId == statusFilter)
            const matchesSearch = searchTerm ?
                item.fullCompanyName?.toLowerCase().includes(searchTerm.toLowerCase())
                || item.shortCompanyName?.toString().includes(searchTerm)
                || item.inn?.toString().includes(searchTerm)
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