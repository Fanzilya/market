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


    // const filteredRequests = useMemo(() => {
    //     return requests.length == 0
    //         ? []
    //         : requests.filter(r => {
    //             const matchesSearch = r.objectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //                 r.id.toLowerCase().includes(searchQuery.toLowerCase())

    //             const offerCount = countOffersByRequestId(r.id)

    //             // Фильтр по статусам
    //             if (selectedStatus === 'all') return matchesSearch
    //             if (selectedStatus === 'moderation') return matchesSearch && r.status === 'moderation' && !r.archived
    //             if (selectedStatus === 'revision') return matchesSearch && r.status === 'revision' && !r.archived
    //             if (selectedStatus === 'rejected') return matchesSearch && r.status === 'rejected' && !r.archived
    //             if (selectedStatus === 'published') return matchesSearch && r.status === 'published' && !r.archived
    //             if (selectedStatus === 'with-offers') return matchesSearch && r.status === 'published' && !r.archived && offerCount > 0
    //             if (selectedStatus === 'no-offers') return matchesSearch && r.status === 'published' && !r.archived && offerCount === 0
    //             if (selectedStatus === 'archived') return matchesSearch && r.archived === true

    //             return matchesSearch
    //         })
    // }, [requests, searchQuery, selectedStatus])

    // const paginatedRequests = useMemo(() => {
    //     const start = (currentPage - 1) * itemsPerPage
    //     const end = start + itemsPerPage
    //     return filteredRequests.slice(start, end)
    // }, [filteredRequests, currentPage])

    // const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

    const onLogout = () => {
        setShowLogoutConfirm(true)
    }

    const confirmLogout = () => {
        signOut()
        navigate('/', { replace: true })
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
        // filteredRequests,
        // paginatedRequests,
        // totalPages,
        onLogout,
        confirmLogout,
        goToEditRequest,
        openArchiveConfirm,
        handleArchiveRequest,
        handleDeleteRequest,
        handleResubmit,
        getStatusText,
        goToCreateRequest
    })
}