// src/pages/supplier/CreateOfferPage/components/RequestInfoCard.jsx
import styles from '../CreateOfferPage.module.css'

export default function RequestInfoCard({ request }) {
  return (
    <div className={styles.requestInfoCard}>
      <div className={styles.requestInfoHeader}>
        <h2 className={styles.requestInfoTitle}>Заявка {request.id}</h2>
        <span className={styles.requestInfoBadge}>Новое КП</span>
      </div>
      <div className={styles.requestInfoGrid}>
        <InfoItem label="Объект" value={request.objectName} />
        <InfoItem label="Заказчик" value={request.govCustomerName} />
        <InfoItem label="Тип" value={request.configType || 'КНС'} />
        <InfoItem 
          label="Дата создания" 
          value={new Date(request.createdAt).toLocaleDateString('ru-RU')} 
        />
      </div>
    </div>
  )
}

const InfoItem = ({ label, value }) => (
  <div className={styles.requestInfoItem}>
    <span className={styles.requestInfoLabel}>{label}</span>
    <span className={styles.requestInfoValue}>{value}</span>
  </div>
)