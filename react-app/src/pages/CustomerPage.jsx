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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_LIGHT = '#6A95F6'
  const PRIMARY_BG = '#4A85F610'
  const PRIMARY_BORDER = '#4A85F633'
  const PRIMARY_TEXT = '#4A85F6'

  const requests = useMemo(() => {
    if (!user?.email) return []
    const _ = refreshKey
    return listRequestsForCustomerEmail(user.email)
  }, [user?.email, refreshKey])

  const selectedRequest = useMemo(() => {
    if (!selectedRequestId) return null
    return requests.find((r) => r.id === selectedRequestId) ?? null
  }, [requests, selectedRequestId])

  const selectedOffers = useMemo(() => {
    if (!selectedRequestId) return []
    const _ = refreshKey
    return listOffersByRequestId(selectedRequestId)
  }, [selectedRequestId, refreshKey])

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
        maxWidth: 1200,
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
      tableWrap: {
        border: `1px solid ${PRIMARY_BORDER}`,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
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
        cursor: 'pointer',
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
      sectionTitle: {
        margin: '20px 0 12px 0',
        fontSize: 16,
        fontWeight: 700,
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      infoCard: {
        border: `1px solid #e2e8f0`,
        borderRadius: 12,
        padding: 14,
        backgroundColor: '#f8fafc',
        transition: 'all 0.2s',
      },
      infoLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 6,
      },
      infoValue: {
        fontSize: 14,
        color: '#1e293b',
        fontWeight: 600,
      },
      offerCard: {
        border: `1px solid #e2e8f0`,
        borderRadius: 14,
        padding: 16,
        backgroundColor: '#ffffff',
        transition: 'all 0.2s',
      },
      offerCardHover: {
        borderColor: PRIMARY,
        boxShadow: `0 4px 12px ${PRIMARY}22`,
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
            <Link to="/" style={{ ...styles.button, textDecoration: 'none', display: 'inline-flex' }}>
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
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        @media (max-width: 768px) {
          .customer-card {
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

      <div className="fade-in customer-card" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.avatar}>
              {initials}
            </div>
            <div style={styles.titleSection}>
              <h2 style={styles.title}>Реестр заявок</h2>
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
                {user.phone && (
                  <>
                    <span>·</span>
                    <span>{user.phone}</span>
                  </>
                )}
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
              onClick={() => setIsCreateOpen(true)}
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
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Создать заявку
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

        <div style={styles.tableWrap}>
          <div style={styles.tableHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 16H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Список добавленных заявок
          </div>
          {requests.length === 0 ? (
            <div style={styles.empty}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#cbd5e1" strokeWidth="2"/>
                <path d="M9 12H15" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 9V15" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                Заявок пока нет. Нажмите <b style={{ color: PRIMARY }}>«Создать заявку»</b>.
              </div>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID заявки</th>
                  <th style={styles.th}>Название объекта</th>
                  <th style={styles.th}>Гос. заказчик</th>
                  <th style={styles.th}>Тип конфигурации</th>
                  <th style={styles.th}>КП</th>
                  <th style={styles.th}>Создано</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRequestId(r.id)}
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
                      {countOffersByRequestId(r.id) === 0 ? (
                        <span style={{ color: '#94a3b8' }}>—</span>
                      ) : (
                        <span style={{ ...styles.pill, backgroundColor: '#dcfce7', color: '#16a34a', borderColor: '#86efac' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {countOffersByRequestId(r.id)}
                        </span>
                      )}
                    </td>
                    <td style={styles.td}>
                      {new Date(r.createdAt).toLocaleString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p style={styles.warn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={PRIMARY} strokeWidth="2"/>
            <path d="M12 16V12" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="8" r="1" fill={PRIMARY}/>
          </svg>
          Нажмите на заявку в списке, чтобы посмотреть детали и коммерческие предложения исполнителей.
        </p>
      </div>

      <CreateRequestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        customer={user}
        onCreated={onCreated}
        primaryColor={PRIMARY}
        primaryDark={PRIMARY_DARK}
      />

      <Modal
        isOpen={!!selectedRequest}
        title={selectedRequest ? `Заявка ${selectedRequest.id}` : 'Заявка'}
        onClose={() => setSelectedRequestId(null)}
        width={900}
      >
        {selectedRequest && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              <InfoRow label="Название объекта" value={selectedRequest.objectName} primary={PRIMARY} />
              <InfoRow label="Наименование гос. заказчика" value={selectedRequest.govCustomerName} primary={PRIMARY} />
              <InfoRow label="Тип конфигурации" value={selectedRequest.configType} primary={PRIMARY} />
              <InfoRow label="Контактное лицо" value={selectedRequest.contactPerson} primary={PRIMARY} />
              <InfoRow label="Телефон" value={selectedRequest.contactPhone} primary={PRIMARY} />
              <InfoRow label="Email" value={selectedRequest.contactEmail} primary={PRIMARY} />
            </div>

            {selectedRequest.configType === 'КНС' && (
              <>
                <div style={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Конфигурация КНС
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                  <InfoRow label="Производительность" value={selectedRequest.kns?.capacity ?? '—'} primary={PRIMARY} />
                  <InfoRow label="Требуемый напор" value={selectedRequest.kns?.head ?? '—'} primary={PRIMARY} />
                  <InfoRow label="Рабочих насосов" value={selectedRequest.kns?.workingPumps ?? '—'} primary={PRIMARY} />
                  <InfoRow label="Резервных насосов" value={selectedRequest.kns?.reservePumps ?? '—'} primary={PRIMARY} />
                  <InfoRow label="Перекачиваемая среда" value={selectedRequest.kns?.medium ?? '—'} primary={PRIMARY} />
                  <InfoRow label="Температура среды" value={selectedRequest.kns?.temperature ?? '—'} primary={PRIMARY} />
                  <InfoRow label="Взрывозащищенность" value={selectedRequest.kns?.explosionProof ? 'Да' : 'Нет'} primary={PRIMARY} />
                </div>

                <div style={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Доп. комплектация КНС
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {Object.entries(selectedRequest.knsExtras ?? {})
                    .filter(([, v]) => !!v)
                    .map(([k]) => (
                      <span key={k} style={styles.pill}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {k}
                      </span>
                    ))}
                  {Object.values(selectedRequest.knsExtras ?? {}).every((v) => !v) && (
                    <span style={{ color: '#94a3b8' }}>—</span>
                  )}
                </div>
              </>
            )}

            <div style={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Коммерческие предложения
            </div>
            {selectedOffers.length === 0 ? (
              <div style={{ color: '#64748b', padding: '20px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: 12 }}>
                Пока нет коммерческих предложений.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {selectedOffers.map((o) => (
                  <OfferCard key={o.id} offer={o} primary={PRIMARY} />
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
      <ProfileSettings email={user.email} />
    </div>
  )
}

function InfoRow({ label, value, primary }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: 12,
      padding: 14,
      backgroundColor: '#f8fafc',
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
        border: '1px solid #e2e8f0',
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
        <div style={{ color: '#94a3b8', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
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
        <div style={{ marginTop: 10, padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: 8 }}>
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
        border: '2px solid #e2e8f0',
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#f8fafc',
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
        border: '2px solid #e2e8f0',
        fontSize: 14,
        outline: 'none',
        background: '#f8fafc',
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
        border: '2px solid #e2e8f0',
        backgroundColor: 'transparent',
        color: '#64748b',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      error: {
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
      sectionTitle: { fontWeight: 700, margin: '18px 0 12px 0', color: '#334155', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 },
      checkbox: { display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', padding: '8px 0' },
      extraGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 },
      hint: { fontSize: 12, color: '#64748b', marginTop: 4 },
      checkboxCustom: {
        width: 18,
        height: 18,
        borderRadius: 4,
        border: '2px solid #cbd5e1',
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

  const [focusedInput, setFocusedInput] = useState(null)

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
              <circle cx="12" cy="12" r="10" fill="#fecaca"/>
              <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1.5" fill="#dc2626"/>
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
            <input style={{ ...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} value={customer.fullName} disabled />
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={styles.grid2}>
          <div style={styles.group}>
            <div style={styles.label}>Телефон</div>
            <input style={{ ...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} value={customer.phone || ''} disabled />
          </div>
          <div style={styles.group}>
            <div style={styles.label}>Электронная почта</div>
            <input style={{ ...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} value={customer.email} disabled />
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
                <span style={{
                  width: 16,
                  height: 16,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }} />
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
            onMouseEnter={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = '#f1f5f9'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.backgroundColor = 'transparent'; }}
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  )
}
