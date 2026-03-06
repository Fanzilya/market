// src/pages/supplier/SupplierBalancePage/components/StatsTab/StatsCards.jsx
import styles from '../../SupplierBalancePage.module.css'

const CARDS = [
  {
    id: 'total',
    icon: '📊',
    getValue: (data) => data.totalClicks,
    getLabel: () => 'Всего откликов'
  },
  {
    id: 'average',
    icon: '📈',
    getValue: (data) => Math.round(data.totalClicks / 12),
    getLabel: () => 'В среднем в месяц'
  },
  {
    id: 'coins',
    icon: '💎',
    getValue: (data) => data.availableCoins,
    getLabel: () => 'Доступно монет'
  }
]

export default function StatsCards({ totalClicks, availableCoins }) {
  const data = { totalClicks, availableCoins }

  return (
    <div className={styles.statsCards}>
      {CARDS.map(card => (
        <div key={card.id} className={styles.statsCard}>
          <div className={styles.statsCardIcon}>{card.icon}</div>
          <div className={styles.statsCardInfo}>
            <span className={styles.statsCardValue}>{card.getValue(data)}</span>
            <span className={styles.statsCardLabel}>{card.getLabel()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}