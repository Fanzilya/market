import { useAuth } from "@/features/user/context/context"
import { deleteOffer, listAllOffers } from "@/shared/data/offers"
import { archiveRequest, deleteRequest, listAllRequests, unarchiveRequest, updateRequest } from "@/shared/data/requests"
import { useEffect, useState } from "react"

export function AdminPageDataModel(styles: any) {
    const { user, getAllUsers } = useAuth()
    const [activeTab, setActiveTab] = useState('requests')
    const [requests, setRequests] = useState([])
    const [offers, setOffers] = useState([])
    const [users, setUsers] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedItems, setSelectedItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadData()
        setUsers(getAllUsers())
    }, [])

    const loadData = () => {
        setRequests(listAllRequests())
        setOffers(listAllOffers())
    }

    const handlePublishRequest = (requestId) => {
        updateRequest(requestId, { status: 'published' })
        loadData()
    }

    const handleArchiveRequest = (requestId) => {
        archiveRequest(requestId)
        loadData()
    }

    const handleUnarchiveRequest = (requestId) => {
        unarchiveRequest(requestId)
        loadData()
    }

    const handleDeleteRequest = (requestId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
            deleteRequest(requestId)
            loadData()
        }
    }

    const handleDeleteOffer = (offerId) => {
        if (window.confirm('Вы уверены, что хотите удалить это предложение?')) {
            deleteOffer(offerId)
            loadData()
        }
    }

    const filteredRequests = requests.filter(req => {
        const matchesSearch =
            req.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.objectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.govCustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())

        if (statusFilter === 'all') return matchesSearch
        if (statusFilter === 'archived') return matchesSearch && req.archived === true
        return matchesSearch && req.status === statusFilter && !req.archived
    })

    const filteredOffers = offers.filter(offer => {
        return offer.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.supplierCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.requestId?.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const handleSelectAll = (type) => {
        if (type === 'requests') {
            if (selectedItems.length === filteredRequests.length) {
                setSelectedItems([])
            } else {
                setSelectedItems(filteredRequests.map(r => r.id))
            }
        } else {
            if (selectedItems.length === filteredOffers.length) {
                setSelectedItems([])
            } else {
                setSelectedItems(filteredOffers.map(o => o.id))
            }
        }
    }

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleBulkDelete = () => {
        if (window.confirm(`Удалить ${selectedItems.length} элементов?`)) {
            selectedItems.forEach(id => {
                if (activeTab === 'requests') {
                    deleteRequest(id)
                } else {
                    deleteOffer(id)
                }
            })
            setSelectedItems([])
            loadData()
        }
    }

    const handleBulkPublish = () => {
        selectedItems.forEach(id => {
            updateRequest(id, { status: 'published' })
        })
        setSelectedItems([])
        loadData()
    }

    const handleBulkArchive = () => {
        selectedItems.forEach(id => {
            archiveRequest(id)
        })
        setSelectedItems([])
        loadData()
    }

    const formatDate = (dateString) => {
        if (!dateString) return '—'
        return new Date(dateString).toLocaleDateString('ru-RU')
    }

    const getStatusBadge = (request) => {
        if (request.archived) {
            return <span className={`${styles.statusBadge} ${styles.statusArchived}`}>В архиве</span>
        }

        switch (request.status) {
            case 'published':
                return <span className={`${styles.statusBadge} ${styles.statusPublished}`}>Опубликовано</span>
            case 'active':
                return <span className={`${styles.statusBadge} ${styles.statusActive}`}>Активно</span>
            default:
                return <span className={`${styles.statusBadge} ${styles.statusDraft}`}>Черновик</span>
        }
    }
    return ({
        activeTab,
        setActiveTab,
        requests,
        setRequests,
        offers,
        setOffers,
        users,
        setUsers,
        statusFilter,
        setStatusFilter,
        selectedItems,
        setSelectedItems,
        loadData,
        handlePublishRequest,
        handleArchiveRequest,
        handleUnarchiveRequest,
        handleDeleteRequest,
        handleDeleteOffer,
        filteredRequests,
        filteredOffers,
        handleSelectAll,
        handleSelectItem,
        handleBulkDelete,
        handleBulkPublish,
        handleBulkArchive,
        formatDate,
        getStatusBadge,
        searchTerm,
        setSearchTerm
    })
}