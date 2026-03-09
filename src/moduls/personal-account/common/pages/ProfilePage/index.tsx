// src/pages/ProfilePage/index.tsx
import { useAuth } from '@/features/user/context/context'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileInfoTab from '../../widgets/ProfilePage/components/Tabs/ProfileInfoTab'
import CompanyInfoTab from '../../widgets/ProfilePage/components/Tabs/CompanyInfoTab'
import SecurityTab from '../../widgets/ProfilePage/components/Tabs/SecurityTab'
import AccessDenied from '../../widgets/ProfilePage/components/AccessDenied'
import { Role } from '@/entities/user/role'
import PageHeader from '../../widgets/ProfilePage/components/PageHeader'
import LogoutConfirmModal from '../../widgets/ProfilePage/components/LogoutConfirmModal'
import ProfileHeader from '../../widgets/ProfilePage/components/ProfileHeader'
import ProfileTabs from '../../widgets/ProfilePage/components/ProfileTabs'
import styles from "./ProfilePage.module.css"

const TABS = [
  { id: 'profile', label: 'Основная информация', component: ProfileInfoTab },
  { id: 'company', label: 'Информация о компании', component: CompanyInfoTab, showFor: 'supplier' },
  { id: 'security', label: 'Безопасность', component: SecurityTab }
]

export const ProfilePage = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const confirmLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return <AccessDenied onNavigate={navigate} />
  }

  const isSupplier = user.role === Role.Supplier
  const availableTabs = TABS.filter(tab =>
    !tab.showFor || (tab.showFor === 'supplier' && isSupplier)
  )

  const CurrentTabComponent = availableTabs.find(tab => tab.id === activeTab)?.component

  return (
    <>
      <PageHeader onNavigate={navigate} />

      <div className={styles.profileCard}>
        <ProfileHeader user={user} isSupplier={isSupplier} />

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
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />
    </>
  )
}