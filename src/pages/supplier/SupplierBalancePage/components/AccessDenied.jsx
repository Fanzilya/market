// src/pages/supplier/SupplierBalancePage/components/AccessDenied.jsx
import styles from '../SupplierBalancePage.module.css'

export default function AccessDenied({ onNavigate }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Сессия не найдена</h2>
        <p>Пожалуйста, войдите в систему для продолжения</p>
        <button onClick={() => onNavigate('/')} className={styles.primaryButton}>
          Перейти к входу
        </button>
      </div>
    </div>
  )
}