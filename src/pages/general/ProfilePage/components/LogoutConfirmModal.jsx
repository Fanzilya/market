// src/pages/ProfilePage/components/LogoutConfirmModal.jsx
import styles from '../ProfilePage.module.css'

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIcon}>👋</div>
        <h3 className={styles.modalTitle}>Выйти из аккаунта?</h3>
        <p className={styles.modalMessage}>
          Вы будете перенаправлены на страницу входа
        </p>
        <div className={styles.modalActions}>
          <button className={styles.modalCancel} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.modalConfirm} onClick={onConfirm}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}