import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
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
        borderRadius: 12,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        width: '100%',
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
        borderRadius: 12,
        fontSize: 14,
        marginBottom: 18,
        border: '1px solid #fecaca',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      },
      successMessage: {
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
        padding: '14px 16px',
        borderRadius: 12,
        fontSize: 14,
        marginBottom: 18,
        border: '1px solid #bbf7d0',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        lineHeight: 1.5,
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
      backIcon: {
        marginRight: 8,
      },
    }),
    [isMounted, PRIMARY_COLOR, PRIMARY_DARK, BG_BLUE],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email) {
      setError('Пожалуйста, введите email адрес')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Введите корректный email адрес')
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(
        'Инструкции по восстановлению пароля отправлены на указанный email адрес. Проверьте почту.',
      )
      setEmail('')
    } catch {
      setError('Ошибка отправки. Попробуйте снова.')
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
          <span className="logo-text" style={styles.logoText}>Logo</span>
        </div>

        <h1 style={styles.title}>Восстановление пароля</h1>
        <p style={styles.subtitle}>
          Введите email адрес, указанный при регистрации. Мы отправим вам инструкцию по восстановлению пароля.
        </p>

        {error && (
          <div className="shake-animation" style={{ ...styles.errorMessage, width: '100%', maxWidth: 400 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#fecaca"/>
              <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1.5" fill="#dc2626"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ ...styles.successMessage, width: '100%', maxWidth: 400 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#bbf7d0"/>
              <path d="M8 12L11 15L16 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{success}</span>
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
                  ...(isValidEmail && !success ? styles.inputValid : {}),
                }}
                disabled={isLoading || !!success}
                autoComplete="email"
              />
              {isValidEmail && !success && (
                <div style={styles.validIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            onMouseEnter={() => !isLoading && !success && setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
            style={{
              ...styles.primaryButton,
              ...(isLoading || !!success ? styles.primaryButtonDisabled : {}),
              ...(isPrimaryHovered && !isLoading && !success ? styles.primaryButtonHover : {}),
            }}
            disabled={isLoading || !!success}
          >
            <span style={styles.buttonContent}>
              {isLoading && <span style={styles.spinner} />}
              {isLoading ? 'Отправка...' : 'Отправить инструкцию'}
            </span>
          </button>
        </form>

        <div style={{ ...styles.footerButtons, marginTop: 24, width: '100%', maxWidth: 400 }}>
          <Link
            to="/"
            style={{ ...styles.secondaryButton, border: 'none', padding: 0, margin: 0 }}
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
              <svg style={styles.backIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Вернуться к входу
            </span>
          </Link>
        </div>

        <div style={styles.footer}>
          Вспомнили пароль?{' '}
          <Link to="/" style={styles.footerLink}>
            Войти
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
              <rect width="520" height="340" fill="#ffffff"/>
              <rect x="0" y="0" width="520" height="60" fill="#f8fafc"/>
              <circle cx="30" cy="30" r="8" fill="#10B981"/>
              <circle cx="55" cy="30" r="8" fill="#1877F2"/>
              <rect x="80" y="22" width="120" height="16" rx="4" fill="#e2e8f0"/>
              <rect x="400" y="20" width="100" height="20" rx="6" fill="#1877F2" opacity="0.2"/>
              <rect x="410" y="25" width="40" height="10" rx="2" fill="#1877F2"/>
              <rect x="20" y="80" width="150" height="120" rx="8" fill="#f1f5f9"/>
              <rect x="30" y="95" width="100" height="8" rx="4" fill="#cbd5e1"/>
              <rect x="30" y="115" width="80" height="6" rx="3" fill="#e2e8f0"/>
              <rect x="30" y="130" width="60" height="6" rx="3" fill="#e2e8f0"/>
              <rect x="190" y="80" width="310" height="120" rx="8" fill="#f1f5f9"/>
              <rect x="200" y="95" width="150" height="8" rx="4" fill="#cbd5e1"/>
              <path d="M200 180 L240 160 L280 175 L320 145 L360 165 L400 140 L440 155 L480 130" stroke="#1877F2" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M200 190 L240 185 L280 195 L320 180 L360 190 L400 175 L440 185 L480 170" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
              <rect x="20" y="220" width="230" height="100" rx="8" fill="#f1f5f9"/>
              <rect x="30" y="235" width="100" height="8" rx="4" fill="#cbd5e1"/>
              <circle cx="130" cy="270" r="30" fill="#1877F2" opacity="0.3"/>
              <circle cx="130" cy="270" r="20" fill="#1877F2" opacity="0.5"/>
              <circle cx="130" cy="270" r="10" fill="#1877F2"/>
              <rect x="270" y="220" width="230" height="100" rx="8" fill="#f1f5f9"/>
              <rect x="280" y="235" width="100" height="8" rx="4" fill="#cbd5e1"/>
              <rect x="280" y="255" width="200" height="12" rx="4" fill="#e2e8f0"/>
              <rect x="280" y="275" width="180" height="12" rx="4" fill="#e2e8f0"/>
              <rect x="280" y="295" width="160" height="12" rx="4" fill="#e2e8f0"/>
            </svg>
          </div>

          {/* <h2 style={styles.rightTitle}>
            Easy-to-Use Dashboard for<br />Managing Your Business.
          </h2>
          <p style={styles.rightSubtitle}>
            Streamline Your Business Management with Our User-Friendly Dashboard. Simplify complex tasks, track key metrics, and make informed decisions effortlessly.
          </p>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 40 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#1877F2' }} />
          </div> */}
        </div>
      </div>
    </div>
  )
}
