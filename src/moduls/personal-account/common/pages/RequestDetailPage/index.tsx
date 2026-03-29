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
import { directionLabels, PerfomanceMeasureUnitTranslations, PipelineMaterialTranslations, PumpsStartupMethodTranslations } from '@/entities/request/config'
import { formatDate } from '@/utils/get-form-data'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import { RequestView } from '@/widgets/request-view'
import { OfferItem } from '@/widgets/offers/offer-item'
import { BasicInformationView } from '@/moduls/personal-account/customer/features/CreateRequestPage/basic-information-form/basic-information-view'
import { KnsParametersView } from '@/moduls/personal-account/customer/features/CreateRequestPage/kns-parameters/kns-parameters-view'
import { PupmParametersView } from '@/moduls/personal-account/customer/features/CreateRequestPage/pump-parameters/pump-parameters-view'

export const RequestDetailPage = observer(() => {
  const { requestId, type } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const canEdit = false;
  const isSupplier = user!.role === Role.Supplier
  const { init, isLoader, request, knsData, knsElementsData, pumpData, offers } = requestDetailModel
  useEffect(() => {
    init(requestId!)
  }, [requestId])


  return isLoader ? <Loader /> : (<>

    <AccountHeader
      title={`Заявка ${request?.innerId}`}
      breadcrumbs={{
        current: request?.innerId || "",
        linksBack: [
          {
            text: isSupplier ? 'Заявки' : 'Мои заявки',
            link: isSupplier ? '/supplier/request' : '/customer/request'
          }
        ]
      }}

      rightBlock={
        <div className={styles.headerActions}>
          {!isSupplier && (
            <>
              {request.isArchived && (
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
      }
    />

    {/* <RequestView
      request={request}
      currentModel={currentModel}
      equipmentCurrentModel={equipmentCurrentModel}
      hasResponded={false}
      schemeIsActive={schemeIsActive}
    /> */}


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


    <div>
      {offers.length > 0 ? (
        <div className={styles.offersSection}>

          <div className="flex items-center justify-between mb-[20px] flex-wrap gap-3">

            <h3 className={"text-[18px] font-semibold text-[#1e293b]"}>Коммерческие предложения ({offers.length})</h3>

            <Link to={`/customer/request/${type}/${requestId}/offers`} className={styles.viewAllOffersButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
              </svg>
              Все КП
            </Link>

          </div>

          <div className="space-y-3">
            {offers.map((offer: any) => <OfferItem item={offer} url={`/customer/offer/${offer.id}`} />)}
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          Нет коммерческих предложений
        </div>
      )}
    </div>


    {/* Коммерческие предложения */}
    {/* {false & offers.length > 0 && (
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
                  {offer.bussinessAccount || offer.nameBySupplier}
                </span>
                <span className={styles.offerDate}>
                  {new Date(offer.supportingDocumentDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className={styles.offerPrice}>
                <span className={styles.priceLabel}>Цена с НДС:</span>
                <span className={styles.priceValue}>{offer.currentPriceNDS} ₽</span>
              </div>
              <div className={styles.offerPrice}>
                <span className={styles.priceLabel}>Цена без НДС:</span>
                <span className={styles.priceValue}>{offer.currentPriceNoNDS} ₽</span>
              </div>
              {offer.manufacturerCountry && (
                <div className={styles.offerComment}>
                  <p>{offer.manufacturerCountry}</p>
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
    )} */}

    {/* Если нет КП, показываем кнопку для просмотра (но она будет неактивной или информационной) */}
    {/* {false && !hasOffers && !isSupplier && (
      <div className={styles.noOffersSection}>
        <p className={styles.noOffersText}>
          На данную заявку пока нет коммерческих предложений
        </p>
      </div>
    )} */}

  </>
  )
})