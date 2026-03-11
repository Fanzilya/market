// src/pages/SupplierPage/hooks/useSupplierData.ts
import { listOffersByRequestId } from '@/shared/data/offers'
import { listPublishedRequestsForSuppliers } from '@/shared/data/requests'
import { useState, useMemo, useCallback } from 'react'

export default function useSupplierData({ user, freeClicksLeft, setFreeClicksLeft, navigate }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [filters, setFilters] = useState({
    searchQuery: '',
    region: 'all',
    type: 'all',
    status: 'all'
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 15
  })
  const [sortConfig, setSortConfig] = useState({
    key: 'publishedAt',
    direction: 'desc'
  })

  const refreshData = useCallback(() => {
    setRefreshKey(prev => prev + 1)
  }, [])

  // Все опубликованные заявки
  const requests = useMemo(() => {
    const _ = refreshKey
    return listPublishedRequestsForSuppliers()
  }, [refreshKey])

  // Мои отклики
  const myOffers = useMemo(() => {
    if (!user?.email) return []
    const _ = refreshKey
    return requests.flatMap(r =>
      listOffersByRequestId(r.id).filter(
        o => String(o.supplierEmail || '').toLowerCase() === user.email.toLowerCase()
      )
    )
  }, [requests, user?.email, refreshKey])

  // Уникальные значения для фильтров
  const stats = useMemo(() => ({
    regions: ['all', ...new Set(requests.map(r => r.region || 'Не указан'))],
    types: ['all', ...new Set(requests.map(r => r.configType || 'КНС'))],
    totalRequests: requests.length,
    myOffersCount: myOffers.length,
    newRequestsCount: requests.filter(r => !myOffers.some(o => o.requestId === r.id)).length
  }), [requests, myOffers])

  // Фильтрация
  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesSearch = filters.searchQuery === '' ||
        request.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        request.govCustomerName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        request.objectName.toLowerCase().includes(filters.searchQuery.toLowerCase())

      const matchesRegion = filters.region === 'all' ||
        (request.region || 'Не указан') === filters.region

      const matchesType = filters.type === 'all' ||
        (request.configType || 'КНС') === filters.type

      const hasOffer = myOffers.some(o => o.requestId === request.id)

      let matchesStatus = true
      if (filters.status === 'new') {
        matchesStatus = !hasOffer
      } else if (filters.status === 'responded') {
        matchesStatus = hasOffer
      }

      return matchesSearch && matchesRegion && matchesType && matchesStatus
    })
  }, [requests, filters, myOffers])

  // Сортировка
  const sortedRequests = useMemo(() => {
    if (!sortConfig.key) return filteredRequests

    return [...filteredRequests].sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      if (sortConfig.key === 'publishedAt' || sortConfig.key === 'createdAt') {
        aValue = new Date(aValue || Date.now()).getTime()
        bValue = new Date(bValue || Date.now()).getTime()
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredRequests, sortConfig])

  // Пагинация
  const totalPages = Math.ceil(sortedRequests.length / pagination.itemsPerPage)
  const paginatedRequests = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage
    const end = start + pagination.itemsPerPage
    return sortedRequests.slice(start, end)
  }, [sortedRequests, pagination])

  const handleViewRequest = useCallback((request) => {
    const hasOffer = myOffers.some(o => o.requestId === request.id)

    if (hasOffer) {
      navigate(`/supplier/request/${request.id}`)
    } else {
      if (freeClicksLeft > 0) {
        setFreeClicksLeft(prev => prev - 1)
        navigate(`/supplier/request/${request.id}/preview`, {
          state: { request }
        })
      } else {
        navigate('/supplier/balance', {
          state: {
            message: 'Бесплатные клики закончились. Для просмотра заявок необходимо пополнить счет.'
          }
        })
      }
    }
  }, [myOffers, freeClicksLeft, setFreeClicksLeft, navigate])

  return {
    requests,
    myOffers,
    filters,
    setFilters,
    pagination,
    setPagination,
    sortConfig,
    setSortConfig,
    filteredRequests,
    sortedRequests,
    paginatedRequests,
    stats,
    totalPages,
    refreshData,
    handleViewRequest
  }
}