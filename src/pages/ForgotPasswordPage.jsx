// src/pages/ForgotPasswordPage.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ForgotPasswordPage.module.css'

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
    <div className={`${styles.page} ${isMounted ? styles.pageMounted : ''}`}>
      <div className={styles.container}>
        {/* Левая колонка - форма восстановления пароля */}
        <div className={styles.formColumn}>
          <div className={styles.formContainer}>
            {/* Логотип */}
            <div className={styles.logo} onClick={() => navigate('/')}>
              <svg className={styles.logoIcon} viewBox="0 0 40 40" fill="none">
                <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)" />
                <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7" />
                <defs>
                  <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16">
                    <stop stopColor="#10B981" />
                    <stop offset="1" stopColor="#4A85F6" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28">
                    <stop stopColor="#4A85F6" />
                    <stop offset="1" stopColor="#3A6BC9" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoText}>Лого</span>
            </div>

            <h1 className={styles.title}>Восстановление пароля</h1>
            <p className={styles.subtitle}>
              Введите email адрес, указанный при регистрации. Мы отправим вам инструкцию по восстановлению пароля.
            </p>

            {error && (
              <div className={styles.errorMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FECACA" />
                  <path d="M12 7V13" stroke="#DC2626" strokeWidth="2" />
                  <circle cx="12" cy="17" r="1.5" fill="#DC2626" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className={styles.successMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#BBF7D0" />
                  <path d="M8 12L11 15L16 9" stroke="#16A34A" strokeWidth="2" />
                </svg>
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className={styles.form}>
              {/* Email */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="your.email@example.com"
                    className={`${styles.input} ${focusedInput === 'email' ? styles.inputFocused : ''} ${isValidEmail && !success ? styles.inputValid : ''}`}
                    disabled={isLoading || !!success}
                  />
                  {isValidEmail && !success && (
                    <div className={styles.validIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
                        <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || !!success}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner} />
                    Отправка...
                  </>
                ) : (
                  'Отправить инструкцию'
                )}
              </button>
            </form>

            <Link to="/login" className={styles.backLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="#4A85F6" strokeWidth="2" />
                <path d="M12 19L5 12L12 5" stroke="#4A85F6" strokeWidth="2" />
              </svg>
              Вернуться к входу
            </Link>

            <div className={styles.loginLink}>
              Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
            </div>
          </div>
        </div>

        {/* Правая колонка - промо */}
        <div className={styles.promoColumn}>
          <div className={styles.promoContent}>
            <div className={styles.promoBadge}>Платформа для бизнеса</div>

            <h2 className={styles.promoTitle}>
              Безопасное восстановление доступа
            </h2>

            <p className={styles.promoDescription}>
              Мы заботимся о безопасности ваших данных. Восстановление пароля происходит через подтверждение email адреса.
            </p>

            <div className={styles.promoFeatures}>
              <div className={styles.promoFeature}>
                <span>Мгновенная отправка инструкций</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Безопасная ссылка для сброса</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Поддержка 24/7</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Защита персональных данных</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}