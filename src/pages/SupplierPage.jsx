// pages/SupplierPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import Sidebar from '../components/Sidebar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import DataTable from '../components/DataTable.jsx'
import Pagination from '../components/Pagination.jsx'
import { listPublishedRequestsForSuppliers } from '../data/requests.js'
import { listOffersByRequestId } from '../data/offers.js'
import {
  getFavoriteRequests,
  addToFavorites,
  removeFromFavorites,
  isRequestFavorite
} from '../data/favorites.js'
import styles from './SupplierPage.module.css'

export default function SupplierPage() {
  const user = getSessionUser()
  const navigate = useNavigate()

  // Состояния
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all') // all, new, responded, favorites
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'publishedAt', direction: 'desc' })
  const [darkMode, setDarkMode] = useState(false)
  const [freeClicksLeft, setFreeClicksLeft] = useState(5)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [favoriteRequests, setFavoriteRequests] = useState([])

  const itemsPerPage = 15

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Слушаем обновления избранного
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      if (user?.email) {
        setFavoriteRequests(getFavoriteRequests(user.email))
      }
    }

    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate)
  }, [user])

  // Данные - только опубликованные заявки
  const requests = useMemo(() => {
    const _ = refreshKey
    return listPublishedRequestsForSuppliers()
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

  // Получаем уникальные регионы и типы для фильтров
  const regions = useMemo(() => {
    const allRegions = requests.map(r => r.region || 'Не указан')
    return ['all', ...new Set(allRegions)]
  }, [requests])

  const types = useMemo(() => {
    const allTypes = requests.map(r => r.configType || 'КНС')
    return ['all', ...new Set(allTypes)]
  }, [requests])

  // Фильтрация заявок
  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      // Поиск по тексту
      const matchesSearch = searchQuery === '' ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.govCustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.objectName.toLowerCase().includes(searchQuery.toLowerCase())

      // Фильтр по региону
      const matchesRegion = selectedRegion === 'all' || (request.region || 'Не указан') === selectedRegion

      // Фильтр по типу оборудования
      const matchesType = selectedType === 'all' || (request.configType || 'КНС') === selectedType

      // Фильтр по статусу
      const hasOffer = myOffers.some(o => o.requestId === request.id)
      const isFavorite = favoriteRequests.includes(request.id)

      let matchesStatus = true
      if (selectedStatus === 'new') {
        matchesStatus = !hasOffer
      } else if (selectedStatus === 'responded') {
        matchesStatus = hasOffer
      } else if (selectedStatus === 'favorites') {
        matchesStatus = isFavorite
      }

      return matchesSearch && matchesRegion && matchesType && matchesStatus
    })
  }, [requests, searchQuery, selectedRegion, selectedType, selectedStatus, myOffers, favoriteRequests])

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

  const handleToggleFavorite = (e, requestId) => {
    e.stopPropagation()

    if (!user?.email) return

    if (favoriteRequests.includes(requestId)) {
      removeFromFavorites(user.email, requestId)
    } else {
      addToFavorites(user.email, requestId)
    }
  }

  const handleViewRequest = (request) => {
    // Проверяем, откликался ли уже исполнитель на эту заявку
    const hasOffer = myOffers.some(o => o.requestId === request.id)

    if (hasOffer) {
      // Если уже откликался - переходим на страницу с полной информацией
      navigate(`/supplier/request/${request.id}/full`)
    } else {
      // Если не откликался - проверяем бесплатные клики
      if (freeClicksLeft > 0) {
        // Уменьшаем количество бесплатных кликов и переходим на страницу предпросмотра
        setFreeClicksLeft(prev => prev - 1)
        navigate(`/supplier/request/${request.id}/preview`, {
          state: { request }
        })
      } else {
        // Бесплатные клики закончились - предложить оплатить
        navigate('/supplier/balance', {
          state: {
            message: 'Бесплатные клики закончились. Для просмотра заявок необходимо пополнить счет.'
          }
        })
      }
    }
  }

  const handleLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  // Функция для получения технических характеристик (ограниченных)
  const getLimitedTechSpecs = (request) => {
    if (!request.kns) return []

    const specs = []

    // Показываем только базовые технические характеристики, без контактной информации
    if (request.kns.capacity) specs.push({ label: 'Производительность', value: `${request.kns.capacity} м³/ч` })
    if (request.kns.head) specs.push({ label: 'Напор', value: `${request.kns.head} м` })
    if (request.kns.workingPumps) specs.push({ label: 'Рабочих насосов', value: request.kns.workingPumps })
    if (request.kns.reservePumps) specs.push({ label: 'Резервных насосов', value: request.kns.reservePumps })
    if (request.kns.medium) specs.push({ label: 'Среда', value: request.kns.medium })
    if (request.kns.temperature) specs.push({ label: 'Температура', value: `${request.kns.temperature}°C` })
    if (request.kns.inletDiameter) specs.push({ label: 'Диаметр входа', value: `${request.kns.inletDiameter} мм` })
    if (request.kns.outletDiameter) specs.push({ label: 'Диаметр выхода', value: `${request.kns.outletDiameter} мм` })
    if (request.kns.stationDiameter) specs.push({ label: 'Диаметр станции', value: `${request.kns.stationDiameter} м` })
    if (request.kns.stationHeight) specs.push({ label: 'Высота станции', value: `${request.kns.stationHeight} м` })

    return specs
  }

  // Колонки таблицы
  const columns = [
    {
      key: 'favorite',
      header: '',
      width: '40px',
      render: (row) => {
        const isFavorite = favoriteRequests.includes(row.id)
        return (
          <button
            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
            onClick={(e) => handleToggleFavorite(e, row.id)}
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                fill={isFavorite ? 'currentColor' : 'none'}
              />
            </svg>
          </button>
        )
      }
    },
    {
      key: 'id',
      header: 'Номер заявки',
      sortable: true,
      width: '130px',
      render: (row) => (
        <span className={styles.idBadge}>{row.id}</span>
      )
    },
    {
      key: 'configType',
      header: 'Тип',
      width: '100px',
      render: (row) => (
        <span className={styles.typeBadge}>{row.configType || 'КНС'}</span>
      )
    },
    {
      key: 'region',
      header: 'Регион',
      width: '120px',
      render: (row) => (
        <span className={styles.regionBadge}>{row.region || 'Не указан'}</span>
      )
    },
    {
      key: 'techSpecs',
      header: 'Технические характеристики',
      render: (row) => {
        const specs = getLimitedTechSpecs(row)
        return (
          <div className={styles.techSpecsList}>
            {specs.length > 0 ? (
              specs.slice(0, 3).map((spec, idx) => (
                <div key={idx} className={styles.techSpecItem}>
                  <span className={styles.techSpecLabel}>{spec.label}:</span>
                  <span className={styles.techSpecValue}>{spec.value}</span>
                </div>
              ))
            ) : (
              <span className={styles.noSpecs}>Нет данных</span>
            )}
            {specs.length > 3 && (
              <span className={styles.moreSpecs}>+{specs.length - 3} еще</span>
            )}
          </div>
        )
      }
    },
    {
      key: 'publishedAt',
      header: 'Дата публикации',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className={styles.date}>
          {new Date(row.publishedAt || row.createdAt || Date.now()).toLocaleDateString('ru-RU')}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Статус',
      width: '100px',
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
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                Просмотр
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Предпросмотр
              </>
            )}
          </button>
        )
      }
    }
  ]

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения</p>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  // Если пользователь не поставщик, показываем ошибку
  if (user.role !== 'supplier') {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔒</div>
          <h2>Доступ запрещен</h2>
          <p>Эта страница доступна только поставщикам</p>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>
            Вернуться на главную
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
            <h1 className={styles.pageTitle}>Доступные заявки</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>›</span>
              <span className={styles.breadcrumbActive}>Заявки</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.clicksCounter}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Бесплатных кликов: <strong>{freeClicksLeft}</strong></span>
            </div>
            <div className={styles.companyInfo}>
              <span className={styles.companyLabel}>Компания</span>
              <span className={styles.companyName}>{user.company?.name || 'Не указана'}</span>
            </div>
          </div>
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.searchWrapper}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Поиск по номеру, названию объекта, заказчику..."
            />
          </div>

          <div className={styles.filterGroup}>
            <select
              className={styles.filterSelect}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">Все регионы</option>
              {regions.filter(r => r !== 'all').map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Все типы</option>
              {types.filter(t => t !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="responded">Откликнулся</option>
              <option value="favorites">Избранное</option>
            </select>
          </div>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Доступно заявок:</span>
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
          <div className={styles.stat}>
            <span className={styles.statLabel}>В избранном:</span>
            <span className={styles.statValue}>{favoriteRequests.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Осталось кликов:</span>
            <span className={styles.statValue}>{freeClicksLeft}</span>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {paginatedRequests.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2" />
                <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" />
              </svg>
              <h3>Нет доступных заявок</h3>
              <p>В данный момент нет опубликованных заявок</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={paginatedRequests}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          )}
        </div>

        {paginatedRequests.length > 0 && (
          <div className={styles.footer}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={sortedRequests.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>

      {/* Модальное окно подтверждения выхода */}
      {showLogoutConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>👋</div>
            <h3 className={styles.modalTitle}>Выйти из аккаунта?</h3>
            <p className={styles.modalMessage}>Вы будете перенаправлены на страницу входа</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowLogoutConfirm(false)}>
                Отмена
              </button>
              <button className={styles.modalConfirm} onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}