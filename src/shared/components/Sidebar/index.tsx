// components/Sidebar.tsx
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useAuth } from '@/features/user/context/context'
import { Role } from '@/entities/user/role'
import { getSadbarData } from './data'
import { observer } from 'mobx-react-lite'
import Logo from "../../../../public/logo.svg"
import Icon from '@/shared/ui-kits/Icon'

interface Props {
  isCollapsed: boolean,
  setIsCollapsed: (value: boolean) => void,
}

// Функция для получения отображаемой роли
const getRoleDisplay = (role?: Role, roleLabel?: string) => {
  if (role === Role.Supplier) return 'Исполнитель'
  if (role === Role.Customer) return 'Заказчик'
  return roleLabel || 'Исполнитель'
}

export const Sidebar = observer(({ isCollapsed, setIsCollapsed }: Props) => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  const { baseMenuItems, customerMenuItems, supplierMenuItems, adminMenuItems, toolsItems } = getSadbarData()

  // Проверка размера экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Блокировка прокрутки при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Формируем меню на основе роли
  let menuItems = [...baseMenuItems]
  if (user?.role === Role.Customer) {
    menuItems = [...menuItems, ...customerMenuItems]
  } else if (user?.role === Role.Supplier) {
    menuItems = [...menuItems, ...supplierMenuItems]
  } else if (user?.role === Role.Admin) {
    menuItems = adminMenuItems
  }

  // Фильтруем только элементы с path
  const validMenuItems = menuItems.filter(item => item.path)
  const validToolsItems = toolsItems.filter(item => item.link)

  // Берем первые 4 пункта для мобильной навигации
  const mobileNavItems = validMenuItems.slice(0, 4)

  const handleMobileNavClick = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    signOut()
    setIsMobileMenuOpen(false)
  }

  // Если это мобильное устройство, показываем нижнюю навигацию
  if (isMobile) {
    return (
      <>
        {/* Нижняя навигация */}
        <nav className={styles.mobileBottomNav}>
          <ul className={styles.mobileNavItems}>
            {mobileNavItems.map((item) => (
              <li key={item.path}>
                <button
                  className={`${styles.mobileNavItem} ${location.pathname === item.path ? styles.active : ''}`}
                  onClick={() => handleMobileNavClick(item.path || '')}
                >
                  <span className={styles.mobileNavIcon}>
                    {item.icon}
                    {item.badge && <span className={styles.mobileNavBadge}>{item.badge}</span>}
                  </span>
                  <span className={styles.mobileNavLabel}>{item.label}</span>
                </button>
              </li>
            ))}

            {/* Кнопка открытия полного меню */}
            <li key="menu-button">
              <button
                className={styles.mobileNavItem}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className={styles.mobileNavIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                  </svg>
                </span>
                <span className={styles.mobileNavLabel}>Меню</span>
              </button>
            </li>
          </ul>
        </nav>



        {/* Затемнение фона */}
        <div
          className={`${styles.mobileSidebarOverlay} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Полное мобильное меню */}
        <div className={`${styles.mobileSidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileSidebarHeader}>
            <div className={styles.mobileSidebarLogo}>
              <img src={Logo} alt="КликПроект" />
              <span>КликПроект</span>
            </div>
            <button
              className={styles.mobileSidebarClose}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileSidebarContent}>
            {/* Информация о пользователе */}
            <div className={styles.mobileSidebarUser}>
              <div className={styles.mobileSidebarUserAvatar}>
                {user?.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <div className={styles.mobileSidebarUserInfo}>
                <span className={styles.mobileSidebarUserName}>{user?.fullName || 'Пользователь'}</span>
                <span className={styles.mobileSidebarUserRole}>
                  {getRoleDisplay(user?.role, user?.roleLabel)}
                </span>
              </div>
            </div>

            {/* Основное меню */}
            <div className={styles.mobileSidebarSection}>
              <h3 className={styles.mobileSidebarSectionTitle}>
                {user?.role === Role.Admin ? 'Администрирование' : 'Основное'}
              </h3>
              {validMenuItems.map((item) => (
                item.path && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles.mobileSidebarNavItem} ${location.pathname === item.path ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={styles.mobileSidebarNavIcon}>{item.icon}</span>
                    <span className={styles.mobileSidebarNavLabel}>{item.label}</span>
                    {item.badge && <span className={styles.mobileSidebarBadge}>{item.badge}</span>}
                  </Link>
                )
              ))}
            </div>

            {/* Инструменты */}


            {user?.role != Role.Admin && validToolsItems.length > 0 && (
              <div className={styles.mobileSidebarSection}>
                <h3 className={styles.mobileSidebarSectionTitle}>Инструменты</h3>
                {validToolsItems.map((item) => (
                  <NavLink
                    key={item.link}
                    to={item.link}
                    className={`${styles.mobileSidebarNavItem} ${location.pathname === item.link ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={styles.mobileSidebarNavIcon}>{item.icon}</span>
                    <span className={styles.mobileSidebarNavLabel}>{item.label}</span>
                    {item.badge && <span className={styles.mobileSidebarBadge}>{item.badge}</span>}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Кнопка выхода */}
            <button className={styles.mobileSidebarLogout} onClick={handleLogout}>
              <Icon name='logout' />
              <span>Выйти</span>
            </button>


          </div>
        </div>
      </>
    )
  }

  // Десктопная версия
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img
            src={Logo}
            alt="КликПроект"
            className={styles.logoImage}
          />
        </div>
        <h2 className={styles.logoText}>КликПроект</h2>
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
            <span className={styles.userRole}>
              {getRoleDisplay(user?.role, user?.roleLabel)}
            </span>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {user?.role === Role.Admin ? 'АДМИНИСТРИРОВАНИЕ' : 'ОСНОВНОЕ'}
        </h3>
        <nav className={styles.nav}>
          {validMenuItems.map((item) => (
            <Link
              key={item.path}
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
          ))}
        </nav>
      </div>

      {user?.role != Role.Admin && validToolsItems.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>ИНСТРУМЕНТЫ</h3>
          <div className={styles.tools}>
            {validToolsItems.map((item) => (
              <NavLink
                to={item.link}
                key={item.link}
                className={`${styles.toolItem} ${location.pathname === item.link ? styles.active : ''}`}
              >
                <span className={styles.toolIcon}>{item.icon}</span>
                {!isCollapsed && <span className={styles.toolLabel}>{item.label}</span>}
                {item.badge && (
                  <span className={styles.toolBadge}>{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <button className={styles.logoutButton} onClick={signOut}>
          <Icon name='logout' />
          {!isCollapsed && <span>Выйти</span>}
        </button>

      </div>
    </aside>
  )
})