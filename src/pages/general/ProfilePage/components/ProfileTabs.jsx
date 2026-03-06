// src/pages/ProfilePage/components/ProfileTabs.jsx
import styles from '../ProfilePage.module.css'

export default function ProfileTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}