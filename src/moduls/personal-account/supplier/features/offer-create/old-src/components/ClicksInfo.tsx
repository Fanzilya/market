// src/pages/supplier/CreateOfferPage/components/ClicksInfo.tsx
import styles from '../CreateOfferPage.module.css'

export default function ClicksInfo() {
  return (
    <div className={styles.clicksInfo}>
      <ClockIcon />
      <div>
        <strong>Использован 1 бесплатный отклик</strong>
        <p>После отправки КП вам станет доступна полная информация о заказчике.</p>
      </div>
    </div>
  )
}

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2" />
  </svg>
)