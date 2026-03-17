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
import { SuplierForm } from '../../widgets/register-page/suplier-form'
import { CustomerForm } from '../../widgets/register-page/customer-form'

export const RegisterPage = observer(() => {

  const { user } = useAuth()

  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

  const {
    formData,
    error,
    setFormData,
    isLoading,
    handleSubmit,
    setFormCompanyData,
    companyData,
    init,
    types,

    setFnsValue,
    fnsValue,
    searchCompany,
  } = registerModel

  useEffect(() => {
    setIsMounted(true)
    init()
  }, [])

  const onSubmit = () => {
    handleSubmit(navigate)
  }


  const [tabForm, setTabForm] = useState<number>(1)


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


              {formData.roleName == Role.Customer && <CustomerForm styles={styles} formData={formData} setFormData={setFormData} isLoading={isLoading} onSubmit={onSubmit} />}
              {formData.roleName == Role.Supplier && tabForm == 1 && <SuplierForm styles={styles} formData={formData} setFormData={setFormData} isLoading={isLoading} onSubmit={onSubmit} tabForm={tabForm} setTabForm={setTabForm} />}
              {formData.roleName == Role.Supplier && tabForm == 2 && <RegisterCompanyForm formData={companyData} setFormData={setFormCompanyData} isLoading={isLoading} types={types} setFnsValue={setFnsValue} fnsValue={fnsValue} searchCompany={searchCompany} />}



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