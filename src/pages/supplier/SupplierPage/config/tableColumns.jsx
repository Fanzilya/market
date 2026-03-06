
import React from 'react'
import styles from '../SupplierPage.module.css'
import { getLimitedTechSpecs, formatDate } from '../utils/formatters'

export const createColumns = ({ myOffers, favoriteRequests, onToggleFavorite, onViewRequest }) => [
  {
    key: 'favorite',
    header: '',
    width: '40px',
    render: (row) => {
      const isFavorite = favoriteRequests.includes(row.id)
      return (
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={(e) => onToggleFavorite(e, row.id)}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <FavoriteIcon isActive={isFavorite} />
        </button>
      )
    }
  },
  {
    key: 'id',
    header: 'Номер заявки',
    sortable: true,
    width: '130px',
    render: (row) => (
      <span className={styles.idBadge}>{row.id}</span>
    )
  },
  {
    key: 'configType',
    header: 'Тип',
    width: '100px',
    render: (row) => (
      <span className={styles.typeBadge}>{row.configType || 'КНС'}</span>
    )
  },
  {
    key: 'region',
    header: 'Регион',
    width: '120px',
    render: (row) => (
      <span className={styles.regionBadge}>{row.region || 'Не указан'}</span>
    )
  },
  {
    key: 'techSpecs',
    header: 'Технические характеристики',
    render: (row) => {
      const specs = getLimitedTechSpecs(row)
      return (
        <div className={styles.techSpecsList}>
          {specs.length > 0 ? (
            <>
              {specs.slice(0, 3).map((spec, idx) => (
                <div key={idx} className={styles.techSpecItem}>
                  <span className={styles.techSpecLabel}>{spec.label}:</span>
                  <span className={styles.techSpecValue}>{spec.value}</span>
                </div>
              ))}
              {specs.length > 3 && (
                <span className={styles.moreSpecs}>+{specs.length - 3} еще</span>
              )}
            </>
          ) : (
            <span className={styles.noSpecs}>Нет данных</span>
          )}
        </div>
      )
    }
  },
  {
    key: 'publishedAt',
    header: 'Дата публикации',
    sortable: true,
    width: '120px',
    render: (row) => (
      <span className={styles.date}>
        {formatDate(row.publishedAt || row.createdAt)}
      </span>
    )
  },
  {
    key: 'status',
    header: 'Статус',
    width: '100px',
    render: (row) => {
      const hasOffer = myOffers.some(o => o.requestId === row.id)
      return (
        <span className={`${styles.statusBadge} ${hasOffer ? styles.responded : styles.new}`}>
          {hasOffer ? 'Откликнулся' : 'Новая'}
        </span>
      )
    }
  },
  {
    key: 'action',
    header: '',
    width: '120px',
    render: (row) => {
      const hasOffer = myOffers.some(o => o.requestId === row.id)
      return (
        <button
          className={`${styles.actionButton} ${hasOffer ? styles.viewButton : styles.respondButton}`}
          onClick={() => onViewRequest(row)}
        >
          {hasOffer ? (
            <>
              <ViewIcon />
              Просмотр
            </>
          ) : (
            <>
              <PlusIcon />
              Предпросмотр
            </>
          )}
        </button>
      )
    }
  }
]

// Иконки
const FavoriteIcon = ({ isActive }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill={isActive ? 'currentColor' : 'none'}
    />
  </svg>
)

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)