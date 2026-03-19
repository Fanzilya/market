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
import Loader from '@/shared/ui-kits/loader/loader'

export const ListRequest = () => {

  const { requests, isLoading, isError, errors, archiveRequest, statusChandeRequest } = useRequestsListData()
  const { statusFilter, setStatusFilter, getFilteredRequests, searchTerm, setSearchTerm } = useRequestsListPageUI()

  const filteredRequests = useMemo(() =>
    getFilteredRequests(requests),
    [requests, statusFilter, getFilteredRequests, searchTerm]
  )

  return (
    <>
      <AccountHeader title="Заявки" />

      <div className={styles.tabs}>
        <button
          key={10}
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


        <button
          key={11}
          className={`${styles.tab} ${statusFilter === "arhive" ? styles.tabActive : ''}`}
          onClick={() => setStatusFilter("arhive")}
        >
          В архиве
        </button>
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


      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className='grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] justify-center items-center'>
            {['ID', 'Объект', 'Заказчик', 'Тип', 'КП', 'Дата', 'Статус', 'Действия', 'Статус'].map((item, key) => (
              <div key={key} className={`px-3 py-4 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-200 whitespace-nowrap flex justify-center text-center`}>{item}</div>
            ))}
          </div>
          <div>

            {isLoading ? <Loader /> :
              filteredRequests.map((item, key) => (
                <RequestTableRow
                  key={item.id || key}
                  gridClass='grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]'
                  number={key + 1}
                  styles={styles}
                  item={item}
                  onArhiv={archiveRequest}
                  onChangeStatus={statusChandeRequest}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Контент */}
      {/* <div className={styles.content}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>№</th>
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
              {filteredRequests.map((request, index) => (
                <tr key={request.id} className={styles.tr}>
                  <td className={styles.td}> <span className={styles.idCell}>{request.innerId || index}</span></td>
                  <td className={styles.td}><span className={styles.objectCell}>{request.objectName}</span></td>
                  <td className={styles.td}>{request.customerName}</td>
                  <td className={styles.td}>КНС</td>
                  <td className={styles.td}>{RequestStatusTranslations[request.status]}</td>
                  <td className={styles.td}>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  )
}