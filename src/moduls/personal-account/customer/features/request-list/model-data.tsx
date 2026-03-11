import { Role } from "@/entities/user/role"
import { useAuth } from "@/features/user/context/context"
import { countOffersByRequestId } from "@/shared/data/offers"
import { archiveRequest, deleteRequest, getRequestStatusDisplay, listRequestsForCustomerEmail } from "@/shared/data/requests"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

export function CustomerData(styles: any) {
    const itemsPerPage = 10
    const navigate = useNavigate()
    const [refreshKey, setRefreshKey] = useState(0)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)
    const [selectedRequestForArchive, setSelectedRequestForArchive] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const { user, signOut } = useAuth()
    const requests = !user?.email ? [] : listRequestsForCustomerEmail(user.email)

    const stats = useMemo(() => {
        let moderation = 0
        let revision = 0
        let rejected = 0
        let published = 0
        let withOffers = 0
        let archived = 0

        requests.forEach(r => {
            if (r.archived) {
                archived++
            } else {
                switch (r.status) {
                    case 'moderation':
                        moderation++
                        break
                    case 'revision':
                        revision++
                        break
                    case 'rejected':
                        rejected++
                        break
                    case 'published':
                        published++
                        if (countOffersByRequestId(r.id) > 0) withOffers++
                        break
                }
            }
        })

        return {
            total: requests.length,
            moderation,
            revision,
            rejected,
            published,
            withOffers,
            noOffers: published - withOffers,
            archived
        }
    }, [requests])

    const filteredRequests = useMemo(() => {
        return requests.filter(r => {
            const matchesSearch = r.objectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.id.toLowerCase().includes(searchQuery.toLowerCase())

            const offerCount = countOffersByRequestId(r.id)

            // Фильтр по статусам
            if (selectedStatus === 'all') return matchesSearch
            if (selectedStatus === 'moderation') return matchesSearch && r.status === 'moderation' && !r.archived
            if (selectedStatus === 'revision') return matchesSearch && r.status === 'revision' && !r.archived
            if (selectedStatus === 'rejected') return matchesSearch && r.status === 'rejected' && !r.archived
            if (selectedStatus === 'published') return matchesSearch && r.status === 'published' && !r.archived
            if (selectedStatus === 'with-offers') return matchesSearch && r.status === 'published' && !r.archived && offerCount > 0
            if (selectedStatus === 'no-offers') return matchesSearch && r.status === 'published' && !r.archived && offerCount === 0
            if (selectedStatus === 'archived') return matchesSearch && r.archived === true

            return matchesSearch
        })
    }, [requests, searchQuery, selectedStatus])

    const paginatedRequests = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        const end = start + itemsPerPage
        return filteredRequests.slice(start, end)
    }, [filteredRequests, currentPage])

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

    const onLogout = () => {
        setShowLogoutConfirm(true)
    }

    const confirmLogout = () => {
        signOut()
        navigate('/', { replace: true })
    }

    // Функция для перехода на страницу просмотра КП
    const goToOffers = (requestId) => {
        navigate(`/customer/request/${requestId}/offers`)
    }

    // Функция для перехода на страницу редактирования заявки
    const goToEditRequest = (requestId, e) => {
        e.stopPropagation()
        navigate(`/customer/request/${requestId}/edit`)
    }

    // Функция для открытия модального окна архивации
    const openArchiveConfirm = (requestId, e) => {
        e.stopPropagation()
        setSelectedRequestForArchive(requestId)
        setShowArchiveConfirm(true)
    }

    // Функция для архивации заявки
    const handleArchiveRequest = () => {
        if (selectedRequestForArchive) {
            const result = archiveRequest(selectedRequestForArchive)
            if (result) {
                setRefreshKey(prev => prev + 1)
                setShowArchiveConfirm(false)
                setSelectedRequestForArchive(null)
            }
        }
    }

    // Функция для удаления заявки
    const handleDeleteRequest = (requestId, e) => {
        e.stopPropagation()
        if (window.confirm('Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить.')) {
            const result = deleteRequest(requestId)
            if (result) {
                setRefreshKey(prev => prev + 1)
            }
        }
    }

    // Функция для повторной отправки на модерацию (после доработки)
    const handleResubmit = (requestId, e) => {
        e.stopPropagation()
        // Здесь будет логика повторной отправки
        console.log('Повторная отправка:', requestId)
        // После реализации функции в requests.ts:
        // resubmitRequest(requestId)
        // setRefreshKey(prev => prev + 1)
    }

    // Получить класс статуса для отображения
    const getStatusClass = (request) => {
        if (request.archived) return styles.statusArchived

        switch (request.status) {
            case 'moderation':
                return styles.statusModeration
            case 'revision':
                return styles.statusRevision
            case 'rejected':
                return styles.statusRejected
            case 'published':
                return countOffersByRequestId(request.id) > 0 ? styles.statusSuccess : styles.statusPublished
            default:
                return styles.statusDraft
        }
    }

    // Получить текст статуса
    const getStatusText = (request) => {
        if (request.archived) return 'В архиве'

        const display = getRequestStatusDisplay(request, Role.Customer)
        return display.text
    }


    const goToCreateRequest = () => {
        navigate('/customer/request/new')
    }


    return ({
        itemsPerPage,
        refreshKey,
        setRefreshKey,
        showLogoutConfirm,
        setShowLogoutConfirm,
        showArchiveConfirm,
        setShowArchiveConfirm,
        selectedRequestForArchive,
        setSelectedRequestForArchive,
        currentPage,
        setCurrentPage,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        requests,
        stats,
        filteredRequests,
        paginatedRequests,
        totalPages,
        onLogout,
        confirmLogout,
        goToOffers,
        goToEditRequest,
        openArchiveConfirm,
        handleArchiveRequest,
        handleDeleteRequest,
        handleResubmit,
        getStatusClass,
        getStatusText,
        goToCreateRequest
    })
}