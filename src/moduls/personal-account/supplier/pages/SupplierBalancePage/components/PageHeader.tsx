// src/pages/supplier/SupplierBalancePage/components/PageHeader.tsx
import styles from '../SupplierBalancePage.module.css'

export default function PageHeader({ onNavigate }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Монетный счет</h1>
        <div className={styles.breadcrumbs}>
          <span className={styles.breadcrumb} onClick={() => onNavigate('/dashboard')}>
            Главная
          </span>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>Монетный счет</span>
        </div>
      </div>
    </div>
  )
}