// src/pages/supplier/SupplierPreviewPage/components/ClicksInfo.jsx
import styles from '../SupplierPreviewPage.module.css'

export default function ClicksInfo({ freeClicksLeft }) {
  return (
    <div className={styles.clicksInfo}>
      <div className={styles.clicksInfoIcon}>
        <ClockIcon />
      </div>
      <div className={styles.clicksInfoContent}>
        <span className={styles.clicksInfoTitle}>
          У вас осталось <strong>{freeClicksLeft}</strong> бесплатных откликов
        </span>
        <p className={styles.clicksInfoText}>
          После отклика вы сможете отправить коммерческое предложение и увидеть полную информацию о заказчике.
        </p>
      </div>
    </div>
  )
}

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
    <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2"/>
  </svg>
)