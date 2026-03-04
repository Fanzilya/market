import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DEMO_USERS, signInDemo } from '../auth/demoAuth.js'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY_COLOR = '#1877F2'
  const PRIMARY_DARK = '#166FE5'
  const BG_BLUE = '#1877F2'

  const styles = useMemo(
    () => ({
      container: {
        display: 'flex',
        minHeight: '100vh',
        background: '#ffffff',
      },
      leftPanel: {
        flex: '0 0 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        backgroundColor: '#ffffff',
        position: 'relative',
      },
      rightPanel: {
        flex: '0 0 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        background: `linear-gradient(135deg, ${BG_BLUE} 0%, #0D5CB8 100%)`,
        position: 'relative',
        overflow: 'hidden',
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
      },
      logoIcon: {
        width: 40,
        height: 40,
      },
      logoText: {
        fontSize: 32,
        fontWeight: 700,
        color: '#1a1a2e',
      },
      title: {
        fontSize: 32,
        fontWeight: 700,
        color: '#1a1a2e',
        marginBottom: 8,
        textAlign: 'left',
        width: '100%',
        maxWidth: 400,
      },
      subtitle: {
        fontSize: 15,
        color: '#64748b',
        marginBottom: 32,
        lineHeight: 1.6,
        textAlign: 'left',
        width: '100%',
        maxWidth: 400,
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        maxWidth: 400,
      },
      googleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '14px 20px',
        fontSize: 15,
        fontWeight: 600,
        color: '#1877F2',
        backgroundColor: '#ffffff',
        border: '2px solid #1877F2',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      },
      divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '24px 0',
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: 500,
      },
      dividerLine: {
        flex: 1,
        height: '1px',
        backgroundColor: '#e2e8f0',
      },
      dividerText: {
        padding: '0 16px',
      },
      inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      },
      label: {
        fontSize: 14,
        fontWeight: 600,
        color: '#334155',
      },
      inputWrapper: {
        position: 'relative',
      },
      input: {
        width: '100%',
        padding: '15px 18px',
        fontSize: 15,
        border: '2px solid #e2e8f0',
        borderRadius: 12,
        outline: 'none',
        transition: 'all 0.25s ease',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        boxSizing: 'border-box',
      },
      inputFocus: {
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#ffffff',
        boxShadow: `0 0 0 4px ${PRIMARY_COLOR}22`,
      },
      inputValid: {
        borderColor: '#10B981',
        backgroundColor: '#ffffff',
      },
      validIcon: {
        position: 'absolute',
        right: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#10B981',
      },
      passwordToggle: {
        position: 'absolute',
        right: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        padding: '4px 8px',
        borderRadius: 6,
        transition: 'all 0.2s',
      },
      rememberRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
      },
      checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
      },
      checkboxInput: {
        width: 18,
        height: 18,
        accentColor: PRIMARY_COLOR,
        cursor: 'pointer',
      },
      checkboxLabel: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: 500,
      },
      forgotLink: {
        color: PRIMARY_COLOR,
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
        transition: 'color 0.2s',
      },
      primaryButton: {
        padding: '16px 24px',
        fontSize: 16,
        fontWeight: 600,
        color: '#ffffff',
        background: PRIMARY_COLOR,
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: `0 4px 14px ${PRIMARY_COLOR}55`,
      },
      primaryButtonHover: {
        background: PRIMARY_DARK,
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${PRIMARY_COLOR}66`,
      },
      primaryButtonDisabled: {
        background: '#cbd5e1',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none',
      },
      footer: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: 14,
        color: '#64748b',
      },
      footerLink: {
        color: PRIMARY_COLOR,
        textDecoration: 'none',
        fontWeight: 600,
        marginLeft: 4,
      },
      errorMessage: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        padding: '14px 16px',
        borderRadius: 12,
        fontSize: 14,
        marginBottom: 18,
        border: '1px solid #fecaca',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      },
      rightContent: {
        maxWidth: 500,
        textAlign: 'center',
        color: '#ffffff',
        zIndex: 1,
      },
      dashboardPreview: {
        width: '100%',
        maxWidth: 520,
        borderRadius: 16,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        marginBottom: 40,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      },
      rightTitle: {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: 16,
        lineHeight: 1.3,
      },
      rightSubtitle: {
        fontSize: 16,
        opacity: 0.9,
        lineHeight: 1.6,
        maxWidth: 450,
        margin: '0 auto',
      },
      bgShape: {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'blur(60px)',
      },
      shape1: {
        width: '300px',
        height: '300px',
        top: '-100px',
        right: '-50px',
      },
      shape2: {
        width: '200px',
        height: '200px',
        bottom: '-50px',
        left: '-50px',
      },
      spinner: {
        width: 20,
        height: 20,
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
        marginRight: 10,
        display: 'inline-block',
        verticalAlign: 'middle',
      },
      buttonContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
    [isMounted, PRIMARY_COLOR, PRIMARY_DARK, BG_BLUE],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isGoogleHovered, setIsGoogleHovered] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля')
      return
    }
    if (!email.includes('@')) {
      setError('Введите корректный email адрес')
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 350))
      const user = signInDemo({ email, password })
      if (!user) {
        setError('Неверная почта или пароль (демо)')
        return
      }
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Ошибка авторизации. Проверьте данные и попробуйте снова.')
    } finally {
      setIsLoading(false)
    }
  }

  const isValidEmail = email.includes('@') && email.includes('.') && email.length > 5

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake-animation {
          animation: shake 0.4s ease;
        }
        @media (max-width: 1024px) {
          .right-panel {
            display: none !important;
          }
          .left-panel {
            flex: 1 !important;
            padding: 40px 24px !important;
          }
        }
        @media (max-width: 480px) {
          .left-panel {
            padding: 32px 20px !important;
          }
          .logo-text {
            font-size: 28px !important;
          }
          .title {
            font-size: 28px !important;
          }
        }
      `}</style>

      {/* Левая панель - форма */}
      <div className="left-panel" style={styles.leftPanel}>
        <div style={styles.logo}>
          <svg style={styles.logoIcon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)" />
            <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7" />
            <defs>
              <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" />
                <stop offset="1" stopColor="#1877F2" />
              </linearGradient>
              <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1877F2" />
                <stop offset="1" stopColor="#0D5CB8" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text" style={styles.logoText}>Logo</span>
        </div>

        <h1 style={styles.title}>Вход</h1>
        <p style={styles.subtitle}>Добро пожаловать! Войдите для продолжения работы</p>

        {error && (
          <div className="shake-animation" style={{ ...styles.errorMessage, width: '100%', maxWidth: 400 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#fecaca" />
              <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1" fill="#dc2626" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} style={styles.form}>
          {/* <button
            type="button"
            style={{
              ...styles.googleButton,
              ...(isGoogleHovered ? { backgroundColor: '#f8fafc', transform: 'translateY(-2px)' } : {}),
            }}
            onMouseEnter={() => setIsGoogleHovered(true)}
            onMouseLeave={() => setIsGoogleHovered(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Войти через Google
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>или</span>
            <div style={styles.dividerLine} />
          </div> */}

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <div style={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                placeholder="your.email@example.com"
                style={{
                  ...styles.input,
                  ...(focusedInput === 'email' ? styles.inputFocus : {}),
                  ...(isValidEmail ? styles.inputValid : {}),
                }}
                disabled={isLoading}
                autoComplete="email"
              />
              {isValidEmail && (
                <div style={styles.validIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Пароль</label>
            <div style={styles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Введите пароль"
                style={{
                  ...styles.input,
                  paddingRight: '50px',
                  ...(focusedInput === 'password' ? styles.inputFocus : {}),
                }}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
                disabled={isLoading}
                onMouseEnter={(e) => e.target.style.color = PRIMARY_COLOR}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.29 8.29C9.28 7.68 10.57 7.27 12 7.27C19 7.27 22 13.27 22 13.27C22 13.27 21.68 13.92 21.13 14.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div style={styles.rememberRow}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkboxInput}
                disabled={isLoading}
              />
              <span style={styles.checkboxLabel}>Запомнить меня?</span>
            </label>
            <Link
              to="/forgot-password"
              style={styles.forgotLink}
              onMouseEnter={(e) => e.target.style.color = PRIMARY_DARK}
              onMouseLeave={(e) => e.target.style.color = PRIMARY_COLOR}
            >
              Забыли пароль?
            </Link>
          </div>

          <button
            type="submit"
            onMouseEnter={() => !isLoading && setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
            style={{
              ...styles.primaryButton,
              ...(isLoading ? styles.primaryButtonDisabled : {}),
              ...(isPrimaryHovered && !isLoading ? styles.primaryButtonHover : {}),
            }}
            disabled={isLoading}
          >
            <span style={styles.buttonContent}>
              {isLoading && <span style={styles.spinner} />}
              {isLoading ? 'Вход...' : 'Войти'}
            </span>
          </button>
        </form>

        <div style={styles.footer}>
          Нет аккаунта?{' '}
          <Link to="/register" style={styles.footerLink}>
            Зарегистрироваться
          </Link>
        </div>
      </div>

      {/* Правая панель - промо */}
      <div className="right-panel" style={styles.rightPanel}>
        <div style={{ ...styles.bgShape, ...styles.shape1 }} />
        <div style={{ ...styles.bgShape, ...styles.shape2 }} />

        <div style={styles.rightContent}>
          <div style={styles.dashboardPreview}>
            <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <rect width="520" height="340" fill="#ffffff" />
              <rect x="0" y="0" width="520" height="60" fill="#f8fafc" />
              <circle cx="30" cy="30" r="8" fill="#10B981" />
              <circle cx="55" cy="30" r="8" fill="#1877F2" />
              <rect x="80" y="22" width="120" height="16" rx="4" fill="#e2e8f0" />
              <rect x="400" y="20" width="100" height="20" rx="6" fill="#1877F2" opacity="0.2" />
              <rect x="410" y="25" width="40" height="10" rx="2" fill="#1877F2" />
              <rect x="20" y="80" width="150" height="120" rx="8" fill="#f1f5f9" />
              <rect x="30" y="95" width="100" height="8" rx="4" fill="#cbd5e1" />
              <rect x="30" y="115" width="80" height="6" rx="3" fill="#e2e8f0" />
              <rect x="30" y="130" width="60" height="6" rx="3" fill="#e2e8f0" />
              <rect x="190" y="80" width="310" height="120" rx="8" fill="#f1f5f9" />
              <rect x="200" y="95" width="150" height="8" rx="4" fill="#cbd5e1" />
              <path d="M200 180 L240 160 L280 175 L320 145 L360 165 L400 140 L440 155 L480 130" stroke="#1877F2" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M200 190 L240 185 L280 195 L320 180 L360 190 L400 175 L440 185 L480 170" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
              <rect x="20" y="220" width="230" height="100" rx="8" fill="#f1f5f9" />
              <rect x="30" y="235" width="100" height="8" rx="4" fill="#cbd5e1" />
              <circle cx="130" cy="270" r="30" fill="#1877F2" opacity="0.3" />
              <circle cx="130" cy="270" r="20" fill="#1877F2" opacity="0.5" />
              <circle cx="130" cy="270" r="10" fill="#1877F2" />
              <rect x="270" y="220" width="230" height="100" rx="8" fill="#f1f5f9" />
              <rect x="280" y="235" width="100" height="8" rx="4" fill="#cbd5e1" />
              <rect x="280" y="255" width="200" height="12" rx="4" fill="#e2e8f0" />
              <rect x="280" y="275" width="180" height="12" rx="4" fill="#e2e8f0" />
              <rect x="280" y="295" width="160" height="12" rx="4" fill="#e2e8f0" />
            </svg>
          </div>

          {/* <h2 style={styles.rightTitle}>
            Easy-to-Use Dashboard for<br />Managing Your Business.
          </h2>
          <p style={styles.rightSubtitle}>
            Streamline Your Business Management with Our User-Friendly Dashboard. Simplify complex tasks, track key metrics, and make informed decisions effortlessly.
          </p> */}

          {/* <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 40 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#1877F2' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' }} />
          </div> */}
        </div>
      </div>
    </div>
  )
}
