// src/pages/RegisterPage.tsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/user/context/context'
import { registerModel } from '../../features/RegisterPage/register-model'
import { Role } from '@/entities/user/role'
import { observer } from 'mobx-react-lite'
import styles from './RegisterPage.module.css'
import { RegistrRoleButton } from '../../widgets/register-page/register-role-button'
import { Input } from '@/shared/ui-kits/Input'
import { RegisterCompanyForm } from '../../widgets/register-page/company-form'

export const RegisterPage = observer(() => {

  const { user } = useAuth()

  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

  const [focusedInput, setFocusedInput] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    formData,
    error,
    setFormData,
    isLoading,
    handleSubmit,
    setFormCompanyData,
    companyData,
    init,
    types
  } = registerModel

  useEffect(() => {
    setIsMounted(true)
    init()
  }, [])

  const onSubmit = () => {
    handleSubmit(navigate)
  }

  return (
    <div className={`${styles.page} ${isMounted ? styles.pageMounted : ''}`}>
      <div className={styles.container}>
        {/* Левая колонка - форма регистрации */}
        <div className={styles.formColumn}>
          <div className={styles.formContainer}>

            {/* Заголовок */}
            <h1 className={styles.title}>Регистрация</h1>
            <p className={styles.subtitle}>Создайте аккаунт для начала работы</p>

            {/* Выбор роли */}
            <div className={styles.roleSelector}>
              <RegistrRoleButton
                name='Исполнитель'
                styles={styles}
                onClick={() => setFormData('roleName', Role.Supplier)}
                isActive={formData.roleName === Role.Supplier}
                description="Поставщик или Производитель"
              />

              <RegistrRoleButton
                name='Заказчик'
                styles={styles}
                onClick={() => setFormData('roleName', Role.Customer)}
                isActive={formData.roleName === Role.Customer}
                description="Проектная или Подрядная организация"
              />

            </div>

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
              {/* Поля для поставщика */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>ФИО *</label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData("fullName", e)}
                  placeholder="Иванов Иван Иванович"
                  classNames={{ input: styles.input }}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData("email", e)}
                  placeholder="company@example.com"
                  classNames={{ input: styles.input }}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Номер телефона *</label>
                <Input
                  type="phone"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData("phoneNumber", e)}
                  placeholder="+79963363058"
                  classNames={{ input: styles.input }}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Пароль *</label>
                <div className={styles.passwordWrapper}>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData('password', e)}
                    placeholder="Минимум 6 символов"
                    classNames={{ input: styles.input }}
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

              <div className={styles.inputGroup}>
                <label className={styles.label}>Подтверждение пароля *</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData('confirmPassword', e.target.value)}
                    onFocus={() => setFocusedInput('confirmPassword')}
                    onBlur={() => setFocusedInput('')}
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


              {formData.roleName == Role.Supplier && <RegisterCompanyForm formData={companyData} setFormData={setFormCompanyData} isLoading={isLoading} types={types} />}


              <button onClick={onSubmit} className={styles.submitButton} disabled={isLoading}>
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
            </div>
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
})