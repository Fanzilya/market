// pages/SupplierPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import Navigation from '../components/Navigation.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import DataTable from '../components/DataTable.jsx'
import Pagination from '../components/Pagination.jsx'
import RequestDetailsModal from '../components/RequestDetailsModal.jsx'
import FreeClicksModal from '../components/FreeClicksModal.jsx'
import { listAllRequests } from '../data/requests.js'
import { createOffer, listOffersByRequestId } from '../data/offers.js'
import styles from './SupplierPage.module.css'

export default function SupplierPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  
  // Состояния
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [showFreeClicksModal, setShowFreeClicksModal] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' })
  const [darkMode, setDarkMode] = useState(false)
  const [freeClicksLeft, setFreeClicksLeft] = useState(5) // 5 бесплатных кликов
  
  const itemsPerPage = 15

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add(styles.darkMode)
    } else {
      document.body.classList.remove(styles.darkMode)
    }
  }, [darkMode])

  // Данные
  const requests = useMemo(() => {
    const _ = refreshKey
    return listAllRequests()
  }, [refreshKey])

  const myOffers = useMemo(() => {
    if (!user?.email) return []
    const _ = refreshKey
    return requests.flatMap(r => 
      listOffersByRequestId(r.id).filter(
        o => String(o.supplierEmail || '').toLowerCase() === user.email.toLowerCase()
      )
    )
  }, [requests, user?.email, refreshKey])

  // Фильтрация заявок
  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        request.id.toLowerCase().includes(query) ||
        request.govCustomerName.toLowerCase().includes(query) ||
        request.objectName.toLowerCase().includes(query)
      )
    })
  }, [requests, searchQuery])

  // Сортировка
  const sortedRequests = useMemo(() => {
    if (!sortConfig.key) return filteredRequests

    return [...filteredRequests].sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

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
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage)
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedRequests.slice(start, end)
  }, [sortedRequests, currentPage])

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleViewRequest = (request) => {
    // Проверяем, откликался ли уже исполнитель на эту заявку
    const hasOffer = myOffers.some(o => o.requestId === request.id)
    
    if (hasOffer) {
      // Если уже откликался - показываем детали
      setSelectedRequest(request)
      setIsDetailsModalOpen(true)
    } else {
      // Если не откликался - проверяем бесплатные клики
      if (freeClicksLeft > 0) {
        // Есть бесплатные клики
        setSelectedRequest(request)
        setShowFreeClicksModal(true)
      } else {
        // Бесплатные клики закончились - предложить оплатить
        navigate('/billing', { 
          state: { 
            message: 'Бесплатные клики закончились. Для просмотра заявок необходимо пополнить счет.' 
          } 
        })
      }
    }
  }

  const handleConfirmFreeClick = () => {
    // Уменьшаем количество бесплатных кликов
    setFreeClicksLeft(prev => prev - 1)
    setShowFreeClicksModal(false)
    setIsDetailsModalOpen(true)
    
    // Здесь можно добавить логику отметки о том, что исполнитель откликнулся
    // Например, создать черновик предложения или отметить просмотр
  }

  const handleCreateOffer = (offerData) => {
    createOffer({
      id: `OFFER-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      requestId: selectedRequest.id,
      supplierEmail: user.email,
      supplierFullName: user.fullName,
      supplierCompany: user.company?.name ?? '',
      ...offerData
    })
    
    setIsDetailsModalOpen(false)
    setSelectedRequest(null)
    setRefreshKey(prev => prev + 1)
  }

  const handleLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  // Колонки таблицы
  const columns = [
    {
      key: 'id',
      header: 'Номер заявки',
      sortable: true,
      width: '150px',
      render: (row) => (
        <span className={styles.idBadge}>{row.id}</span>
      )
    },
    {
      key: 'objectName',
      header: 'Название объекта',
      sortable: true,
      render: (row) => (
        <div className={styles.objectInfo}>
          <div className={styles.objectName}>{row.objectName}</div>
          <div className={styles.customerName}>{row.govCustomerName}</div>
        </div>
      )
    },
    {
      key: 'configType',
      header: 'Тип',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className={styles.typeBadge}>{row.configType || 'КНС'}</span>
      )
    },
    {
      key: 'createdAt',
      header: 'Дата',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className={styles.date}>
          {new Date(row.createdAt || Date.now()).toLocaleDateString('ru-RU')}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Статус',
      width: '120px',
      render: (row) => {
        const hasOffer = myOffers.some(o => o.requestId === row.id)
        return (
          <span className={`${styles.statusBadge} ${hasOffer ? styles.responded : styles.new}`}>
            {hasOffer ? 'Откликнулся' : 'Новая'}
          </span>
        )
      }
    },
    {
      key: 'action',
      header: '',
      width: '120px',
      render: (row) => {
        const hasOffer = myOffers.some(o => o.requestId === row.id)
        return (
          <button 
            className={`${styles.actionButton} ${hasOffer ? styles.viewButton : styles.respondButton}`}
            onClick={() => handleViewRequest(row)}
          >
            {hasOffer ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Просмотр
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Откликнуться
              </>
            )}
          </button>
        )
      }
    }
  ]

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
            <path d="M12 8V12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1" fill="#EF4444"/>
          </svg>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения</p>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar 
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Заявки</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb}>Главная</span>
              <span className={styles.separator}>›</span>
              <span className={styles.breadcrumbActive}>Заявки</span>
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.clicksCounter}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Бесплатных кликов: <strong>{freeClicksLeft}</strong></span>
            </div>
            <div className={styles.companyInfo}>
              <span className={styles.companyLabel}>Компания</span>
              <span className={styles.companyName}>{user.company?.name || 'Не указана'}</span>
            </div>
          </div>
        </div>

        <div className={styles.searchSection}>
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск по номеру, названию объекта, заказчику..."
          />
        </div>

        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Всего заявок:</span>
            <span className={styles.statValue}>{requests.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Мои отклики:</span>
            <span className={styles.statValue}>{myOffers.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Новых:</span>
            <span className={styles.statValue}>
              {requests.filter(r => !myOffers.some(o => o.requestId === r.id)).length}
            </span>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <DataTable
            columns={columns}
            data={paginatedRequests}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        <div className={styles.footer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={sortedRequests.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>

      {/* Модальное окно с деталями заявки */}
      {isDetailsModalOpen && selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          userEmail={user.email}
          hasOffer={myOffers.some(o => o.requestId === selectedRequest.id)}
          onSubmit={handleCreateOffer}
          onClose={() => {
            setIsDetailsModalOpen(false)
            setSelectedRequest(null)
          }}
        />
      )}

      {/* Модальное окно с информацией о бесплатных кликах */}
      {showFreeClicksModal && selectedRequest && (
        <FreeClicksModal
          clicksLeft={freeClicksLeft}
          onConfirm={handleConfirmFreeClick}
          onClose={() => setShowFreeClicksModal(false)}
          onGoToBilling={() => navigate('/billing')}
        />
      )}
    </div>
  )
}