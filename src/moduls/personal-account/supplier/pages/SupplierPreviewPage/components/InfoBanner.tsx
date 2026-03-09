// src/pages/supplier/SupplierPreviewPage/components/InfoBanner.tsx
import styles from '../SupplierPreviewPage.module.css'

export default function InfoBanner({ hasResponded }) {
  if (!hasResponded) {
    return (
      <div className={styles.infoBanner}>
        <WarningIcon />
        <div>
          <strong>Ограниченный доступ</strong>
          <p>Вы видите только технические характеристики. Чтобы увидеть контактную информацию заказчика и полные данные, необходимо откликнуться на заявку.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.successBanner}>
      <SuccessIcon />
      <div>
        <strong>Вы откликнулись на заявку!</strong>
        <p>Теперь вам доступна полная информация. Можете создать коммерческое предложение.</p>
      </div>
    </div>
  )
}

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
    <path d="M12 16V12" stroke="#F59E0B" strokeWidth="2" />
    <circle cx="12" cy="8" r="1" fill="#F59E0B" />
  </svg>
)

const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#10B981" />
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
  </svg>
)