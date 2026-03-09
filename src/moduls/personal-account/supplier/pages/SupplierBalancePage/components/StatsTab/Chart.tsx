// src/pages/supplier/SupplierBalancePage/components/StatsTab/Chart.tsx
import styles from '../../SupplierBalancePage.module.css'

export default function Chart({ data }) {
  const maxClicks = Math.max(...data.map(d => d.clicks))

  return (
    <>
      <h4 className={styles.chartTitle}>Активность по месяцам</h4>

      <div className={styles.chartContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.chartBar}>
            <div
              className={styles.chartBarFill}
              style={{ height: `${(item.clicks / maxClicks) * 100}%` }}
            >
              <span className={styles.chartBarValue}>{item.clicks}</span>
            </div>
            <div className={styles.chartBarLabel}>{item.month}</div>
          </div>
        ))}
      </div>
    </>
  )
}