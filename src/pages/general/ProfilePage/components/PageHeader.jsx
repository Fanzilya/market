// src/pages/ProfilePage/components/PageHeader.jsx
import { Link } from 'react-router-dom'
import styles from '../ProfilePage.module.css'

export default function PageHeader({ onNavigate }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Профиль</h1>
        <div className={styles.breadcrumbs}>
          <Link to="/dashboard" className={styles.breadcrumbLink}>Главная</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Профиль</span>
        </div>
      </div>

      <div className={styles.headerActions}>
        <button
          className={styles.actionButton}
          onClick={() => onNavigate('/settings')}
        >
          <SettingsIcon />
          Настройки
        </button>
      </div>
    </div>
  )
}

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="currentColor" strokeWidth="2" />
    <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="currentColor" strokeWidth="2" />
    <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="currentColor" strokeWidth="2" />
    <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="currentColor" strokeWidth="2" />
  </svg>
)