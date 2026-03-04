// components/LogoutConfirm.jsx
import styles from './LogoutConfirm.module.css'

export default function LogoutConfirm({ onClose, onConfirm }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>👋</span>
        </div>
        
        <h3 className={styles.title}>Выйти из аккаунта?</h3>
        <p className={styles.message}>
          Вы уверены, что хотите выйти? Вы будете перенаправлены на страницу входа.
        </p>
        
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Остаться
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}