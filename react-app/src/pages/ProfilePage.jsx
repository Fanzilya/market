import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import ProfileSettings from '../components/ProfileSettings.jsx'

export default function ProfilePage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [isLinkHovered, setIsLinkHovered] = useState(false)

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
        padding: '40px 32px',
        width: '100%',
        maxWidth: 1000,
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
        marginBottom: 32,
        flexWrap: 'wrap',
      },
      headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      },
      avatar: {
        width: 72,
        height: 72,
        borderRadius: 18,
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 26,
        fontWeight: 700,
        boxShadow: `0 10px 25px ${PRIMARY}44`,
        flexShrink: 0,
      },
      titleSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
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
        padding: '5px 14px',
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      actions: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
      },
      linkButton: {
        padding: '13px 22px',
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
      section: {
        marginBottom: 28,
      },
      sectionTitle: {
        margin: '0 0 16px 0',
        fontSize: 17,
        fontWeight: 700,
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 12,
        borderBottom: `1px solid ${PRIMARY_BORDER}`,
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
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
      emptyValue: {
        color: '#94a3b8',
        fontStyle: 'italic',
      },
    }),
    [isMounted, PRIMARY, PRIMARY_DARK, PRIMARY_BG, PRIMARY_BORDER],
  )

  const [hoveredTile, setHoveredTile] = useState(null)

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
              style={{
                padding: '12px 28px',
                fontSize: 15,
                fontWeight: 600,
                color: '#ffffff',
                background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${PRIMARY}44`,
              }}
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
        @media (max-width: 768px) {
          .profile-card {
            padding: 28px 20px !important;
          }
        }
      `}</style>

      <div style={{ ...styles.bgShape, ...styles.shape1 }} />
      <div style={{ ...styles.bgShape, ...styles.shape2 }} />

      <div className="fade-in profile-card" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.avatar}>
              {initials}
            </div>
            <div style={styles.titleSection}>
              <h1 style={styles.title}>Профиль</h1>
              <p style={styles.subtitle}>
                <span style={styles.roleBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  {user.roleLabel}
                </span>
                <span>·</span>
                <span>{user.fullName}</span>
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
              style={styles.linkButton}
              onClick={() => navigate(isSupplier ? '/supplier' : '/customer', { replace: false })}
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
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.5697 21 20 21H4C3.43029 21 3 20.5304 3 20V9Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12H15V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                В кабинет
              </span>
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke={PRIMARY} strokeWidth="2"/>
            </svg>
            Данные пользователя
          </div>
          <div style={styles.grid}>
            <ProfileTile
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
            <ProfileTile
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
            <ProfileTile
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
            <ProfileTile
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
        </div>

        {isSupplier && user.company && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 21V7L13 3V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 21V11L13 7" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9V5" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Компания
            </div>
            <div style={styles.grid}>
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Наименование компании"
                value={user.company.name}
                primary={PRIMARY}
                hovered={hoveredTile === 'companyName'}
                onHover={() => setHoveredTile('companyName')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 3V21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Краткое наименование"
                value={user.company.shortName || '—'}
                empty={!user.company.shortName}
                primary={PRIMARY}
                hovered={hoveredTile === 'shortName'}
                onHover={() => setHoveredTile('shortName')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Тип компании"
                value={user.company.typeName || '—'}
                empty={!user.company.typeName}
                primary={PRIMARY}
                hovered={hoveredTile === 'companyType'}
                onHover={() => setHoveredTile('companyType')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke={PRIMARY} strokeWidth="2"/>
                    <path d="M3 10H21" stroke={PRIMARY} strokeWidth="2"/>
                    <path d="M7 15H7.01" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M11 15H13" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
                title="ИНН"
                value={user.company.inn || '—'}
                empty={!user.company.inn}
                primary={PRIMARY}
                hovered={hoveredTile === 'inn'}
                onHover={() => setHoveredTile('inn')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke={PRIMARY} strokeWidth="2"/>
                    <path d="M3 10H21" stroke={PRIMARY} strokeWidth="2"/>
                    <path d="M7 15H7.01" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M11 15H13" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
                title="КПП"
                value={user.company.kpp || '—'}
                empty={!user.company.kpp}
                primary={PRIMARY}
                hovered={hoveredTile === 'kpp'}
                onHover={() => setHoveredTile('kpp')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={PRIMARY} strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
                title="ОГРН"
                value={user.company.ogrn || '—'}
                empty={!user.company.ogrn}
                primary={PRIMARY}
                hovered={hoveredTile === 'ogrn'}
                onHover={() => setHoveredTile('ogrn')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke={PRIMARY} strokeWidth="2"/>
                  </svg>
                }
                title="Юр. адрес"
                value={user.company.legalAddress || '—'}
                empty={!user.company.legalAddress}
                primary={PRIMARY}
                hovered={hoveredTile === 'legalAddress'}
                onHover={() => setHoveredTile('legalAddress')}
                onLeave={() => setHoveredTile(null)}
              />
              <ProfileTile
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H8" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="О компании"
                value={user.company.about || '—'}
                empty={!user.company.about}
                primary={PRIMARY}
                hovered={hoveredTile === 'about'}
                onHover={() => setHoveredTile('about')}
                onLeave={() => setHoveredTile(null)}
              />
            </div>
          </div>
        )}
      </div>

      <ProfileSettings email={user.email} />
    </div>
  )
}

function ProfileTile({ icon, title, value, empty, primary, hovered, onHover, onLeave }) {
  return (
    <div
      style={{
        ...styles.tile,
        ...(hovered ? styles.tileHover : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <p style={{ ...styles.tileTitle, color: primary }}>
        {icon}
        {title}
      </p>
      <p style={{ ...styles.tileValue, ...(empty ? styles.emptyValue : {}) }}>
        {value}
      </p>
    </div>
  )
}

const styles = {}
