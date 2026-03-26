// src/pages/ProfilePage/components/ProfileHeader.tsx
import { RoleNameText } from '@/entities/user/role'
import styles from './WidgetsProfilePage.module.css'
import { useMemo } from 'react'

export default function ProfileHeader({ user }) {

  const initials = useMemo(() =>
    user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
    , [user.fullName])

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarLarge}>
        {initials}
      </div>
      <div className={styles.profileInfo}>
        <h2 className={styles.profileName}>{user.fullName}</h2>
        <div className={styles.profileMeta}>
          <span className={styles.roleBadge}>{RoleNameText[user.role]}</span>

          <a href={`mailto:${user.email}`} className={styles.email}>{user.email}</a>
          {user.phoneNumber && <a href={`tel:${user.phoneNumber}`} className={styles.phone}>{user.phoneNumber}</a>}
        </div>
      </div>
    </div>
  )
}