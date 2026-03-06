// src/pages/SupplierPage/components/EmptyState.jsx
import styles from '../SupplierPage.module.css'

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <EmptyIcon />
      <h3>Нет доступных заявок</h3>
      <p>В данный момент нет опубликованных заявок</p>
    </div>
  )
}

const EmptyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2" />
    <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" />
  </svg>
)