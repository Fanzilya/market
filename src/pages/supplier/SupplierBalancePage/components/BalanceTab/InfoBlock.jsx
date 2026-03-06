// src/pages/supplier/SupplierBalancePage/components/BalanceTab/InfoBlock.jsx
import styles from '../../SupplierBalancePage.module.css'

export default function InfoBlock() {
  return (
    <div className={styles.infoBlock}>
      <InfoIcon />
      <div>
        <strong>Как это работает</strong>
        <p>1 монета = 1 отклик на заявку. Бонусные монеты начисляются автоматически при пополнении. Срок действия монет не ограничен.</p>
      </div>
    </div>
  )
}

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
    <path d="M12 8V12M12 16H12.01" stroke="#4A85F6" strokeWidth="2"/>
  </svg>
)