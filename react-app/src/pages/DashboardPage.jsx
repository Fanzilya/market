import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'

export default function DashboardPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_LIGHT = '#6A95F6'
  const PRIMARY_BG = '#4A85F610'
  const PRIMARY_BORDER = '#4A85F633'

  const styles = useMemo(
    () => ({
      container: {
        minHeight: '100vh',
        background: `linear-gradient(135deg, #f8fafc 0%, #e8f0fc 100%)`,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      },
      bgShape: {
        position: 'absolute',
        borderRadius: '50%',
        background: PRIMARY_BG,
        filter: 'blur(60px)',
      },
      shape1: {
        width: '400px',
        height: '400px',
        top: '-150px',
        right: '-100px',
      },
      shape2: {
        width: '300px',
        height: '300px',
        bottom: '-100px',
        left: '-80px',
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 25px 50px -12px rgba(74, 133, 246, 0.15), 0 0 0 1px rgba(74, 133, 246, 0.08)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        transform: isMounted ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.99)',
        opacity: isMounted ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 20,
      },
      headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      },
      avatar: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: 700,
        boxShadow: `0 8px 20px ${PRIMARY}44`,
      },
      titleSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      },
      title: {
        margin: 0,
        fontSize: 28,
        fontWeight: 800,
        color: '#1a1a2e',
        letterSpacing: '-0.5px',
      },
      subtitle: {
        margin: 0,
        fontSize: 15,
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      roleBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      userInfo: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: '24px',
        marginBottom: 32,
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      userInfoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
      },
      userInfoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      },
      userInfoLabel: {
        fontSize: 13,
        fontWeight: 600,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
      userInfoValue: {
        fontSize: 15,
        color: '#1e293b',
        fontWeight: 600,
      },
      sectionTitle: {
        margin: '0 0 20px 0',
        fontSize: 18,
        fontWeight: 700,
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        marginBottom: 32,
      },
      navCard: {
        border: `2px solid #e2e8f0`,
        borderRadius: 16,
        padding: 28,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden',
      },
      navCardHover: {
        borderColor: PRIMARY,
        boxShadow: `0 12px 30px ${PRIMARY}22`,
        transform: 'translateY(-4px)',
      },
      navCardIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        background: PRIMARY_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        color: PRIMARY,
      },
      navCardTitle: {
        margin: 0,
        fontSize: 18,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 8,
      },
      navCardDesc: {
        margin: 0,
        fontSize: 14,
        color: '#64748b',
        lineHeight: 1.6,
      },
      navCardArrow: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 32,
        height: 32,
        borderRadius: 8,
        background: PRIMARY_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: PRIMARY,
        transition: 'all 0.3s',
      },
      actions: {
        display: 'flex',
        gap: 12,
        justifyContent: 'flex-end',
        marginTop: 24,
        flexWrap: 'wrap',
        paddingTop: 24,
        borderTop: '1px solid #e2e8f0',
      },
      button: {
        padding: '14px 24px',
        fontSize: 15,
        fontWeight: 600,
        color: '#ffffff',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: `0 4px 14px ${PRIMARY}44`,
      },
      buttonHover: {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${PRIMARY}55`,
      },
      linkButton: {
        padding: '14px 24px',
        fontSize: 15,
        fontWeight: 600,
        color: PRIMARY,
        backgroundColor: 'transparent',
        border: `2px solid ${PRIMARY}`,
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      },
      linkButtonHover: {
        backgroundColor: `${PRIMARY}08`,
        transform: 'translateY(-2px)',
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
      logoutTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 12,
        textAlign: 'center',
      },
      logoutDesc: {
        fontSize: 15,
        color: '#64748b',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 1.5,
      },
      logoutActions: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
      },
      cancelButton: {
        padding: '12px 24px',
        fontSize: 15,
        fontWeight: 600,
        color: '#64748b',
        backgroundColor: '#f1f5f9',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      confirmButton: {
        padding: '12px 24px',
        fontSize: 15,
        fontWeight: 600,
        color: '#ffffff',
        background: '#ef4444',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
    }),
    [isMounted, PRIMARY, PRIMARY_DARK, PRIMARY_BG, PRIMARY_BORDER],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isLinkHovered, setIsLinkHovered] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  if (!user) {
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
        `}</style>
        <div className="fade-in" style={styles.card}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: 80,
              height: 80,
              margin: '0 auto 24px',
              borderRadius: 20,
              background: '#fef2f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#fecaca"/>
                <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="17" r="1.5" fill="#dc2626"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Сессия не найдена</h2>
            <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Пожалуйста, войдите в систему для продолжения.</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={styles.button}
              onMouseEnter={() => setIsPrimaryHovered(true)}
              onMouseLeave={() => setIsPrimaryHovered(false)}
            >
              Перейти к входу
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isSupplier = user.role === 'supplier'
  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

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
        @media (max-width: 640px) {
          .dashboard-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>

      <div style={{ ...styles.bgShape, ...styles.shape1 }} />
      <div style={{ ...styles.bgShape, ...styles.shape2 }} />

      {showLogoutConfirm && (
        <div style={styles.logoutConfirm} onClick={() => setShowLogoutConfirm(false)}>
          <div style={styles.logoutModal} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                margin: '0 auto 16px',
                borderRadius: 16,
                background: '#fef2f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3H5C3.89543 3 3 3.89543 3 5V21C3 22.1046 3.89543 23 5 23H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 17L21 12L16 7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={styles.logoutTitle}>Выйти из аккаунта?</h3>
              <p style={styles.logoutDesc}>Вы будете перенаправлены на страницу входа</p>
            </div>
            <div style={styles.logoutActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setShowLogoutConfirm(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              >
                Отмена
              </button>
              <button
                style={styles.confirmButton}
                onClick={confirmLogout}
                onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                onMouseLeave={(e) => e.target.style.background = '#ef4444'}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fade-in dashboard-card" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.avatar}>
              {initials}
            </div>
            <div style={styles.titleSection}>
              <h1 style={styles.title}>Добро пожаловать!</h1>
              <p style={styles.subtitle}>
                <span style={styles.roleBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  {user.roleLabel}
                </span>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              style={styles.linkButton}
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
            >
              <span style={{
                ...styles.linkButton,
                ...(isLinkHovered ? styles.linkButtonHover : {}),
                border: 'none',
                padding: 0,
                margin: 0,
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke={PRIMARY} strokeWidth="2"/>
                  </svg>
                  Профиль
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              style={styles.button}
              onMouseEnter={() => setIsPrimaryHovered(true)}
              onMouseLeave={() => setIsPrimaryHovered(false)}
            >
              <span style={{
                ...styles.button,
                ...(isPrimaryHovered ? styles.buttonHover : {}),
                background: 'none',
                padding: 0,
                margin: 0,
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Выйти
              </span>
            </button>
          </div>
        </div>

        <div style={styles.userInfo}>
          <div style={styles.userInfoGrid}>
            <div style={styles.userInfoItem}>
              <span style={styles.userInfoLabel}>ФИО</span>
              <span style={styles.userInfoValue}>{user.fullName}</span>
            </div>
            <div style={styles.userInfoItem}>
              <span style={styles.userInfoLabel}>Email</span>
              <span style={styles.userInfoValue}>{user.email}</span>
            </div>
            {user.phone && (
              <div style={styles.userInfoItem}>
                <span style={styles.userInfoLabel}>Телефон</span>
                <span style={styles.userInfoValue}>{user.phone}</span>
              </div>
            )}
            {isSupplier && user.company && (
              <div style={styles.userInfoItem}>
                <span style={styles.userInfoLabel}>Компания</span>
                <span style={styles.userInfoValue}>{user.company.name}</span>
              </div>
            )}
          </div>
        </div>

        <h2 style={styles.sectionTitle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="2" fill={PRIMARY}/>
            <rect x="14" y="3" width="7" height="7" rx="2" fill={PRIMARY}/>
            <rect x="3" y="14" width="7" height="7" rx="2" fill={PRIMARY}/>
            <rect x="14" y="14" width="7" height="7" rx="2" fill={PRIMARY} opacity="0.5"/>
          </svg>
          Доступные разделы
        </h2>

        <div style={styles.grid}>
          {isSupplier ? (
            <div
              style={{
                ...styles.navCard,
                ...(hoveredCard === 'supplier' ? styles.navCardHover : {}),
              }}
              onClick={() => navigate('/supplier')}
              onMouseEnter={() => setHoveredCard('supplier')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.navCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={styles.navCardTitle}>Кабинет Исполнителя</h3>
              <p style={styles.navCardDesc}>
                Просмотр заявок заказчиков и создание коммерческих предложений
              </p>
              <div style={styles.navCardArrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ) : (
            <div
              style={{
                ...styles.navCard,
                ...(hoveredCard === 'customer' ? styles.navCardHover : {}),
              }}
              onClick={() => navigate('/customer')}
              onMouseEnter={() => setHoveredCard('customer')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.navCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={styles.navCardTitle}>Реестр заявок</h3>
              <p style={styles.navCardDesc}>
                Создание и управление заявками, просмотр коммерческих предложений от исполнителей
              </p>
              <div style={styles.navCardArrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={() => navigate('/settings')}
            style={styles.linkButton}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
          >
            <span style={{
              ...styles.linkButton,
              ...(isLinkHovered ? styles.linkButtonHover : {}),
              border: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke={PRIMARY} strokeWidth="2"/>
                <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Настройки
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
