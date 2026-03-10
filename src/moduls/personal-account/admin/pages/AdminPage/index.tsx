// src/pages/AdminPage.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AdminPage.module.css'
import { AdminPageDataModel } from '../../features/AdminPage/model-data'
import Icon from '@/shared/ui-kits/Icon'

export const AdminPage = () => {
  const navigate = useNavigate()
  const [showRequestDetails, setShowRequestDetails] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)

  const {
    activeTab,
    setActiveTab,
    requests,
    offers,
    users,
    statusFilter,
    setStatusFilter,
    selectedItems,
    setSelectedItems,
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
  } = AdminPageDataModel(styles)


  return (
    <>
      <div className={styles.container}>
        {/* Шапка страницы */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Управление</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/admin')}>Главная</span>
              <span className={styles.separator}>›</span>
              <span className={styles.current}>
                {activeTab === 'requests' ? 'Заявки' : activeTab === 'offers' ? 'Предложения' : 'Пользователи'}
              </span>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{requests.length}</span>
              <span className={styles.statLabel}>Всего заявок</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{requests.filter(r => !r.archived && r.status === 'active').length}</span>
              <span className={styles.statLabel}>На модерации</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{offers.length}</span>
              <span className={styles.statLabel}>Предложений</span>
            </div>
          </div>
        </div>

        {/* Табы */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'requests' ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab('requests'); setSelectedItems([]); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            Заявки
            {requests.filter(r => !r.archived && r.status === 'active').length > 0 && (
              <span className={styles.tabBadge}>{requests.filter(r => !r.archived && r.status === 'active').length}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'offers' ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab('offers'); setSelectedItems([]); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            Предложения
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab('users'); setSelectedItems([]); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M3 18V17C3 13.7 5.7 11 9 11C12.3 11 15 13.7 15 17V18" stroke="currentColor" strokeWidth="2" />
            </svg>
            Пользователи
          </button>
        </div>

        {/* Панель действий */}
        <div className={styles.actionBar}>
          <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {activeTab === 'requests' && (
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Все заявки</option>
              <option value="active">На модерации</option>
              <option value="published">Опубликованные</option>
              <option value="archived">В архиве</option>
            </select>
          )}

          {selectedItems.length > 0 && (
            <div className={styles.bulkActions}>
              <span className={styles.selectedCount}>Выбрано: {selectedItems.length}</span>
              {activeTab === 'requests' && (
                <>
                  <button
                    className={styles.bulkPublishButton}
                    onClick={handleBulkPublish}
                  >
                    Опубликовать
                  </button>
                  <button
                    className={styles.bulkArchiveButton}
                    onClick={handleBulkArchive}
                  >
                    В архив
                  </button>
                </>
              )}
              <button
                className={styles.bulkDeleteButton}
                onClick={handleBulkDelete}
              >
                Удалить
              </button>
            </div>
          )}
        </div>

        {/* Контент */}
        <div className={styles.content}>
          {/* Заявки */}
          {activeTab === 'requests' && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th} style={{ width: '40px' }}>
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredRequests.length && filteredRequests.length > 0}
                        onChange={() => handleSelectAll('requests')}
                        className={styles.checkbox}
                      />
                    </th>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Объект</th>
                    <th className={styles.th}>Заказчик</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Статус</th>
                    <th className={styles.th}>Дата</th>
                    <th className={styles.th}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(request => (
                    <tr key={request.id} className={styles.tr}>
                      <td className={styles.td}>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(request.id)}
                          onChange={() => handleSelectItem(request.id)}
                          className={styles.checkbox}
                        />
                      </td>
                      <td className={styles.td}>
                        <span className={styles.idCell}>{request.id}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.objectCell}>{request.objectName}</span>
                      </td>
                      <td className={styles.td}>{request.govCustomerName || request.customerFullName}</td>
                      <td className={styles.td}>{request.customerEmail}</td>
                      <td className={styles.td}>{getStatusBadge(request)}</td>
                      <td className={styles.td}>{formatDate(request.createdAt)}</td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.actionButton}
                            onClick={() => {
                              setCurrentRequest(request)
                              setShowRequestDetails(true)
                            }}
                            title="Просмотр"
                          >
                            <Icon name="view"/>
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
                              <Icon name="archive"/>
                            </button>
                          ) : (
                            <button
                              className={styles.actionButton}
                              onClick={() => handleUnarchiveRequest(request.id)}
                              title="Восстановить"
                            >
                              <Icon name="recover"/>
                            </button>
                          )}

                          <button
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            onClick={() => handleDeleteRequest(request.id)}
                            title="Удалить"
                          >
                            <Icon name="delete"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Предложения */}
          {activeTab === 'offers' && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th} style={{ width: '40px' }}>
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredOffers.length && filteredOffers.length > 0}
                        onChange={() => handleSelectAll('offers')}
                        className={styles.checkbox}
                      />
                    </th>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Поставщик</th>
                    <th className={styles.th}>Заявка</th>
                    <th className={styles.th}>Стоимость</th>
                    <th className={styles.th}>Дата</th>
                    <th className={styles.th}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffers.map(offer => (
                    <tr key={offer.id} className={styles.tr}>
                      <td className={styles.td}>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(offer.id)}
                          onChange={() => handleSelectItem(offer.id)}
                          className={styles.checkbox}
                        />
                      </td>
                      <td className={styles.td}>
                        <span className={styles.idCell}>{offer.id}</span>
                      </td>
                      <td className={styles.td}>{offer.supplierCompany || offer.supplierFullName}</td>
                      <td className={styles.td}>{offer.requestId}</td>
                      <td className={styles.td}>
                        <span className={styles.priceCell}>
                          {new Intl.NumberFormat('ru-RU').format(offer.price)} ₽
                        </span>
                      </td>
                      <td className={styles.td}>{formatDate(offer.createdAt)}</td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.actionButton}
                            onClick={() => navigate(`/admin/offer/${offer.id}`)}
                            title="Просмотр"
                          >
                            <Icon name="view"/>
                          </button>
                          <button
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            onClick={() => handleDeleteOffer(offer.id)}
                            title="Удалить"
                          >
                            <Icon name="delete"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Пользователи */}
          {activeTab === 'users' && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Пользователь</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Роль</th>
                    <th className={styles.th}>Телефон</th>
                    <th className={styles.th}>Компания</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>
                        <div className={styles.userCell}>
                          <div className={styles.userAvatar}>
                            {user.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <span>{user.fullName}</span>
                        </div>
                      </td>
                      <td className={styles.td}>{user.email}</td>
                      <td className={styles.td}>
                        <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.roleAdmin : user.role === 'customer' ? styles.roleCustomer : styles.roleSupplier}`}>
                          {user.roleLabel}
                        </span>
                      </td>
                      <td className={styles.td}>{user.phone}</td>
                      <td className={styles.td}>{user.company?.name || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Модальное окно деталей заявки */}
        {showRequestDetails && currentRequest && (
          <div className={styles.modalOverlay} onClick={() => setShowRequestDetails(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Детали заявки {currentRequest.id}</h2>
                <button
                  className={styles.modalClose}
                  onClick={() => setShowRequestDetails(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>ID заявки</span>
                    <span className={styles.detailValue}>{currentRequest.id}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Дата создания</span>
                    <span className={styles.detailValue}>{formatDate(currentRequest.createdAt)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Объект</span>
                    <span className={styles.detailValue}>{currentRequest.objectName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Заказчик</span>
                    <span className={styles.detailValue}>{currentRequest.govCustomerName || currentRequest.customerFullName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>{currentRequest.customerEmail}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Тип</span>
                    <span className={styles.detailValue}>{currentRequest.configType || 'КНС'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Статус</span>
                    <span className={styles.detailValue}>{getStatusBadge(currentRequest)}</span>
                  </div>
                </div>

                {currentRequest.kns && (
                  <>
                    <h3 className={styles.modalSubtitle}>Параметры КНС</h3>
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Производительность</span>
                        <span className={styles.detailValue}>{currentRequest.kns.capacity} м³/ч</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Напор</span>
                        <span className={styles.detailValue}>{currentRequest.kns.head} м</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Рабочих насосов</span>
                        <span className={styles.detailValue}>{currentRequest.kns.workingPumps}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Резервных насосов</span>
                        <span className={styles.detailValue}>{currentRequest.kns.reservePumps}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowRequestDetails(false)}
                >
                  Закрыть
                </button>
                {!currentRequest.archived && currentRequest.status !== 'published' && (
                  <button
                    className={styles.submitButton}
                    onClick={() => {
                      handlePublishRequest(currentRequest.id)
                      setShowRequestDetails(false)
                    }}
                  >
                    Опубликовать
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}