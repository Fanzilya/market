// src/pages/supplier/SupplierPreviewPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import InfoBanner from './components/InfoBanner'
import ContactInfo from '../../../../../widgets/request-view/contact-info'
import ExtrasSection from './components/ExtrasSection'
import ClicksInfo from '../../../../../widgets/request-view/clicks-info'
import RespondButton from '../../../../../widgets/request-view/respond-button'
import OfferButton from '../../../../../widgets/request-view/offer-button'
import useFreeClicks from './hooks/useFreeClicks'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import FreeClicksModal from '@/shared/components/FreeClicksModal'
import styles from "./RequestPreviewPage.module.css"
import { supplierPreviewModel } from '../../features/supplier-preview/supplier-preview-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { directionLabels, PerfomanceMeasureUnitTranslations, PipelineMaterialTranslations, PumpsStartupMethodTranslations } from '@/entities/request/config'
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Icon from '@/shared/ui-kits/Icon'
import { RequestView } from '@/widgets/request-view'

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
            current: `Заявка ${request?.innerId || "-"}`
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

        <RequestView
          request={request}
          currentModel={currentModel}
          equipmentCurrentModel={equipmentCurrentModel}
          hasResponded={hasResponded}
          schemeIsActive={schemeIsActive}
          freeClicksLeft={freeClicksLeft}
          isClicksAvailable={isClicksAvailable}
          handleRespond={handleRespond}
        />

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