// src/pages/supplier/SupplierPreviewPage/components/PageHeader.tsx
import styles from '../RequestPreviewPage.module.css'

export default function PageHeader({ requestId, hasResponded, isFavorite, onToggleFavorite, onNavigate }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>
          
        </h1>
        <div className={styles.breadcrumbs}>
          <span className={styles.breadcrumb} onClick={() => onNavigate('/dashboard')}>
            Главная
          </span>
          <span className={styles.separator}>›</span>
          <span className={styles.breadcrumb} onClick={() => onNavigate('/supplier')}>
            Заявки
          </span>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>
            
          </span>
        </div>
      </div>

      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
        onClick={onToggleFavorite}
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <FavoriteIcon isActive={isFavorite} />
      </button>
    </div>
  )
}

const FavoriteIcon = ({ isActive }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill={isActive ? 'currentColor' : 'none'}
    />
  </svg>
)