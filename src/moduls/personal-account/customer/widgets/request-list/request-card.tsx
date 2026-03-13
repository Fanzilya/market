// src/widgets/request-list/request-card.tsx
import { formatDate } from '@/utils/get-form-data'
import { getStatusClass } from '@/utils/get-status-class'
import { NavigateFunction } from 'react-router-dom'

interface RequestCardProps {
  item: any
  index: number
  styles: any
  openArchiveConfirm: (item: any) => void
  goToEditRequest: (id: string) => void
  handleDeleteRequest: (id: string) => void
  handleResubmit: (id: string) => void
  navigate: NavigateFunction
}

export const RequestCard = ({ 
  item, 
  index, 
  styles, 
  openArchiveConfirm, 
  goToEditRequest, 
  handleDeleteRequest, 
  handleResubmit,
  navigate 
}: RequestCardProps) => {
  
  const offersCount = item.offers?.length || 0
  const statusClass = getStatusClass(item.status)
  
  return (
    <div 
      className={styles.requestCard}
      onClick={() => navigate(`/customer/request/${item.id}`)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleSection}>
          <span className={styles.cardId}>№{index + 1}</span>
          <h3 className={styles.cardTitle}>{item.objectName || 'Без названия'}</h3>
        </div>
        <span className={`${styles.cardStatus} ${styles[statusClass] || ''}`}>
          {item.statusDisplay || item.status}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Заказчик:</span>
          <span className={styles.cardValue}>{item.customerName || '—'}</span>
        </div>
        
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Тип:</span>
          <span className={styles.cardType}>{item.configTypeId || 'КНС'}</span>
        </div>
        
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Предложений:</span>
          <span className={styles.cardOffers}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            {offersCount}
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.cardDate}>
          {item.createdAt ? formatDate(item.createdAt) : '—'}
        </span>
        
        <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
          <button
            className={`${styles.cardAction} ${styles.actionEdit}`}
            onClick={(e) => {
              e.stopPropagation()
              goToEditRequest(item.id)
            }}
            title="Редактировать"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
              <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          
          <button
            className={`${styles.cardAction} ${styles.actionArchive}`}
            onClick={(e) => {
              e.stopPropagation()
              openArchiveConfirm(item)
            }}
            title="В архив"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
              <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          
          <button
            className={`${styles.cardAction} ${styles.actionDelete}`}
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteRequest(item.id)
            }}
            title="Удалить"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" />
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}