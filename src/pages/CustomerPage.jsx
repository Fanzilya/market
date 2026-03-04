// src/pages/CustomerPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import { listRequestsForCustomerEmail, archiveRequest } from '../data/requests.js'
import { countOffersByRequestId } from '../data/offers.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './CustomerPage.module.css'

export default function CustomerPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)
  const [selectedRequestForArchive, setSelectedRequestForArchive] = useState(null)
  const itemsPerPage = 10

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

  const requests = useMemo(() => {
    if (!user?.email) return []
    const _ = refreshKey
    return listRequestsForCustomerEmail(user.email)
  }, [user?.email, refreshKey])

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchesSearch = r.objectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
      const offerCount = countOffersByRequestId(r.id)
      const matchesStatus = selectedStatus === 'all' ||
        (selectedStatus === 'with-offers' && offerCount > 0) ||
        (selectedStatus === 'no-offers' && offerCount === 0) ||
        (selectedStatus === 'archived' && r.archived === true)
      return matchesSearch && matchesStatus
    })
  }, [requests, searchQuery, selectedStatus])

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredRequests.slice(start, end)
  }, [filteredRequests, currentPage])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

  const stats = useMemo(() => ({
    total: requests.length,
    withOffers: requests.filter(r => countOffersByRequestId(r.id) > 0).length,
    noOffers: requests.filter(r => countOffersByRequestId(r.id) === 0 && !r.archived).length,
    archived: requests.filter(r => r.archived === true).length,
  }), [requests])

  const onLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  // Функция для перехода на страницу создания заявки
  const goToCreateRequest = () => {
    navigate('/customer/request/new')
  }

  // Функция для перехода на страницу просмотра КП
  const goToOffers = (requestId) => {
    navigate(`/customer/request/${requestId}/offers`)
  }

  // Функция для перехода на страницу редактирования заявки (только если нет КП)
  const goToEditRequest = (requestId, offerCount, e) => {
    e.stopPropagation()
    if (offerCount === 0) {
      navigate(`/customer/request/${requestId}/edit`)
    } else {
      alert('Редактирование невозможно: на заявку уже получены коммерческие предложения')
    }
  }

  // Функция для открытия модального окна архивации
  const openArchiveConfirm = (requestId, offerCount, e) => {
    e.stopPropagation()
    if (offerCount > 0) {
      setSelectedRequestForArchive(requestId)
      setShowArchiveConfirm(true)
    }
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

  // Функция для удаления заявки (только если нет КП)
  const handleDeleteRequest = (requestId, offerCount, e) => {
    e.stopPropagation()
    if (offerCount === 0) {
      if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
        // Здесь будет логика удаления
        console.log('Удаление заявки:', requestId)
        setRefreshKey(prev => prev + 1)
      }
    } else {
      alert('Удаление невозможно: на заявку уже получены коммерческие предложения. Вы можете отправить заявку в архив.')
    }
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения.</p>
          <button onClick={() => navigate('/login')} className={styles.primaryButton}>
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
        onLogout={onLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        {/* Шапка страницы */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Мои заявки</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>Заявки</span>
            </div>
          </div>

        </div>

        {/* Карточка с заявками */}
        <div className={styles.requestsCard}>
          {/* Поиск */}
          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" />
              </svg>
              <input
                type="text"
                placeholder="Поиск по ID, названию объекта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.headerActions}>
              <button
                className={styles.createButton}
                onClick={goToCreateRequest}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19" stroke="white" strokeWidth="2" />
                  <path d="M5 12H19" stroke="white" strokeWidth="2" />
                </svg>
                Создать заявку
              </button>
            </div>

          </div>

          {/* Табы статусов */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${selectedStatus === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedStatus('all')}
            >
              Все <span className={styles.tabCount}>{stats.total}</span>
            </button>
            <button
              className={`${styles.tab} ${selectedStatus === 'with-offers' ? styles.active : ''}`}
              onClick={() => setSelectedStatus('with-offers')}
            >
              С КП <span className={styles.tabCount}>{stats.withOffers}</span>
            </button>
            <button
              className={`${styles.tab} ${selectedStatus === 'no-offers' ? styles.active : ''}`}
              onClick={() => setSelectedStatus('no-offers')}
            >
              Без КП <span className={styles.tabCount}>{stats.noOffers}</span>
            </button>
            <button
              className={`${styles.tab} ${selectedStatus === 'archived' ? styles.active : ''}`}
              onClick={() => setSelectedStatus('archived')}
            >
              Архив <span className={styles.tabCount}>{stats.archived}</span>
            </button>
          </div>

          {/* Таблица заявок */}
          <div className={styles.tableContainer}>
            {filteredRequests.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M9 12H15" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M12 9V15" stroke="#CBD5E1" strokeWidth="2" />
                </svg>
                <div className={styles.emptyText}>
                  {requests.length === 0 ? (
                    <>
                      Заявок пока нет. <button className={styles.emptyLink} onClick={goToCreateRequest}>Создать заявку</button>
                    </>
                  ) : (
                    'По вашему запросу ничего не найдено'
                  )}
                </div>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Объект</th>
                    <th className={styles.th}>Заказчик</th>
                    <th className={styles.th}>Тип</th>
                    <th className={styles.th}>КП</th>
                    <th className={styles.th}>Дата</th>
                    <th className={styles.th}>Статус</th>
                    <th className={styles.th}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((r) => {
                    const offerCount = countOffersByRequestId(r.id)
                    const isArchived = r.archived === true

                    return (
                      <tr
                        key={r.id}
                        className={`${styles.tr} ${hoveredRow === r.id ? styles.trHover : ''} ${isArchived ? styles.trArchived : ''}`}
                        onMouseEnter={() => setHoveredRow(r.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onClick={() => navigate(`/customer/request/${r.id}`)}
                      >
                        <td className={styles.td}>
                          <span className={styles.idBadge}>{r.id}</span>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.requestLink}>
                            {r.objectName}
                          </span>
                        </td>
                        <td className={styles.td}>{r.govCustomerName}</td>
                        <td className={styles.td}>
                          <span className={styles.typeBadge}>{r.configType}</span>
                        </td>
                        <td className={styles.td}>
                          {offerCount === 0 ? (
                            <span className={styles.noOffers}>—</span>
                          ) : (
                            <span
                              className={styles.offerBadge}
                              onClick={(e) => {
                                e.stopPropagation()
                                goToOffers(r.id)
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" />
                              </svg>
                              {offerCount}
                            </span>
                          )}
                        </td>
                        <td className={styles.td}>
                          <span className={styles.date}>
                            {new Date(r.createdAt).toLocaleDateString('ru-RU')}
                          </span>
                        </td>
                        <td className={styles.td}>
                          {isArchived ? (
                            <span className={`${styles.statusBadge} ${styles.statusArchived}`}>
                              В архиве
                            </span>
                          ) : (
                            <span className={`${styles.statusBadge} ${offerCount > 0 ? styles.statusSuccess : styles.statusWarning}`}>
                              {offerCount > 0 ? 'Есть КП' : 'Нет КП'}
                            </span>
                          )}
                        </td>
                        <td className={styles.td}>
                          <div className={styles.actions}>
                            <button
                              className={styles.actionButton}
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/customer/request/${r.id}`)
                              }}
                              title="Просмотр"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </button>

                            {!isArchived && (
                              <>
                                <button
                                  className={styles.actionButton}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    goToOffers(r.id)
                                  }}
                                  title="Просмотр КП"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </button>

                                <button
                                  className={`${styles.actionButton} ${offerCount > 0 ? styles.actionDisabled : ''}`}
                                  onClick={(e) => goToEditRequest(r.id, offerCount, e)}
                                  title={offerCount > 0 ? "Редактирование недоступно (есть КП)" : "Редактировать"}
                                  disabled={offerCount > 0}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
                                    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </button>

                                {offerCount > 0 && (
                                  <button
                                    className={`${styles.actionButton} ${styles.actionArchive}`}
                                    onClick={(e) => openArchiveConfirm(r.id, offerCount, e)}
                                    title="Отправить в архив"
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
                                      <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
                                      <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                  </button>
                                )}

                                <button
                                  className={`${styles.actionButton} ${offerCount > 0 ? styles.actionDisabled : styles.actionDelete}`}
                                  onClick={(e) => handleDeleteRequest(r.id, offerCount, e)}
                                  title={offerCount > 0 ? "Удаление недоступно (есть КП)" : "Удалить"}
                                  disabled={offerCount > 0}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Пагинация */}
          {filteredRequests.length > 0 && (
            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Показано {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredRequests.length)} из {filteredRequests.length}
              </div>
              <div className={styles.paginationControls}>
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`${styles.pageButton} ${currentPage === pageNum ? styles.pageButtonActive : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Модальное окно подтверждения архивации */}
      {showArchiveConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowArchiveConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>📦</div>
            <h3 className={styles.modalTitle}>Отправить в архив?</h3>
            <p className={styles.modalMessage}>
              Заявка будет перемещена в архив. Вы сможете просматривать её, но не сможете редактировать.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowArchiveConfirm(false)}>
                Отмена
              </button>
              <button className={styles.modalConfirm} onClick={handleArchiveRequest}>
                Отправить в архив
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button className={styles.modalConfirm} onClick={confirmLogout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}