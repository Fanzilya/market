// components/Pagination.tsx
import { useMemo } from 'react'
import styles from './Pagination.module.css'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  siblingCount = 1
}) {

  const pageRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 3 // Братья + текущая + первая + последняя

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      return [...Array(leftItemCount).keys()].map(i => i + 1)
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      return [...Array(rightItemCount).keys()].map(i => totalPages - rightItemCount + i + 1)
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [1, '...', ...middleRange, '...', totalPages]
    }

    return []
  }, [totalPages, currentPage, siblingCount])

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>

      <div className={styles.paginationControls}>
        <button
          className={`${styles.paginationButton} ${styles.prevNext}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        <div className={styles.paginationPages}>
          {pageRange.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className={styles.paginationDots}>
                  ...
                </span>
              )
            }

            return (
              <button
                key={page}
                className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          className={`${styles.paginationButton} ${styles.prevNext}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.paginationJump}>
        <span>Go to page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value)
            if (page >= 1 && page <= totalPages) {
              onPageChange(page)
            }
          }}
          className={styles.paginationInput}
        />
      </div>
    </div>
  )
}