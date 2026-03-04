// pages/NotificationsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './NotificationsPage.module.css'

export const NotificationsPage = ()=> {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all') // all, unread, important

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
    loadNotifications()
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const loadNotifications = () => {
    if (!user?.email) return
    
    const storageKey = `notifications_${user.email}`
    const saved = localStorage.getItem(storageKey)
    
    if (saved) {
      try {
        setNotifications(JSON.parse(saved))
      } catch (e) {
        console.error('Ошибка загрузки уведомлений:', e)
      }
    } else {
      // Генерируем демо-уведомления
      generateDemoNotifications()
    }
  }

  const generateDemoNotifications = () => {
    const isCustomer = user?.role === 'customer'
    const now = new Date()
    const demoNotifications = []
    
    if (isCustomer) {
      // Уведомления для заказчика
      for (let i = 1; i <= 15; i++) {
        demoNotifications.push({
          id: `notif${i}`,
          type: i % 3 === 0 ? 'offer_updated' : 'new_offer',
          title: i % 3 === 0 ? 'Обновление предложения' : 'Новое коммерческое предложение',
          message: i % 3 === 0 
            ? `Исполнитель ${i} обновил свое предложение по заявке REQ-2024-00${i}`
            : `ООО "Компания ${i}" откликнулся на вашу заявку REQ-2024-00${i}`,
          requestId: `REQ-2024-00${i}`,
          timestamp: new Date(now - i * 3600000).toISOString(),
          read: i > 5,
          important: i <= 2
        })
      }
    } else {
      // Уведомления для исполнителя
      for (let i = 1; i <= 15; i++) {
        demoNotifications.push({
          id: `notif${i}`,
          type: i % 4 === 0 ? 'request_updated' : 'new_request',
          title: i % 4 === 0 ? 'Заявка обновлена' : 'Новая заявка',
          message: i % 4 === 0
            ? `Заказчик уточнил параметры в заявке REQ-2024-00${i}`
            : `Опубликована новая заявка REQ-2024-00${i} от ${i % 2 === 0 ? 'ГУИС' : 'Мосводоканал'}`,
          requestId: `REQ-2024-00${i}`,
          timestamp: new Date(now - i * 3600000).toISOString(),
          read: i > 5,
          important: i <= 2
        })
      }
    }
    
    setNotifications(demoNotifications)
    saveNotifications(demoNotifications)
  }

  const saveNotifications = (notifs) => {
    if (!user?.email) return
    const storageKey = `notifications_${user.email}`
    localStorage.setItem(storageKey, JSON.stringify(notifs))
  }

  const markAsRead = (notificationId) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updated)
    saveNotifications(updated)
  }

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    saveNotifications(updated)
  }

  const deleteNotification = (notificationId) => {
    const updated = notifications.filter(n => n.id !== notificationId)
    setNotifications(updated)
    saveNotifications(updated)
  }

  const deleteAllRead = () => {
    const updated = notifications.filter(n => !n.read)
    setNotifications(updated)
    saveNotifications(updated)
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'important') return n.important
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const importantCount = notifications.filter(n => n.important).length

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffDays === 0) {
      return `Сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffDays === 1) {
      return `Вчера в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    }
  }

  const getIcon = (type) => {
    switch(type) {
      case 'new_offer':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#10B981' }}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'new_request':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#4A85F6' }}>
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'offer_updated':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#F59E0B' }}>
            <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'request_updated':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#8B5CF6' }}>
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2"/>
            <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      default:
        return null
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
        onLogout={() => navigate('/')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
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
                <path d="M1 12L5 16L9 12" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 12L19 16L23 12" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 7L12 11L16 7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Прочитать все
            </button>
            <button 
              className={`${styles.actionButton} ${styles.actionDelete}`}
              onClick={deleteAllRead}
              disabled={notifications.filter(n => n.read).length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2"/>
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
                <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
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
                          if (user?.role === 'customer') {
                            navigate(`/customer/request/${notification.requestId}`)
                          } else {
                            navigate(`/supplier/request/${notification.requestId}`)
                          }
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
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
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      )}
                      <button 
                        className={`${styles.notificationAction} ${styles.deleteAction}`}
                        onClick={() => deleteNotification(notification.id)}
                        title="Удалить"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2"/>
                          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
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
      </main>
    </div>
  )
}