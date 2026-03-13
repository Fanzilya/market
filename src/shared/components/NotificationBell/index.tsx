// components/NotificationBell.tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotificationBell.module.css'

export default function NotificationBell({ user }) {
  const [notifications, setNotifications] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Загружаем уведомления из localStorage при монтировании
  useEffect(() => {
    loadNotifications()

    // Проверяем новые уведомления каждые 30 секунд
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [user])

  // Закрываем дропдаун при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Загрузка уведомлений
  const loadNotifications = () => {
    if (!user?.email) return

    const storageKey = `notifications_${user.email}`
    const saved = localStorage.getItem(storageKey)

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setNotifications(parsed)
        setUnreadCount(parsed.filter(n => !n.read).length)
      } catch (e) {
        console.error('Ошибка загрузки уведомлений:', e)
      }
    } else {
      // Генерируем демо-уведомления при первом заходе
      generateDemoNotifications()
    }
  }

  // Генерация демо-уведомлений
  const generateDemoNotifications = () => {
    const isCustomer = user?.role === 'customer'
    const now = new Date()
    const demoNotifications = []

    if (isCustomer) {
      // Уведомления для заказчика
      demoNotifications.push(
        {
          id: 'notif1',
          type: 'new_offer',
          title: 'Новое коммерческое предложение',
          message: 'ООО "СтройИнжПроект" откликнулся на вашу заявку REQ-2024-001',
          requestId: 'REQ-2024-001',
          timestamp: new Date(now - 3600000).toISOString(), // 1 час назад
          read: false,
          important: true
        },
        {
          id: 'notif2',
          type: 'new_offer',
          title: 'Новое коммерческое предложение',
          message: 'ООО "ТехноСтрой" откликнулся на вашу заявку REQ-2024-002',
          requestId: 'REQ-2024-002',
          timestamp: new Date(now - 86400000).toISOString(), // 1 день назад
          read: false,
          important: false
        },
        {
          id: 'notif3',
          type: 'offer_updated',
          title: 'Обновление предложения',
          message: 'ИП "Петров" обновил свое предложение по заявке REQ-2024-001',
          requestId: 'REQ-2024-001',
          timestamp: new Date(now - 172800000).toISOString(), // 2 дня назад
          read: true
        }
      )
    } else {
      // Уведомления для исполнителя
      demoNotifications.push(
        {
          id: 'notif1',
          type: 'new_request',
          title: 'Новая заявка',
          message: 'Опубликована новая заявка REQ-2024-003 от ГУИС',
          requestId: 'REQ-2024-003',
          timestamp: new Date(now - 7200000).toISOString(), // 2 часа назад
          read: false,
          important: true
        },
        {
          id: 'notif2',
          type: 'new_request',
          title: 'Новая заявка',
          message: 'Опубликована новая заявка REQ-2024-004 от Мосводоканал',
          requestId: 'REQ-2024-004',
          timestamp: new Date(now - 172800000).toISOString(), // 2 дня назад
          read: false
        },
        {
          id: 'notif3',
          type: 'request_updated',
          title: 'Заявка обновлена',
          message: 'Заказчик уточнил параметры в заявке REQ-2024-001',
          requestId: 'REQ-2024-001',
          timestamp: new Date(now - 259200000).toISOString(), // 3 дня назад
          read: true
        }
      )
    }

    setNotifications(demoNotifications)
    setUnreadCount(demoNotifications.filter(n => !n.read).length)
    saveNotifications(demoNotifications)
  }

  // Сохранение уведомлений
  const saveNotifications = (notifs) => {
    if (!user?.email) return
    const storageKey = `notifications_${user.email}`
    localStorage.setItem(storageKey, JSON.stringify(notifs))
  }

  // Отметить уведомление как прочитанное
  const markAsRead = (notificationId) => {
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updated)
    setUnreadCount(updated.filter(n => !n.read).length)
    saveNotifications(updated)
  }

  // Отметить все как прочитанные
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    setUnreadCount(0)
    saveNotifications(updated)
  }

  // Обработка клика по уведомлению
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
    setShowDropdown(false)

    // Переход на соответствующую страницу
    if (notification.requestId) {
      if (user?.role === 'customer') {
        navigate(`/customer/request/${notification.requestId}`)
      } else {
        navigate(`/supplier/request/${notification.requestId}`)
      }
    }
  }

  // Форматирование времени
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} ${getWord(diffMins, ['минута', 'минуты', 'минут'])} назад`
    } else if (diffHours < 24) {
      return `${diffHours} ${getWord(diffHours, ['час', 'часа', 'часов'])} назад`
    } else if (diffDays < 7) {
      return `${diffDays} ${getWord(diffDays, ['день', 'дня', 'дней'])} назад`
    } else {
      return date.toLocaleDateString('ru-RU')
    }
  }

  const getWord = (number, words) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return words[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]]
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.bellButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" />
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" />
        </svg>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3 className={styles.title}>Уведомления</h3>
            {unreadCount > 0 && (
              <button
                className={styles.markAllButton}
                onClick={markAllAsRead}
              >
                Прочитать все
              </button>
            )}
          </div>

          <div className={styles.notificationsList}>
            {notifications.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p>Нет новых уведомлений</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div key={notification.id} className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''} ${notification.important ? styles.important : ''}`}
                // onClick={() => handleNotificationClick(notification)}
                >
                  <div className={styles.notificationIcon}>
                    {notification.type === 'new_offer' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#10B981' }}>
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                    {notification.type === 'new_request' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#4A85F6' }}>
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                    {notification.type === 'offer_updated' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#F59E0B' }}>
                        <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                    {notification.type === 'request_updated' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#8B5CF6' }}>
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
                        <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </div>
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationTitle}>{notification.title}</div>
                    <div className={styles.notificationMessage}>{notification.message}</div>
                    <div className={styles.notificationTime}>
                      {formatTime(notification.timestamp)}
                      {notification.important && (
                        <span className={styles.importantBadge}>Важно</span>
                      )}
                    </div>
                  </div>
                  {!notification.read && <span className={styles.unreadDot} />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}