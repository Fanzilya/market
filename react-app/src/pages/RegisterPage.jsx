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

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_LIGHT = '#6A95F6'
  const PRIMARY_BG = '#4A85F615'

  const styles = useMemo(
    () => ({
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
      },
      bgShape: {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        filter: 'blur(80px)',
      },
      shape1: {
        width: '500px',
        height: '500px',
        top: '-200px',
        right: '-150px',
      },
      shape2: {
        width: '350px',
        height: '350px',
        bottom: '-150px',
        left: '-100px',
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 25px 50px -12px rgba(74, 133, 246, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: 520,
        position: 'relative',
        zIndex: 1,
        transform: isMounted ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.98)',
        opacity: isMounted ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
      },
      logo: {
        width: 60,
        height: 60,
        margin: '0 auto 18px',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 10px 25px ${PRIMARY}55`,
      },
      title: {
        fontSize: 26,
        fontWeight: 700,
        color: '#1a1a2e',
        marginBottom: 6,
        textAlign: 'center',
        letterSpacing: '-0.3px',
      },
      subtitle: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 28,
        lineHeight: 1.5,
      },
      segment: {
        display: 'flex',
        gap: 10,
        marginBottom: 26,
        padding: '5px',
        backgroundColor: PRIMARY_BG,
        borderRadius: 14,
      },
      segmentButton: (active) => ({
        flex: 1,
        padding: '12px 16px',
        fontSize: 14,
        fontWeight: 600,
        color: active ? '#ffffff' : '#64748b',
        backgroundColor: active ? PRIMARY : 'transparent',
        border: 'none',
        borderRadius: 10,
        cursor: active ? 'default' : 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: active ? `0 4px 12px ${PRIMARY}44` : 'none',
      }),
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      },
      inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
      },
      label: {
        fontSize: 14,
        fontWeight: 600,
        color: '#334155',
        marginLeft: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
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
        padding: '14px 18px',
        fontSize: 15,
        border: '2px solid #e2e8f0',
        borderRadius: 12,
        outline: 'none',
        transition: 'all 0.25s ease',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        padding: '14px 18px',
        fontSize: 15,
        border: '2px solid #e2e8f0',
        borderRadius: 12,
        outline: 'none',
        transition: 'all 0.25s ease',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        boxSizing: 'border-box',
        resize: 'vertical',
        minHeight: 100,
        fontFamily: 'inherit',
      },
      inputFocus: {
        borderColor: PRIMARY,
        backgroundColor: '#ffffff',
        boxShadow: `0 0 0 4px ${PRIMARY}22`,
      },
      inputError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
      },
      passwordToggle: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        padding: '6px',
        borderRadius: 6,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      primaryButton: {
        padding: '16px 24px',
        fontSize: 16,
        fontWeight: 600,
        color: '#ffffff',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        marginTop: 6,
        boxShadow: `0 4px 14px ${PRIMARY}55`,
        position: 'relative',
        overflow: 'hidden',
      },
      primaryButtonHover: {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${PRIMARY}66`,
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
        color: PRIMARY,
        backgroundColor: 'transparent',
        border: `2px solid ${PRIMARY}`,
        borderRadius: 12,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        width: '100%',
        boxSizing: 'border-box',
      },
      secondaryButtonHover: {
        backgroundColor: `${PRIMARY}08`,
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
      },
      footer: {
        marginTop: 24,
        textAlign: 'center',
      },
      muted: {
        color: '#64748b',
        fontSize: 14,
      },
      footerButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginTop: 18,
        paddingTop: 24,
        borderTop: '1px solid #e2e8f0',
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
        width: 20,
        height: 20,
        marginRight: 8,
      },
    }),
    [isMounted, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false)

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
      if (!companyName || !companyAbout || !companyInn) {
        setError('Пожалуйста, заполните все поля')
        return
      }
      if (companyName.trim().length < 2) {
        setError('Название компании должно содержать минимум 2 символа')
        return
      }
      if (companyAbout.trim().length < 10) {
        setError('Поле "Про компанию" должно содержать минимум 10 символов')
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
              companyAbout: companyAbout.trim(),
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
        @media (max-width: 540px) {
          .register-card {
            padding: 36px 24px !important;
          }
        }
      `}</style>

      <div style={{ ...styles.bgShape, ...styles.shape1 }} />
      <div style={{ ...styles.bgShape, ...styles.shape2 }} />

      <div className="register-card" style={styles.card}>
        <div style={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 16.7909 14.2091 15 12 15C9.79086 15 8 16.7909 8 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        <h2 style={styles.title}>Регистрация</h2>
        <p style={styles.subtitle}>Создайте аккаунт для начала работы</p>

        {error && (
          <div className="shake-animation" style={styles.errorMessage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#fecaca"/>
              <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1.5" fill="#dc2626"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={styles.successMessage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#bbf7d0"/>
              <path d="M8 12L11 15L16 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{success}</span>
          </div>
        )}

        <div style={styles.segment}>
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
              Исполнитель
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
              Заказчик
            </span>
          </button>
        </div>

        <form onSubmit={onSubmit} style={styles.form}>
          {role === 'supplier' && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Про компанию
                  <span style={styles.required}>*</span>
                </label>
                <textarea
                  value={companyAbout}
                  onChange={(e) => setCompanyAbout(e.target.value)}
                  onFocus={() => setFocusedInput('companyAbout')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Коротко опишите компанию (чем занимаетесь, опыт, услуги)"
                  style={{
                    ...styles.textarea,
                    ...(focusedInput === 'companyAbout' ? styles.inputFocus : {}),
                    ...(error && !companyAbout ? styles.inputError : {}),
                  }}
                  disabled={isLoading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Название компании
                  <span style={styles.required}>*</span>
                </label>
                <div style={styles.inputWrapper}>
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
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  ИНН
                  <span style={styles.required}>*</span>
                </label>
                <div style={styles.inputWrapper}>
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
              </div>
            </>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Фамилия Имя Отчество
              <span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
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
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Email
              <span style={styles.required}>*</span>
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
                  ...(error && !email ? styles.inputError : {}),
                }}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Пароль
              <span style={styles.required}>*</span>
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
                onMouseEnter={(e) => e.target.style.color = PRIMARY}
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
          <span style={styles.muted}>Уже есть аккаунт?</span>
        </div>

        <div style={styles.footerButtons}>
          <Link
            to="/"
            style={{ ...styles.secondaryButton, border: 'none', padding: 0, margin: 0 }}
            onMouseEnter={() => setIsSecondaryHovered(true)}
            onMouseLeave={() => setIsSecondaryHovered(false)}
          >
            <span style={{
              ...styles.secondaryButton,
              ...(isSecondaryHovered ? styles.secondaryButtonHover : {}),
              border: `2px solid ${PRIMARY}`,
              width: '100%',
              boxSizing: 'border-box',
            }}>
              Войти
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
