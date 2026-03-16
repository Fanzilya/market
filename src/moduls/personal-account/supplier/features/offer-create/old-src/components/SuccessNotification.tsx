// src/pages/supplier/CreateOfferPage/components/SuccessNotification.tsx
import styles from '../CreateOfferPage.module.css'

export default function SuccessNotification() {
  return (
    <div className={styles.successNotification}>
      <div className={styles.successIcon}>
        <SuccessIcon />
      </div>
      <div className={styles.successContent}>
        <h3 className={styles.successTitle}>Предложение отправлено!</h3>
        <p className={styles.successMessage}>
          Ваше коммерческое предложение успешно отправлено. Сейчас вы будете перенаправлены на страницу заявки.
        </p>
      </div>
    </div>
  )
}

const SuccessIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#10B981" />
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)