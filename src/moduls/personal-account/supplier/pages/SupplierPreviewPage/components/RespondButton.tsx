// src/pages/supplier/SupplierPreviewPage/components/RespondButton.tsx
import styles from '../SupplierPreviewPage.module.css'

export default function RespondButton({ freeClicksLeft, isClicksAvailable, onRespond }) {
  return (
    <div className={styles.respondSection}>
      <button
        className={styles.respondButton}
        onClick={onRespond}
        disabled={!isClicksAvailable}
      >
        <PlusIcon />
        {isClicksAvailable ? 'Откликнуться на заявку' : 'Бесплатные отклики закончились'}
      </button>
      <p className={styles.respondHint}>
        {isClicksAvailable
          ? `Останется ${freeClicksLeft - 1} бесплатных откликов`
          : 'Пополните счет, чтобы продолжить'}
      </p>
    </div>
  )
}

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19" stroke="white" strokeWidth="2" />
    <path d="M12 5L12 19" stroke="white" strokeWidth="2" />
  </svg>
)