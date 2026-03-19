// src/pages/SupplierPage/components/RequestsGrid.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../SupplierPage.module.css'
import { formatDate } from '@/utils/get-form-data'

interface Request {
  id: string
  objectName?: string
  customerName?: string
  configTypeId?: string
  offers?: any[]
  createdAt?: string
  status?: string
  statusDisplay?: string
  region?: string
  description?: string
  [key: string]: any
}

interface RequestsGridProps {
  requests: Request[]
  favoriteRequests: Set<string> | string[] | any // Более гибкий тип
  onToggleFavorite: (requestId: string) => void
  onRequestClick: (requestId: string) => void
  freeClicksLeft?: number
}

const RequestsGrid: React.FC<RequestsGridProps> = ({
  requests,
  favoriteRequests,
  onToggleFavorite,
  onRequestClick,
  freeClicksLeft = 0
}) => {
  const navigate = useNavigate()

  // Функция для проверки, является ли запрос избранным
  const isFavorite = (requestId: string): boolean => {
    if (!favoriteRequests) return false
    
    // Если это Set
    if (favoriteRequests instanceof Set) {
      return favoriteRequests.has(requestId)
    }
    
    // Если это массив
    if (Array.isArray(favoriteRequests)) {
      return favoriteRequests.some(id => id === requestId)
    }
    
    // Если это объект с id
    if (typeof favoriteRequests === 'object') {
      return Object.values(favoriteRequests).some((item: any) => 
        item?.id === requestId || item === requestId
      )
    }
    
    return false
  }

  const getStatusClassName = (status?: string): string => {
    const statusMap: Record<string, string> = {
      'moderation': 'statusModeration',
      'revision': 'statusRevision',
      'rejected': 'statusRejected',
      'published': 'statusPublished',
      'success': 'statusSuccess',
      'draft': 'statusDraft',
      'archived': 'statusArchived',
    }
    return status ? statusMap[status] || '' : ''
  }

  return (
    <div className={styles.requestsGrid}>
      {requests.map((request, index) => {
        const offersCount = request.offers?.length || 0
        const statusClass = getStatusClassName(request.status)
        const isFav = isFavorite(request.id)
        const canView = freeClicksLeft > 0

        return (
          <div
            key={request.id || index}
            className={`${styles.requestCard} ${!canView ? styles.requestCardLocked : ''}`}
            onClick={() => canView && onRequestClick(request.id)}
          >
            {/* Верхняя цветная полоса с индикатором */}
            <div 
              className={styles.cardAccent} 
              style={{ backgroundColor: canView ? '#4A85F6' : '#94A3B8' }} 
            />

            <div className={styles.cardHeader}>
              <div className={styles.cardTitleSection}>
                <span className={styles.cardId}>#{index + 1}</span>
                <h3 className={styles.cardTitle}>{request.objectName || 'Без названия'}</h3>
              </div>
              <button
                className={`${styles.cardFavorite} ${isFav ? styles.cardFavoriteActive : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(request.id)
                }}
                aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? '#F59E0B' : 'none'} stroke={isFav ? '#F59E0B' : '#64748B'}>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <div className={styles.cardBody}>
                            <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Тип:</span>
                <span className={styles.cardType}>{request.configTypeId || 'КНС'}</span>
              </div>

              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Регион:</span>
                <span className={styles.cardValue}>{request.region || '—'}</span>
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

              {request.description && (
                <div className={styles.cardDescription}>
                  <p>{request.description.length > 100 ? `${request.description.substring(0, 100)}...` : request.description}</p>
                </div>
              )}
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.cardMeta}>
                <span className={`${styles.cardStatus} ${statusClass ? styles[statusClass] : ''}`}>
                  {request.statusDisplay || request.status || '—'}
                </span>
                <span className={styles.cardDate}>
                  {request.createdAt ? formatDate(request.createdAt) : '—'}
                </span>
              </div>

              <div className={styles.cardActions}>
                {!canView && (
                  <span className={styles.cardLockedBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Нет просмотров
                  </span>
                )}
                <button
                  className={styles.cardViewButton}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (canView) {
                      navigate(`/supplier/offer/create/${request.id}`)
                    }
                  }}
                  disabled={!canView}
                >
                  {canView ? 'Создать КП' : 'Требуются просмотры'}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RequestsGrid