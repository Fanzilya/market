import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import Modal from '../components/Modal.jsx'
import { listAllRequests } from '../data/requests.js'
import { createOffer, listOffersByRequestId } from '../data/offers.js'
import ProfileSettings from '../components/ProfileSettings.jsx'

export default function SupplierPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [isOfferOpen, setIsOfferOpen] = useState(false)
  const [offerPrice, setOfferPrice] = useState('')
  const [offerComment, setOfferComment] = useState('')
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isLinkHovered, setIsLinkHovered] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_LIGHT = '#6A95F6'
  const PRIMARY_BG = '#4A85F610'
  const PRIMARY_BORDER = '#4A85F633'

  const requests = useMemo(() => {
    const _ = refreshKey
    return listAllRequests()
  }, [refreshKey])

  const selectedRequest = useMemo(
    () => requests.find((r) => r.id === selectedRequestId) ?? null,
    [requests, selectedRequestId],
  )

  const myOffersForSelected = useMemo(() => {
    if (!selectedRequestId || !user?.email) return []
    const _ = refreshKey
    return listOffersByRequestId(selectedRequestId).filter(
      (o) => String(o.supplierEmail || '').toLowerCase() === user.email.toLowerCase(),
    )
  }, [selectedRequestId, user?.email, refreshKey])

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
        padding: '32px',
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        transform: isMounted ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.99)',
        opacity: isMounted ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
      },
      header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 28,
        flexWrap: 'wrap',
      },
      headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      },
      avatar: {
        width: 52,
        height: 52,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 700,
        boxShadow: `0 8px 20px ${PRIMARY}44`,
        flexShrink: 0,
      },
      titleSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      },
      title: {
        margin: 0,
        fontSize: 26,
        fontWeight: 800,
        color: '#1a1a2e',
        letterSpacing: '-0.5px',
      },
      subtitle: {
        margin: 0,
        fontSize: 14,
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
      },
      roleBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      actions: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      button: {
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: '#ffffff',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: `0 4px 14px ${PRIMARY}44`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      buttonHover: {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${PRIMARY}55`,
      },
      linkButton: {
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: PRIMARY,
        backgroundColor: 'transparent',
        border: `2px solid ${PRIMARY}`,
        borderRadius: 12,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      linkButtonHover: {
        backgroundColor: `${PRIMARY}08`,
        transform: 'translateY(-2px)',
      },
      dangerButton: {
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: '#ffffff',
        backgroundColor: '#ef4444',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
        marginBottom: 24,
      },
      tile: {
        border: `1px solid #e2e8f0`,
        borderRadius: 14,
        padding: 18,
        backgroundColor: '#f8fafc',
        transition: 'all 0.2s ease',
      },
      tileHover: {
        borderColor: PRIMARY,
        backgroundColor: '#ffffff',
        boxShadow: `0 4px 12px ${PRIMARY}15`,
        transform: 'translateY(-2px)',
      },
      tileTitle: {
        margin: 0,
        fontSize: 11,
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      },
      tileValue: {
        margin: 0,
        fontSize: 15,
        color: '#1e293b',
        fontWeight: 600,
        whiteSpace: 'pre-wrap',
        lineHeight: 1.5,
      },
      warn: {
        marginTop: 16,
        color: '#64748b',
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        backgroundColor: `${PRIMARY}08`,
        borderRadius: 12,
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      tableWrap: {
        border: `1px solid ${PRIMARY_BORDER}`,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        marginTop: 20,
      },
      tableHeader: {
        backgroundColor: PRIMARY,
        color: '#ffffff',
        padding: '16px 20px',
        fontWeight: 700,
        fontSize: 15,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
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
        padding: '14px 20px',
        backgroundColor: '#f8fafc',
        borderBottom: `1px solid ${PRIMARY_BORDER}`,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
      td: {
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        fontSize: 14,
        color: '#1e293b',
        verticalAlign: 'top',
      },
      trClickable: {
        cursor: 'default',
        transition: 'all 0.2s ease',
      },
      trHover: {
        backgroundColor: `${PRIMARY}08`,
      },
      pill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY,
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      empty: {
        padding: '40px 20px',
        color: '#64748b',
        fontSize: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      },
      sectionTitle: {
        margin: '24px 0 16px 0',
        fontSize: 17,
        fontWeight: 700,
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
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
      input: {
        padding: '12px 14px',
        borderRadius: 10,
        border: '2px solid #e2e8f0',
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        width: '100%',
        boxSizing: 'border-box',
      },
      inputFocus: {
        borderColor: PRIMARY,
        backgroundColor: '#ffffff',
        boxShadow: `0 0 0 3px ${PRIMARY}22`,
      },
      textarea: {
        padding: '12px 14px',
        borderRadius: 10,
        border: '2px solid #e2e8f0',
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        minHeight: 120,
        fontFamily: 'inherit',
      },
      label: {
        fontSize: 12,
        fontWeight: 700,
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 6,
      },
      errorBox: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        padding: '12px 14px',
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      offerCount: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 6,
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY,
        fontSize: 12,
        fontWeight: 600,
      },
    }),
    [isMounted, PRIMARY, PRIMARY_DARK, PRIMARY_BG, PRIMARY_BORDER],
  )

  const [hoveredTile, setHoveredTile] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)

  const onLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  const openOffer = (requestId) => {
    setSelectedRequestId(requestId)
    setOfferPrice('')
    setOfferComment('')
    setError('')
    setIsOfferOpen(true)
  }

  const submitOffer = (e) => {
    e.preventDefault()
    setError('')
    if (!selectedRequest) {
      setError('Заявка не найдена')
      return
    }
    if (!offerPrice.trim()) {
      setError('Введите цену (можно с валютой/единицами)')
      return
    }

    createOffer({
      id: `OFFER-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      requestId: selectedRequest.id,
      supplierEmail: user.email,
      supplierFullName: user.fullName,
      supplierCompany: user.company?.name ?? '',
      price: offerPrice.trim(),
      comment: offerComment.trim(),
    })

    setIsOfferOpen(false)
    setRefreshKey((x) => x + 1)
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
            <Link
              to="/"
              style={{
                ...styles.button,
                textDecoration: 'none',
                display: 'inline-flex',
              }}
            >
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
        @media (max-width: 768px) {
          .supplier-card {
            padding: 24px 16px !important;
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

      <div className="fade-in supplier-card" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.avatar}>
              {initials}
            </div>
            <div style={styles.titleSection}>
              <h2 style={styles.title}>Кабинет Исполнителя</h2>
              <p style={styles.subtitle}>
                <span style={styles.roleBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  {user.roleLabel}
                </span>
                <span>·</span>
                <span>{user.fullName}</span>
                <span>·</span>
                <span>{user.email}</span>
              </p>
            </div>
          </div>
          <div style={styles.actions}>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke={PRIMARY} strokeWidth="2"/>
                </svg>
                Профиль
              </span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              style={styles.dangerButton}
              onMouseEnter={(e) => e.target.style.background = '#dc2626'}
              onMouseLeave={(e) => e.target.style.background = '#ef4444'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Выйти
            </button>
          </div>
        </div>

        <div style={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke={PRIMARY} strokeWidth="2"/>
          </svg>
          Данные исполнителя
        </div>

        <div style={styles.grid}>
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke={PRIMARY} strokeWidth="2"/>
              </svg>
            }
            title="ФИО"
            value={user.fullName}
            primary={PRIMARY}
            hovered={hoveredTile === 'fullName'}
            onHover={() => setHoveredTile('fullName')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Email"
            value={user.email}
            primary={PRIMARY}
            hovered={hoveredTile === 'email'}
            onHover={() => setHoveredTile('email')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 21V7L13 3V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 21V11L13 7" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Компания"
            value={user.company?.name ?? '—'}
            empty={!user.company?.name}
            primary={PRIMARY}
            hovered={hoveredTile === 'company'}
            onHover={() => setHoveredTile('company')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke={PRIMARY} strokeWidth="2"/>
                <path d="M3 10H21" stroke={PRIMARY} strokeWidth="2"/>
              </svg>
            }
            title="ИНН"
            value={user.company?.inn ?? '—'}
            empty={!user.company?.inn}
            primary={PRIMARY}
            hovered={hoveredTile === 'inn'}
            onHover={() => setHoveredTile('inn')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Краткое наименование"
            value={user.company?.shortName ?? '—'}
            empty={!user.company?.shortName}
            primary={PRIMARY}
            hovered={hoveredTile === 'shortName'}
            onHover={() => setHoveredTile('shortName')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Тип компании"
            value={user.company?.typeName ?? '—'}
            empty={!user.company?.typeName}
            primary={PRIMARY}
            hovered={hoveredTile === 'companyType'}
            onHover={() => setHoveredTile('companyType')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke={PRIMARY} strokeWidth="2"/>
                <path d="M3 10H21" stroke={PRIMARY} strokeWidth="2"/>
              </svg>
            }
            title="КПП"
            value={user.company?.kpp ?? '—'}
            empty={!user.company?.kpp}
            primary={PRIMARY}
            hovered={hoveredTile === 'kpp'}
            onHover={() => setHoveredTile('kpp')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={PRIMARY} strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            title="ОГРН"
            value={user.company?.ogrn ?? '—'}
            empty={!user.company?.ogrn}
            primary={PRIMARY}
            hovered={hoveredTile === 'ogrn'}
            onHover={() => setHoveredTile('ogrn')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke={PRIMARY} strokeWidth="2"/>
              </svg>
            }
            title="Юр. адрес"
            value={user.company?.legalAddress ?? '—'}
            empty={!user.company?.legalAddress}
            primary={PRIMARY}
            hovered={hoveredTile === 'legalAddress'}
            onHover={() => setHoveredTile('legalAddress')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.83 21 20.67 21 20.5 21C10.62 21 2.5 12.88 2.5 3C2.5 2.83 2.5 2.67 2.51 2.5C2.57 1.94 3.02 1.5 3.58 1.5H6.58C7.17 1.5 7.68 1.91 7.78 2.49L8.28 5.36C8.38 5.92 8.14 6.49 7.67 6.81L5.94 8.01C7.34 10.79 9.64 13.09 12.42 14.49L13.62 12.76C13.94 12.29 14.51 12.05 15.07 12.15L17.94 12.65C18.52 12.75 18.93 13.26 18.93 13.85V16.92Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Телефон"
            value={user.phone || '—'}
            empty={!user.phone}
            primary={PRIMARY}
            hovered={hoveredTile === 'phone'}
            onHover={() => setHoveredTile('phone')}
            onLeave={() => setHoveredTile(null)}
          />
          <SupplierTile
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Роль"
            value={user.roleLabel}
            primary={PRIMARY}
            hovered={hoveredTile === 'role'}
            onHover={() => setHoveredTile('role')}
            onLeave={() => setHoveredTile(null)}
          />
        </div>

        <p style={styles.warn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={PRIMARY} strokeWidth="2"/>
            <path d="M12 16V12" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="8" r="1" fill={PRIMARY}/>
          </svg>
          Ниже — список заявок заказчиков. Вы можете сформировать коммерческое предложение по любой заявке.
        </p>

        <div style={styles.tableWrap}>
          <div style={styles.tableHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Заявки (для КП)
          </div>
          {requests.length === 0 ? (
            <div style={styles.empty}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#cbd5e1" strokeWidth="2"/>
                <path d="M9 12H15" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 9V15" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                Пока нет заявок. Зайдите под заказчиком и создайте заявку.
              </div>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Объект</th>
                  <th style={styles.th}>Гос. заказчик</th>
                  <th style={styles.th}>Тип</th>
                  <th style={styles.th}>Контакт</th>
                  <th style={styles.th}>Действие</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    style={{
                      ...styles.trClickable,
                      ...(hoveredRow === r.id ? styles.trHover : {}),
                    }}
                    onMouseEnter={() => setHoveredRow(r.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={styles.td}>
                      <span style={styles.pill}>{r.id}</span>
                    </td>
                    <td style={styles.td}>{r.objectName}</td>
                    <td style={styles.td}>{r.govCustomerName}</td>
                    <td style={styles.td}>{r.configType}</td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{r.contactPerson}</div>
                      <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>
                        {r.contactPhone} · {r.contactEmail}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <button
                        type="button"
                        style={{
                          ...styles.button,
                          padding: '10px 16px',
                          fontSize: 13,
                        }}
                        onClick={() => openOffer(r.id)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = `0 8px 25px ${PRIMARY}55`
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = `0 4px 14px ${PRIMARY}44`
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Сделать КП
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProfileSettings email={user.email} />

      <Modal
        isOpen={isOfferOpen}
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {selectedRequest ? `Коммерческое предложение для ${selectedRequest.id}` : 'Коммерческое предложение'}
          </span>
        }
        onClose={() => setIsOfferOpen(false)}
        width={800}
      >
        {selectedRequest && (
          <div style={{
            marginBottom: 16,
            padding: '14px 16px',
            backgroundColor: `${PRIMARY}08`,
            borderRadius: 12,
            border: `1px solid ${PRIMARY_BORDER}`,
            fontSize: 13,
            color: '#475569',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke={PRIMARY} strokeWidth="2"/>
              </svg>
              <b>Объект:</b> {selectedRequest.objectName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <b>Тип:</b> {selectedRequest.configType}
            </div>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#fecaca"/>
              <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1.5" fill="#dc2626"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={submitOffer}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={styles.label}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }} xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke={PRIMARY} strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Цена *
              </div>
              <input
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                onFocus={() => setFocusedInput('price')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Например: 1 250 000 ₽"
                style={{
                  ...styles.input,
                  ...(focusedInput === 'price' ? styles.inputFocus : {}),
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={styles.label}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }} xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ваши КП по этой заявке
              </div>
              <div style={{
                padding: '12px 14px',
                borderRadius: 10,
                backgroundColor: '#f8fafc',
                border: `1px solid #e2e8f0`,
                color: '#475569',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                {myOffersForSelected.length === 0 ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#94a3b8" strokeWidth="2"/>
                      <path d="M8 12L11 14L16 9" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Пока нет отправленных КП
                  </>
                ) : (
                  <>
                    <span style={styles.offerCount}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {myOffersForSelected.length}
                    </span>
                    отправлено
                  </>
                )}
              </div>
            </div>
          </div>

          <div style={{ height: 16 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={styles.label}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }} xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5523 20.5523 16 20 16H7L3 21V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V15Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Комментарий / условия
            </div>
            <textarea
              value={offerComment}
              onChange={(e) => setOfferComment(e.target.value)}
              onFocus={() => setFocusedInput('comment')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Сроки, условия, состав поставки и т.д."
              style={{
                ...styles.textarea,
                ...(focusedInput === 'comment' ? styles.inputFocus : {}),
              }}
            />
          </div>

          <div style={{ height: 20 }} />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isPrimaryHovered ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setIsPrimaryHovered(true)}
              onMouseLeave={() => setIsPrimaryHovered(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Отправить КП
            </button>
            <button
              type="button"
              onClick={() => setIsOfferOpen(false)}
              style={{
                ...styles.linkButton,
                ...(isLinkHovered ? styles.linkButtonHover : {}),
              }}
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function SupplierTile({ icon, title, value, empty, primary, hovered, onHover, onLeave }) {
  return (
    <div
      style={{
        ...tileStyles.tile,
        ...(hovered ? tileStyles.tileHover : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <p style={{ ...tileStyles.tileTitle, color: primary }}>
        {icon}
        {title}
      </p>
      <p style={{ ...tileStyles.tileValue, ...(empty ? tileStyles.emptyValue : {}) }}>
        {value}
      </p>
    </div>
  )
}

const tileStyles = {
  tile: {
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    padding: 18,
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
  },
  tileHover: {
    borderColor: '#4A85F6',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(74, 133, 246, 0.15)',
    transform: 'translateY(-2px)',
  },
  tileTitle: {
    margin: 0,
    fontSize: 11,
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  tileValue: {
    margin: 0,
    fontSize: 15,
    color: '#1e293b',
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
  },
  emptyValue: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
}
