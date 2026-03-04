// src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({
    // Общие поля
    email: '',
    password: '',
    confirmPassword: '',
    role: 'supplier', // supplier или customer
    
    // Для поставщика (ИНН, компания)
    inn: '',
    companyName: '',
    
    // Для заказчика (ФИО)
    fullName: ''
  })
  const [focusedInput, setFocusedInput] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Если пользователь уже авторизован, редирект на дашборд
    const user = getSessionUser()
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const validateForm = () => {
    // Общие проверки
    if (!formData.email.trim()) {
      setError('Укажите email')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Введите корректный email адрес')
      return false
    }
    if (!formData.password) {
      setError('Введите пароль')
      return false
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return false
    }

    // Проверки в зависимости от роли
    if (formData.role === 'supplier') {
      if (!formData.inn.trim()) {
        setError('Укажите ИНН компании')
        return false
      }
      if (formData.inn.length !== 10 && formData.inn.length !== 12) {
        setError('ИНН должен содержать 10 или 12 цифр')
        return false
      }
      if (!formData.companyName.trim()) {
        setError('Укажите название компании')
        return false
      }
    } else {
      if (!formData.fullName.trim()) {
        setError('Укажите ваше ФИО')
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)

    // Имитация регистрации
    setTimeout(() => {
      console.log('Регистрация:', formData)
      navigate('/login', { 
        state: { 
          message: 'Регистрация успешна! Теперь вы можете войти в систему.' 
        } 
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleRoleChange = (role) => {
    setFormData({ 
      ...formData, 
      role,
      // Очищаем поля при смене роли
      inn: '',
      companyName: '',
      fullName: ''
    })
  }

  return (
    <div className={`${styles.page} ${isMounted ? styles.pageMounted : ''}`}>
      <div className={styles.container}>
        {/* Левая колонка - форма регистрации */}
        <div className={styles.formColumn}>
          <div className={styles.formContainer}>
            {/* Логотип */}
            <div className={styles.logo} onClick={() => navigate('/')}>
              <svg className={styles.logoIcon} viewBox="0 0 40 40" fill="none">
                <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)"/>
                <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7"/>
                <defs>
                  <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16">
                    <stop stopColor="#10B981"/>
                    <stop offset="1" stopColor="#4A85F6"/>
                  </linearGradient>
                  <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28">
                    <stop stopColor="#4A85F6"/>
                    <stop offset="1" stopColor="#3A6BC9"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoText}>Лого</span>
            </div>

            {/* Заголовок */}
            <h1 className={styles.title}>Регистрация</h1>
            <p className={styles.subtitle}>Создайте аккаунт для начала работы</p>

            {/* Выбор роли */}
            <div className={styles.roleSelector}>
              <button
                type="button"
                className={`${styles.roleButton} ${formData.role === 'supplier' ? styles.roleButtonActive : ''}`}
                onClick={() => handleRoleChange('supplier')}
              >
                Исполнитель (поставщик)
              </button>
              <button
                type="button"
                className={`${styles.roleButton} ${formData.role === 'customer' ? styles.roleButtonActive : ''}`}
                onClick={() => handleRoleChange('customer')}
              >
                Заказчик (проектировщик)
              </button>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FECACA"/>
                  <path d="M12 7V13" stroke="#DC2626" strokeWidth="2"/>
                  <circle cx="12" cy="17" r="1.5" fill="#DC2626"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Поля для поставщика */}
              {formData.role === 'supplier' && (
                <>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>ИНН *</label>
                    <input
                      type="text"
                      value={formData.inn}
                      onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                      onFocus={() => setFocusedInput('inn')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="1234567890"
                      className={`${styles.input} ${focusedInput === 'inn' ? styles.inputFocused : ''}`}
                      disabled={isLoading}
                      maxLength="12"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Название компании *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      onFocus={() => setFocusedInput('companyName')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="ООО «Компания»"
                      className={`${styles.input} ${focusedInput === 'companyName' ? styles.inputFocused : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}

              {/* Поля для заказчика */}
              {formData.role === 'customer' && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>ФИО *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    onFocus={() => setFocusedInput('fullName')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Иванов Иван Иванович"
                    className={`${styles.input} ${focusedInput === 'fullName' ? styles.inputFocused : ''}`}
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Общие поля для всех */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="company@example.com"
                  className={`${styles.input} ${focusedInput === 'email' ? styles.inputFocused : ''}`}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Пароль *</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Минимум 6 символов"
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
                        <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Подтверждение пароля *</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    onFocus={() => setFocusedInput('confirmPassword')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Повторите пароль"
                    className={`${styles.input} ${styles.inputPassword} ${focusedInput === 'confirmPassword' ? styles.inputFocused : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner} />
                    Регистрация...
                  </>
                ) : (
                  'Зарегистрироваться'
                )}
              </button>

              <div className={styles.loginLink}>
                Уже есть аккаунт? <Link to="/login" className={styles.link}>Войти</Link>
              </div>
            </form>
          </div>
        </div>

        {/* Правая колонка - реклама для производителей */}
        <div className={styles.promoColumn}>
          <div className={styles.promoContent}>
            <div className={styles.promoBadge}>Для производителей</div>
            
            <h2 className={styles.promoTitle}>
              Хотите разместить свою продукцию?
            </h2>

            <p className={styles.promoDescription}>
              Зарегистрируйтесь как <strong>Исполнитель</strong> и получите доступ к инструментам для продвижения вашего бренда.
            </p>

            <div className={styles.promoFeatures}>
              <div className={styles.promoFeature}>
                <span>Размещение неограниченного количества товаров</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Прямые запросы от заказчиков</span>
              </div>
              <div className={styles.promoFeature}>
                <span>Статистика просмотров и аналитика</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}