// components/RequestCard.jsx
import { useState } from 'react'
import styles from './RequestCard.module.css'

export default function RequestCard({ 
  request, 
  userEmail, 
  onCreateOffer, 
  hasMyOffer,
  isNew,
  viewMode = 'grid'
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getTypeColor = (type) => {
    const colors = {
      'Строительство': '#4A85F6',
      'Ремонт': '#10B981',
      'Поставка': '#F59E0B',
      'Услуги': '#8B5CF6'
    }
    return colors[type] || '#64748b'
  }

  if (viewMode === 'list') {
    return (
      <div 
        className={`${styles.listCard} ${isNew ? styles.new : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.listRow}>
          <div className={styles.listCell}>
            <span className={styles.requestId}>{request.id}</span>
          </div>
          <div className={styles.listCell}>
            <div className={styles.requestTitle}>{request.objectName}</div>
            <div className={styles.requestCustomer}>{request.govCustomerName}</div>
          </div>
          <div className={styles.listCell}>
            <span 
              className={styles.requestType}
              style={{ backgroundColor: `${getTypeColor(request.configType)}15`, color: getTypeColor(request.configType) }}
            >
              {request.configType}
            </span>
          </div>
          <div className={styles.listCell}>
            <div className={styles.contactPerson}>{request.contactPerson}</div>
            <div className={styles.contactInfo}>{request.contactPhone}</div>
          </div>
          <div className={styles.listCell}>
            <div className={styles.requestDate}>{formatDate(request.createdAt)}</div>
          </div>
          <div className={styles.listCell}>
            <button
              className={`${styles.offerButton} ${hasMyOffer ? styles.disabled : ''}`}
              onClick={onCreateOffer}
              disabled={hasMyOffer}
            >
              {hasMyOffer ? '✓ Предложение отправлено' : 'Сделать КП'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${styles.card} ${isNew ? styles.new : ''} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && <span className={styles.newBadge}>Новая</span>}
      
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          <span className={styles.cardId}>{request.id}</span>
          <span 
            className={styles.cardType}
            style={{ backgroundColor: `${getTypeColor(request.configType)}15`, color: getTypeColor(request.configType) }}
          >
            {request.configType}
          </span>
        </div>
        <span className={styles.cardDate}>{formatDate(request.createdAt)}</span>
      </div>

      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{request.objectName}</h4>
        <div className={styles.cardCustomer}>
          <span className={styles.customerLabel}>Заказчик:</span>
          <span className={styles.customerValue}>{request.govCustomerName}</span>
        </div>

        <div className={styles.cardContact}>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>👤</span>
            <span>{request.contactPerson}</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>📞</span>
            <span>{request.contactPhone}</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>✉️</span>
            <span>{request.contactEmail}</span>
          </div>
        </div>

        {isExpanded && (
          <div className={styles.cardDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Описание:</span>
              <span className={styles.detailValue}>{request.description || 'Нет описания'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Бюджет:</span>
              <span className={styles.detailValue}>{request.budget || 'Не указан'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Сроки:</span>
              <span className={styles.detailValue}>{request.deadline || 'Не указаны'}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <button 
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Скрыть детали' : 'Показать детали'}
        </button>
        <button
          className={`${styles.offerButton} ${hasMyOffer ? styles.disabled : ''}`}
          onClick={onCreateOffer}
          disabled={hasMyOffer}
        >
          {hasMyOffer ? '✓ Предложение отправлено' : 'Сделать КП →'}
        </button>
      </div>

      {isHovered && !hasMyOffer && (
        <div className={styles.hoverOverlay}>
          <span>Нажмите, чтобы создать предложение</span>
        </div>
      )}
    </div>
  )
}