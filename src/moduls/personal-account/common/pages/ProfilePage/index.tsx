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
import { ProfileTitle } from '../../widgets/ProfilePage/components/Tabs/ProfileTitle'

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

  return (
    <>
      <PageHeader onNavigate={navigate} />

      <div className={styles.profileCard}>
        <ProfileHeader user={user} />

        {/* <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        /> */}

        <div className={styles.tabContent}>
          <div className={styles.tilesGrid}>
            {activeTab == "profile" && (
              [
                {
                  icon: 'user',
                  label: 'ФИО',
                  value: user.fullName,
                  type: 'text',
                },
                {
                  icon: 'email',
                  label: 'Email',
                  value: user.email,
                  type: 'email',
                },
                {
                  icon: 'phone',
                  label: 'Телефон',
                  value: user.phoneNumber,
                  type: 'phone',
                }
              ].map((tile, key) => (
                <ProfileTitle key={key} tile={tile} />
              ))
            )}
          </div>

          {/* {activeTab == "company" && (
            <>
              <div className={styles.emptyState}>
                <p>Информация о компании отсутствует</p>
              </div>
              <div className={styles.tilesGrid}>
                {[
                  {
                    icon: 'building',
                    label: 'Наименование',
                    value: company?.name || '—',
                  },
                  {
                    icon: 'building',
                    label: 'Краткое наименование',
                    value: company?.shortName || '—',
                  },
                  {
                    icon: 'building',
                    label: 'Тип компании',
                    value: company?.typeName || '—',
                  },
                  {
                    icon: 'document',
                    label: 'ИНН',
                    value: company?.inn || '—',
                  },
                  {
                    icon: 'document',
                    label: 'КПП',
                    value: company?.kpp || '—',
                  },
                  {
                    icon: 'document',
                    label: 'ОГРН',
                    value: company?.ogrn || '—',
                  },
                  {
                    icon: 'location',
                    label: 'Юридический адрес',
                    value: company?.legalAddress || '—',
                  },
                  {
                    icon: 'info',
                    label: 'О компании',
                    value: company?.about || '—',
                  },
                ].map((tile, key) => (
                  <ProfileTitle key={key} tile={tile} />
                ))}
              </div>
            </>
          )} */}
          {/* {activeTab == "security" && (
            <SecurityTab user={user} />
          )} */}
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