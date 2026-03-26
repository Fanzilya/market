// src/pages/ProfilePage/components/ProfileTabs.tsx
import styles from './WidgetsProfilePage.module.css'

export default function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      {[
        { id: 'profile', label: 'Основная информация' },
        { id: 'company', label: 'Информация о компании' },
        { id: 'security', label: 'Безопасность' }
      ].map(tab => (
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