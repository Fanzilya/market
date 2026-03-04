// src/pages/LandingPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'

export default function LandingPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('customer')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_LIGHT = '#EBF5FF'
  const PRIMARY_BORDER = '#4A85F633'

  const styles = useMemo(
    () => ({
      container: {
        minHeight: '100vh',
        backgroundColor: '#F4F7FE',
      },
      navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? '#ffffff' : '#ffffff',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        borderBottom: `1px solid #E5E9F2`,
      },
      navContainer: {
        maxWidth: 1280,
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        textDecoration: 'none',
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
      navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      navLink: (isActive) => ({
        padding: '10px 20px',
        fontSize: 14,
        fontWeight: 500,
        color: isActive ? '#ffffff' : '#64748b',
        backgroundColor: isActive ? PRIMARY : 'transparent',
        border: 'none',
        borderRadius: 20,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
      }),
      navRight: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      },
      authButton: {
        padding: '10px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: PRIMARY,
        backgroundColor: 'transparent',
        border: `2px solid ${PRIMARY}`,
        borderRadius: 10,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
      },
      authButtonFilled: {
        padding: '10px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: '#ffffff',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        boxShadow: `0 4px 14px ${PRIMARY}44`,
      },
      userProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 14px',
        backgroundColor: '#F8FAFC',
        borderRadius: 25,
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      avatar: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 700,
      },
      userName: {
        fontSize: 14,
        fontWeight: 600,
        color: '#1e293b',
      },
      mobileToggle: {
        display: 'none',
        padding: '10px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      },
      hero: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px 80px',
        background: `linear-gradient(135deg, #F8FAFC 0%, #E8F0FC 100%)`,
        position: 'relative',
        overflow: 'hidden',
      },
      heroContent: {
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        alignItems: 'center',
      },
      heroText: {
        maxWidth: 560,
      },
      heroLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: PRIMARY,
        marginBottom: 16,
        display: 'inline-block',
        padding: '6px 14px',
        backgroundColor: PRIMARY_LIGHT,
        borderRadius: 20,
      },
      heroTitle: {
        fontSize: 48,
        fontWeight: 800,
        color: '#1a1a2e',
        lineHeight: 1.2,
        marginBottom: 24,
        letterSpacing: '-1px',
      },
      heroSubtitle: {
        fontSize: 18,
        color: '#64748b',
        lineHeight: 1.7,
        marginBottom: 32,
      },
      heroButtons: {
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
      },
      heroButton: {
        padding: '16px 32px',
        fontSize: 16,
        fontWeight: 600,
        color: '#ffffff',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        boxShadow: `0 8px 25px ${PRIMARY}44`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      },
      heroButtonSecondary: {
        padding: '16px 32px',
        fontSize: 16,
        fontWeight: 600,
        color: PRIMARY,
        backgroundColor: '#ffffff',
        border: `2px solid ${PRIMARY}`,
        borderRadius: 12,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      },
      heroImage: {
        width: '100%',
        borderRadius: 24,
        background: '#ffffff',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        position: 'relative',
      },
      bgShape: {
        position: 'absolute',
        borderRadius: '50%',
        background: `${PRIMARY}10`,
        filter: 'blur(80px)',
      },
      features: {
        padding: '100px 24px',
        backgroundColor: '#ffffff',
      },
      featuresContainer: {
        maxWidth: 1280,
        margin: '0 auto',
      },
      sectionHeader: {
        textAlign: 'center',
        marginBottom: 60,
      },
      sectionLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: PRIMARY,
        marginBottom: 12,
        display: 'inline-block',
        padding: '6px 14px',
        backgroundColor: PRIMARY_LIGHT,
        borderRadius: 20,
      },
      sectionTitle: {
        fontSize: 40,
        fontWeight: 800,
        color: '#1a1a2e',
        marginBottom: 16,
        letterSpacing: '-0.5px',
      },
      sectionSubtitle: {
        fontSize: 18,
        color: '#64748b',
        maxWidth: 600,
        margin: '0 auto',
        lineHeight: 1.7,
      },
      featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 24,
      },
      featureCard: {
        padding: 32,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        border: `1px solid #E2E8F0`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      },
      featureCardHover: {
        borderColor: PRIMARY,
        boxShadow: `0 12px 40px ${PRIMARY}15`,
        transform: 'translateY(-8px)',
      },
      featureIcon: {
        width: 56,
        height: 56,
        borderRadius: 14,
        background: PRIMARY_LIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        color: PRIMARY,
      },
      featureTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 12,
      },
      featureDescription: {
        fontSize: 15,
        color: '#64748b',
        lineHeight: 1.7,
      },
      tabs: {
        display: 'flex',
        gap: 8,
        marginBottom: 40,
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      tab: (isActive) => ({
        padding: '12px 28px',
        fontSize: 15,
        fontWeight: 600,
        color: isActive ? '#ffffff' : '#64748b',
        backgroundColor: isActive ? PRIMARY : '#F1F5F9',
        border: 'none',
        borderRadius: 25,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      }),
      roleContent: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        marginTop: 40,
      },
      roleCard: {
        padding: 28,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        border: `1px solid #E2E8F0`,
        transition: 'all 0.3s ease',
      },
      roleCardActive: {
        borderColor: PRIMARY,
        boxShadow: `0 8px 30px ${PRIMARY}20`,
      },
      roleIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        background: PRIMARY_LIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        color: PRIMARY,
      },
      roleTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 8,
      },
      roleList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
      },
      roleListItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        fontSize: 14,
        color: '#64748b',
      },
      stats: {
        padding: '80px 24px',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
      },
      statsContainer: {
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        textAlign: 'center',
      },
      statValue: {
        fontSize: 48,
        fontWeight: 800,
        color: '#ffffff',
        marginBottom: 8,
      },
      statLabel: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: 500,
      },
      cta: {
        padding: '100px 24px',
        backgroundColor: '#F8FAFC',
        textAlign: 'center',
      },
      ctaContainer: {
        maxWidth: 800,
        margin: '0 auto',
      },
      ctaTitle: {
        fontSize: 40,
        fontWeight: 800,
        color: '#1a1a2e',
        marginBottom: 16,
        letterSpacing: '-0.5px',
      },
      ctaSubtitle: {
        fontSize: 18,
        color: '#64748b',
        marginBottom: 32,
        lineHeight: 1.7,
      },
      footer: {
        padding: '60px 24px 40px',
        backgroundColor: '#ffffff',
        borderTop: `1px solid #E2E8F0`,
      },
      footerContainer: {
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        marginBottom: 40,
      },
      footerColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      },
      footerTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: 8,
      },
      footerLink: {
        fontSize: 14,
        color: '#64748b',
        textDecoration: 'none',
        transition: 'color 0.2s',
      },
      footerBottom: {
        maxWidth: 1280,
        margin: '0 auto',
        paddingTop: 32,
        borderTop: `1px solid #E2E8F0`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      },
      footerText: {
        fontSize: 14,
        color: '#64748b',
      },
      mobileMenu: {
        display: 'none',
        position: 'fixed',
        top: 70,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        padding: '24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        zIndex: 999,
      },
    }),
    [isScrolled, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT, PRIMARY_BORDER],
  )

  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Управление заявками',
      description: 'Создавайте, отслеживайте и управляйте всеми заявками в единой системе. Полная прозрачность и контроль на каждом этапе.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11C9.76142 11 12 8.76142 12 6C12 3.23858 9.76142 1 7 1C4.23858 1 2 3.23858 2 6C2 8.76142 4.23858 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Работа с исполнителями',
      description: 'Получайте коммерческие предложения от проверенных исполнителей. Сравнивайте цены и выбирайте лучшие условия.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Аналитика и отчёты',
      description: 'Получайте детальную аналитику по всем процессам. Формируйте конъюнктурный анализ цен и принимайте обоснованные решения.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Контроль сроков',
      description: 'Автоматические уведомления о дедлайнах. Никогда не пропускайте важные сроки выполнения заявок.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
      ),
      title: 'Безопасность данных',
      description: 'Ваши данные защищены современными методами шифрования. Регулярное резервное копирование информации.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5523 20.5523 16 20 16H7L3 21V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Поддержка 24/7',
      description: 'Наша команда поддержки готова помочь вам в любое время. Быстрые ответы на все ваши вопросы.',
    },
  ]

  const stats = [
    { value: '500+', label: 'Активных пользователей' },
    { value: '1000+', label: 'Созданных заявок' },
    { value: '98%', label: 'Довольных клиентов' },
    { value: '24/7', label: 'Поддержка' },
  ]

  const customerFeatures = [
    { icon: '📋', text: 'Создание заявок через удобный опросный лист' },
    { icon: '💰', text: 'Сравнение коммерческих предложений' },
    { icon: '📊', text: 'Конъюнктурный анализ цен' },
    { icon: '✅', text: 'Выбор оптимального исполнителя' },
    { icon: '📈', text: 'Контроль выполнения работ' },
  ]

  const supplierFeatures = [
    { icon: '📥', text: 'Просмотр заявок от заказчиков' },
    { icon: '📤', text: 'Отправка коммерческих предложений' },
    { icon: '🔧', text: 'Подбор оборудования под требования' },
    { icon: '📱', text: 'Уведомления о новых заявках' },
    { icon: '📊', text: 'Статистика и аналитика предложений' },
  ]

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const handleLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-text {
            max-width: 100% !important;
          }
          .hero-buttons {
            justify-content: center;
          }
          .hero-image {
            height: 350px !important;
          }
          .nav-links {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-title {
            font-size: 36px !important;
          }
          .section-title {
            font-size: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          .hero-button, .hero-button-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logo}>
            <svg style={styles.logoIcon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)"/>
              <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7"/>
              <defs>
                <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981"/>
                  <stop offset="1" stopColor="#4A85F6"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4A85F6"/>
                  <stop offset="1" stopColor="#3A6BC9"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={styles.logoText}>Logo</span>
          </Link>

          <div className="nav-links" style={styles.navLinks}>
            <a href="#home" style={styles.navLink(true)}>Главная</a>
            <a href="#features" style={styles.navLink(false)}>Преимущества</a>
            <a href="#roles" style={styles.navLink(false)}>Возможности</a>
          </div>

          <div style={styles.navRight}>
            {user ? (
              <>
                <div style={styles.userProfile} onClick={() => navigate('/dashboard')}>
                  <div style={styles.avatar}>{initials}</div>
                  <span style={styles.userName}>{user.fullName}</span>
                </div>
                <button
                  style={styles.authButton}
                  onClick={handleLogout}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = `${PRIMARY}08`; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={styles.authButton}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = `${PRIMARY}08`; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  style={styles.authButtonFilled}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = `0 8px 25px ${PRIMARY}55`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = `0 4px 14px ${PRIMARY}44`
                  }}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>

          <button
            className="mobile-toggle"
            style={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <>
                  <path d="M3 12H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 18H21" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="#home" style={{ ...styles.navLink(true), padding: '14px 20px' }} onClick={() => setIsMobileMenuOpen(false)}>Главная</a>
            <a href="#features" style={{ ...styles.navLink(false), padding: '14px 20px' }} onClick={() => setIsMobileMenuOpen(false)}>Преимущества</a>
            <a href="#roles" style={{ ...styles.navLink(false), padding: '14px 20px' }} onClick={() => setIsMobileMenuOpen(false)}>Возможности</a>
            {!user && (
              <>
                <Link to="/login" style={{ ...styles.authButton, padding: '14px 20px', textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Войти</Link>
                <Link to="/register" style={{ ...styles.authButtonFilled, padding: '14px 20px', textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Регистрация</Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={{ ...styles.bgShape, width: '500px', height: '500px', top: '-200px', right: '-100px' }} />
        <div style={{ ...styles.bgShape, width: '400px', height: '400px', bottom: '-150px', left: '-100px' }} />

        <div className="hero-content" style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroLabel}>Система управления заявками</span>
            <h1 style={styles.heroTitle}>
              Автоматизация сбора <span style={{ color: PRIMARY }}>коммерческих предложений</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Веб-платформа для связи Заказчиков и Поставщиков инженерного оборудования. Начиная с КНС — канализационных насосных станций, с перспективой расширения на ЛОС, насосные группы и другое оборудование.
            </p>
            <div style={styles.heroButtons}>
              <Link to="/register" style={styles.heroButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Начать бесплатно
              </Link>
              <a href="#features" style={styles.heroButtonSecondary}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </svg>
                Узнать больше
              </a>
            </div>
          </div>

          <div style={styles.heroImage}>
            <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <rect width="600" height="500" fill="#F8FAFC"/>
              
              {/* Dashboard Header */}
              <rect x="0" y="0" width="600" height="70" fill="#ffffff" stroke="#E2E8F0" strokeWidth="2"/>
              <rect x="20" y="20" width="120" height="30" rx="6" fill="#4A85F6"/>
              <circle cx="540" cy="35" r="15" fill="#4A85F6"/>
              
              {/* Sidebar */}
              <rect x="0" y="70" width="180" height="430" fill="#ffffff" stroke="#E2E8F0" strokeWidth="2"/>
              <rect x="20" y="90" width="140" height="30" rx="6" fill="#EBF5FF"/>
              <rect x="20" y="130" width="140" height="25" rx="4" fill="#F1F5F9"/>
              <rect x="20" y="165" width="140" height="25" rx="4" fill="#F1F5F9"/>
              <rect x="20" y="200" width="140" height="25" rx="4" fill="#F1F5F9"/>
              
              {/* Main Content */}
              <rect x="180" y="70" width="420" height="430" fill="#F4F7FE"/>
              
              {/* Stats Cards */}
              <rect x="200" y="90" width="180" height="100" rx="12" fill="#ffffff" stroke="#E2E8F0"/>
              <rect x="220" y="110" width="80" height="20" rx="4" fill="#CBD5E1"/>
              <rect x="220" y="145" width="120" height="30" rx="6" fill="#4A85F6"/>
              
              <rect x="400" y="90" width="180" height="100" rx="12" fill="#ffffff" stroke="#E2E8F0"/>
              <rect x="420" y="110" width="80" height="20" rx="4" fill="#CBD5E1"/>
              <rect x="420" y="145" width="120" height="30" rx="6" fill="#10B981"/>
              
              {/* Chart */}
              <rect x="200" y="210" width="380" height="180" rx="12" fill="#ffffff" stroke="#E2E8F0"/>
              <path d="M220 350 L260 320 L300 340 L340 300 L380 310 L420 280 L460 290 L500 260 L540 270 L560 250" stroke="#4A85F6" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M220 360 L260 340 L300 355 L340 330 L380 340 L420 320 L460 330 L500 310 L540 320 L560 305" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
              
              {/* Table */}
              <rect x="200" y="410" width="380" height="80" rx="12" fill="#ffffff" stroke="#E2E8F0"/>
              <rect x="220" y="430" width="340" height="15" rx="3" fill="#F1F5F9"/>
              <rect x="220" y="455" width="340" height="15" rx="3" fill="#F1F5F9"/>
              <rect x="220" y="480" width="340" height="15" rx="3" fill="#F1F5F9"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.featuresContainer}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Преимущества</span>
            <h2 style={styles.sectionTitle}>Почему выбирают нашу систему</h2>
            <p style={styles.sectionSubtitle}>
              Мы создали платформу, которая объединяет заказчиков и исполнителей, делая процесс работы простым и прозрачным
            </p>
          </div>

          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  ...styles.featureCard,
                  ...(hoveredFeature === index ? styles.featureCardHover : {}),
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" style={{ padding: '100px 24px', backgroundColor: '#F8FAFC' }}>
        <div style={styles.featuresContainer}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Возможности</span>
            <h2 style={styles.sectionTitle}>Для каждой роли — свои преимущества</h2>
            <p style={styles.sectionSubtitle}>
              Система предоставляет удобный инструментарий как для Заказчиков, так и для Исполнителей
            </p>
          </div>

          <div style={styles.tabs}>
            <button
              style={styles.tab(activeTab === 'customer')}
              onClick={() => setActiveTab('customer')}
            >
              🏢 Для Заказчиков
            </button>
            <button
              style={styles.tab(activeTab === 'supplier')}
              onClick={() => setActiveTab('supplier')}
            >
              🔧 Для Исполнителей
            </button>
          </div>

          <div style={styles.roleContent}>
            {(activeTab === 'customer' ? customerFeatures : supplierFeatures).map((feature, index) => (
              <div
                key={index}
                style={{
                  ...styles.roleCard,
                  ...(index === 0 ? styles.roleCardActive : {}),
                }}
              >
                <div style={styles.roleIcon}>
                  <span style={{ fontSize: 24 }}>{feature.icon}</span>
                </div>
                <h3 style={styles.roleTitle}>{feature.text.split(' ').slice(0, 3).join(' ')}...</h3>
                <ul style={styles.roleList}>
                  {(activeTab === 'customer' ? customerFeatures : supplierFeatures).slice(0, 5).map((item, idx) => (
                    <li key={idx} style={styles.roleListItem}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: PRIMARY, flexShrink: 0 }}>
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Готовы начать работу?</h2>
          <p style={styles.ctaSubtitle}>
            Присоединяйтесь к сотням довольных пользователей уже сегодня. Регистрация займёт всего несколько минут.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={styles.heroButton}>
              Создать аккаунт
            </Link>
            <Link to="/login" style={styles.heroButtonSecondary}>
              Войти в систему
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerColumn}>
            <div style={styles.logo}>
              <svg style={styles.logoIcon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)"/>
                <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7"/>
                <defs>
                  <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981"/>
                    <stop offset="1" stopColor="#4A85F6"/>
                  </linearGradient>
                  <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4A85F6"/>
                    <stop offset="1" stopColor="#3A6BC9"/>
                  </linearGradient>
                </defs>
              </svg>
              <span style={styles.logoText}>Logo</span>
            </div>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>
              Система управления заявками для эффективной работы заказчиков и исполнителей инженерного оборудования.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Продукт</h4>
            <a href="#features" style={styles.footerLink}>Преимущества</a>
            <a href="#roles" style={styles.footerLink}>Возможности</a>
            <Link to="/register" style={styles.footerLink}>Регистрация</Link>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Поддержка</h4>
            <a href="#" style={styles.footerLink}>Документация</a>
            <a href="#" style={styles.footerLink}>FAQ</a>
            <a href="#" style={styles.footerLink}>Контакты</a>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Компания</h4>
            <a href="#" style={styles.footerLink}>О нас</a>
            <a href="#" style={styles.footerLink}>Блог</a>
            <a href="#" style={styles.footerLink}>Карьера</a>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.footerText}>© 2025 Logo. Все права защищены.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={styles.footerLink}>Политика конфиденциальности</a>
            <a href="#" style={styles.footerLink}>Условия использования</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
