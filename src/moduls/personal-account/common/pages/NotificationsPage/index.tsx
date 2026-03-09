// pages/NotificationsPage.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotificationsPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { Role } from '@/entities/user/role'
import { getNotidicationsData } from '../../features/NotidicationsPage/model-data'
import { getIcon } from '../../features/DashboardPage/components'

export const NotificationsPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    loadNotifications,
    generateDemoNotifications,
    saveNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    filteredNotifications,
    unreadCount,
    importantCount,
    formatDate,
    notifications,  
    filter, setFilter } = getNotidicationsData()

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    loadNotifications()
  }, [])



  return (
    <>
      {/* Шапка страницы */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Уведомления</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Уведомления</span>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{notifications.length}</span>
            <span className={styles.statLabel}>Всего</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{unreadCount}</span>
            <span className={styles.statLabel}>Непрочитанных</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{importantCount}</span>
            <span className={styles.statLabel}>Важных</span>
          </div>
        </div>
      </div>

      {/* Фильтры и действия */}
      <div className={styles.filtersBar}>
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            className={`${styles.filterTab} ${filter === 'unread' ? styles.active : ''}`}
            onClick={() => setFilter('unread')}
          >
            Непрочитанные
          </button>
          <button
            className={`${styles.filterTab} ${filter === 'important' ? styles.active : ''}`}
            onClick={() => setFilter('important')}
          >
            Важные
          </button>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M1 12L5 16L9 12" stroke="currentColor" strokeWidth="2" />
              <path d="M15 12L19 16L23 12" stroke="currentColor" strokeWidth="2" />
              <path d="M8 7L12 11L16 7" stroke="currentColor" strokeWidth="2" />
            </svg>
            Прочитать все
          </button>
          <button
            className={`${styles.actionButton} ${styles.actionDelete}`}
            onClick={deleteAllRead}
            disabled={notifications.filter(n => n.read).length === 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" />
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" />
            </svg>
            Удалить прочитанные
          </button>
        </div>
      </div>

      {/* Список уведомлений */}
      <div className={styles.notificationsList}>
        {filteredNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2" />
              <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3>Нет уведомлений</h3>
            <p>Здесь будут отображаться ваши уведомления</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`${styles.notificationCard} ${!notification.read ? styles.unread : ''} ${notification.important ? styles.important : ''}`}
            >
              <div className={styles.notificationIcon}>
                {getIcon(notification.type)}
              </div>

              <div className={styles.notificationContent}>
                <div className={styles.notificationHeader}>
                  <h3 className={styles.notificationTitle}>{notification.title}</h3>
                  <span className={styles.notificationTime}>
                    {formatDate(notification.timestamp)}
                  </span>
                </div>

                <p className={styles.notificationMessage}>{notification.message}</p>

                <div className={styles.notificationFooter}>
                  {notification.requestId && (
                    <button
                      className={styles.viewButton}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (user?.role === Role.Customer) {
                          navigate(`/customer/request/${notification.requestId}`)
                        } else {
                          navigate(`/supplier/request/${notification.requestId}`)
                        }
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Перейти к заявке
                    </button>
                  )}

                  <div className={styles.notificationActions}>
                    {!notification.read && (
                      <button
                        className={styles.notificationAction}
                        onClick={() => markAsRead(notification.id)}
                        title="Отметить как прочитанное"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                    <button
                      className={`${styles.notificationAction} ${styles.deleteAction}`}
                      onClick={() => deleteNotification(notification.id)}
                      title="Удалить"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {notification.important && (
                <span className={styles.importantBadge}>Важно</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Пагинация (если нужно) */}
      {filteredNotifications.length > 10 && (
        <div className={styles.pagination}>
          <button className={styles.pageButton}>1</button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton}>3</button>
          <button className={styles.pageButton}>...</button>
          <button className={styles.pageButton}>10</button>
        </div>
      )}
    </>
  )
}