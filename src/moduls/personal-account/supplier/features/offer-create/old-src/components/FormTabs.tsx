// src/pages/supplier/CreateOfferPage/components/FormTabs.tsx
import styles from '../CreateOfferPage.module.css'

export default function FormTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}