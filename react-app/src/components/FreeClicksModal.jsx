// components/FreeClicksModal.jsx
import styles from './FreeClicksModal.module.css'

export default function FreeClicksModal({ clicksLeft, onConfirm, onClose, onGoToBilling }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
            <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h2 className={styles.title}>Бесплатный просмотр</h2>
        
        <p className={styles.message}>
          У вас осталось <strong>{clicksLeft}</strong> {getClicksWord(clicksLeft)} для просмотра контактной информации заказчика.
        </p>
        
        <div className={styles.infoBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
            <path d="M12 16V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="8" r="1" fill="#F59E0B"/>
          </svg>
          <span>
            После использования бесплатных просмотров, каждый следующий просмотр будет стоить 100 ₽. 
            Средства будут списаны с вашего счета.
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Продолжить бесплатно
          </button>
        </div>

        <button className={styles.billingLink} onClick={onGoToBilling}>
          Перейти к тарифам и оплате →
        </button>
      </div>
    </div>
  )
}

function getClicksWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'бесплатный клик'
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'бесплатных клика'
  return 'бесплатных кликов'
}