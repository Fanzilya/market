// components/TopBar.jsx
import { useNavigate } from 'react-router-dom'
import NotificationBell from './NotificationBell.jsx'
import styles from './TopBar.module.css'

export default function TopBar({ user, title, onLogout }) {
  const navigate = useNavigate()
  
  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <h1 className={styles.topBarTitle}>{title}</h1>
      </div>

      <div className={styles.topBarRight}>
        <NotificationBell user={user} />
        
        <button 
          className={styles.profileButton}
          onClick={() => navigate('/profile')}
        >
          <div className={styles.userAvatar}>
            {initials}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.fullName}</span>
            <span className={styles.userRole}>{user?.roleLabel}</span>
          </div>
        </button>
      </div>
    </div>
  )
}