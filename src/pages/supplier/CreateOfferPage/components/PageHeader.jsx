// src/pages/supplier/CreateOfferPage/components/PageHeader.jsx
import styles from '../CreateOfferPage.module.css'

export default function PageHeader({ requestId, onNavigate }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Создание коммерческого предложения</h1>
      <div className={styles.breadcrumbs}>
        <span className={styles.breadcrumb} onClick={() => onNavigate('/dashboard')}>
          Главная
        </span>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumb} onClick={() => onNavigate('/supplier')}>
          Заявки
        </span>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumb} onClick={() => onNavigate(`/supplier/request/${requestId}/preview`)}>
          Предпросмотр
        </span>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>Создание КП</span>
      </div>
    </div>
  )
}