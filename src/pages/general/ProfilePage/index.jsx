// src/pages/ProfilePage/index.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../../../auth/demoAuth.js'
import Sidebar from '../../../components/Sidebar.jsx'
import AccessDenied from './components/AccessDenied'
import PageHeader from './components/PageHeader'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import LogoutConfirmModal from './components/LogoutConfirmModal'
import ProfileInfoTab from './components/Tabs/ProfileInfoTab'
import CompanyInfoTab from './components/Tabs/CompanyInfoTab'
import SecurityTab from './components/Tabs/SecurityTab'
import useTheme from './hooks/useTheme'
import styles from './ProfilePage.module.css'

const TABS = [
  { id: 'profile', label: 'Основная информация', component: ProfileInfoTab },
  { id: 'company', label: 'Информация о компании', component: CompanyInfoTab, showFor: 'supplier' },
  { id: 'security', label: 'Безопасность', component: SecurityTab }
]

export default function ProfilePage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return <AccessDenied onNavigate={navigate} />
  }

  const isSupplier = user.role === 'supplier'
  const availableTabs = TABS.filter(tab =>
    !tab.showFor || (tab.showFor === 'supplier' && isSupplier)
  )

  const CurrentTabComponent = availableTabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className={styles.main}>
        <PageHeader onNavigate={navigate} />

        <div className={styles.profileCard}>
          <ProfileHeader user={user} />

          <ProfileTabs
            tabs={availableTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className={styles.tabContent}>
            {CurrentTabComponent && (
              <CurrentTabComponent user={user} isSupplier={isSupplier} />
            )}
          </div>
        </div>
      </main>

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />
    </div>
  )
}