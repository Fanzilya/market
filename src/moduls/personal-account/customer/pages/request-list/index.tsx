// src/pages/CustomerPage.jsx
import { useAuth } from '@/features/user/context/context'
import { countOffersByRequestId } from '@/shared/data/offers'
import { archiveRequest, deleteRequest, getRequestStatusDisplay, listRequestsForCustomerEmail } from '@/shared/data/requests'
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./CustomerPage.module.css"
import Icon from '@/shared/ui-kits/Icon'
import { requestListModel } from '../../features/request-list/request-list-model'
import { CustomerData } from '../../features/request-list/model-data'
import { observer } from 'mobx-react-lite'
import Loader from '@/shared/ui-kits/loader/loader'
import { tabsButton } from '../../features/request-list/config'
import { Search } from '@/shared/ui-kits/Input/input-search'
import { ArchiveConfirmModal } from '../../widgets/request-list/archive-confirm-modal'
import { LogoutConfirmModal } from '../../widgets/request-list/logout-confirm-modal'
import { RequestTableRow } from '../../widgets/request-list/request-table-row'
import { Role } from '@/entities/user/role'

export const CustomerPage = observer(() => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [hoveredRow, setHoveredRow] = useState(null)

  const {
    itemsPerPage,
    showLogoutConfirm,
    setShowLogoutConfirm,
    showArchiveConfirm,
    setShowArchiveConfirm,
    currentPage,
    setCurrentPage,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    requests,
    filteredRequests,
    paginatedRequests,
    totalPages,
    confirmLogout,
    goToOffers,
    goToEditRequest,
    openArchiveConfirm,
    handleArchiveRequest,
    handleDeleteRequest,
    handleResubmit,

    getStatusText,
    goToCreateRequest
  } = CustomerData(styles)


  const {
    model,
    isLoader,
    init,
    stats,
  } = requestListModel

  useEffect(() => {
    init(user?.id)
  }, [])


  return (

    <>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Мои заявки</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>
              {user.role == Role.Customer ? 'Мои заявки' : 'Заявки'}
            </span>
          </div>
        </div>
      </div>

      {/* Карточка с заявками */}
      <div className={styles.requestsCard}>
        {/* Поиск и создание */}
        <div className={"flex items-center justify-between mb-[32px] gap-4"}>
          <Search placeholder='Поиск по ID, названию объекта...' value={searchQuery} onChange={setSearchQuery} />
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
          {tabsButton.map((item, key) => (
            <button
              key={key}
              className={`${styles.tab} ${selectedStatus === item.value ? styles.active : ''}`}
              onClick={() => setSelectedStatus(item.value)}
            >
              {item.name} <span className={styles.tabCount}>{stats[item.value]}</span>
            </button>
          ))}
        </div>

        {isLoader ? <Loader /> :
          <>
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
                    {model.map((item, key) => (
                      <RequestTableRow
                        number={++key}
                        styles={styles}
                        item={item}
                        goToOffers={goToOffers}
                        openArchiveConfirm={openArchiveConfirm}
                        goToEditRequest={goToEditRequest}
                        handleDeleteRequest={handleDeleteRequest}
                        handleResubmit={handleResubmit}
                      />
                    ))}
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
          </>
        }
      </div>

      {showArchiveConfirm && <ArchiveConfirmModal styles={styles} setShowArchiveConfirm={setShowArchiveConfirm} handleArchiveRequest={handleArchiveRequest} />}
      {showLogoutConfirm && <LogoutConfirmModal styles={styles} setShowLogoutConfirm={setShowLogoutConfirm} confirmLogout={confirmLogout} />}
    </>
  )
})