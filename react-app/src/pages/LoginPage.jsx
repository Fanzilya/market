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
  const navigate = useNavigate()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PRIMARY_COLOR = '#4A85F6'
  const PRIMARY_LIGHT = '#5a8be9'
  const PRIMARY_DARK = '#2a5ba9'

  const styles = useMemo(
    () => ({
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_DARK} 100%)`,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
      },
      bgCircle: {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'blur(60px)',
      },
      circle1: {
        width: '400px',
        height: '400px',
        top: '-150px',
        right: '-100px',
      },
      circle2: {
        width: '300px',
        height: '300px',
        bottom: '-100px',
        left: '-80px',
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: 440,
        position: 'relative',
        zIndex: 1,
        transform: isMounted ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
        opacity: isMounted ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
      },
      logo: {
        width: 64,
        height: 64,
        margin: '0 auto 20px',
        background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_DARK} 100%)`,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 28,
        fontWeight: 700,
        boxShadow: `0 10px 25px ${PRIMARY_COLOR}66`,
      },
      title: {
        fontSize: 28,
        fontWeight: 700,
        color: '#1a1a2e',
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: '-0.5px',
      },
      subtitle: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 36,
        lineHeight: 1.6,
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
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
        marginLeft: 4,
      },
      inputWrapper: {
        position: 'relative',
      },
      input: {
        width: '100%',
        padding: '15px 18px',
        fontSize: 15,
        border: '2px solid #e2e8f0',
        borderRadius: 14,
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
      inputError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
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
        fontSize: 14,
        padding: '4px 8px',
        borderRadius: 6,
        transition: 'all 0.2s',
      },
      primaryButton: {
        padding: '16px 24px',
        fontSize: 16,
        fontWeight: 600,
        color: '#ffffff',
        background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_DARK} 100%)`,
        border: 'none',
        borderRadius: 14,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        marginTop: 8,
        boxShadow: `0 4px 14px ${PRIMARY_COLOR}55`,
        position: 'relative',
        overflow: 'hidden',
      },
      primaryButtonHover: {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${PRIMARY_COLOR}66`,
      },
      primaryButtonDisabled: {
        background: '#cbd5e1',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none',
      },
      secondaryButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 20px',
        fontSize: 15,
        fontWeight: 600,
        color: PRIMARY_COLOR,
        backgroundColor: 'transparent',
        border: `2px solid ${PRIMARY_COLOR}`,
        borderRadius: 14,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        width: '100%',
        marginTop: 4,
        boxSizing: 'border-box',
      },
      secondaryButtonHover: {
        backgroundColor: `${PRIMARY_COLOR}08`,
        transform: 'translateY(-1px)',
      },
      errorMessage: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        padding: '14px 16px',
        borderRadius: 14,
        fontSize: 14,
        marginBottom: 18,
        border: '1px solid #fecaca',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      },
      footer: {
        marginTop: 26,
        textAlign: 'center',
      },
      link: {
        color: PRIMARY_COLOR,
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        transition: 'color 0.2s',
      },
      divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '28px 0',
        color: '#94a3b8',
        fontSize: 13,
      },
      dividerLine: {
        flex: 1,
        height: '1px',
        backgroundColor: '#e2e8f0',
      },
      dividerText: {
        padding: '0 16px',
      },
      footerButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginTop: 20,
      },
      demoSection: {
        marginTop: 30,
        padding: '18px',
        backgroundColor: '#f8fafc',
        borderRadius: 14,
        border: `1px dashed ${PRIMARY_COLOR}44`,
      },
      demoTitle: {
        fontSize: 13,
        fontWeight: 700,
        color: '#475569',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      },
      demoItem: {
        fontSize: 13,
        color: '#475569',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      },
      demoLabel: {
        fontWeight: 600,
        color: '#334155',
      },
      demoCreds: {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        backgroundColor: '#e2e8f0',
        padding: '5px 12px',
        borderRadius: 8,
        fontSize: 12,
        color: '#1e293b',
        alignSelf: 'flex-start',
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
    [isMounted, PRIMARY_COLOR, PRIMARY_DARK],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false)

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
        @media (max-width: 480px) {
          .login-card {
            padding: 36px 24px !important;
          }
        }
      `}</style>

      <div style={{ ...styles.bgCircle, ...styles.circle1 }} />
      <div style={{ ...styles.bgCircle, ...styles.circle2 }} />

      <div 
        className="login-card"
        style={styles.card}
      >
        <div style={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2 style={styles.title}>Вход в систему</h2>
        <p style={styles.subtitle}>Добро пожаловать! Войдите для продолжения работы</p>

        {error && (
          <div className="shake-animation" style={styles.errorMessage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#fecaca"/>
              <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1" fill="#dc2626"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} style={styles.form}>
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
                  ...(error ? styles.inputError : {}),
                }}
                disabled={isLoading}
                autoComplete="email"
              />
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
                placeholder="••••••••"
                style={{
                  ...styles.input,
                  paddingRight: '50px',
                  ...(focusedInput === 'password' ? styles.inputFocus : {}),
                  ...(error ? styles.inputError : {}),
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
                    <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.29 8.29C9.28 7.68 10.57 7.27 12 7.27C19 7.27 22 13.27 22 13.27C22 13.27 21.68 13.92 21.13 14.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onMouseEnter={() => !isLoading && setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
            style={{
              ...styles.primaryButton,
              ...(isLoading || !email || !password ? styles.primaryButtonDisabled : {}),
              ...(isPrimaryHovered && !isLoading ? styles.primaryButtonHover : {}),
            }}
            disabled={isLoading || !email || !password}
          >
            <span style={styles.buttonContent}>
              {isLoading && <span style={styles.spinner} />}
              {isLoading ? 'Вход...' : 'Войти'}
            </span>
          </button>
        </form>

        <div style={styles.footer}>
          <Link 
            to="/forgot-password" 
            style={styles.link}
            onMouseEnter={(e) => e.target.style.color = PRIMARY_DARK}
            onMouseLeave={(e) => e.target.style.color = PRIMARY_COLOR}
          >
            Забыли пароль?
          </Link>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>или</span>
          <div style={styles.dividerLine} />
        </div>

        <div style={styles.footerButtons}>
          <Link 
            to="/register" 
            style={{...styles.secondaryButton, border: 'none', padding: 0, margin: 0}}
            onMouseEnter={() => setIsSecondaryHovered(true)}
            onMouseLeave={() => setIsSecondaryHovered(false)}
          >
            <span style={{
              ...styles.secondaryButton,
              ...(isSecondaryHovered ? styles.secondaryButtonHover : {}),
              border: `2px solid ${PRIMARY_COLOR}`,
              width: '100%',
              boxSizing: 'border-box',
            }}>
              Зарегистрироваться
            </span>
          </Link>
        </div>

        <div style={styles.demoSection}>
          <div style={styles.demoTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke={PRIMARY_COLOR} strokeWidth="2"/>
              <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke={PRIMARY_COLOR} strokeWidth="2"/>
              <circle cx="12" cy="16" r="1" fill={PRIMARY_COLOR}/>
            </svg>
            Демо-доступ
          </div>
          <div style={styles.demoItem}>
            <span style={styles.demoLabel}>Заказчик:</span>
            <span style={styles.demoCreds}>{DEMO_USERS[0].email}</span>
            <span style={styles.demoCreds}>{DEMO_USERS[0].password}</span>
          </div>
          <div style={styles.demoItem}>
            <span style={styles.demoLabel}>Исполнитель:</span>
            <span style={styles.demoCreds}>{DEMO_USERS[1].email}</span>
            <span style={styles.demoCreds}>{DEMO_USERS[1].password}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
