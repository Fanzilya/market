import { IRequestStats, RequestStatus } from '@/entities/request/config'
import { RequestRes } from '@/entities/request/type'
import { RoleIds } from '@/entities/user/role'
import { useMemo, useState } from 'react'

export const useUsersListPageUI = () => {
    // UI состояние
    // const [activeTab, setActiveTab] = useState('requests')
    const [statusFilter, setStatusFilter] = useState<typeof RoleIds | "all">("all")
    const [searchTerm, setSearchTerm] = useState('')

    const getFiltered = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            return []
        }

        return data.filter(data => {
            const matchesStatus = statusFilter === 'all' || data.roleId == statusFilter
            const matchesSearch = searchTerm
                ? data.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
                || data.email?.toString().includes(searchTerm)
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