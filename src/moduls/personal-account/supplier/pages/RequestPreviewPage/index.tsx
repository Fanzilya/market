// src/pages/supplier/SupplierPreviewPage/index.tsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/features/user/context/context'
import FreeClicksModal from '@/shared/components/FreeClicksModal'
import { supplierPreviewModel } from '../../features/supplier-preview/supplier-preview-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Icon from '@/shared/ui-kits/Icon'
import { BasicInformationView } from '@/moduls/personal-account/customer/features/CreateRequestPage/basic-information-form/basic-information-view'
import { KnsParametersView } from '@/moduls/personal-account/customer/features/CreateRequestPage/kns-parameters/kns-parameters-view'
import { PupmParametersView } from '@/moduls/personal-account/customer/features/CreateRequestPage/pump-parameters/pump-parameters-view'
import InfoBanner from './components/InfoBanner'
import ClicksInfo from '@/widgets/request-view/clicks-info'
import { OfferButton, RespondButton } from '@/widgets/request-view/action-button'
import { ACCOUNT_SUPPLY } from '@/entities/user/config'

export const RequestPreviewPage = observer(() => {
  const { requestId, type } = useParams()


  const { accountData } = useAuth()
  const [showFreeClicksModal, setShowFreeClicksModal] = useState(false)

  const { viewUser, request, isLoader, init, knsData, knsElementsData, pumpData, isPay, clickRequestUser } = supplierPreviewModel

  useEffect(() => {
    init(requestId!, accountData, type)
    viewUser(requestId!)
  }, [])

  const handleRespond = () => { setShowFreeClicksModal(true) }

  const handleConfirmFreeClick = async () => {
    setShowFreeClicksModal(false);
    clickRequestUser(requestId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return isLoader ? <Loader /> : (
    <>

      <AccountHeader
        navBack={'/supplier'}
        title={isPay ? 'Заявка' : 'Предпросмотр заявки'}
        breadcrumbs={{
          current: `Заявка ${request?.innerId || "-"}`,
          linksBack: [
            {
              link: "/supplier",
              text: "Заявки"
            },
            {
              link: "/supplier",
              text: "Заявки"
            }
          ]
        }}

        rightBlock={
          <button
          // className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
          // onClick={handleToggleFavorite}
          // title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Icon name="star" />
          </button>}
      />

      <InfoBanner hasResponded={!isPay} />

      <BasicInformationView formData={request} />

      {type == "kns"
        ? <KnsParametersView
          knsData={knsData}
          elements={knsElementsData}
          fileUrl={request.schemeFileId != null ? `https://triapi.ru/market/api/Request/schemeFile/download?fileId=${request.schemeFileId}` : ""}
          fileType={"download"}
        />
        : <PupmParametersView
          model={pumpData}
          fileUrl={request.schemeFileId != null ? `https://triapi.ru/market/api/Request/schemeFile/download?fileId=${request.schemeFileId}` : ""}
          fileType={"download"}
        />
      }

      {!isPay && (
        <ClicksInfo freeClicksLeft={accountData.coins} />
      )}

      {isPay ? (
        <OfferButton onCreateOffer={`/supplier/request/${requestId}/offer/new`} />
      ) : (
        <RespondButton
          freeClicksLeft={accountData.coins}
          isClicksAvailable={accountData.coins > 0}
          onRespond={handleRespond}
        />
      )}


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
