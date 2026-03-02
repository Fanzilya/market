import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import Modal from '../components/Modal.jsx'
import { createRequest, listRequestsForCustomerEmail } from '../data/requests.js'
import { countOffersByRequestId, listOffersByRequestId } from '../data/offers.js'
import ProfileSettings from '../components/ProfileSettings.jsx'

export default function CustomerPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('requests')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY = '#1877F2'
  const PRIMARY_DARK = '#166FE5'
  const PRIMARY_LIGHT = '#EBF5FF'
  const PRIMARY_BORDER = '#1877F233'

  const requests = useMemo(() => {
    if (!user?.email) return []
    const _ = refreshKey
    return listRequestsForCustomerEmail(user.email)
  }, [user?.email, refreshKey])

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchesSearch = r.objectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           r.id.toLowerCase().includes(searchQuery.toLowerCase())
      const offerCount = countOffersByRequestId(r.id)
      const matchesStatus = selectedStatus === 'all' ||
                           (selectedStatus === 'with-offers' && offerCount > 0) ||
                           (selectedStatus === 'no-offers' && offerCount === 0)
      return matchesSearch && matchesStatus
    })
  }, [requests, searchQuery, selectedStatus])

  const selectedRequest = useMemo(() => {
    if (!selectedRequestId) return null
    return requests.find((r) => r.id === selectedRequestId) ?? null
  }, [requests, selectedRequestId])

  const selectedOffers = useMemo(() => {
    if (!selectedRequestId) return []
    const _ = refreshKey
    return listOffersByRequestId(selectedRequestId)
  }, [selectedRequestId, refreshKey])

  const stats = useMemo(() => ({
    total: requests.length,
    withOffers: requests.filter(r => countOffersByRequestId(r.id) > 0).length,
    noOffers: requests.filter(r => countOffersByRequestId(r.id) === 0).length,
  }), [requests])

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
      searchBar: {
        display: 'flex',
        gap: 12,
        marginBottom: 20,
        flexWrap: 'wrap',
      },
      searchInput: {
        flex: 1,
        minWidth: 250,
        padding: '12px 16px',
        borderRadius: 12,
        border: '1px solid #E2E8F0',
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#F8FAFC',
      },
      searchInputFocus: {
        borderColor: PRIMARY,
        backgroundColor: '#ffffff',
        boxShadow: `0 0 0 3px ${PRIMARY}22`,
      },
      filterButton: {
        padding: '12px 20px',
        borderRadius: 12,
        border: '1px solid #E2E8F0',
        backgroundColor: '#ffffff',
        color: '#64748b',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.2s',
      },
      exportButton: {
        padding: '12px 20px',
        borderRadius: 12,
        border: '1px solid #E2E8F0',
        backgroundColor: '#ffffff',
        color: '#64748b',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.2s',
      },
      createButton: {
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
      tabs: {
        display: 'flex',
        gap: 8,
        marginBottom: 20,
        backgroundColor: '#F1F5F9',
        padding: '6px',
        borderRadius: 12,
        overflowX: 'auto',
      },
      tab: (isActive) => ({
        padding: '10px 20px',
        borderRadius: 10,
        border: 'none',
        backgroundColor: isActive ? '#ffffff' : 'transparent',
        color: isActive ? PRIMARY : '#64748b',
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
      }),
      tableWrap: {
        border: '1px solid #E2E8F0',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
      },
      th: {
        textAlign: 'left',
        fontSize: 12,
        color: '#64748b',
        fontWeight: 600,
        padding: '16px 20px',
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
      td: {
        padding: '16px 20px',
        borderBottom: '1px solid #F1F5F9',
        fontSize: 14,
        color: '#1e293b',
        verticalAlign: 'middle',
      },
      trClickable: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
      trHover: {
        backgroundColor: PRIMARY_LIGHT,
      },
      pill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      },
      pillPrimary: {
        backgroundColor: PRIMARY_LIGHT,
        color: PRIMARY,
      },
      pillSuccess: {
        backgroundColor: '#DCFCE7',
        color: '#16A34A',
      },
      pillWarning: {
        backgroundColor: '#FEF3C7',
        color: '#D97706',
      },
      empty: {
        padding: '60px 20px',
        color: '#64748b',
        fontSize: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      },
      pagination: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
        gap: 16,
      },
      paginationInfo: {
        fontSize: 13,
        color: '#64748b',
      },
      paginationControls: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      },
      pageButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        border: '1px solid #E2E8F0',
        backgroundColor: '#ffffff',
        color: '#64748b',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
      },
      pageButtonActive: {
        backgroundColor: PRIMARY,
        color: '#ffffff',
        borderColor: PRIMARY,
      },
      actionButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        border: '1px solid #E2E8F0',
        backgroundColor: '#ffffff',
        color: '#64748b',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        marginRight: 4,
      },
      logoutConfirm: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      },
      logoutModal: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: '32px',
        maxWidth: 400,
        width: '90%',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
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
      spinner: {
        width: 16,
        height: 16,
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      },
    }),
    [isMounted, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT, PRIMARY_BORDER],
  )

  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isCreateHovered, setIsCreateHovered] = useState(false)

  const onLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  const onCreated = () => {
    setIsCreateOpen(false)
    setRefreshKey((x) => x + 1)
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F7FE' }}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.5s ease forwards;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="fade-in" style={{ ...styles.card, margin: 'auto', maxWidth: 500 }}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: 80,
              height: 80,
              margin: '0 auto 24px',
              borderRadius: 20,
              background: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FECACA"/>
                <path d="M12 7V13" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="17" r="1.5" fill="#DC2626"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Сессия не найдена</h2>
            <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Пожалуйста, войдите в систему для продолжения.</p>
            <Link to="/" style={{ ...styles.createButton, textDecoration: 'none', display: 'inline-flex' }}>
              Перейти к входу
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
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

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div style={styles.logoutConfirm} onClick={() => setShowLogoutConfirm(false)}>
          <div style={styles.logoutModal} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                margin: '0 auto 16px',
                borderRadius: 16,
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3H5C3.89543 3 3 3.89543 3 5V21C3 22.1046 3.89543 23 5 23H9" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 17L21 12L16 7" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 12, textAlign: 'center' }}>Выйти из аккаунта?</h3>
              <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>Вы будете перенаправлены на страницу входа</p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                style={{
                  padding: '12px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#64748b',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Отмена
              </button>
              <button
                style={{
                  padding: '12px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#ffffff',
                  background: '#EF4444',
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}
                onClick={confirmLogout}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}

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
              <span style={{ ...styles.navCount, ...(activeNav === 'requests' ? styles.navCountActive : {}) }}>
                {stats.total}
              </span>
            </Link>
            <Link
              to="/customer"
              style={styles.navItem(activeNav === 'with-offers')}
              onClick={() => { setActiveNav('with-offers'); setSelectedStatus('with-offers'); }}
            >
              <span style={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              С КП
              <span style={{ ...styles.navCount, ...(activeNav === 'with-offers' ? styles.navCountActive : {}) }}>
                {stats.withOffers}
              </span>
            </Link>
            <Link
              to="/customer"
              style={styles.navItem(activeNav === 'no-offers')}
              onClick={() => { setActiveNav('no-offers'); setSelectedStatus('no-offers'); }}
            >
              <span style={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              Без КП
              <span style={{ ...styles.navCount, ...(activeNav === 'no-offers' ? styles.navCountActive : {}) }}>
                {stats.noOffers}
              </span>
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
          <div style={styles.userProfile} onClick={onLogout}>
            <div style={styles.avatar}>{initials}</div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{user.fullName}</div>
              <div style={styles.userRole}>{user.roleLabel}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={styles.mainContent}>
        <div className="fade-in">
          <div style={styles.topBar}>
            <div>
              <h1 style={styles.pageTitle}>Заявки</h1>
              <div style={styles.breadcrumb}>
                <Link to="/dashboard" style={styles.breadcrumbLink}>Dashboard</Link>
                <span>▶</span>
                <span style={styles.breadcrumbActive}>Заявки</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                style={styles.filterButton}
                onClick={() => setSelectedStatus(selectedStatus === 'all' ? 'with-offers' : 'all')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Фильтр
              </button>
              <button style={styles.exportButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Экспорт
              </button>
              <button
                style={{
                  ...styles.createButton,
                  ...(isCreateHovered ? { transform: 'translateY(-2px)', boxShadow: `0 8px 25px ${PRIMARY}55` } : {}),
                }}
                onClick={() => setIsCreateOpen(true)}
                onMouseEnter={() => setIsCreateHovered(true)}
                onMouseLeave={() => setIsCreateHovered(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Создать заявку
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.searchBar}>
              <div style={{ position: 'relative', flex: 1, minWidth: 250 }}>
                <input
                  type="text"
                  placeholder="Поиск по ID, названию объекта..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  style={{
                    ...styles.searchInput,
                    ...(isSearchFocused ? styles.searchInputFocus : {}),
                    paddingLeft: 44,
                  }}
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isSearchFocused ? PRIMARY : '#94A3B8',
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div style={styles.tabs}>
              <button
                style={styles.tab(selectedStatus === 'all')}
                onClick={() => { setSelectedStatus('all'); setActiveNav('requests'); }}
              >
                Все ({stats.total})
              </button>
              <button
                style={styles.tab(selectedStatus === 'with-offers')}
                onClick={() => { setSelectedStatus('with-offers'); setActiveNav('with-offers'); }}
              >
                С КП ({stats.withOffers})
              </button>
              <button
                style={styles.tab(selectedStatus === 'no-offers')}
                onClick={() => { setSelectedStatus('no-offers'); setActiveNav('no-offers'); }}
              >
                Без КП ({stats.noOffers})
              </button>
            </div>

            <div style={styles.tableWrap}>
              {filteredRequests.length === 0 ? (
                <div style={styles.empty}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#CBD5E1" strokeWidth="2"/>
                    <path d="M9 12H15" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 9V15" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    {requests.length === 0 ? (
                      <>
                        Заявок пока нет. Нажмите <b style={{ color: PRIMARY }}>«Создать заявку»</b>.
                      </>
                    ) : (
                      <>
                        По вашему запросу ничего не найдено.
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Объект</th>
                      <th style={styles.th}>Заказчик</th>
                      <th style={styles.th}>Тип</th>
                      <th style={styles.th}>КП</th>
                      <th style={styles.th}>Дата</th>
                      <th style={styles.th}>Статус</th>
                      <th style={styles.th}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((r) => {
                      const offerCount = countOffersByRequestId(r.id)
                      return (
                        <tr
  key={r.id}
  onClick={() => navigate(`/customer/request/${r.id}`)} // Изменено здесь
  style={{
    ...styles.trClickable,
    ...(hoveredRow === r.id ? styles.trHover : {}),
  }}
  onMouseEnter={() => setHoveredRow(r.id)}
  onMouseLeave={() => setHoveredRow(null)}
>
                          <td style={styles.td}>
                            <span style={{ ...styles.pill, ...styles.pillPrimary }}>{r.id}</span>
                          </td>
                          <td style={{ ...styles.td, fontWeight: 600 }}>{r.objectName}</td>
                          <td style={styles.td}>{r.govCustomerName}</td>
                          <td style={styles.td}>{r.configType}</td>
                          <td style={styles.td}>
                            {offerCount === 0 ? (
                              <span style={{ color: '#94A3B8' }}>—</span>
                            ) : (
                              <span style={{ ...styles.pill, ...styles.pillSuccess }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {offerCount}
                              </span>
                            )}
                          </td>
                          <td style={styles.td}>
                            {new Date(r.createdAt).toLocaleDateString('ru-RU')}
                          </td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.pill,
                              ...(offerCount > 0 ? styles.pillSuccess : styles.pillWarning),
                            }}>
                              {offerCount > 0 ? 'Есть КП' : 'Нет КП'}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <button
                              style={styles.actionButton}
                              onClick={(e) => { e.stopPropagation(); setSelectedRequestId(r.id); }}
                              title="Просмотр"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button
                              style={styles.actionButton}
                              onClick={(e) => { e.stopPropagation(); }}
                              title="Редактировать"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button
                              style={styles.actionButton}
                              onClick={(e) => { e.stopPropagation(); }}
                              title="Удалить"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {filteredRequests.length > 0 && (
              <div style={styles.pagination}>
                <div style={styles.paginationInfo}>
                  <b>1 - {Math.min(10, filteredRequests.length)}</b> of <b>{filteredRequests.length}</b> Pages
                </div>
                <div style={styles.paginationControls}>
                  <span style={{ fontSize: 13, color: '#64748b', marginRight: 8 }}>The page on</span>
                  <select style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #E2E8F0',
                    fontSize: 13,
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                  }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <button style={styles.pageButton}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button style={{ ...styles.pageButton, ...styles.pageButtonActive }}>1</button>
                  <button style={styles.pageButton}>2</button>
                  <button style={styles.pageButton}>3</button>
                  <button style={styles.pageButton}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Request Modal */}
      <CreateRequestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        customer={user}
        onCreated={onCreated}
        primaryColor={PRIMARY}
        primaryDark={PRIMARY_DARK}
      />

     

      <ProfileSettings email={user.email} />
    </div>
  )
}

function InfoRow({ label, value, primary }) {
  return (
    <div style={{
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      padding: 14,
      backgroundColor: '#F8FAFC',
    }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 600 }}>
        {value ?? '—'}
      </div>
    </div>
  )
}

function OfferCard({ offer, primary }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      style={{
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: 16,
        backgroundColor: '#ffffff',
        transition: 'all 0.2s',
        ...(isHovered ? { borderColor: primary, boxShadow: `0 4px 12px ${primary}22` } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          padding: '4px 10px',
          borderRadius: 6,
          backgroundColor: `${primary}15`,
          color: primary,
          fontSize: 12,
          fontWeight: 600,
        }}>
          Цена:
        </span>
        <span style={{ fontWeight: 700, color: '#1e293b' }}>
          {offer.price || '—'}
        </span>
      </div>
      {offer.comment && (
        <div style={{ marginTop: 10, padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Комментарий:</span>
          <div style={{ marginTop: 4, fontSize: 13, color: '#475569', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
            {offer.comment}
          </div>
        </div>
      )}
    </div>
  )
}

function CreateRequestModal({ isOpen, onClose, customer, onCreated, primaryColor, primaryDark }) {
  const [objectName, setObjectName] = useState('')
  const [govCustomerName, setGovCustomerName] = useState('')
  const [configType, setConfigType] = useState('КНС')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)

  const [kns, setKns] = useState({
    capacity: '',
    head: '',
    workingPumps: '',
    reservePumps: '',
    medium: 'Хоз-бытовые сточные воды',
    temperature: '',
    explosionProof: false,
  })

  const [knsExtras, setKnsExtras] = useState({
    'Канальный измельчитель': false,
    'Шиберный затвор на подводящей трубе': false,
    'Расходомер на напорном трубопроводе': false,
    'Газоанализатор': false,
    'Диспетчеризация': false,
    'Наземный павильон': false,
    'Грузоподъемное устройство': false,
    'Колодец с задвижкой перед КНС': false,
    'Колодец с запорной арматурой после КНС': false,
  })

  const styles = useMemo(
    () => ({
      grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 },
      group: { display: 'flex', flexDirection: 'column', gap: 6 },
      label: { fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
      input: {
        padding: '12px 14px',
        borderRadius: 10,
        border: '2px solid #E2E8F0',
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#F8FAFC',
        color: '#1e293b',
      },
      inputFocus: {
        borderColor: primaryColor,
        backgroundColor: '#ffffff',
        boxShadow: `0 0 0 3px ${primaryColor}22`,
      },
      select: {
        padding: '12px 14px',
        borderRadius: 10,
        border: '2px solid #E2E8F0',
        fontSize: 14,
        outline: 'none',
        background: '#F8FAFC',
        color: '#1e293b',
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      row: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 20 },
      btnPrimary: {
        padding: '13px 24px',
        borderRadius: 12,
        border: 'none',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryDark} 100%)`,
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.25s',
        boxShadow: `0 4px 14px ${primaryColor}44`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      btnSecondary: {
        padding: '13px 24px',
        borderRadius: 12,
        border: '2px solid #E2E8F0',
        backgroundColor: 'transparent',
        color: '#64748b',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      error: {
        backgroundColor: '#FEF2F2',
        border: '1px solid #FECACA',
        color: '#DC2626',
        padding: '12px 14px',
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      sectionTitle: { fontWeight: 700, margin: '18px 0 12px 0', color: '#334155', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 },
      checkbox: { display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', padding: '8px 0' },
      extraGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 },
      hint: { fontSize: 12, color: '#64748b', marginTop: 4 },
      checkboxCustom: {
        width: 18,
        height: 18,
        borderRadius: 4,
        border: '2px solid #CBD5E1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0,
      },
      checkboxChecked: {
        backgroundColor: primaryColor,
        borderColor: primaryColor,
      },
    }),
    [primaryColor, primaryDark],
  )

  const reset = () => {
    setObjectName('')
    setGovCustomerName('')
    setConfigType('КНС')
    setError('')
    setKns({
      capacity: '',
      head: '',
      workingPumps: '',
      reservePumps: '',
      medium: 'Хоз-бытовые сточные воды',
      temperature: '',
      explosionProof: false,
    })
    setKnsExtras((prev) =>
      Object.fromEntries(Object.keys(prev).map((k) => [k, false])),
    )
    setFocusedInput(null)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!objectName.trim() || !govCustomerName.trim() || !configType) {
      setError('Заполните: Название объекта, Гос. заказчик и Тип конфигурации')
      return
    }
    if (configType === 'КНС') {
      if (!kns.capacity.trim() || !kns.head.trim()) {
        setError('Для КНС заполните хотя бы: Производительность и Требуемый напор')
        return
      }
    }
    setIsSubmitting(true)
    setTimeout(() => {
      const id = `REQ-${Date.now().toString(36).toUpperCase()}`
      createRequest({
        id,
        createdAt: new Date().toISOString(),
        customerEmail: customer.email,
        customerFullName: customer.fullName,
        objectName: objectName.trim(),
        govCustomerName: govCustomerName.trim(),
        configType,
        contactPerson: customer.fullName,
        contactPhone: customer.phone || '',
        contactEmail: customer.email,
        kns: configType === 'КНС' ? kns : null,
        knsExtras: configType === 'КНС' ? knsExtras : null,
      })
      onCreated?.()
      reset()
      setIsSubmitting(false)
      onClose?.()
    }, 500)
  }

  return (
    <Modal
      isOpen={isOpen}
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Создать заявку
        </span>
      }
      onClose={() => {
        onClose?.()
        setError('')
        reset()
      }}
      width={900}
    >
      <form onSubmit={onSubmit}>
        {error && (
          <div style={styles.error}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#FECACA"/>
              <path d="M12 7V13" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1.5" fill="#DC2626"/>
            </svg>
            {error}
          </div>
        )}

        <div style={styles.grid2}>
          <div style={styles.group}>
            <div style={styles.label}>Название объекта</div>
            <input
              style={{
                ...styles.input,
                ...(focusedInput === 'objectName' ? styles.inputFocus : {}),
              }}
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
              onFocus={() => setFocusedInput('objectName')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Например: КНС №1, ЖК «Северный»"
            />
          </div>
          <div style={styles.group}>
            <div style={styles.label}>Наименование гос. заказчика</div>
            <input
              style={{
                ...styles.input,
                ...(focusedInput === 'govCustomer' ? styles.inputFocus : {}),
              }}
              value={govCustomerName}
              onChange={(e) => setGovCustomerName(e.target.value)}
              onFocus={() => setFocusedInput('govCustomer')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Например: ГКУ «...», Администрация..."
            />
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={styles.grid2}>
          <div style={styles.group}>
            <div style={styles.label}>Тип конфигурации</div>
            <select
              style={styles.select}
              value={configType}
              onChange={(e) => setConfigType(e.target.value)}
              onFocus={() => setFocusedInput('configType')}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="КНС">КНС</option>
              <option value="Другое">Другое</option>
            </select>
            <div style={styles.hint}>
              Если выбран тип <b>КНС</b> — откроются дополнительные модули.
            </div>
          </div>
          <div style={styles.group}>
            <div style={styles.label}>Контактное лицо</div>
            <input style={{ ...styles.input, backgroundColor: '#F1F5F9', cursor: 'not-allowed' }} value={customer.fullName} disabled />
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={styles.grid2}>
          <div style={styles.group}>
            <div style={styles.label}>Телефон</div>
            <input style={{ ...styles.input, backgroundColor: '#F1F5F9', cursor: 'not-allowed' }} value={customer.phone || ''} disabled />
          </div>
          <div style={styles.group}>
            <div style={styles.label}>Электронная почта</div>
            <input style={{ ...styles.input, backgroundColor: '#F1F5F9', cursor: 'not-allowed' }} value={customer.email} disabled />
          </div>
        </div>

        {configType === 'КНС' && (
          <>
            <div style={styles.sectionTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Конфигурация КНС
            </div>

            <div style={styles.grid2}>
              <div style={styles.group}>
                <div style={styles.label}>Расчётная производительность</div>
                <input
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'capacity' ? styles.inputFocus : {}),
                  }}
                  value={kns.capacity}
                  onChange={(e) => setKns((s) => ({ ...s, capacity: e.target.value }))}
                  onFocus={() => setFocusedInput('capacity')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="м³/ч или л/с"
                />
              </div>
              <div style={styles.group}>
                <div style={styles.label}>Требуемый напор</div>
                <input
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'head' ? styles.inputFocus : {}),
                  }}
                  value={kns.head}
                  onChange={(e) => setKns((s) => ({ ...s, head: e.target.value }))}
                  onFocus={() => setFocusedInput('head')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="м"
                />
              </div>
              <div style={styles.group}>
                <div style={styles.label}>Кол-во рабочих насосов</div>
                <input
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'workingPumps' ? styles.inputFocus : {}),
                  }}
                  value={kns.workingPumps}
                  onChange={(e) => setKns((s) => ({ ...s, workingPumps: e.target.value }))}
                  onFocus={() => setFocusedInput('workingPumps')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="например: 2"
                />
              </div>
              <div style={styles.group}>
                <div style={styles.label}>Кол-во резервных насосов</div>
                <input
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'reservePumps' ? styles.inputFocus : {}),
                  }}
                  value={kns.reservePumps}
                  onChange={(e) => setKns((s) => ({ ...s, reservePumps: e.target.value }))}
                  onFocus={() => setFocusedInput('reservePumps')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="например: 1"
                />
              </div>
            </div>

            <div style={{ height: 14 }} />

            <div style={styles.grid2}>
              <div style={styles.group}>
                <div style={styles.label}>Перекачиваемая среда</div>
                <select
                  style={styles.select}
                  value={kns.medium}
                  onChange={(e) => setKns((s) => ({ ...s, medium: e.target.value }))}
                >
                  <option value="Хоз-бытовые сточные воды">Хоз-бытовые сточные воды</option>
                  <option value="Ливневые сточные воды">Ливневые сточные воды</option>
                  <option value="Промышленные стоки">Промышленные стоки</option>
                </select>
              </div>
              <div style={styles.group}>
                <div style={styles.label}>Температура среды</div>
                <input
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'temperature' ? styles.inputFocus : {}),
                  }}
                  value={kns.temperature}
                  onChange={(e) => setKns((s) => ({ ...s, temperature: e.target.value }))}
                  onFocus={() => setFocusedInput('temperature')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="°C"
                />
              </div>
            </div>

            <div style={{ height: 14 }} />

            <label style={styles.checkbox}>
              <div style={{
                ...styles.checkboxCustom,
                ...(kns.explosionProof ? styles.checkboxChecked : {}),
              }}>
                {kns.explosionProof && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L9 16L19 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={kns.explosionProof}
                onChange={(e) => setKns((s) => ({ ...s, explosionProof: e.target.checked }))}
                style={{ display: 'none' }}
              />
              <span style={{ color: '#475569', fontSize: 14 }}>Взрывозащищенность</span>
            </label>

            <div style={styles.sectionTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Доп. комплектация КНС
            </div>
            <div style={styles.extraGrid}>
              {Object.entries(knsExtras).map(([label, checked]) => (
                <label key={label} style={styles.checkbox}>
                  <div style={{
                    ...styles.checkboxCustom,
                    ...(checked ? styles.checkboxChecked : {}),
                  }}>
                    {checked && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L9 16L19 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setKnsExtras((s) => ({ ...s, [label]: e.target.checked }))}
                    style={{ display: 'none' }}
                  />
                  <span style={{ color: '#475569', fontSize: 13 }}>{label}</span>
                </label>
              ))}
            </div>
          </>
        )}

        <div style={styles.row}>
          <button
            type="submit"
            style={{
              ...styles.btnPrimary,
              ...(isPrimaryHovered && !isSubmitting ? { transform: 'translateY(-2px)', boxShadow: `0 8px 25px ${primaryColor}55` } : {}),
              ...(isSubmitting ? { opacity: 0.7, cursor: 'not-allowed', transform: 'none' } : {}),
            }}
            onMouseEnter={() => !isSubmitting && setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span style={styles.spinner} />
                Создание...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Добавить заявку
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => { onClose?.(); reset(); }}
            style={styles.btnSecondary}
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  )
}
