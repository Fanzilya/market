// src/pages/supplier/SupplierBalancePage/components/BalanceCard.tsx
import styles from '../SupplierBalancePage.module.css'
import { formatPrice } from '../utils/formatters'

export default function BalanceCard({ balanceData, onViewHistory }) {
  return (
    <div className={styles.balanceCard}>
      <div className={styles.balanceHeader}>
        <div className={styles.balanceTitle}>
          <CoinIcon />
          <span>Текущий баланс</span>
        </div>
        <div className={styles.balanceActions}>
          <button className={styles.historyButton} onClick={onViewHistory}>
            <HistoryIcon />
            История
          </button>
        </div>
      </div>

      <div className={styles.balanceAmount}>
        <span className={styles.coinIcon}>🪙</span>
        <span className={styles.coinValue}>{balanceData.coins.toLocaleString()}</span>
        <span className={styles.coinLabel}>монет</span>
      </div>

      <div className={styles.balanceStats}>
        <StatItem
          label="Бесплатных откликов"
          value={balanceData.freeClicks}
        />
        <StatItem
          label="Всего откликов"
          value={balanceData.totalClicks}
        />
        <StatItem
          label="Потрачено всего"
          value={formatPrice(balanceData.totalSpent)}
        />
      </div>
    </div>
  )
}

const StatItem = ({ label, value }) => (
  <div className={styles.statItem}>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statValue}>{value}</span>
  </div>
)

const CoinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
    <path d="M12 6V18M8 9H16M8 15H16" stroke="#B8860B" strokeWidth="2" />
  </svg>
)

const HistoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" />
  </svg>
)