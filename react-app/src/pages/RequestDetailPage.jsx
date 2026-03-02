// src/pages/RequestDetailPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { listRequestsForCustomerEmail, getRequestById } from '../data/requests.js'
import { listOffersByRequestId } from '../data/offers.js'

export default function RequestDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = getSessionUser()
  const [isMounted, setIsMounted] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY = '#1877F2'
  const PRIMARY_DARK = '#166FE5'
  const PRIMARY_LIGHT = '#EBF5FF'
  const PRIMARY_BORDER = '#1877F233'

  const request = useMemo(() => {
    if (!user?.email || !id) return null
    const _ = refreshKey
    return getRequestById(id) || listRequestsForCustomerEmail(user.email).find(r => r.id === id) || null
  }, [user?.email, id, refreshKey])

  const offers = useMemo(() => {
    if (!id) return []
    const _ = refreshKey
    return listOffersByRequestId(id)
  }, [id, refreshKey])

  const styles = useMemo(
    () => ({
      container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F4F7FE',
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
        padding: '24px 20px',
        borderBottom: '1px solid #E5E9F2',
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
      },
      logoIcon: {
        width: 40,
        height: 40,
      },
      logoText: {
        fontSize: 22,
        fontWeight: 700,
        color: '#1a1a2e',
      },
      companyInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        marginBottom: 16,
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
      mainContent: {
        flex: 1,
        marginLeft: 280,
        padding: 24,
        minHeight: '100vh',
      },
      topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16,
      },
      backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: '#64748b',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        transition: 'all 0.2s',
      },
      pageTitle: {
        fontSize: 24,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 4,
      },
      breadcrumb: {
        fontSize: 13,
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      breadcrumbLink: {
        color: '#64748b',
        textDecoration: 'none',
      },
      breadcrumbActive: {
        color: PRIMARY,
        fontWeight: 600,
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        padding: '24px',
        width: '100%',
      },
      requestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        paddingBottom: 20,
        borderBottom: '1px solid #E2E8F0',
        flexWrap: 'wrap',
        gap: 16,
      },
      requestId: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        backgroundColor: PRIMARY_LIGHT,
        color: PRIMARY,
        borderRadius: 20,
        fontSize: 14,
        fontWeight: 700,
      },
      requestStatus: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
      },
      statusActive: {
        backgroundColor: '#DCFCE7',
        color: '#16A34A',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
        marginBottom: 24,
      },
      infoCard: {
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#F8FAFC',
      },
      infoLabel: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 8,
      },
      infoValue: {
        fontSize: 14,
        color: '#1e293b',
        fontWeight: 600,
      },
      sectionTitle: {
        margin: '24px 0 16px 0',
        fontSize: 16,
        fontWeight: 700,
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      },
      offerCard: {
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: 18,
        backgroundColor: '#ffffff',
        transition: 'all 0.2s',
        marginBottom: 12,
      },
      offerCardHover: {
        borderColor: PRIMARY,
        boxShadow: `0 4px 12px ${PRIMARY}22`,
      },
      empty: {
        padding: '40px 20px',
        color: '#64748b',
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
      },
      actions: {
        display: 'flex',
        gap: 12,
        marginTop: 24,
        flexWrap: 'wrap',
      },
      button: {
        padding: '12px 24px',
        borderRadius: 12,
        border: 'none',
        background: PRIMARY,
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.25s',
        boxShadow: `0 4px 14px ${PRIMARY}44`,
      },
      buttonSecondary: {
        padding: '12px 24px',
        borderRadius: 12,
        border: '1px solid #E2E8F0',
        backgroundColor: '#ffffff',
        color: '#64748b',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.2s',
      },
      notFound: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 20,
      },
      mobileToggle: {
        display: 'none',
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 101,
        padding: '10px 12px',
        backgroundColor: '#ffffff',
        border: '1px solid #E2E8F0',
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
    [PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT, PRIMARY_BORDER],
  )

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('requests')
  const [hoveredOffer, setHoveredOffer] = useState(null)

  if (!user) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F7FE' }}>
        <div style={{ margin: 'auto', textAlign: 'center', padding: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Сессия не найдена</h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Пожалуйста, войдите в систему</p>
          <Link to="/" style={{ ...styles.button, textDecoration: 'none', display: 'inline-flex' }}>
            Перейти к входу
          </Link>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div style={styles.container}>
        <div style={styles.mainContent}>
          <div style={styles.notFound}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2"/>
              <path d="M8 12L11 14L16 9" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Заявка не найдена</h2>
              <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Возможно, она была удалена или не существует</p>
              <Link to="/customer" style={{ ...styles.button, textDecoration: 'none', display: 'inline-flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Вернуться к списку
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const offerCount = offers.length
  const hasOffers = offerCount > 0

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%) !important;
            transition: transform 0.3s ease !important;
          }
          .sidebar.open {
            transform: translateX(0) !important;
          }
          .main-content {
            margin-left: 0 !important;
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

      {/* Mobile Toggle */}
      <button
        className="mobile-toggle"
        style={styles.mobileToggle}
        onClick={() => setIsSidebarOpen(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={isSidebarOpen ? 'overlay show' : 'overlay'}
        style={styles.overlay}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={styles.sidebar}>
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

          <div style={styles.companyInfo}>
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
            <Link
              to="/dashboard"
              style={styles.navItem(activeNav === 'dashboard')}
              onClick={() => setActiveNav('dashboard')}
            >
              <span style={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.5697 21 20 21H4C3.43029 21 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Dashboard
            </Link>
          </div>

          <div style={styles.navGroup}>
            <div style={styles.navGroupTitle}>Заявки</div>
            <Link
              to="/customer"
              style={styles.navItem(activeNav === 'requests')}
              onClick={() => setActiveNav('requests')}
            >
              <span style={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Все заявки
            </Link>
          </div>

          <div style={styles.navGroup}>
            <div style={styles.navGroupTitle}>Tools</div>
            <Link
              to="/profile"
              style={styles.navItem(activeNav === 'profile')}
              onClick={() => setActiveNav('profile')}
            >
              <span style={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              Профиль
            </Link>
          </div>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>{initials}</div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{user.fullName}</div>
              <div style={styles.userRole}>{user.roleLabel}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content fade-in" style={styles.mainContent}>
        <div style={styles.topBar}>
          <div>
            <Link to="/customer" style={styles.backLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Назад к списку
            </Link>
            <h1 style={{ ...styles.pageTitle, marginTop: 12 }}>Заявка {request.id}</h1>
            <div style={styles.breadcrumb}>
              <Link to="/dashboard" style={styles.breadcrumbLink}>Dashboard</Link>
              <span>▶</span>
              <Link to="/customer" style={styles.breadcrumbLink}>Заявки</Link>
              <span>▶</span>
              <span style={styles.breadcrumbActive}>{request.id}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              style={styles.buttonSecondary}
              onClick={() => navigate('/customer')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Экспорт
            </button>
            <button style={styles.button}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Редактировать
            </button>
          </div>
        </div>

        <div style={styles.card}>
          {/* Header */}
          <div style={styles.requestHeader}>
            <div>
              <div style={styles.requestId}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {request.id}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ ...styles.requestStatus, ...(hasOffers ? styles.statusActive : { backgroundColor: '#FEF3C7', color: '#D97706' }) }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {hasOffers ? `${offerCount} КП получено` : 'Нет КП'}
              </span>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {new Date(request.createdAt).toLocaleString('ru-RU')}
              </span>
            </div>
          </div>

          {/* Основная информация */}
          <div style={styles.grid}>
            <InfoCard label="Название объекта" value={request.objectName} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.5697 21 20 21H4C3.43029 21 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } primary={PRIMARY} />
            <InfoCard label="Гос. заказчик" value={request.govCustomerName} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11C9.76142 11 12 8.76142 12 6C12 3.23858 9.76142 1 7 1C4.23858 1 2 3.23858 2 6C2 8.76142 4.23858 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } primary={PRIMARY} />
            <InfoCard label="Тип конфигурации" value={request.configType} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } primary={PRIMARY} />
            <InfoCard label="Контактное лицо" value={request.contactPerson} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            } primary={PRIMARY} />
            <InfoCard label="Телефон" value={request.contactPhone || '—'} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.83 21 20.67 21 20.5 21C10.62 21 2.5 12.88 2.5 3C2.5 2.83 2.5 2.67 2.51 2.5C2.57 1.94 3.02 1.5 3.58 1.5H6.58C7.17 1.5 7.68 1.91 7.78 2.49L8.28 5.36C8.38 5.92 8.14 6.49 7.67 6.81L5.94 8.01C7.34 10.79 9.64 13.09 12.42 14.49L13.62 12.76C13.94 12.29 14.51 12.05 15.07 12.15L17.94 12.65C18.52 12.75 18.93 13.26 18.93 13.85V16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } primary={PRIMARY} />
            <InfoCard label="Email" value={request.contactEmail} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            } primary={PRIMARY} />
          </div>

          {/* Конфигурация КНС */}
          {request.configType === 'КНС' && request.kns && (
            <>
              <div style={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Конфигурация КНС
              </div>
              <div style={styles.grid}>
                <InfoCard label="Производительность" value={request.kns.capacity || '—'} primary={PRIMARY} />
                <InfoCard label="Требуемый напор" value={request.kns.head || '—'} primary={PRIMARY} />
                <InfoCard label="Рабочих насосов" value={request.kns.workingPumps || '—'} primary={PRIMARY} />
                <InfoCard label="Резервных насосов" value={request.kns.reservePumps || '—'} primary={PRIMARY} />
                <InfoCard label="Перекачиваемая среда" value={request.kns.medium || '—'} primary={PRIMARY} />
                <InfoCard label="Температура среды" value={request.kns.temperature || '—'} primary={PRIMARY} />
                <InfoCard label="Взрывозащищенность" value={request.kns.explosionProof ? 'Да' : 'Нет'} primary={PRIMARY} />
              </div>

              {request.knsExtras && Object.values(request.knsExtras).some(v => v) && (
                <>
                  <div style={styles.sectionTitle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Доп. комплектация
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {Object.entries(request.knsExtras)
                      .filter(([, v]) => v)
                      .map(([k]) => (
                        <span key={k} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          backgroundColor: PRIMARY_LIGHT,
                          color: PRIMARY,
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {k}
                        </span>
                      ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Коммерческие предложения */}
          <div style={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Коммерческие предложения ({offerCount})
          </div>

          {offers.length === 0 ? (
            <div style={styles.empty}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2"/>
                <path d="M8 12L11 14L16 9" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ marginTop: 12 }}>
                <b>Пока нет коммерческих предложений</b>
                <p style={{ marginTop: 4, fontSize: 14 }}>Исполнители еще не отправили КП по этой заявке</p>
              </div>
            </div>
          ) : (
            <div>
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  primary={PRIMARY}
                  hovered={hoveredOffer === offer.id}
                  onHover={() => setHoveredOffer(offer.id)}
                  onLeave={() => setHoveredOffer(null)}
                />
              ))}
            </div>
          )}

          <div style={styles.actions}>
            <button
              style={styles.button}
              onClick={() => navigate('/customer')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Вернуться к списку
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function InfoCard({ label, value, icon, primary }) {
  return (
    <div style={{
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      padding: 16,
      backgroundColor: '#F8FAFC',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ color: primary }}>{icon}</span>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 600 }}>
        {value ?? '—'}
      </div>
    </div>
  )
}

function OfferCard({ offer, primary, hovered, onHover, onLeave }) {
  return (
    <div
      style={{
        ...{
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: 18,
          backgroundColor: '#ffffff',
          transition: 'all 0.2s',
        },
        ...(hovered ? { borderColor: primary, boxShadow: `0 4px 12px ${primary}22` } : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 21V7L13 3V21" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 21V11L13 7" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9V5" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {offer.supplierCompany || offer.supplierFullName || 'Исполнитель'}
          </span>
        </div>
        <div style={{ color: '#94A3B8', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {new Date(offer.createdAt).toLocaleString('ru-RU')}
        </div>
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{
          padding: '5px 12px',
          borderRadius: 6,
          backgroundColor: `${primary}15`,
          color: primary,
          fontSize: 12,
          fontWeight: 600,
        }}>
          Цена:
        </span>
        <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 16 }}>
          {offer.price || '—'}
        </span>
      </div>
      {offer.comment && (
        <div style={{ marginTop: 12, padding: '12px 14px', backgroundColor: '#F8FAFC', borderRadius: 10 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Комментарий:</span>
          <div style={{ marginTop: 6, fontSize: 13, color: '#475569', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {offer.comment}
          </div>
        </div>
      )}
    </div>
  )
}