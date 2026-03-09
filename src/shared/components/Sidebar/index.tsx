// components/Sidebar.tsx
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useAuth } from '@/features/user/context/context'
import { Role } from '@/entities/user/role'
import { getSadbarData } from './data'
import { observer } from 'mobx-react-lite'

export const Sidebar = observer(() => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { baseMenuItems, customerMenuItems, supplierMenuItems, adminMenuItems, toolsItems } = getSadbarData()

  let menuItems = [...baseMenuItems]
  if (user?.role === Role.Customer) {
    menuItems = [...menuItems, ...customerMenuItems]
  } else if (user?.role === Role.Supplier) {
    menuItems = [...menuItems, ...supplierMenuItems]
  } else if (user?.role === Role.Admin) {
    menuItems = [...menuItems, ...adminMenuItems]
  }

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
          {user?.role === Role.Admin ? 'АДМИНИСТРИРОВАНИЕ' : 'ОСНОВНОЕ'}
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
            <NavLink to={item.link}
              key={index}
              className={styles.toolItem}
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

      <div className={styles.footer}>
        <button className={styles.logoutButton} onClick={signOut}>
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
})