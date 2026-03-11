// src/pages/RequestDetailPage.tsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './RequestDetailPage.module.css'
import { Role } from '@/entities/user/role'
import { useAuth } from '@/features/user/context/context'
import { getRequestById } from '@/shared/data/requests'
import { listOffersByRequestId } from '@/shared/data/offers'
import { RequestDetailData } from '../../features/RequestDetailPage/model-data'
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing'

export const RequestDetailPage = () => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()


  const { request, offers, hasOffers, isArchived,
    canEdit, goToOffers, motorStartOptions, directionLabels, } = RequestDetailData(requestId, navigate)

  const isSupplier = user!.role === Role.Supplier

  return (
    <>
      {/* Шапка страницы */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Заявка {request.id}</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
            <span className={styles.separator}>/</span>
            <span className={styles.breadcrumb} onClick={() => navigate(isSupplier ? '/supplier' : '/customer')}>
              {isSupplier ? 'Заявки' : 'Мои заявки'}
            </span>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{request.id}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          {!isSupplier && (
            <>
              {isArchived && (
                <span className={styles.archiveBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  В архиве
                </span>
              )}
              <button
                className={`${styles.editButton} ${!canEdit ? styles.editButtonDisabled : ''}`}
                onClick={() => canEdit ? navigate(`/customer/request/${requestId}/edit`) : null}
                disabled={!canEdit}
                title={!canEdit ? (hasOffers ? 'Редактирование недоступно: есть коммерческие предложения' : 'Заявка в архиве') : ''}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
                  <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
                </svg>
                Редактировать
              </button>
            </>
          )}

          {/* Кнопка перехода к КП (показываем всегда, если есть КП) */}
          {hasOffers && (
            <button
              className={styles.offersButton}
              onClick={goToOffers}
              title="Перейти к списку коммерческих предложений"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
              </svg>
              КП ({offers.length})
            </button>
          )}

          <button
            className={styles.backButton}
            onClick={() => navigate(isSupplier ? '/supplier' : '/customer')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
              <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
            Назад
          </button>
        </div>
      </div>

      {/* Карточка заявки */}
      <div className={styles.requestCard}>
        <div className={styles.requestHeader}>
          <h2 className={styles.requestTitle}>{request.objectName}</h2>
          <span className={styles.requestId}>{request.id}</span>
          {isArchived && (
            <span className={styles.archiveChip}>Архивная заявка</span>
          )}
        </div>

        {/* Основная информация */}
        <div className={styles.requestInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Заказчик:</span>
            <span className={styles.infoValue}>{request.govCustomerName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Тип конфигурации:</span>
            <span className={styles.infoValue}>{request.configType}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Дата создания:</span>
            <span className={styles.infoValue}>
              {new Date(request.createdAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
          {request.updatedAt && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Последнее обновление:</span>
              <span className={styles.infoValue}>
                {new Date(request.updatedAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          )}
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Контактное лицо:</span>
            <span className={styles.infoValue}>{request.contactPerson}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Телефон:</span>
            <span className={styles.infoValue}>{request.contactPhone || '—'}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Email:</span>
            <span className={styles.infoValue}>{request.contactEmail}</span>
          </div>
        </div>

        {/* Схема КНС (только для типа КНС) */}
        {request.configType === 'КНС' && request.kns && (
          <div className={styles.schemaSection}>
            <h3 className={styles.sectionTitle}>Схема КНС</h3>
            <div className={styles.schemaWrapper}>
              <KNSSchemaTesting isActive={true} />
            </div>
          </div>
        )}

        {/* Конфигурация КНС */}
        {request.configType === 'КНС' && request.kns && (
          <>
            <h3 className={styles.sectionTitle}>Конфигурация КНС</h3>

            {/* Основные параметры */}
            <div className={styles.paramsSection}>
              <h4 className={styles.subsectionTitle}>Основные параметры</h4>
              <div className={styles.paramsGrid}>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Производительность:</span>
                  <span className={styles.paramValue}>{request.kns.capacity || '—'} м³/ч</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Требуемый напор:</span>
                  <span className={styles.paramValue}>{request.kns.head || '—'} м</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Рабочих насосов:</span>
                  <span className={styles.paramValue}>{request.kns.workingPumps || '0'}</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Резервных насосов:</span>
                  <span className={styles.paramValue}>{request.kns.reservePumps || '0'}</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Насосов на склад:</span>
                  <span className={styles.paramValue}>{request.kns.stockPumps || '0'}</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Перекачиваемая среда:</span>
                  <span className={styles.paramValue}>{request.kns.medium || '—'}</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Температура среды:</span>
                  <span className={styles.paramValue}>{request.kns.temperature || '—'} °C</span>
                </div>
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Взрывозащищенность:</span>
                  <span className={styles.paramValue}>{request.kns.explosionProof ? 'Да' : 'Нет'}</span>
                </div>
              </div>
            </div>

            {/* Габаритные размеры трубопроводов и корпуса */}
            <div className={styles.paramsSection}>
              <h4 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса</h4>
              <div className={styles.paramsGrid}>
                {request.kns.inletDepth && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Глубина подводящего A:</span>
                    <span className={styles.paramValue}>{request.kns.inletDepth} м</span>
                  </div>
                )}
                {request.kns.inletDiameter && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Диаметр подводящего B:</span>
                    <span className={styles.paramValue}>
                      {request.kns.inletDiameter} мм {request.kns.inletMaterial ? `(${request.kns.inletMaterial})` : ''}
                    </span>
                  </div>
                )}
                {request.kns.inletDirection && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Направление подводящего:</span>
                    <span className={styles.paramValue}>
                      {directionLabels[request.kns.inletDirection] || request.kns.inletDirection}
                    </span>
                  </div>
                )}
                {request.kns.outletDepth && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Глубина напорного D:</span>
                    <span className={styles.paramValue}>{request.kns.outletDepth} м</span>
                  </div>
                )}
                {request.kns.outletDiameter && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Диаметр напорного C:</span>
                    <span className={styles.paramValue}>
                      {request.kns.outletDiameter} мм {request.kns.outletMaterial ? `(${request.kns.outletMaterial})` : ''}
                    </span>
                  </div>
                )}
                {request.kns.outletDirection && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Направление напорного:</span>
                    <span className={styles.paramValue}>
                      {directionLabels[request.kns.outletDirection] || request.kns.outletDirection}
                    </span>
                  </div>
                )}
                {request.kns.outletCount && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Количество напорных:</span>
                    <span className={styles.paramValue}>{request.kns.outletCount}</span>
                  </div>
                )}
                {request.kns.stationDiameter && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Диаметр станции:</span>
                    <span className={styles.paramValue}>{request.kns.stationDiameter} м</span>
                  </div>
                )}
                {request.kns.stationHeight && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Высота станции:</span>
                    <span className={styles.paramValue}>{request.kns.stationHeight} м</span>
                  </div>
                )}
                {request.kns.insulation && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Утепление корпуса:</span>
                    <span className={styles.paramValue}>{request.kns.insulation} м</span>
                  </div>
                )}
              </div>
            </div>

            {/* Электрические параметры */}
            {(request.kns.motorStartMethod || request.kns.powerInputs || request.kns.cabinetLocation) && (
              <div className={styles.paramsSection}>
                <h4 className={styles.subsectionTitle}>Электрические параметры</h4>
                <div className={styles.paramsGrid}>
                  {request.kns.motorStartMethod && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Метод пуска:</span>
                      <span className={styles.paramValue}>
                        {motorStartOptions[request.kns.motorStartMethod] || request.kns.motorStartMethod}
                      </span>
                    </div>
                  )}
                  {request.kns.powerInputs && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Вводов питания:</span>
                      <span className={styles.paramValue}>{request.kns.powerInputs}</span>
                    </div>
                  )}
                  {request.kns.cabinetLocation && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Место установки шкафа:</span>
                      <span className={styles.paramValue}>{request.kns.cabinetLocation}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Дополнительная комплектация */}
            {request.knsExtras && Object.values(request.knsExtras).some(v => v) && (
              <div className={styles.extrasSection}>
                <h4 className={styles.subsectionTitle}>Дополнительная комплектация</h4>
                <div className={styles.extrasList}>
                  {Object.entries(request.knsExtras)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <span key={key} className={styles.extraBadge}>{key}</span>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Коммерческие предложения */}
        {offers.length > 0 && (
          <div className={styles.offersSection}>
            <div className={styles.offersHeader}>
              <h3 className={styles.sectionTitle}>
                Коммерческие предложения ({offers.length})
              </h3>
              <button
                className={styles.viewAllOffersButton}
                onClick={goToOffers}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                </svg>
                Все КП
              </button>
            </div>
            <div className={styles.offersList}>
              {offers.slice(0, 3).map((offer, index) => (
                <div key={index} className={styles.offerCard}>
                  <div className={styles.offerHeader}>
                    <span className={styles.offerSupplier}>
                      {offer.supplierCompany || offer.supplierFullName}
                    </span>
                    <span className={styles.offerDate}>
                      {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className={styles.offerPrice}>
                    <span className={styles.priceLabel}>Цена:</span>
                    <span className={styles.priceValue}>{offer.price} ₽</span>
                  </div>
                  {offer.comment && (
                    <div className={styles.offerComment}>
                      <p>{offer.comment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {offers.length > 3 && (
              <button
                className={styles.viewAllLink}
                onClick={goToOffers}
              >
                Показать все предложения ({offers.length}) →
              </button>
            )}
          </div>
        )}

        {/* Если нет КП, показываем кнопку для просмотра (но она будет неактивной или информационной) */}
        {!hasOffers && !isSupplier && (
          <div className={styles.noOffersSection}>
            <p className={styles.noOffersText}>
              На данную заявку пока нет коммерческих предложений
            </p>
          </div>
        )}
      </div>
    </>

  )
}