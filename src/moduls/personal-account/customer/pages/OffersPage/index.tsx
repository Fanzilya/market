// src/pages/OffersPage.tsx
import { useAuth } from '@/features/user/context/context'
import { listOffersByRequestId } from '@/shared/data/offers'
import { getRequestById } from '@/shared/data/requests'
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import styles from "./OffersPage.module.css"
import Icon from '@/shared/ui-kits/Icon'
import { DataOffersListModel } from '../../features/request-offers-list/data-offers-list-model'
import { offersListModel } from '../../features/request-offers-list/offers-list-model'
import { observer } from 'mobx-react-lite'
import { useOffersList } from '../../features/offers-list/use-offers-list'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Loader from '@/shared/ui-kits/loader/loader'
import { BasicInformationView } from '../../features/CreateRequestPage/basic-information-form/basic-information-view'
import { Stats } from './ui/stats'

export const OffersPage = () => {
  const { requestId } = useParams()

  // const {
  //   navigate,
  //   selectedOffers,
  //   sortBy,
  //   setSortBy,
  //   sortOrder,
  //   setSortOrder,
  //   filterCompany,
  //   setFilterCompany,
  //   selectAll,
  //   viewMode,
  //   setViewMode,
  //   companies,
  //   filteredOffers,
  //   exportToExcel,
  //   handleSelectAll,
  //   handleSelectOffer,
  //   handleViewOffer,
  // } = DataOffersListModel(requestId!)

  // const { request, init, offers, stats } = offersListModel

  // useEffect(() => {
  //   init(requestId)
  // }, [])



  const { request, offers, isLoader, stats, viewMode, setViewMode } = useOffersList(requestId!)


  useEffect(() => {
    console.log(request)
  }, [request])


  const navigate = useNavigate()
  const handleViewOffer = (offerId) => {
    navigate(`/customer/offer/${offerId}`)
  }


  return (
    <>

      <AccountHeader
        title={`Коммерческие предложения`}
        navBack={-1}
        breadcrumbs={{
          current: request?.innerId || "",
          linksBack: [
            {
              text: 'Мои заявки',
              link: '/customer/request'
            }
          ]
        }}

        rightBlock={
          <>
            <div className={styles.headerActions}>
              {/* {selectedOffers.length > 0 && ( */}
              <button
                className={styles.exportButton}
              // onClick={exportToExcel}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" />
                </svg>
                {/* Экспорт ({selectedOffers.length}) */}
              </button>
              {/* )} */}
            </div>
          </>
        }
      />


      {
        isLoader
          ? <Loader />
          : (
            <>

              <BasicInformationView formData={request!} />

              {offers.length > 0 && <Stats styles={styles} stats={stats} />}

              {/* ======== СДЕЛАТЬ ФИЛЬТРАЦИЮ ======== */}



              {
                offers.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Icon name='info' width={64} height={64} color='#CBD5E1' />
                    <h3>Коммерческие предложения отсутствуют</h3>
                    <p>На данную заявку пока нет предложений от поставщиков</p>
                  </div>
                ) :

                  (viewMode === 'table' ? (
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th className={styles.th} style={{ width: '40px' }}>
                              {/* <input
                                type="checkbox"
                                // checked={selectAll}
                                // onChange={handleSelectAll}
                                className={styles.checkbox}
                              /> */}
                            </th>
                            <th className={styles.th}>Местоположение склада</th>
                            <th className={styles.th}>Cайта поставщика</th>
                            <th className={styles.th}>Дата оформления сопроводительного документа</th>
                            <th className={styles.th}>Страна производитель</th>
                            <th className={styles.th}>Цена без НДС, ₽</th>
                            <th className={styles.th}>Цена с НДС, ₽</th>
                            <th className={styles.th}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            // filteredOffers.map((offer) => (
                            offers.map((offer) => (
                              // onClick={() => handleViewOffer(offer.id)}
                              <tr key={offer.id} className={styles.tr} onClick={(e) => { e.stopPropagation(); handleViewOffer(offer.id) }} >
                                <td className={styles.td} >
                                  {/* <input
                                    type="checkbox"
                                    checked={selectedOffers.includes(offer.id)}
                                    onChange={() => handleSelectOffer(offer.id)}
                                    className={styles.checkbox}
                                  /> */}
                                </td>
                                <td className={styles.td}>
                                  <span className={styles.dateCell}>{offer.warehouseLocation}</span>
                                </td>
                                <td className={styles.td}>
                                  <span className={styles.dataCell}>{offer.supplierSiteURL}</span>
                                </td>
                                <td className={styles.td}>
                                  <span className={styles.dateCell}>{new Date(offer.supportingDocumentDate).toLocaleDateString('ru-RU')}</span>
                                </td>
                                <td className={styles.td}>
                                  <span className={styles.dateCell}>{offer.manufacturerCountry}</span>
                                </td>
                                <td className={styles.td}>
                                  <span className={styles.priceCell}>{offer.currentPriceNoNDS} ₽</span>
                                </td>
                                <td className={styles.td}>
                                  <span className={styles.priceCell}>{offer.currentPriceNDS} ₽</span>
                                </td>

                                <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                                  <button
                                    className={styles.viewOfferButton}
                                  // onClick={() => handleViewOffer(offer.id)} // ← переход по кнопке
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className={styles.cardsGrid}>
                      {offers.map((offer) => (
                        <div
                          key={offer.id}
                          // selectedOffers.includes(offer.id)
                          className={`${styles.offerCard} ${styles.offerCardSelected}`}
                        // onClick={() => handleViewOffer(offer.id)} // ← переход по клику на карточку
                        >
                          <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderLeft}>
                              {/* <input
                                type="checkbox"
                                checked={selectedOffers.includes(offer.id)}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  handleSelectOffer(offer.id)
                                }}
                                className={styles.cardCheckbox}
                              /> */}
                              <div className={styles.cardAvatar}>
                                {offer.supplierCompany?.charAt(0) || offer.supplierFullName?.charAt(0)}
                              </div>
                              <div>
                                <h3 className={styles.cardCompany}>{offer.supplierCompany || offer.supplierFullName}</h3>
                                <span className={styles.cardDate}>
                                  {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                            </div>
                            <div className={styles.cardPrice}>
                              {offer.price} ₽
                            </div>
                          </div>

                          <div className={styles.cardBody}>
                            <div className={styles.cardRow}>
                              <span className={styles.cardLabel}>ИНН:</span>
                              <span className={styles.cardValue}>{offer.analysisData.inn}</span>
                            </div>
                            <div className={styles.cardRow}>
                              <span className={styles.cardLabel}>КПП:</span>
                              <span className={styles.cardValue}>{offer.analysisData.kpp}</span>
                            </div>
                            <div className={styles.cardRow}>
                              <span className={styles.cardLabel}>Страна:</span>
                              <span className={styles.cardValue}>{offer.analysisData.country}</span>
                            </div>
                            <div className={styles.cardRow}>
                              <span className={styles.cardLabel}>Статус:</span>
                              <span className={`${styles.cardStatus} ${offer.analysisData.status === '1' ? styles.cardManufacturer : styles.cardSupplier}`}>
                                {offer.analysisData.status === '1' ? 'Производитель' : 'Поставщик'}
                              </span>
                            </div>
                          </div>

                          {offer.comment && (
                            <div className={styles.cardComment}>
                              <p>{offer.comment}</p>
                            </div>
                          )}

                          <div className={styles.cardFooter}>
                            <button
                              className={styles.cardButton}
                              onClick={(e) => {
                                e.stopPropagation()
                                // handleViewOffer(offer.id) // ← переход по кнопке "Подробнее"
                              }}
                            >
                              Подробнее
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                  )
              }
            </>
          )
      }
    </>
  )
}