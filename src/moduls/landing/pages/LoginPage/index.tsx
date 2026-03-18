// src/pages/LoginPage.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { loginModel } from '../../features/Login/login-model'
import { observer } from 'mobx-react-lite'

export const LoginPage = observer(() => {

  const { signIn } = useAuth()

  const {
    email,
    password,
    error,
    setEmail,
    setPassword,
    setError,
    onSubmit,
    isLoading,
    isValidEmail,
  } = loginModel

  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(false)


  // Демо-аккаунты для быстрого входа
  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  const handleSubmit = () => {
    onSubmit(signIn)
  }

  return (
    <div className={`${styles.page}`}>
      <div className={styles.container}>
        {/* Левая колонка - форма входа */}
        <div className={styles.formColumn}>
          <div className={styles.formContainer}>

            <h1 className={styles.title}>Вход в систему</h1>
            <p className={styles.subtitle}>Войдите для работы с платформой</p>

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

            <div className={styles.form}>
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
                    placeholder="@mail.ru"
                    className={`${styles.input} ${focusedInput === 'email' ? styles.inputFocused : ''} ${isValidEmail ? styles.inputValid : ''}`}
                    disabled={isLoading}
                  />

                  {isValidEmail && (
                    <div className={styles.validIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
                        <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" />
                      </svg>
                    </div>
                  )}

                </div>
              </div>

              {/* Пароль */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Пароль</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Введите пароль"
                    className={`${styles.input} ${styles.inputPassword} ${focusedInput === 'password' ? styles.inputFocused : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                        <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Запомнить меня и забыли пароль */}
              <div className={styles.rememberRow}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxLabel}>Запомнить меня</span>
                </label>
                <Link to="/forgot-password" className={styles.forgotLink}>
                  Забыли пароль?
                </Link>
              </div>

              <button
                className={styles.submitButton}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner} />
                    Вход...
                  </>
                ) : (
                  'Войти'
                )}
              </button>
            </div>

            
            {/* Демо-аккаунты */}
            <div className={styles.demoAccounts}>
              <p className={styles.demoTitle}>Демо-аккаунты:</p>
              <div className={styles.demoButtons}>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin('supplier@marketplays.ru', 'Supplier123')}
                >
                  Поставщик
                </button>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin('test_user@main.ru', '123123')}
                >
                  Заказчик
                </button>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin('azizman@mail.ru', '123456')}
                >
                  Админ
                </button>
              </div>
            </div>

            <div className={styles.registerLink}>
              Нет аккаунта? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
            </div>
          </div>
        </div>

        {/* Правая колонка - промо */}
        <div className={styles.promoColumn}>
          <div className={styles.promoContent}>
            <div className={styles.promoBadge}>Платформа для бизнеса</div>

            <h2 className={styles.promoTitle}>
              Управляйте закупками эффективно
            </h2>

            <p className={styles.promoDescription}>
              Единое пространство для заказчиков и поставщиков инженерного оборудования
            </p>

            <div className={styles.promoFeatures}>
              <div className={styles.promoFeature}>
                <span>Создание и управление заявками</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Сбор коммерческих предложений</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Конъюнктурный анализ цен</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Каталог производителей</span>
              </div>
            </div>

            <div className={styles.promoStats}>
              <div className={styles.promoStat}>
                <span className={styles.promoStatValue}>500+</span>
                <span className={styles.promoStatLabel}>компаний</span>
              </div>
              <div className={styles.promoStat}>
                <span className={styles.promoStatValue}>1000+</span>
                <span className={styles.promoStatLabel}>заявок</span>
              </div>
              <div className={styles.promoStat}>
                <span className={styles.promoStatValue}>50+</span>
                <span className={styles.promoStatLabel}>производителей</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})