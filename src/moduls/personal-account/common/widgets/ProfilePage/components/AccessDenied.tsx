// src/pages/ProfilePage/components/AccessDenied.tsx
import { Link } from 'react-router-dom'
import styles from './WidgetsProfilePage.module.css'

export default function AccessDenied({ onNavigate }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Сессия не найдена</h2>
        <p>Пожалуйста, войдите в систему для продолжения.</p>
        <Link to="/login" className={styles.primaryButton}>
          Перейти к входу
        </Link>
      </div>
    </div>
  )
}