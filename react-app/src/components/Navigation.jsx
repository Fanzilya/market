import { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import { NAVIGATION_CONFIG, ROUTES } from '../config/routes.js'

export default function Navigation() {
  const user = getSessionUser()
  const location = useLocation()
  const navigate = useNavigate()

  const PRIMARY_COLOR = '#1877F2'
  const PRIMARY_BG = '#1877F210'

  const styles = useMemo(
    () => ({
      sidebar: {
        width: 280,
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      },
      header: {
        padding: '24px 20px',
        borderBottom: '1px solid #e2e8f0',
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      },
      logoIcon: {
        width: 40,
        height: 40,
      },
      logoText: {
        fontSize: 24,
        fontWeight: 700,
        color: '#1a1a2e',
      },
      userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px',
        backgroundColor: PRIMARY_BG,
        borderRadius: 12,
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #0D5CB8 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
      },
      userInfoText: {
        flex: 1,
        minWidth: 0,
      },
      userName: {
        fontSize: 14,
        fontWeight: 600,
        color: '#1e293b',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      userRole: {
        fontSize: 12,
        color: '#64748b',
      },
      nav: {
        flex: 1,
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        overflowY: 'auto',
      },
      navItem: (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 10,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? PRIMARY_BG : 'transparent',
        color: isActive ? PRIMARY_COLOR : '#64748b',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
      }),
      navIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
      },
      footer: {
        padding: '16px 12px',
        borderTop: '1px solid #e2e8f0',
      },
      logoutButton: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 10,
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 500,
        color: '#ef4444',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
      mobileToggle: {
        display: 'none',
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 101,
        padding: '10px 12px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 10,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
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
    }),
    [PRIMARY_COLOR, PRIMARY_BG],
  )

  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const navigationItems = user?.role ? NAVIGATION_CONFIG[user.role] || [] : []

  const handleLogout = () => {
    signOut()
    navigate(ROUTES.LOGIN, { replace: true })
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
          .mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .overlay.show {
            display: block !important;
          }
        }
      `}</style>

      {/* Мобильная кнопка */}
      <button
        className="mobile-toggle"
        style={styles.mobileToggle}
        onClick={() => setIsMobileOpen(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Затемнение фона */}
      <div
        className={isMobileOpen ? 'overlay show' : 'overlay'}
        style={styles.overlay}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Сайдбар */}
      <aside
        className={`sidebar ${isMobileOpen ? 'open' : ''}`}
        style={styles.sidebar}
      >
        {/* Хедер */}
        <div style={styles.header}>
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
            <span style={styles.logoText}>Culters</span>
          </div>

          {/* Информация о пользователе */}
          {user && (
            <div style={styles.userInfo}>
              <div style={styles.avatar}>{initials}</div>
              <div style={styles.userInfoText}>
                <div style={styles.userName}>{user.fullName}</div>
                <div style={styles.userRole}>{user.roleLabel}</div>
              </div>
            </div>
          )}
        </div>

        {/* Навигация */}
        <nav style={styles.nav}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={styles.navItem(isActive)}
                onClick={() => setIsMobileOpen(false)}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span style={{ ...styles.navIcon, color: isActive ? PRIMARY_COLOR : '#94a3b8' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Футер с кнопкой выхода */}
        <div style={styles.footer}>
          <button
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fef2f2'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Выйти</span>
          </button>
        </div>
      </aside>
    </>
  )
}