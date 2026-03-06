// src/pages/SupplierPage/components/StatsBar.jsx
import styles from '../SupplierPage.module.css'

export default function StatsBar({ stats, freeClicksLeft }) {
  return (
    <div className={styles.statsBar}>
      <StatItem label="Доступно заявок:" value={stats.totalRequests} />
      <StatItem label="Мои отклики:" value={stats.myOffersCount} />
      <StatItem label="Новых:" value={stats.newRequestsCount} />
      <StatItem label="Осталось кликов:" value={freeClicksLeft} />
    </div>
  )
}

const StatItem = ({ label, value }) => (
  <div className={styles.stat}>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statValue}>{value}</span>
  </div>
)