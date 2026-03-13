// src/pages/SupplierPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccessDenied from './components/AccessDenied'
import Header from './components/Header'
import FiltersBar from './components/FiltersBar'
import StatsBar from './components/StatsBar'
import RequestsTable from './components/RequestsTable'
import RequestsGrid from './components/RequestsGrid' // Новый компонент для карточек
import LogoutConfirmModal from './components/LogoutConfirmModal'
import EmptyState from './components/EmptyState'
import useSupplierData from './hooks/useSupplierData'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import styles from './SupplierPage.module.css'
import { createColumns } from './config/tableColumns'
import { requestListModel } from '../../features/supplier-request-list/request-list-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { RequestTableRow } from '@/moduls/personal-account/customer/widgets/request-list/request-table-row'


export const SupplierPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [freeClicksLeft, setFreeClicksLeft] = useState(5)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)

  // Отслеживание размера экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const {
    filters,
    setFilters,
    paginatedRequests,
    stats,
    refreshData,
  } = useSupplierData({ user, freeClicksLeft, setFreeClicksLeft, navigate })

  const { favoriteRequests, handleToggleFavorite } = useFavorites({ user })
  const { model, isLoader, init } = requestListModel

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    const handleFavoritesUpdate = () => refreshData()
    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate)
  }, [refreshData])

  // Функция для обработки клика по заявке
  const handleRequestClick = (requestId: string) => {
    navigate(`/supplier/request/${requestId}`)
  }

  return (
    <div className={styles.mainContent}>
      <Header
        user={user}
        freeClicksLeft={freeClicksLeft}
        onNavigate={navigate}
      />

      <FiltersBar
        filters={filters}
        onFilterChange={setFilters}
        regions={stats.regions}
        types={stats.types}
      />

      <StatsBar stats={stats} freeClicksLeft={freeClicksLeft} />

      {isLoader ? <Loader /> :
        <>
          {model.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Десктопная таблица */}
              {!isMobile && (
                <div className={styles.tableContainer}>
                  <div className={styles.table}>
                    <div className='grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] justify-center items-center'>
                      {['ID', 'Объект', 'Заказчик', 'Тип', 'КП', 'Дата', 'Статус', 'Действия'].map((item, key) => (
                        <div key={key} className={`${styles.th} flex justify-center text-center`}>{item}</div>
                      ))}
                    </div>

                    <div>
                      {model.map((item, key) => (
                        <RequestTableRow
                          key={item.id || key}
                          gridClass='grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]'
                          number={key + 1}
                          styles={styles}
                          item={item}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Мобильные карточки */}
              {isMobile && (
                <RequestsGrid
                  requests={model}
                  favoriteRequests={favoriteRequests}
                  onToggleFavorite={handleToggleFavorite}
                  onRequestClick={handleRequestClick}
                  freeClicksLeft={freeClicksLeft}
                />
              )}
            </>
          )}
        </>
      }


      {paginatedRequests.length > 0 && (
        <div className={styles.footer}>
          {/* <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
              totalItems={sortedRequests.length}
              itemsPerPage={pagination.itemsPerPage}
            /> */}
        </div>
      )}
    </div>
  )
}