// src/pages/supplier/SupplierBalancePage/components/Tabs.jsx
import styles from '../SupplierBalancePage.module.css'

const TABS = [
  {
    id: 'balance',
    label: 'Пополнение',
    icon: 'M12 6V18M8 9H16M8 15H16'
  },
  {
    id: 'history',
    label: 'История операций',
    icon: 'M12 6V12L16 14'
  },
  {
    id: 'stats',
    label: 'Статистика',
    icon: 'M3 17V20M9 13V20M15 9V20M21 3V20'
  }
]

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d={tab.icon} stroke="currentColor" strokeWidth="2"/>
          </svg>
          {tab.label}
        </button>
      ))}
    </div>
  )
}