// src/pages/supplier/SupplierBalancePage/components/StatsTab/index.tsx
import React from 'react'
import StatsCards from './StatsCards'
import Chart from './Chart'
import styles from '../../SupplierBalancePage.module.css'
import { formatDate, formatPrice } from '../../utils/formatters'

export default function StatsTab({ balanceData, clicksData }) {
  return (
    <div className={styles.statsSection}>
      <h3 className={styles.sectionTitle}>Статистика использования</h3>

      <StatsCards
        totalClicks={balanceData.totalClicks}
        availableCoins={balanceData.coins}
      />

      <Chart data={clicksData} />

      <div className={styles.infoGrid}>
        <InfoItem
          label="Дата регистрации"
          value={formatDate(balanceData.registrationDate)}
        />
        <InfoItem
          label="Последняя операция"
          value={formatDate(balanceData.lastTransaction)}
        />
        <InfoItem
          label="Средняя стоимость отклика"
          value="50 ₽"
        />
        <InfoItem
          label="Бесплатных откликов осталось"
          value={balanceData.freeClicks}
        />
      </div>
    </div>
  )
}

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
)