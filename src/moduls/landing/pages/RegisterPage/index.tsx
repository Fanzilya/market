// src/pages/RegisterPage.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Role } from '@/entities/user/role'
import { observer } from 'mobx-react-lite'
import styles from './RegisterPage.module.css'
import { RegistrRoleButton } from '../../widgets/register-page/register-role-button'
import { RegistrForm } from '../../widgets/register-page/register-form'
import { CustomerForm } from '../../widgets/register-page/customer-form'

export const RegisterPage = observer(() => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])


  // const onSubmit = () => {
  //   handleSubmit(navigate)
  // }


  const [roleName, setRoleName] = useState<Role.Customer | Role.Supplier>(Role.Customer)


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
                name='Заказчик'
                styles={styles}
                onClick={() => setRoleName(Role.Customer)}
                isActive={roleName === Role.Customer}
                description="Проектная или Подрядная организация"
              />
              <RegistrRoleButton
                name='Исполнитель'
                styles={styles}
                onClick={() => setRoleName(Role.Supplier)}
                isActive={roleName === Role.Supplier}
                description="Поставщик или Производитель"
              />
            </div>

            <div className={styles.form}>

              {/* {roleName == Role.Customer && <CustomerForm styles={styles} />} */}
              <RegistrForm styles={styles} roleName={roleName} />

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