// src/pages/SupplierPage/components/AccessDenied.tsx
import styles from '../SupplierPage.module.css'

const messages = {
  session: {
    icon: '⚠️',
    title: 'Сессия не найдена',
    message: 'Пожалуйста, войдите в систему для продолжения',
    button: 'Перейти к входу'
  },
  role: {
    icon: '🔒',
    title: 'Доступ запрещен',
    message: 'Эта страница доступна только поставщикам',
    button: 'Вернуться на главную'
  }
}

export default function AccessDenied({ type = 'session', onNavigate }) {
  const { icon, title, message, button } = messages[type]

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>{icon}</div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button
          onClick={() => onNavigate('/')}
          className={styles.primaryButton}
        >
          {button}
        </button>
      </div>
    </div>
  )
}