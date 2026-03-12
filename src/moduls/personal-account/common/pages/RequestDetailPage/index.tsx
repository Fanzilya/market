// src/pages/RequestDetailPage.tsx
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './RequestDetailPage.module.css'
import { Role } from '@/entities/user/role'
import { useAuth } from '@/features/user/context/context'
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing'
import { requestDetailModel } from '../../features/RequestDetailPage/request-detail-model'
import { useEffect } from 'react'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { getRequestsPath } from '@/utils/get-requests-path'
import { directionLabels, motorStartOptions, PipelineMaterialTranslations, PumpsStartupMethodTranslations } from '@/entities/request/config'

export const RequestDetailPage = observer(() => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()


  const goToOffers = () => {
    navigate(`/customer/request/${requestId}/offers`)
  }

  const canEdit = false;
  const isSupplier = user!.role === Role.Supplier
  const { init, isLoader, requestModel, currentModel, equipmentCurrentModel, schemeIsActive } = requestDetailModel
  useEffect(() => {
    init(requestId || "")
  }, [requestId])

  return isLoader ? <Loader /> : (<>
    {/* Шапка страницы */}
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Заявка {requestModel.nameByProjectDocs}</h1>
        <div className={styles.breadcrumbs}>
          <Link className={styles.breadcrumb} to={getRequestsPath() + '/dashboard'}>Главная</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.breadcrumb} onClick={() => navigate(isSupplier ? '/supplier/request' : '/customer/request')}>
            {isSupplier ? 'Заявки' : 'Мои заявки'}
          </span>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{requestModel.nameByProjectDocs}</span>
        </div>
      </div>

      <div className={styles.headerActions}>
        {!isSupplier && (
          <>
            {requestModel.isArchived && (
              <span className={styles.archiveBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
                </svg>
                В архиве
              </span>
            )}
            <button
              // className={`${styles.editButton} ${!canEdit ? styles.editButtonDisabled : ''}`}
              className={`${styles.editButton} ${styles.editButtonDisabled}`}
              onClick={() => canEdit ? navigate(`/customer/request/${requestId}/edit`) : null}
              disabled={!canEdit}
              // title={!canEdit ? (hasOffers ? 'Редактирование недоступно: есть коммерческие предложения' : 'Заявка в архиве') : ''}
              title={''}
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
        {/* {hasOffers && ( */}
        {/* <button
          className={styles.offersButton}
          onClick={goToOffers}
          title="Перейти к списку коммерческих предложений"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
          </svg>
          КП ({offers.length})
        </button> */}
        {/* )} */}

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
        <h2 className={styles.requestTitle}>{requestModel.objectName}</h2>
        <span className={styles.requestId}>{requestModel.id}</span>
        {requestModel.isArchived && (
          <span className={styles.archiveChip}>Архивная заявка</span>
        )}
      </div>

      {/* Основная информация */}
      <div className={styles.requestInfo}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Заказчик:</span>
          <span className={styles.infoValue}>{requestModel.customerName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Тип конфигурации:</span>
          <span className={styles.infoValue}>{requestModel.configTypeId}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Дата создания:</span>
          <span className={styles.infoValue}>
            {new Date(requestModel.createdAt).toLocaleDateString('ru-RU')}
          </span>
        </div>
        {/* {model. && (
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Последнее обновление:</span>
            <span className={styles.infoValue}>
              {new Date(model.updatedAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
        )} */}
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Контактное лицо:</span>
          <span className={styles.infoValue}>{requestModel.contactName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Телефон:</span>
          <span className={styles.infoValue}>{requestModel.phoneNumber || '—'}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>-------------</span>
        </div>
      </div>


      <div className='flex w-full gap-4'>
        <div className='w-[100%]'>
          {/* Конфигурация КНС */}
          {/* {model.configType === 'КНС' && currentModel && (
        <> */}
          <h3 className={"text-[18px] font-semibold text-[#1e293b] mb-[20px]"}>Конфигурация КНС</h3>

          {/* Основные параметры */}
          <div className={styles.paramsSection}>
            <h4 className={styles.subsectionTitle}>Основные параметры</h4>
            <div className="flex flex-col gap-4">
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Производительность:</span>
                <span className={styles.paramValue}>{currentModel.perfomance || '—'} м³/ч</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Требуемый напор:</span>
                <span className={styles.paramValue}>{currentModel.requiredPumpPressure || '—'} м</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Рабочих насосов:</span>
                <span className={styles.paramValue}>{currentModel.activePumpsCount || '0'}</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Резервных насосов:</span>
                <span className={styles.paramValue}>{currentModel.reservePumpsCount || '0'}</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Насосов на склад:</span>
                <span className={styles.paramValue}>{currentModel.pumpsToWarehouseCount || '0'}</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Перекачиваемая среда:</span>
                <span className={styles.paramValue}>{currentModel.pType || '—'}</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Температура среды:</span>
                <span className={styles.paramValue}>{currentModel.environmentTemperature || '—'} °C</span>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramLabel}>Взрывозащищенность:</span>
                <span className={styles.paramValue}>{currentModel.explosionProtection ? 'Да' : 'Нет'}</span>
              </div>
            </div>
          </div>

          {/* Габаритные размеры трубопроводов и корпуса */}
          <div className={styles.paramsSection}>
            <h4 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса</h4>

            <div className="flex flex-col gap-4">
              {currentModel.supplyPipelineDepth && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Глубина подводящего A:</span>
                  <span className={styles.paramValue}>{currentModel.supplyPipelineDepth} м</span>
                </div>
              )}
              {currentModel.supplyPipelineDiameter && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Диаметр подводящего B:</span>
                  <span className={styles.paramValue}>
                    {currentModel.supplyPipelineDiameter} мм {currentModel.supplyPipelineMaterial ? `(${currentModel.supplyPipelineMaterial})` : ''}
                  </span>
                </div>
              )}
              {currentModel.supplyPipelineDirectionInHours && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Направление подводящего:</span>
                  <span className={styles.paramValue}>
                    {directionLabels[currentModel.supplyPipelineDirectionInHours] || currentModel.supplyPipelineDirectionInHours}
                  </span>
                </div>
              )}
              {currentModel.pressurePipelineDepth && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Глубина напорного D:</span>
                  <span className={styles.paramValue}>{currentModel.pressurePipelineDepth} м</span>
                </div>
              )}
              {currentModel.pressurePipelineDiameter && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Диаметр напорного C:</span>
                  <span className={styles.paramValue}>
                    {currentModel.pressurePipelineDiameter} мм {currentModel.pressurePipelineMaterial ? PipelineMaterialTranslations[currentModel.pressurePipelineMaterial] : ''}
                  </span>
                </div>
              )}
              {currentModel.pressurePipelineDirectionInHours && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Направление напорного:</span>
                  <span className={styles.paramValue}>
                    {directionLabels[currentModel.pressurePipelineDirectionInHours] || currentModel.pressurePipelineDirectionInHours}
                  </span>
                </div>
              )}
              {currentModel.hasManyExitPressurePipelines && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Количество напорных:</span>
                  <span className={styles.paramValue}>{currentModel.hasManyExitPressurePipelines}</span>
                </div>
              )}
              {currentModel.expectedDiameterOfPumpStation && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Диаметр станции:</span>
                  <span className={styles.paramValue}>{currentModel.expectedDiameterOfPumpStation} м</span>
                </div>
              )}
              {currentModel.expectedHeightOfPumpStation && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Высота станции:</span>
                  <span className={styles.paramValue}>{currentModel.expectedHeightOfPumpStation} м</span>
                </div>
              )}
              {currentModel.insulatedHousingDepth && (
                <div className={styles.paramItem}>
                  <span className={styles.paramLabel}>Утепление корпуса:</span>
                  <span className={styles.paramValue}>{currentModel.insulatedHousingDepth} м</span>
                </div>
              )}
            </div>
          </div>

          {/* Электрические параметры */}
          {(currentModel.startupMethod || currentModel.powerContactsToController || currentModel.place) && (
            <div className={styles.paramsSection}>
              <h4 className={styles.subsectionTitle}>Электрические параметры</h4>
              <div className="flex flex-col gap-4">
                {currentModel.startupMethod && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Метод пуска:</span>
                    <span className={styles.paramValue}>
                      {PumpsStartupMethodTranslations[currentModel.startupMethod] || currentModel.startupMethod}
                    </span>
                  </div>
                )}
                {currentModel.powerContactsToController && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Вводов питания:</span>
                    <span className={styles.paramValue}>{currentModel.powerContactsToController}</span>
                  </div>
                )}
                {currentModel.place && (
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Место установки шкафа:</span>
                    <span className={styles.paramValue}>{currentModel.place}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Дополнительная комплектация */}
          {equipmentCurrentModel.length > 0 && Object.values(equipmentCurrentModel).some(v => v) && (
            <div className={styles.extrasSection}>
              <h4 className={styles.subsectionTitle}>Дополнительная комплектация</h4>
              <div className={styles.extrasList}>
                {equipmentCurrentModel.map((item, key) => (
                  <span key={key} className={styles.extraBadge}>{item.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Схема КНС (только для типа КНС) */}
        {/* {model.configTypeId === 'КНС' && currentModel && ( */}
        <KNSSchemaTesting isActive={schemeIsActive} />
        {/* )} */}
      </div>



      {/* </>
      )} */}

      {/* Коммерческие предложения */}
      {false && offers.length > 0 && (
        <div className={styles.offersSection}>
          <div className={styles.offersHeader}>
            <h3 className={"text-[18px] font-semibold text-[#1e293b] mb-[20px]"}>
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
      {false && !hasOffers && !isSupplier && (
        <div className={styles.noOffersSection}>
          <p className={styles.noOffersText}>
            На данную заявку пока нет коммерческих предложений
          </p>
        </div>
      )}
    </div>
  </>
  )
})