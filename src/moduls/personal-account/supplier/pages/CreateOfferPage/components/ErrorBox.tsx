// src/pages/supplier/CreateOfferPage/components/ErrorBox.tsx
import styles from '../CreateOfferPage.module.css'

export default function ErrorBox({ error }) {
  if (!error) return null

  return (
    <div className={styles.errorBox}>
      <ErrorIcon />
      {error}
    </div>
  )
}

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FECACA" />
    <path d="M12 7V13" stroke="#DC2626" strokeWidth="2" />
    <circle cx="12" cy="17" r="1.5" fill="#DC2626" />
  </svg>
)