// src/pages/SupplierPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccessDenied from './components/AccessDenied'
import Header from './components/Header'
import FiltersBar from './components/FiltersBar'
import StatsBar from './components/StatsBar'
import RequestsTable from './components/RequestsTable'
import RequestsGrid from './components/RequestsGrid'
import LogoutConfirmModal from './components/LogoutConfirmModal'
import useSupplierData from './hooks/useSupplierData'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import styles from './SupplierPage.module.css'
import { createColumns } from './config/tableColumns'
// import { requestListModel } from '../../features/supplier-request-list/request-list-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { RequestTableRow } from '@/moduls/personal-account/customer/widgets/request-list/request-table-row'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Icon from '@/shared/ui-kits/Icon'
import { useRequestListModel } from '../../features/supplier-request-list/useRequestListModel'
import EmptyState from '../../../../../shared/components/EmptyRequest/EmptyState'
import { RequestsupplierTableRow } from '@/moduls/personal-account/customer/widgets/request-list/request-supplier-table-row'


export const SupplierPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [freeClicksLeft, setFreeClicksLeft] = useState(5)

  const {
    filters,
    setFilters,
    paginatedRequests,
    stats,
    refreshData,
  } = useSupplierData({ user, freeClicksLeft, setFreeClicksLeft, navigate })

  // const { model, isLoader, init } = requestListModel

  const { requests, isLoading, onFavoriteAdd } = useRequestListModel()



  useEffect(() => {
    const handleFavoritesUpdate = () => refreshData()
    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate)
  }, [refreshData])

  return (
    <div className={styles.mainContent}>
      {/* <Header
        user={user}
        freeClicksLeft={freeClicksLeft}
        onNavigate={navigate}
      /> */}


      <AccountHeader
        title='Доступные заявки'
        breadcrumbs={{
          current: "Заявки",
          linksBack: [{ text: "Главная", link: "/dashboard" }]
        }}
        rightBlock={
          <div className={styles.headerRight}>
            <div className={styles.clicksCounter}>
              <Icon name='clock' color='#4A85F6' />
              <span>
                Бесплатных кликов: <strong>{freeClicksLeft}</strong>
              </span>
            </div>
            <div className={styles.companyInfo}>
              <span className={styles.companyLabel}>Компания</span>
              <span className={styles.companyName}>
                {user.company?.name || 'Не указана'}
              </span>
            </div>
          </div>
        }
      />

      <FiltersBar
        filters={filters}
        onFilterChange={setFilters}
        regions={stats.regions}
        types={stats.types}
      />

      <StatsBar stats={stats} freeClicksLeft={freeClicksLeft} />

      {isLoading ? <Loader /> :
        <>
          {requests.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <div className='grid grid-cols-[70px_1fr_1fr_1fr_1fr] justify-center items-center'>
                  {['ID', 'Тип', 'Дата', 'Статус', 'Действия'].map((item, key) => (
                    // 'КП', 
                    <div key={key} className={`${styles.th} flex justify-center text-center`}>{item}</div>
                  ))}
                </div>

                <div>
                  {requests.map((item, key) => (
                    <RequestsupplierTableRow
                      key={item.id || key}
                      gridClass='grid grid-cols-[70px__1fr_1fr_1fr_1fr]'
                      number={key + 1}
                      styles={styles}
                      item={item}
                      onFavoriteAdd={onFavoriteAdd}
                    />
                  ))}
                </div>
              </div>
            </div>
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