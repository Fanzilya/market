
import React from 'react'
import styles from '../SupplierPage.module.css'
import { getLimitedTechSpecs, formatDate } from '../utils/formatters'
import { Link } from 'react-router-dom'
import { IRequest } from '@/entities/request/type'

export const createColumns = ({ myOffers, favoriteRequests, onToggleFavorite }) => [
  {
    key: 'favorite',
    header: '',
    width: '40px',
    render: (row: IRequest) => {
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
    header: 'Наименование',
    sortable: true,
    width: '130px',
    render: (row: IRequest) => {
      return (
        <span className={styles.idBadge}>{row.contactName}</span>
      )
    }
  },
  {
    key: 'configType',
    header: 'Тип',
    width: '100px',
    render: () => (
      <span className={styles.typeBadge}>{'КНС'}</span>
    )
  },
  {
    key: 'region',
    header: 'Регион',
    width: '120px',
    render: (row: IRequest) => (
      <span className={styles.regionBadge}>{row.locationRegion || 'Не указан'}</span>
    )
  },
  {
    key: 'techSpecs',
    header: 'Технические характеристики',
    render: (row: IRequest) => {
      const specs = getLimitedTechSpecs(row)

      return (
        <div className={styles.techSpecsList}>

          {/* {row.} */}

          {/* {specs.length > 0 ? (
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
          )} */}
        </div>
      )
    }
  },
  {
    key: 'publishedAt',
    header: 'Дата публикации',
    sortable: true,
    width: '120px',
    render: (row: IRequest) => (
      <span className={styles.date}>
        {formatDate(row.publishedAt || row.createdAt)}
      </span>
    )
  },
  {
    key: 'status',
    header: 'Статус',
    width: '100px',
    render: (row: IRequest) => {
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
    render: (row: IRequest) => {
      const hasOffer = myOffers.some(o => o.requestId === row.id)
      return (
        <Link
          className={`${styles.actionButton} ${hasOffer ? styles.viewButton : styles.respondButton}`}
          to={"/supplier/request/" + row.id}
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


          {/* if (freeClicksLeft > 0) {
        setFreeClicksLeft(prev => prev - 1)
        navigate(`/supplier/request/${request.id}`, {
          state: { request }
        })
      } else {
        navigate('/supplier/balance', {
          state: {
            message: 'Бесплатные клики закончились. Для просмотра заявок необходимо пополнить счет.'
          }
        })
      } */}


        </Link>
      )
    }
  }
]

// Иконки
export const FavoriteIcon = ({ isActive }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill={isActive ? 'currentColor' : 'none'}
    />
  </svg>
)

export const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)