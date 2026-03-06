// src/pages/supplier/SupplierBalancePage/components/HistoryTab/Pagination.jsx
import styles from '../../SupplierBalancePage.module.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <button 
        className={styles.pageButton} 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        className={styles.pageButton} 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  )
}