// src/pages/supplier/CreateOfferPage/components/RequestInfoCard.tsx
import { OfferFull } from '@/entities/offer/type'
import styles from '../CreateOfferPage.module.css'
import { getConfigTypeNameById } from '@/utils/get-config-type'

interface Props {
  request: OfferFull
}

export default function RequestInfoCard({ request }: Props) {
  return (
    <div className={styles.requestInfoCard}>
      <div className={styles.requestInfoHeader}>
        <h2 className={styles.requestInfoTitle}>Заявка {request.innerId}</h2>
        <span className={styles.requestInfoBadge}>Новое КП</span>
      </div>
      <div className={styles.requestInfoGrid}>
        <InfoItem label="Объект" value={request.objectName} />
        <InfoItem label="Заказчик" value={request.customerName} />
        <InfoItem label="Тип" value={getConfigTypeNameById(request?.configTypeId)} />
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