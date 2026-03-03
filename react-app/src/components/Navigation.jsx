// src/components/Navigation.jsx
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'

export default function Navigation({ isOpen, onClose }) {
  const user = getSessionUser()
  const location = useLocation()

  const PRIMARY = '#1877F2'
  const PRIMARY_DARK = '#166FE5'
  const PRIMARY_LIGHT = '#EBF5FF'

  const [activeNav, setActiveNav] = useState(() => {
    if (location.pathname.includes('dashboard')) return 'dashboard'
    if (location.pathname.includes('customer')) return 'requests'
    if (location.pathname.includes('supplier')) return 'supplier'
    if (location.pathname.includes('profile')) return 'profile'
    if (location.pathname.includes('settings')) return 'settings'
    return 'dashboard'
  })

  const styles = useMemo(
    () => ({
      overlay: {
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 99,
      },
      sidebar: {
        width: 280,
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #E5E9F2',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      },
      sidebarHeader: {
        padding: '20px',
        borderBottom: '1px solid #E5E9F2',
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
      },
      logoIcon: {
        width: 36,
        height: 36,
      },
      logoText: {
        fontSize: 20,
        fontWeight: 700,
        color: '#1a1a2e',
      },
      companyCard: {
        padding: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #E5E9F2',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      },
      companyIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FEF2F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#EF4444',
        fontSize: 12,
        fontWeight: 700,
      },
      companyText: {
        flex: 1,
      },
      companyName: {
        fontSize: 13,
        fontWeight: 600,
        color: '#1e293b',
      },
      companyLabel: {
        fontSize: 11,
        color: '#64748b',
      },
      navSection: {
        padding: '16px 12px',
        flex: 1,
        overflowY: 'auto',
      },
      navGroup: {
        marginBottom: 24,
      },
      navGroupTitle: {
        fontSize: 11,
        fontWeight: 600,
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 12,
        paddingLeft: 12,
      },
      navItem: (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 10,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? PRIMARY_LIGHT : 'transparent',
        color: isActive ? PRIMARY : '#64748b',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
        marginBottom: 4,
      }),
      navIcon: {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      navCount: {
        marginLeft: 'auto',
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: '#E2E8F0',
        color: '#64748b',
        padding: '2px 8px',
        borderRadius: 10,
      },
      navCountActive: {
        backgroundColor: PRIMARY,
        color: '#ffffff',
      },
      sidebarFooter: {
        padding: '16px 12px',
        borderTop: '1px solid #E5E9F2',
      },
      userProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      userProfileHover: {
        backgroundColor: '#F8FAFC',
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
      },
      userInfo: {
        flex: 1,
      },
      userName: {
        fontSize: 14,
        fontWeight: 600,
        color: '#1e293b',
      },
      userRole: {
        fontSize: 12,
        color: '#64748b',
      },
      collapseButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        border: '1px solid #E2E8F0',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        position: 'absolute',
        right: 20,
        top: 20,
      },
    }),
    [PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT],
  )

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [hoveredProfile, setHoveredProfile] = useState(false)

  const customerNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', active: 'dashboard' },
    { path: '/customer', label: 'Все заявки', icon: 'requests', active: 'requests', count: true },
    { path: '/customer', label: 'С КП', icon: 'with-offers', active: 'with-offers', count: true },
    { path: '/customer', label: 'Без КП', icon: 'no-offers', active: 'no-offers', count: true },
    { path: '/profile', label: 'Профиль', icon: 'profile', active: 'profile' },
    { path: '/settings', label: 'Настройки', icon: 'settings', active: 'settings' },
  ]

  const supplierNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', active: 'dashboard' },
    { path: '/supplier', label: 'Кабинет исполнителя', icon: 'supplier', active: 'supplier' },
    { path: '/profile', label: 'Профиль', icon: 'profile', active: 'profile' },
    { path: '/settings', label: 'Настройки', icon: 'settings', active: 'settings' },
  ]

  const navItems = user?.role === 'customer' ? customerNavItems : supplierNavItems

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          </svg>
        )
      case 'requests':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'with-offers':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'no-offers':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'profile':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="8" r="2" fill="currentColor"/>
            <path d="M12 14C14.2091 14 16 15.7909 16 18V20H8V18C8 15.7909 9.79086 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'settings':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'supplier':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%) !important;
            transition: transform 0.3s ease !important;
          }
          .sidebar.open {
            transform: translateX(0) !important;
          }
          .overlay.show {
            display: block !important;
          }
        }
      `}</style>

      <div className={isOpen ? 'overlay show' : 'overlay'} style={styles.overlay} onClick={onClose} />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <svg style={styles.logoIcon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)"/>
              <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7"/>
              <defs>
                <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981"/>
                  <stop offset="1" stopColor="#1877F2"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1877F2"/>
                  <stop offset="1" stopColor="#0D5CB8"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={styles.logoText}>Logo</span>
          </div>

          <div style={styles.companyCard}>
            <div style={styles.companyIcon}>KS</div>
            <div style={styles.companyText}>
              <div style={styles.companyName}>Kanky Store</div>
              <div style={styles.companyLabel}>Company</div>
            </div>
          </div>
        </div>

        <nav style={styles.navSection}>
          <div style={styles.navGroup}>
            <div style={styles.navGroupTitle}>General</div>
            {navItems.filter(item => item.icon === 'dashboard').map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={styles.navItem(activeNav === item.active)}
                onClick={() => { setActiveNav(item.active); onClose?.() }}
              >
                <span style={styles.navIcon}>{getIcon(item.icon)}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div style={styles.navGroup}>
            <div style={styles.navGroupTitle}>Заявки</div>
            {navItems.filter(item => ['requests', 'with-offers', 'no-offers'].includes(item.icon)).map((item) => (
              <Link
                key={item.path + item.label}
                to={item.path}
                style={styles.navItem(activeNav === item.active)}
                onClick={() => { setActiveNav(item.active); onClose?.() }}
              >
                <span style={styles.navIcon}>{getIcon(item.icon)}</span>
                {item.label}
                {item.count && (
                  <span style={{ ...styles.navCount, ...(activeNav === item.active ? styles.navCountActive : {}) }}>
                    0
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div style={styles.navGroup}>
            <div style={styles.navGroupTitle}>Tools</div>
            {navItems.filter(item => ['profile', 'settings'].includes(item.icon)).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={styles.navItem(activeNav === item.active)}
                onClick={() => { setActiveNav(item.active); onClose?.() }}
              >
                <span style={styles.navIcon}>{getIcon(item.icon)}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div style={styles.sidebarFooter}>
          <div
            style={{ ...styles.userProfile, ...(hoveredProfile ? styles.userProfileHover : {}) }}
            onMouseEnter={() => setHoveredProfile(true)}
            onMouseLeave={() => setHoveredProfile(false)}
          >
            <div style={styles.avatar}>{initials}</div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{user?.fullName || 'Пользователь'}</div>
              <div style={styles.userRole}>{user?.roleLabel || 'Роль'}</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </aside>
    </>
  )
}