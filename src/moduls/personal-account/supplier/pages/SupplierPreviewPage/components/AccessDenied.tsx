// src/pages/supplier/SupplierPreviewPage/components/AccessDenied.tsx
import styles from '../SupplierPreviewPage.module.css'

const messages = {
  session: {
    icon: '⚠️',
    title: 'Сессия не найдена',
    message: 'Пожалуйста, войдите в систему для продолжения',
    button: 'Перейти к входу'
  },
  notFound: {
    icon: '🔍',
    title: 'Заявка не найдена',
    message: 'Запрошенная заявка не существует или была удалена',
    button: 'Вернуться к списку'
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
          onClick={() => onNavigate(type === 'session' ? '/' : '/supplier')}
          className={styles.primaryButton}
        >
          {button}
        </button>
      </div>
    </div>
  )
}