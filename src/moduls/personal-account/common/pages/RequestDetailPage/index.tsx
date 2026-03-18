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

export const RequestDetailPage = observer(() => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const goToOffers = () => {
    navigate(`/customer/request/${requestId}/offers`)
  }

  const canEdit = false;
  const isSupplier = user!.role === Role.Supplier
  const { init, isLoader, requestModel, currentModel, equipmentCurrentModel, schemeIsActive, offers } = requestDetailModel
  useEffect(() => {
    init(requestId || "")
  }, [requestId])

  return isLoader ? <Loader /> : (<>

    <AccountHeader
      title={`Заявка ${requestModel?.innerId}`}
      breadcrumbs={{
        current: requestModel?.innerId || "",
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
      }
    />



    <RequestView
      request={requestModel}
      currentModel={currentModel}
      equipmentCurrentModel={equipmentCurrentModel}
      hasResponded={false}
      schemeIsActive={schemeIsActive}
    />


    <div>
      {offers.length > 0 ? (
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
          {/* Сетка с КП */}
          <div className="space-y-3">
            {offers.map((offer: any) => (
              <Link to={`/customer/offer/${offer.id}`}
                key={offer.id}
                className="bg-white rounded-xl block border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                {/* Верхняя цветная полоса с индикатором */}

                <div className="p-5">
                  {/* Заголовок с номером КП и статусом */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Коммерческое предложение</div>
                        <div className="font-semibold text-gray-900">
                          № {offer.offersNumber || 'б/н'}
                        </div>
                      </div>
                    </div>

                    {/* Бейдж с датой */}
                    <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded-lg">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{formatDate(offer.supportingDocumentDate)}</span>
                    </div>
                  </div>

                  {/* Основная информация в сетке */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Поставщик */}
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Поставщик
                      </div>
                      <div className="font-medium text-gray-900 truncate" title={offer.nameBySupplier}>
                        {offer.nameBySupplier || '—'}
                      </div>
                    </div>

                    {/* Цена с НДС */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-xs text-green-600 mb-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Цена с НДС
                      </div>
                      <div className="font-bold text-green-700">
                        {new Intl.NumberFormat('ru-RU').format(offer.currentPriceNDS || 0)} ₽
                      </div>
                    </div>

                    {/* Цена без НДС */}
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Цена без НДС
                      </div>
                      <div className="font-medium text-gray-900">
                        {new Intl.NumberFormat('ru-RU').format(offer.currentPriceNoNDS || 0)} ₽
                      </div>
                    </div>

                    {/* Местоположение */}
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Производитель / Склад
                      </div>
                      <div className="font-medium text-gray-900">
                        {offer.manufacturerCountry || '—'} {offer.warehouseLocation ? `/ ${offer.warehouseLocation}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Дополнительная информация в компактном виде */}
                  <div className="flex flex-wrap items-center gap-3 text-sm border-t border-gray-100 pt-4">
                    {offer.supplierSiteURL && (
                      <a
                        href={offer.supplierSiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Сайт поставщика
                      </a>
                    )}

                    {/* Файлы в виде иконок */}
                    <div className="flex items-center gap-2 ml-auto">
                      {offer.offerFileId && (
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            КП
                          </span>
                        </button>
                      )}
                      {offer.passportFileId && (
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                          </svg>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Паспорт
                          </span>
                        </button>
                      )}
                      {offer.certificateFileId && (
                        <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors group relative">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Сертификат
                          </span>
                        </button>
                      )}
                      {offer.planFileId && (
                        <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors group relative">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            План
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          Нет коммерческих предложений
        </div>
      )}
    </div>


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
    )}

    {/* Если нет КП, показываем кнопку для просмотра (но она будет неактивной или информационной) */}
    {false && !hasOffers && !isSupplier && (
      <div className={styles.noOffersSection}>
        <p className={styles.noOffersText}>
          На данную заявку пока нет коммерческих предложений
        </p>
      </div>
    )}

  </>
  )
})