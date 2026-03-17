// src/pages/supplier/SupplierPreviewPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import InfoBanner from './components/InfoBanner'
import ContactInfo from './components/ContactInfo'
import ExtrasSection from './components/ExtrasSection'
import ClicksInfo from './components/ClicksInfo'
import RespondButton from './components/RespondButton'
import OfferButton from './components/OfferButton'
import useFreeClicks from './hooks/useFreeClicks'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import FreeClicksModal from '@/shared/components/FreeClicksModal'
import styles from "./RequestPreviewPage.module.css"
import { supplierPreviewModel } from '../../features/supplier-preview/supplier-preview-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { directionLabels, PipelineMaterialTranslations, PumpsStartupMethodTranslations } from '@/entities/request/config'
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Icon from '@/shared/ui-kits/Icon'

export const RequestPreviewPage = observer(() => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showFreeClicksModal, setShowFreeClicksModal] = useState(false)

  const { request, isLoader, init, hasResponded, setHasResponded, currentModel, equipmentCurrentModel, schemeIsActive } = supplierPreviewModel

  useEffect(() => {
    init(requestId!)
  }, [requestId])

  const { freeClicksLeft, decrementClicks, isClicksAvailable } = useFreeClicks()
  const { isFavorite, handleToggleFavorite } = useFavorites({ user, requestId })

  const handleRespond = () => { setShowFreeClicksModal(true) }

  const handleConfirmFreeClick = () => {
    decrementClicks()
    setShowFreeClicksModal(false)
    setHasResponded(true)

    // Сохраняем в localStorage, что откликнулись на эту заявку
    const respondedRequests = JSON.parse(localStorage.getItem('respondedRequests') || '[]')
    respondedRequests.push(requestId)
    localStorage.setItem('respondedRequests', JSON.stringify(respondedRequests))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoToBilling = () => {
    navigate('/billing', {
      state: {
        message: 'Бесплатные клики закончились. Для продолжения необходимо пополнить счет.'
      }
    })
  }

  return isLoader ? <Loader /> : (
    <>
      <div className={styles.container}>
        <AccountHeader
          title={hasResponded ? 'Заявка' : 'Предпросмотр заявки'}
          breadcrumbs={{
            current: `Заявка ${request.innerId || "-"}`
          }}

          rightBlock={
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Icon name="star" />
            </button>}
        />



        <InfoBanner hasResponded={hasResponded} />

        <div className={styles.requestCard}>  
          <div className={styles.requestHeader}>
            <h2 className={styles.requestTitle}>{request.objectName}</h2>
            <div></div>
            {/* <span className={styles.requestId}>{request.id}</span> */}
          </div>

          {hasResponded && (
            <ContactInfo
              govCustomerName={request.customerName}
              contactPerson={request.contactName}
              contactPhone={request.phoneNumber}
            // contactEmail={request.contactEmail}
            />
          )}

          <div className={styles.infoGrid}>
            <InfoItem
              label="Тип конфигурации"
              value={'КНС'} />

            <InfoItem
              label="Дата создания"
              value={new Date(request.createdAt).toLocaleDateString('ru-RU')} />

            {request.locationRegion &&
              <InfoItem
                label="Регион"
                value={request.locationRegion} />
            }

          </div>

          <div className='flex gap-10'>
            <div className='w-full'>
              <h3 className={styles.sectionTitle}>Технические характеристики</h3>
              <div className={styles.specsGrid}>
                <SpecItem
                  label={"Производительность:"}
                  value={(currentModel.perfomance || '—') + " м³/ч"} />

                <SpecItem
                  label={"Требуемый напор:"}
                  value={(currentModel.requiredPumpPressure || '—') + "  м"} />

                <SpecItem
                  label={"Рабочих насосов:"}
                  value={currentModel.activePumpsCount || '0'} />

                <SpecItem
                  label={"Резервных насосов:"}
                  value={currentModel.reservePumpsCount || '0'} />

                <SpecItem
                  label={"Насосов на склад:"}
                  value={currentModel.pumpsToWarehouseCount || '0'} />

                <SpecItem
                  label={"Перекачиваемая среда:"}
                  value={currentModel.pType || '—'} />

                <SpecItem
                  label={"Температура среды:"}
                  value={(currentModel.environmentTemperature || '—') + "  °C"} />

                <SpecItem
                  label={"Взрывозащищенность:"}
                  value={currentModel.explosionProtection ? 'Да' : 'Нет'} />
              </div>

              <h3 className={styles.sectionTitle}>Габаритные размеры трубопроводов и корпуса</h3>
              <div className={styles.specsGrid}>
                <SpecItem
                  label={"Глубина подводящего A:"}
                  value={(currentModel.supplyPipelineDepth) + " м"} />

                <SpecItem
                  label={"Диаметр подводящего B:"}
                  value={`${currentModel.supplyPipelineDiameter} мм ${currentModel.supplyPipelineMaterial ? `(${currentModel.supplyPipelineMaterial})` : ''}`} />

                <SpecItem
                  label={"Направление подводящего:"}
                  value={directionLabels[currentModel.supplyPipelineDirectionInHours] || currentModel.supplyPipelineDirectionInHours} />

                <SpecItem
                  label={"Глубина напорного D:"}
                  value={currentModel.pressurePipelineDepth + " м"} />

                <SpecItem
                  label={"Диаметр напорного C:"}
                  value={`${currentModel.pressurePipelineDiameter} мм ${currentModel.pressurePipelineMaterial ? PipelineMaterialTranslations[currentModel.pressurePipelineMaterial] : ''}`} />

                <SpecItem
                  label={"Направление напорного:"}
                  value={directionLabels[currentModel.pressurePipelineDirectionInHours] || currentModel.pressurePipelineDirectionInHours} />

                <SpecItem
                  label={"Количество напорных:"}
                  value={currentModel.hasManyExitPressurePipelines} />

                <SpecItem
                  label={"Диаметр станции:"}
                  value={(currentModel.expectedDiameterOfPumpStation + " м")} />

                <SpecItem
                  label={"Высота станции:"}
                  value={currentModel.expectedHeightOfPumpStation} />

                <SpecItem
                  label={"Утепление корпуса:"}
                  value={currentModel.insulatedHousingDepth + " м"} />
              </div>

              <h3 className={styles.sectionTitle}>Габаритные размеры трубопроводов и корпуса</h3>
              <div className={styles.specsGrid}>
                <SpecItem
                  label={"Метод пуска:"}
                  value={PumpsStartupMethodTranslations[currentModel.startupMethod] || currentModel.startupMethod} />

                <SpecItem
                  label={"Вводов питания:"}
                  value={currentModel.powerContactsToController} />

                <SpecItem
                  label={"Место установки шкафа:"}
                  value={currentModel.place} />
              </div>


              <h3 className={styles.sectionTitle}>Дополнительная комплектация</h3>
              {equipmentCurrentModel.length > 0 && Object.values(equipmentCurrentModel).some(v => v) && (
                <div className={styles.extrasList}>
                  {equipmentCurrentModel.map((item, key) => (
                    <span key={key} className={styles.extraBadge}>{item.name}</span>
                  ))}
                </div>
              )}
            </div>

            <KNSSchemaTesting isActive={schemeIsActive} />
          </div>

          {!hasResponded && (
            <ClicksInfo freeClicksLeft={freeClicksLeft} />
          )}

          {!hasResponded ? (
            <RespondButton
              freeClicksLeft={freeClicksLeft}
              isClicksAvailable={isClicksAvailable}
              onRespond={handleRespond}
            />
          ) : (
            <OfferButton
              onCreateOffer={`/supplier/request/${request?.id}/offer/new`}
            />
          )}
        </div>
      </div>

      {showFreeClicksModal && (
        <FreeClicksModal
          clicksLeft={freeClicksLeft}
          onConfirm={handleConfirmFreeClick}
          onClose={() => setShowFreeClicksModal(false)}
          onGoToBilling={handleGoToBilling}
        />
      )}
    </>
  )
})

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
)


const SpecItem = ({ label, value }) => (
  <div className={styles.specItem}>
    <span className={styles.specLabel}>{label}</span>
    <span className={styles.specValue}>{value}</span>
  </div>
)