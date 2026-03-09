// src/pages/SupplierPage/components/Header.tsx
import styles from '../SupplierPage.module.css'

export default function Header({ user, freeClicksLeft, onNavigate }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.pageTitle}>Доступные заявки</h1>
        <div className={styles.breadcrumbs}>
          <span className={styles.breadcrumb} onClick={() => onNavigate('/dashboard')}>
            Главная
          </span>
          <span className={styles.separator}>›</span>
          <span className={styles.breadcrumbActive}>Заявки</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.clicksCounter}>
          <ClockIcon />
          <span>
            Бесплатных кликов: <strong>{freeClicksLeft}</strong>
          </span>
        </div>
        <div className={styles.companyInfo}>
          <span className={styles.companyLabel}>Компания</span>
          <span className={styles.companyName}>
            {user.company?.name || 'Не указана'}
          </span>
        </div>
      </div>
    </div>
  )
}

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2" strokeLinecap="round" />
  </svg>
)