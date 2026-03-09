// src/pages/SupplierPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccessDenied from './components/AccessDenied'
import Header from './components/Header'
import FiltersBar from './components/FiltersBar'
import StatsBar from './components/StatsBar'
import RequestsTable from './components/RequestsTable'
import LogoutConfirmModal from './components/LogoutConfirmModal'
import EmptyState from './components/EmptyState'
import useSupplierData from './hooks/useSupplierData'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import styles from './SupplierPage.module.css'

export const SupplierPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [freeClicksLeft, setFreeClicksLeft] = useState(5)

  const {
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
    refreshData,
    handleViewRequest
  } = useSupplierData({ user, freeClicksLeft, setFreeClicksLeft, navigate })

  const {
    favoriteRequests,
    handleToggleFavorite
  } = useFavorites({ user })

  useEffect(() => {
    const handleFavoritesUpdate = () => refreshData()
    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate)
  }, [refreshData])


  const confirmLogout = () => {
    // signOut() - импортировать из auth
    navigate('/', { replace: true })
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

      <div className={styles.tableContainer}>
        {paginatedRequests.length === 0 ? (
          <EmptyState />
        ) : (
          <RequestsTable
            requests={paginatedRequests}
            myOffers={myOffers}
            favoriteRequests={favoriteRequests}
            sortConfig={sortConfig}
            onSort={setSortConfig}
            onToggleFavorite={handleToggleFavorite}
            onViewRequest={handleViewRequest}
          />
        )}
      </div>

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
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />
    </div>
  )
}