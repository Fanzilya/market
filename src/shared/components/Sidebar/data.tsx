import { Role } from "@/entities/user/role"
import { useAuth } from "@/features/user/context/context"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function getSadbarData() {

  const { user } = useAuth()
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  const isCustomer = user?.role === Role.Customer

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
    if (user?.role === Role.Customer) return '/customer/request'
    if (user?.role === Role.Supplier) return '/supplier'
    return '/admin/requests' // Для администратора своя страница заявок
  }

  // Базовые пункты меню для всех пользователей
  const baseMenuItems = [
    {
      path: user?.role === Role.Customer ? '/customer/dashboard' : (user?.role === Role.Admin ? '/admin/dashboard' : '/supplier/dashboard'),
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
    },
    {
      path: '/admin/scheme-setting',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Cхема'
    }
  ]

  // Инструменты (доступны всем)
  const toolsItems = [
    {
      link: user?.role === Role.Customer ? '/customer/notifications' : (user?.role === Role.Admin ? '/admin/notifications' : '/supplier/notifications'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" />
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Уведомления',
      badge: unreadNotifications > 0 ? unreadNotifications : null
    },
    {
      link: user?.role === Role.Customer ? '/customer/profile' : (user?.role === Role.Admin ? '/admin/profile' : '/supplier/profile'),
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
    },
    {
      link: user?.role === Role.Customer ? '/customer/settings' : (user?.role === Role.Admin ? '/admin/settings' : '/supplier/settings'),
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
    },
  ]

  // Определяем меню в зависимости от роли
  return ({ baseMenuItems, customerMenuItems, supplierMenuItems, adminMenuItems, toolsItems })
}