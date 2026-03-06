// components/Sidebar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

export default function Sidebar({ user, onLogout, darkMode, onToggleDarkMode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  // Загружаем количество непрочитанных уведомлений
  useEffect(() => {
    if (!user?.email) return

    const loadUnreadCount = () => {
      const storageKey = `notifications_${user.email}`
      const saved = localStorage.getItem(storageKey)

      if (saved) {
        try {
          const notifications = JSON.parse(saved)
          const unread = notifications.filter(n => !n.read).length
          setUnreadNotifications(unread)
        } catch (e) {
          console.error('Ошибка загрузки уведомлений:', e)
        }
      }
    }

    loadUnreadCount()

    // Слушаем событие обновления уведомлений
    const handleStorageChange = (e) => {
      if (e.key === `notifications_${user.email}`) {
        loadUnreadCount()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Также можно добавить кастомное событие для обновления в реальном времени
    const handleNotificationsUpdate = () => loadUnreadCount()
    window.addEventListener('notifications-updated', handleNotificationsUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('notifications-updated', handleNotificationsUpdate)
    }
  }, [user?.email])

  // Определяем правильный путь для заявок в зависимости от роли
  const getRequestsPath = () => {
    if (user?.role === 'customer') return '/customer'
    if (user?.role === 'supplier') return '/supplier'
    return '/admin/requests' // Для администратора своя страница заявок
  }

  // Определяем правильный путь для предложений в зависимости от роли
  const getOffersPath = () => {
    if (user?.role === 'customer') return '/customer'
    if (user?.role === 'supplier') return '/supplier/offers'
    return '/admin/offers' // Для администратора своя страница предложений
  }

  // Базовые пункты меню для всех пользователей
  const baseMenuItems = [
    {
      path: '/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 13H8V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 9H14V21H10V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 3H21V21H17V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: 'Главная'
    }
  ]

  // Пункты меню для заказчика
  const customerMenuItems = [
    {
      path: getRequestsPath(),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Заявки'
    }
  ]

  // Пункты меню для поставщика
  const supplierMenuItems = [
    {
      path: getRequestsPath(),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Заявки'
    },
    {
      path: '/supplier/materials',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Подбор материалов'
    },
    {
      path: '/supplier/balance',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6V18M8 9H16M8 15H16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Баланс'
    }
  ]

  // Пункты меню для администратора
  const adminMenuItems = [
    {
      path: '/admin',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Дашборд'
    },
    {
      path: '/admin/requests',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" />
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" />
          <path d="M10 9H8" stroke="currentColor" strokeWidth="2" />
          <circle cx="19" cy="19" r="3" fill="#EF4444" stroke="white" strokeWidth="2" />
          <path d="M19 17V19M19 21H19.01" stroke="white" strokeWidth="2" />
        </svg>
      ),
      label: 'Заявки',
      badge: '3' // Количество заявок на модерацию
    },
    {
      path: '/admin/offers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="currentColor" strokeWidth="2" />
          <circle cx="19" cy="19" r="3" fill="#EF4444" stroke="white" strokeWidth="2" />
          <path d="M19 17V19M19 21H19.01" stroke="white" strokeWidth="2" />
        </svg>
      ),
      label: 'Предложения',
      badge: '5' // Количество предложений на модерацию
    },
    {
      path: '/admin/users',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M3 18V17C3 13.7 5.7 11 9 11C12.3 11 15 13.7 15 17V18" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M21 17V16C21 14.1 19.9 12.5 18 12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Пользователи'
    },
    {
      path: '/admin/companies',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12H16M8 16H12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Компании'
    },
    {
      path: '/admin/settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Настройки'
    }
  ]

  // Определяем меню в зависимости от роли
  let menuItems = [...baseMenuItems]
  
  if (user?.role === 'customer') {
    menuItems = [...menuItems, ...customerMenuItems]
  } else if (user?.role === 'supplier') {
    menuItems = [...menuItems, ...supplierMenuItems]
  } else if (user?.role === 'admin') {
    menuItems = [...menuItems, ...adminMenuItems]
  }

  // Инструменты (доступны всем)
  const toolsItems = [
    {
      path: '/notifications',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" />
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Уведомления',
      onClick: () => navigate('/notifications'),
      badge: unreadNotifications > 0 ? unreadNotifications : null
    },
    {
      path: '/profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M19.4 15C18.9 16 18.2 16.9 17.4 17.6L19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 20L6.6 17.6C5.8 16.9 5.1 16 4.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 4V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 22V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Профиль',
      onClick: () => navigate('/profile')
    },
    {
      path: '/settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Настройки',
      onClick: () => navigate('/settings')
    },
  ]

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2>ЛОГО</h2>
        <button
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d={isCollapsed ? "M9 18L15 12L9 6" : "M15 18L9 12L15 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.userBadge}>
        <div className={styles.userAvatar}>
          {user?.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
        </div>
        {!isCollapsed && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.fullName || 'Пользователь'}</span>
            <span className={styles.userRole}>{user?.roleLabel || 'Исполнитель'}</span>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {user?.role === 'admin' ? 'АДМИНИСТРИРОВАНИЕ' : 'ОСНОВНОЕ'}
        </h3>
        <nav className={styles.nav}>
          {menuItems.map((item, index) => (
            item.path ? (
              <Link
                key={index}
                to={item.path}
                className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                  </>
                )}
                {isCollapsed && item.badge && <span className={styles.navBadgeCollapsed}>{item.badge}</span>}
              </Link>
            ) : null
          ))}
        </nav>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>ИНСТРУМЕНТЫ</h3>
        <div className={styles.tools}>
          {toolsItems.map((item, index) => (
            <button
              key={index}
              className={styles.toolItem}
              onClick={item.onClick}
            >
              <span className={styles.toolIcon}>{item.icon}</span>
              {!isCollapsed && <span className={styles.toolLabel}>{item.label}</span>}
              {item.badge && (
                <span className={styles.toolBadge}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.themeToggle} onClick={onToggleDarkMode}>
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2V4M12 20V22M4 12H2M20 12H22M6 6L4 4M18 6L20 4M6 18L4 20M18 18L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79C20.8427 14.1522 20.3344 15.4487 19.5363 16.5542C18.7381 17.6598 17.6817 18.5329 16.4555 19.087C15.2294 19.6411 13.882 19.8538 12.5454 19.7021C11.2088 19.5504 9.94194 19.0399 8.86528 18.2271C7.78862 17.4143 6.94402 16.3311 6.41929 15.0895C5.89457 13.8479 5.70948 12.4942 5.88394 11.1635C6.0584 9.83286 6.58624 8.57284 7.41009 7.50812C8.23394 6.4434 9.3215 5.61601 10.57 5.11523C9.94528 6.10375 9.59772 7.24126 9.56551 8.41055C9.5333 9.57984 9.81771 10.7349 10.3865 11.7574C10.9552 12.78 11.7845 13.627 12.7842 14.2036C13.7839 14.7802 14.9145 15.0623 16.058 15.0155C17.2015 14.9687 18.3059 14.5951 19.2557 13.9398C20.2055 13.2845 20.9582 12.3769 21.4241 11.3221C21.4241 11.3221 21.4241 12.79 21 12.79Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
          {!isCollapsed && <span>{darkMode ? 'Светлая тема' : 'Темная тема'}</span>}
        </button>

        <button className={styles.logoutButton} onClick={onLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {!isCollapsed && <span>Выйти</span>}
        </button>
        {!isCollapsed && (
          <div className={styles.version}>
            Версия 2.0.1
          </div>
        )}
      </div>
    </aside>
  )
}