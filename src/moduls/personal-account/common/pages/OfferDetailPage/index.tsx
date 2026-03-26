// src/pages/OfferDetailPage.tsx
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './OfferDetailPage.module.css'
import { DataOfferModel } from '../../features/OfferDetailPage/data-offer-model'
import { offerDetailModel } from '../../features/OfferDetailPage/offer-detail-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import Icon from '@/shared/ui-kits/Icon'

export const OfferDetailPage = observer(() => {
  const { offerId } = useParams()

  const {
    navigate,
    activeTab,
    setActiveTab,
    formatPrice,
    getDocumentTypeName,
    getDocumentIcon,
    getDocumentName,
    getDocumentSize,
  } = DataOfferModel(offerId!)


  const { offer, isLoader, init } = offerDetailModel


  useEffect(() => {
    init(offerId!)
  }, [])


  return isLoader ? <Loader /> : (
    <>
      <AccountHeader
        title='Коммерческое предложение'
        breadcrumbs={{
          current: `КП №${offer?.offersNumber || offer?.id}`,
          linksBack: [
            { text: "Главная", link: "/dashboard" },
            { text: "Заявки", link: "/customer" },
            // request && { text: request.id, link: `/customer/request/${request.id}` }
          ]
        }}

        rightBlock={
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
              <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
            Назад
          </button>
        }
      />

      {/* Информация о предложении */}
      <div className={styles.offerCard}>
        <div className={styles.offerHeader}>
          <div className={styles.offerHeaderLeft}>
            <div className={styles.offerIcon}>
              {offer?.nameBySupplier?.charAt(0) || offer?.nameBySupplier?.charAt(0) || 'К'}
            </div>
            <div className={styles.offerCompanyInfo}>
              <h2 className={styles.offerCompany}>{offer?.fullCompanyName}</h2>
              <div className={styles.offerMeta}>
                <span className={styles.offerNumber}>КП №{offer?.offersNumber || offer?.id}</span>
                <span className={styles.offerDate}>
                  от {new Date(offer?.supportingDocumentDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.offerPrice}>
            {formatPrice(offer?.currentPriceNDS)}
          </div>
        </div>

        {/* Табы */}

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'details' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Детали предложения
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'company' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('company')}
          >
            Информация о компании
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'delivery' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            Условия поставки
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'materials' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            Материалы и оборудование
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'documents' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Документы
          </button>
        </div>


        {/* Контент табов */}
        <div className={styles.tabContent}>
          {activeTab === 'details' && (
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Основная информация</h3>
              <div className={styles.infoGrid}>


                {[{ name: "Наименование компании", value: offer?.fullCompanyName },
                { name: "ИНН", value: offer?.inn },
                { name: "КПП", value: offer?.kpp },
                { name: "Местоположение склада", value: offer?.warehouseLocation },
                { name: "Список поставщиков", value: offer?.supplierSiteURL },
                { name: "Дата оформления сопроводительного документа", value: offer?.supportingDocumentDate, type: "date" },
                { name: "Страна производитель", value: offer?.manufacturerCountry },
                { name: "Цена без НДС", value: offer?.currentPriceNoNDS },
                { name: "Цена с НДС", value: offer?.currentPriceNDS },
                ].map((item, key) => (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{item.name}</span>
                    <span className={styles.infoValue}>{item?.type === "date" ? new Date(item.value).toLocaleDateString('ru-RU') : item.value}</span>

                  </div>
                ))}


                {[
                  {
                    condition: offer?.passportFileId,
                    name: "Паспорт оборудования",
                    link: `https://triapi.ru/market/api/Offers/equipPassport/download/?passportId=${offer?.passportFileId}&download=true`,
                    id: 'passport'
                  },
                  {
                    condition: offer?.certificateFileId,
                    name: "Сертификат оборудования",
                    link: `https://triapi.ru/market/api/Offers/equipCertificate/download/?certificateId=${offer?.certificateFileId}`,
                    id: 'certificate'
                  },
                  {
                    condition: offer?.planFileId,
                    name: "Чертеж/Схема",
                    link: `https://triapi.ru/market/api/Offers/scemeFile/download/?shemeFileId=${offer?.planFileId}`,
                    id: 'plan'
                  },
                  {
                    condition: offer?.offerFileId,
                    name: "КП на фирменном бланке",
                    link: `https://triapi.ru/market/api/Offers/offerFile/download/?offerId=${offer?.offerFileId}`,
                    id: 'offer'
                  }
                ]
                  .filter(item => item.condition)
                  .map((item) => (
                    <div className={styles.infoItem} key={item?.id}>
                      <span className={styles.infoLabel}>{item?.name}</span>
                      <a
                        href={item?.link}
                        className="text-[16px] font-medium text-[#1E293B] flex items-center gap-2"
                        download
                        target="_blank" // Добавляем для открытия в новой вкладке
                        rel="noopener noreferrer" // Безопасность для target="_blank"
                      >
                        <Icon name='pdf' />
                        Скачать
                      </a>
                    </div>
                  ))}
              </div>

              {offer?.comment && (
                <div className={styles.commentSection}>
                  <h4 className={styles.commentTitle}>Комментарий к предложению</h4>
                  <p className={styles.commentText}>{offer?.comment}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'company' && (
            <div className={styles.companySection}>
              <h3 className={styles.sectionTitle}>Информация о компании</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Полное наименование</span>
                  <span className={styles.infoValue}>{offer?.fullName || offer?.nameBySupplier || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Краткое наименование</span>
                  <span className={styles.infoValue}>{offer?.shortName || offer?.nameBySupplier || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>ИНН</span>
                  <span className={styles.infoValue}>{offer?.inn || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>КПП</span>
                  <span className={styles.infoValue}>{offer?.kpp || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Контактное лицо</span>
                  <span className={styles.infoValue}>{offer?.contactPerson || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Телефон</span>
                  <span className={styles.infoValue}>{offer?.contactPhone || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>{offer?.contactEmail || '—'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className={styles.deliverySection}>
              <h3 className={styles.sectionTitle}>Условия поставки</h3>

              {offer?.hasDelivery && (
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Стоимость доставки</span>
                    <span className={styles.infoValue}>{offer?.deliveryCost ? formatPrice(offer?.deliveryCost) : '—'}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Срок поставки</span>
                    <span className={styles.infoValue}>{offer?.deliveryTime || '—'}</span>
                  </div>
                </div>
              )}

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Условия оплаты</span>
                  <span className={styles.infoValue}>{offer?.paymentTerms || '—'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Гарантийный срок</span>
                  <span className={styles.infoValue}>{offer?.warrantyPeriod || '—'}</span>
                </div>
              </div>

              {offer?.hasCommissioning && (
                <div className={styles.commissioningSection}>
                  <h4 className={styles.subsectionTitle}>Пусконаладочные работы</h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Стоимость ПНР</span>
                      <span className={styles.infoValue}>{offer?.commissioningCost ? formatPrice(offer?.commissioningCost) : '—'}</span>
                    </div>
                  </div>
                  {offer?.commissioningDescription && (
                    <p className={styles.descriptionText}>{offer?.commissioningDescription}</p>
                  )}
                </div>
              )}

              {offer?.additionalServices && (
                <div className={styles.additionalSection}>
                  <h4 className={styles.subsectionTitle}>Дополнительные услуги</h4>
                  <p className={styles.descriptionText}>{offer?.additionalServices}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className={styles.materialsSection}>
              <h3 className={styles.sectionTitle}>Материалы и оборудование</h3>
              {offer?.materials && offer?.materials.length > 0 ? (
                <div className={styles.materialsTableContainer}>
                  <table className={styles.materialsTable}>
                    <thead>
                      <tr>
                        <th>Наименование</th>
                        <th>Количество</th>
                        <th>Ед. изм.</th>
                        <th>Цена за ед.</th>
                        <th>Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offer?.materials.map((material, index) => {
                        const total = (parseFloat(material.price) || 0) * (parseFloat(material.quantity) || 0)
                        return (
                          <tr key={material.id || index}>
                            <td className={styles.materialName}>{material.name || '—'}</td>
                            <td>{material.quantity || '—'}</td>
                            <td>{material.unit || 'шт'}</td>
                            <td>{formatPrice(material.price)}</td>
                            <td className={styles.materialTotal}>{formatPrice(total)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className={styles.totalLabel}>Итого:</td>
                        <td className={styles.totalValue}>
                          {formatPrice(offer?.materials.reduce((sum, m) =>
                            sum + ((parseFloat(m.price) || 0) * (parseFloat(m.quantity) || 0)), 0
                          ))}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <p className={styles.noData}>Материалы и оборудование не указаны</p>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className={styles.documentsSection}>
              <h3 className={styles.sectionTitle}>Документы</h3>

              {offer?.documents && offer?.documents.length > 0 ? (
                <div className={styles.documentsGrid}>
                  {offer?.documents.map((doc, index) => {
                    // Безопасная проверка документа
                    if (!doc) return null

                    return (
                      <div key={index} className={styles.documentCard}>
                        <div className={styles.documentIcon}>
                          {getDocumentIcon(doc)}
                        </div>
                        <div className={styles.documentInfo}>
                          <span className={styles.documentType}>
                            {getDocumentTypeName(doc)}
                          </span>
                          <span className={styles.documentName} title={getDocumentName(doc)}>
                            {getDocumentName(doc)}
                          </span>
                          {getDocumentSize(doc) && (
                            <span className={styles.documentSize}>
                              {getDocumentSize(doc)}
                            </span>
                          )}
                        </div>
                        <button
                          className={styles.downloadButton}
                          onClick={() => {
                            // Здесь будет логика скачивания
                            console.log('Скачать документ:', doc)
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" />
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          Скачать
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className={styles.noDocuments}>Нет прикрепленных документов</p>
              )}
            </div>
          )}
        </div>

        {/* Кнопка возврата к списку */}
        <div className={styles.offerFooter}>
          <button
            className={styles.backToListButton}
            onClick={() => navigate(-1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
              <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
            Вернуться к списку предложений
          </button>
        </div>
      </div>
    </>
  )
})