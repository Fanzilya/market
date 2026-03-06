// src/pages/ProfilePage/components/ProfileHeader.jsx
import styles from '../ProfilePage.module.css'
import useProfileData from '../hooks/useProfileData'

export default function ProfileHeader({ user }) {
  const { initials } = useProfileData(user)

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarLarge}>
        {initials}
      </div>
      <div className={styles.profileInfo}>
        <h2 className={styles.profileName}>{user.fullName}</h2>
        <div className={styles.profileMeta}>
          <span className={styles.roleBadge}>{user.roleLabel}</span>
          <span className={styles.email}>{user.email}</span>
          {user.phone && <span className={styles.phone}>{user.phone}</span>}
        </div>
      </div>
    </div>
  )
}