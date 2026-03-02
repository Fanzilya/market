import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [role, setRole] = useState('customer')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyAbout, setCompanyAbout] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyInn, setCompanyInn] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
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
        overflowY: 'auto',
        maxHeight: '100vh',
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
        marginBottom: 32,
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
        marginBottom: 28,
        lineHeight: 1.6,
        textAlign: 'left',
        width: '100%',
        maxWidth: 400,
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: '100%',
        maxWidth: 400,
      },
      segment: {
        display: 'flex',
        gap: 10,
        marginBottom: 20,
        padding: '5px',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
      },
      segmentButton: (active) => ({
        flex: 1,
        padding: '11px 14px',
        fontSize: 13,
        fontWeight: 600,
        color: active ? '#ffffff' : '#64748b',
        backgroundColor: active ? PRIMARY_COLOR : 'transparent',
        border: 'none',
        borderRadius: 8,
        cursor: active ? 'default' : 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: active ? `0 4px 12px ${PRIMARY_COLOR}44` : 'none',
      }),
      inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      },
      label: {
        fontSize: 14,
        fontWeight: 600,
        color: '#334155',
      },
      required: {
        color: '#ef4444',
        fontSize: 16,
      },
      inputWrapper: {
        position: 'relative',
      },
      input: {
        width: '100%',
        padding: '14px 16px',
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
      inputError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
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
      textarea: {
        width: '100%',
        padding: '14px 16px',
        fontSize: 15,
        border: '2px solid #e2e8f0',
        borderRadius: 12,
        outline: 'none',
        transition: 'all 0.25s ease',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        boxSizing: 'border-box',
        resize: 'vertical',
        minHeight: 90,
        fontFamily: 'inherit',
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
      roleIcon: {
        width: 18,
        height: 18,
        marginRight: 6,
      },
    }),
    [isMounted, PRIMARY_COLOR, PRIMARY_DARK, BG_BLUE],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const cleanedInn = companyInn.replace(/\s/g, '')
    const innDigitsOnly = cleanedInn.replace(/\D/g, '')
    const isInnValid = innDigitsOnly.length === 10 || innDigitsOnly.length === 12

    if (!fullName || !email || !password) {
      setError('Пожалуйста, заполните все обязательные поля')
      return
    }
    if (fullName.trim().length < 5) {
      setError('Введите ФИО (минимум 5 символов)')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Введите корректный email адрес')
      return
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }
    if (role === 'supplier') {
      if (!companyName || !companyInn) {
        setError('Пожалуйста, заполните все поля')
        return
      }
      if (companyName.trim().length < 2) {
        setError('Название компании должно содержать минимум 2 символа')
        return
      }
      
      if (!/^\d+$/.test(innDigitsOnly) || !isInnValid) {
        setError('Введите корректный ИНН (10 или 12 цифр)')
        return
      }
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      console.log('Регистрация:', {
        role,
        fullName: fullName.trim(),
        email: email.trim(),
        ...(role === 'supplier'
          ? {
              companyName: companyName.trim(),
              companyInn: innDigitsOnly,
              
            }
          : {}),
      })
      setSuccess('✓ Регистрация успешна! Перенаправляем на вход…')
      setTimeout(() => navigate('/', { replace: true }), 1200)
    } catch {
      setError('Ошибка регистрации. Попробуйте снова.')
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

        <h1 style={styles.title}>Регистрация</h1>
        <p style={styles.subtitle}>Создайте аккаунт для начала работы</p>

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

        {/* Выбор роли */}
        <div style={{ ...styles.segment, width: '100%', maxWidth: 400 }}>
          <button
            type="button"
            onClick={() => setRole('supplier')}
            style={styles.segmentButton(role === 'supplier')}
            disabled={isLoading}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={styles.roleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Исполнитель (поставщик)
            </span>
          </button>
          <button
            type="button"
            onClick={() => setRole('customer')}
            style={styles.segmentButton(role === 'customer')}
            disabled={isLoading}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={styles.roleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Заказчик (проектировщик)
            </span>
          </button>
        </div>

        <form onSubmit={onSubmit} style={styles.form}>
          {role === 'supplier' && (
            <>
              {/* <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Про компанию <span style={styles.required}>*</span>
                </label>
                <textarea
                  value={companyAbout}
                  onChange={(e) => setCompanyAbout(e.target.value)}
                  onFocus={() => setFocusedInput('companyAbout')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Коротко опишите компанию"
                  style={{
                    ...styles.textarea,
                    ...(focusedInput === 'companyAbout' ? styles.inputFocus : {}),
                    ...(error && !companyAbout ? styles.inputError : {}),
                  }}
                  disabled={isLoading}
                />
              </div> */}

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Название компании <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onFocus={() => setFocusedInput('companyName')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="ООО «Название»"
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'companyName' ? styles.inputFocus : {}),
                    ...(error && !companyName ? styles.inputError : {}),
                  }}
                  disabled={isLoading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  ИНН <span style={styles.required}>*</span>
                </label>
                <input
                  inputMode="numeric"
                  value={companyInn}
                  onChange={(e) => setCompanyInn(e.target.value)}
                  onFocus={() => setFocusedInput('companyInn')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="10 или 12 цифр"
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'companyInn' ? styles.inputFocus : {}),
                    ...(error && !companyInn ? styles.inputError : {}),
                  }}
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              ФИО <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setFocusedInput('fullName')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Иванов Иван Иванович"
              style={{
                ...styles.input,
                ...(focusedInput === 'fullName' ? styles.inputFocus : {}),
                ...(error && !fullName ? styles.inputError : {}),
              }}
              disabled={isLoading}
              autoComplete="name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Email <span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
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
                  ...(error && !email ? styles.inputError : {}),
                }}
                disabled={isLoading}
                autoComplete="email"
              />
              {isValidEmail && !error && (
                <div style={styles.validIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Пароль <span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Минимум 6 символов"
                style={{
                  ...styles.input,
                  paddingRight: '50px',
                  ...(focusedInput === 'password' ? styles.inputFocus : {}),
                  ...(error && !password ? styles.inputError : {}),
                }}
                disabled={isLoading}
                autoComplete="new-password"
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
              ...(isLoading ? styles.primaryButtonDisabled : {}),
              ...(isPrimaryHovered && !isLoading ? styles.primaryButtonHover : {}),
            }}
            disabled={isLoading}
          >
            <span style={styles.buttonContent}>
              {isLoading && <span style={styles.spinner} />}
              {isLoading ? 'Регистрация…' : 'Зарегистрироваться'}
            </span>
          </button>
        </form>

        <div style={styles.footer}>
          Уже есть аккаунт?{' '}
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
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#1877F2' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' }} />
          </div> */}
        </div>
      </div>
    </div>
  )
}
