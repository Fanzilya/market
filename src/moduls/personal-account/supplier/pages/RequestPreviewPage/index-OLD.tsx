// src/pages/supplier/SupplierPreviewPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import InfoBanner from './components/InfoBanner'
import ClicksInfo from '../../../../../widgets/request-view/clicks-info'
import useFreeClicks from './hooks/useFreeClicks'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import FreeClicksModal from '@/shared/components/FreeClicksModal'
import styles from "./RequestPreviewPage.module.css"
import { supplierPreviewModel } from '../../features/supplier-preview/supplier-preview-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Icon from '@/shared/ui-kits/Icon'
import { RequestView } from '@/widgets/request-view'
import { OfferButton, RespondButton } from '@/widgets/request-view/action-button'

export const RequestPreviewPage = observer(() => {
  const { requestId, type } = useParams()
  const { user, accountData } = useAuth()
  const [showFreeClicksModal, setShowFreeClicksModal] = useState(false)

  const { request, isLoader, init, currentModel, equipmentCurrentModel, schemeIsActive, clickRequestUser } = supplierPreviewModel

  useEffect(() => {
    init(requestId!, accountData)
  }, [])

  const { decrementClicks, isClicksAvailable } = useFreeClicks()
  const { isFavorite, handleToggleFavorite } = useFavorites({ user, requestId })

  const handleRespond = () => { setShowFreeClicksModal(true) }

  const handleConfirmFreeClick = async () => {
    decrementClicks()
    setShowFreeClicksModal(false)
    await clickRequestUser()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return isLoader ? <Loader /> : (
    <>
      <div className={styles.container}>
        <AccountHeader
          title={request.supplierRequestStatus == "Payed" ? 'Заявка' : 'Предпросмотр заявки'}
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

        <InfoBanner hasResponded={request.supplierRequestStatus != "Payed"} />

        <RequestView
          request={request}
          currentModel={currentModel}
          equipmentCurrentModel={equipmentCurrentModel}
          hasResponded={request.supplierRequestStatus == "Payed"}
          schemeIsActive={schemeIsActive}
          freeClicksLeft={accountData.coins}
          isClicksAvailable={isClicksAvailable}
          handleRespond={handleRespond}
        />

        {request.supplierRequestStatus != "Payed" && (
          <ClicksInfo freeClicksLeft={accountData.coins} />
        )}

        {request.supplierRequestStatus == "Payed" ? (
          <OfferButton onCreateOffer={`/supplier/request/${requestId}/offer/new`} />
        ) : (
          <RespondButton
            freeClicksLeft={accountData.coins}
            isClicksAvailable={isClicksAvailable}
            onRespond={handleRespond}
          />
        )}

      </div>

      {showFreeClicksModal && (
        <FreeClicksModal
          clicksLeft={accountData.coins}
          onConfirm={handleConfirmFreeClick}
          onClose={() => setShowFreeClicksModal(false)}
        />
      )}
    </>
  )
})
