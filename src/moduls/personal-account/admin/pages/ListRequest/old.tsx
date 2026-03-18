// src/pages/AdminPage.tsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ListRequest.module.css'
import Icon from '@/shared/ui-kits/Icon'
import { Search } from '@/shared/ui-kits/Input/input-search'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import { RequestStatus, RequestStatusTranslations, tabsButton } from '@/entities/request/config'
import { useRequestsListData } from '../../features/ListRequest/useRequestsListData'
import { useRequestsListPageUI } from '../../features/ListRequest/useRequestsListPageUI'
import { RequestTableRow } from '@/moduls/personal-account/customer/widgets/request-list/request-table-row'

export const ListRequest = () => {

  const { requests, isLoading, isError, errors } = useRequestsListData()
  const { statusFilter, setStatusFilter, getFilteredRequests, searchTerm, setSearchTerm } = useRequestsListPageUI()

  const filteredRequests = useMemo(() =>
    getFilteredRequests(requests),
    [requests, statusFilter, getFilteredRequests, searchTerm]
  )

  if (isLoading) return <div>Загрузка</div>

  return (
    <>
      <AccountHeader title="Заявки" />

      <div className={styles.tabs}>
        <button
          key={999}
          className={`${styles.tab} ${statusFilter === "all" ? styles.tabActive : ''}`}
          onClick={() => setStatusFilter("all")}
        >
          Все
        </button>

        {Object.keys(RequestStatus)
          .filter(item => !isNaN(Number(item)))
          .map((item, key) => (
            <button
              key={key}
              className={`${styles.tab} ${statusFilter == item ? styles.tabActive : ''}`}
              onClick={() => setStatusFilter(item)}
            >
              {RequestStatusTranslations[item]}
              {/* {item.name} <span className={styles.tabCount}>{RequestStatusTranslations[item]}</span> */}
            </button>
          ))}
      </div>

      <div className='flex gap-3 mb-3'>
        <Search value={searchTerm} onChange={setSearchTerm} />
        {/* <div className={`${styles.bulkActions} bg-white`}>
          <div className="text-[14px] font-medium text-[#1E293B] flex">Выбрано: <span className='inline-block text-center min-w-[20px] mx-1'>{selectedItems.length}</span></div>
          {activeTab === 'requests' && (
            <>
              <button
                className={`${styles.bulkPublishButton} ${selectedItems.length == 0 && "!bg-gray-500"}`}
                disabled={selectedItems.length == 0 ? true : false}
                onClick={handleBulkPublish}
              >
                Опубликовать
              </button>
              <button
                className={`${styles.bulkArchiveButton} ${selectedItems.length == 0 && "!bg-gray-500"}`}
                disabled={selectedItems.length == 0 ? true : false}
                onClick={handleBulkArchive}
              >
                В архив
              </button>
            </>
          )}
          <button
            className={`${styles.bulkDeleteButton} ${selectedItems.length == 0 && "!bg-gray-500"}`}
            disabled={selectedItems.length == 0 ? true : false}
            onClick={handleBulkDelete}
          >
            Удалить
          </button>
        </div> */}
      </div>



      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th className={styles.th} style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={filteredRequests.length === filteredRequests.length && filteredRequests.length > 0}
                    // onChange={() => handleSelectAll('requests')}
                    className={styles.checkbox}
                  />
                </th> */}

                <th className={styles.th}>№</th>
                <th className={styles.th}>Объект</th>
                <th className={styles.th}>Заказчик</th>
                <th className={styles.th}>Тип телефона</th>
                <th className={styles.th}>КП</th>
                <th className={styles.th}>Дата</th>
                <th className={styles.th}>Статус</th>
                <th className={styles.th}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={request.id} className={styles.tr}>
                  {/* <td className={styles.td}>
                    <input
                      type="checkbox"
                      // checked={selectedItems.includes(request.id)}
                      // onChange={() => handleSelectItem(request.id)}
                      className={styles.checkbox}
                    />
                  </td> */}
                  <td className={styles.td}>
                    <span className={styles.idCell}>{request.innerId || index}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.objectCell}>{request.objectName}</span>
                  </td>
                  <td className={styles.td}>{request.phoneNumber}</td>
                  <td className={styles.td}>{RequestStatusTranslations[request.status]}</td>

                  <td className={styles.td}>

                    {/* <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => {
                          setCurrentRequest(request)
                          setShowRequestDetails(true)
                        }}
                        title="Просмотр"
                      >
                        <Icon name="view" />
                      </button>

                      {!request.archived && request.status !== 'published' && (
                        <button
                          className={styles.actionButton}
                          onClick={() => handlePublishRequest(request.id)}
                          title="Опубликовать"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>
                      )}

                      {!request.archived ? (
                        <button
                          className={styles.actionButton}
                          onClick={() => handleArchiveRequest(request.id)}
                          title="В архив"
                        >
                          <Icon name="archive" />
                        </button>
                      ) : (
                        <button
                          className={styles.actionButton}
                          onClick={() => handleUnarchiveRequest(request.id)}
                          title="Восстановить"
                        >
                          <Icon name="recover" />
                        </button>
                      )}

                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteRequest(request.id)}
                        title="Удалить"
                      >
                        <Icon name="delete" />
                      </button>
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}