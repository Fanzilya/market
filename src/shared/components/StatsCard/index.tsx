// components/StatsCard.tsx
import styles from './StatsCard.module.css'

export default function StatsCard({ title, value, icon, trend, color = '#4A85F6' }) {
  const trendIsPositive = !trend?.includes('-') && !trend?.includes('0')

  return (
    <div className={styles.card} style={{ '--card-color': color }}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardValue}>{value}</span>
        {trend && (
          <span className={`${styles.cardTrend} ${trendIsPositive ? styles.positive : ''}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}