// src/pages/ProfilePage/components/PageHeader.tsx
import { Link } from 'react-router-dom'
import styles from './WidgetsProfilePage.module.css'
import Icon from '@/shared/ui-kits/Icon'
import { getRequestsPath } from '@/utils/get-requests-path'

export default function PageHeader({ onNavigate }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Профиль</h1>
        <div className={styles.breadcrumbs}>
          <Link to="/dashboard" className={styles.breadcrumbLink}>Главная</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Профиль</span>
        </div>
      </div>

      <div className={styles.headerActions}>
        <Link
          className={styles.actionButton}
          to={getRequestsPath() + '/settings'}
        >
          <Icon name='settings' />
          Настройки
        </Link>
      </div>
    </div>
  )
}