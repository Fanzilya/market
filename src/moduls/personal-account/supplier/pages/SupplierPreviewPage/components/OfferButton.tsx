// src/pages/supplier/SupplierPreviewPage/components/OfferButton.tsx
import { Link } from 'react-router-dom'
import styles from '../SupplierPreviewPage.module.css'

export default function OfferButton({ onCreateOffer }: { onCreateOffer: string }) {
  return (
    <div className={styles.offerSection}>
      <Link className={styles.offerButton} to={onCreateOffer} >
        <StarIcon />
        Создать коммерческое предложение
      </Link>
      <p className={styles.offerHint}>
        После создания КП заказчик сможет увидеть ваше предложение
      </p>
    </div>
  )
}

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)