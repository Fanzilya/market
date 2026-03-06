// src/pages/OfferDetailPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionUser } from '../../../auth/demoAuth.js'
import { getOfferById } from '../../../data/offers.js'
import { getRequestById } from '../../../data/requests.js'
import { getBrandBySlug } from '../../../data/brands.js'
import Sidebar from '../../../components/Sidebar.jsx'
import styles from './OfferDetailPage.module.css'

export default function OfferDetailPage() {
  const { offerId } = useParams()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const offer = getOfferById(offerId)
  const request = offer ? getRequestById(offer.requestId) : null
  const brand = offer?.supplierCompany ? getBrandBySlug(offer.supplierCompany.toLowerCase()) : null

  // Функция для форматирования цены
  const formatPrice = (price) => {
    if (!price && price !== 0) return '—'
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  // Функция для получения типа документа
  const getDocumentType = (doc) => {
    if (typeof doc === 'string') {
      // Определяем тип по расширению файла
      const extension = doc.split('.').pop()?.toLowerCase()
      if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image'
      if (['pdf'].includes(extension)) return 'pdf'
      if (['doc', 'docx'].includes(extension)) return 'word'
      if (['xls', 'xlsx'].includes(extension)) return 'excel'
      if (['dwg', 'dxf', 'cdw'].includes(extension)) return 'drawing'
      return 'document'
    }
    return doc?.type || 'document'
  }

  // Функция для получения названия типа документа
  const getDocumentTypeName = (doc) => {
    if (typeof doc === 'string') {
      const type = getDocumentType(doc)
      const typeNames = {
        image: 'Изображение',
        pdf: 'PDF документ',
        word: 'Word документ',
        excel: 'Excel документ',
        drawing: 'Чертеж',
        document: 'Документ'
      }
      return typeNames[type] || 'Документ'
    }
    return doc?.typeName || 
           (doc?.type === 'passport' ? 'Паспорт' :
            doc?.type === 'certificate' ? 'Сертификат' :
            doc?.type === 'drawing' ? 'Чертеж' :
            doc?.type === 'offer' ? 'КП' : 'Документ')
  }

  // Функция для получения иконки документа по типу
  const getDocumentIcon = (doc) => {
    const type = typeof doc === 'string' ? getDocumentType(doc) : doc?.type
    
    switch(type) {
      case 'passport':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 17H8M16 13H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'certificate':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'drawing':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V16" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'offer':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4H20V8L12 16L4 8V4Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 8H20" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'pdf':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 7L14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12H16M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'image':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 16L18 12L14 16L10 12L2 20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
    }
  }

  // Функция для получения имени документа
  const getDocumentName = (doc) => {
    if (typeof doc === 'string') {
      return doc.split('/').pop() || doc
    }
    return doc?.file?.name || doc?.name || 'Документ'
  }

  // Функция для получения размера документа
  const getDocumentSize = (doc) => {
    if (typeof doc === 'object' && doc?.file?.size) {
      return (doc.file.size / 1024).toFixed(1) + ' КБ'
    }
    return null
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения.</p>
          <button onClick={() => navigate('/login')} className={styles.primaryButton}>
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  if (!offer) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔍</div>
          <h2>Предложение не найдено</h2>
          <p>Запрошенное коммерческое предложение не существует</p>
          <button onClick={() => navigate(-1)} className={styles.primaryButton}>
            Вернуться назад
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/login')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Шапка страницы */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Коммерческое предложение</h1>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumb} onClick={() => navigate('/customer')}>Заявки</span>
                <span className={styles.separator}>›</span>
                {request && (
                  <>
                    <span className={styles.breadcrumb} onClick={() => navigate(`/customer/request/${request.id}`)}>
                      {request.id}
                    </span>
                    <span className={styles.separator}>›</span>
                  </>
                )}
                <span className={styles.breadcrumb} onClick={() => navigate(`/customer/request/${offer.requestId}/offers`)}>
                  Предложения
                </span>
                <span className={styles.separator}>›</span>
                <span className={styles.current}>КП №{offer.offerNumber || offer.id}</span>
              </div>
            </div>
            <button
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
              </svg>
              Назад
            </button>
          </div>

          {/* Информация о предложении */}
          <div className={styles.offerCard}>
            <div className={styles.offerHeader}>
              <div className={styles.offerHeaderLeft}>
                <div className={styles.offerIcon}>
                  {offer.supplierCompany?.charAt(0) || offer.supplierFullName?.charAt(0) || 'К'}
                </div>
                <div className={styles.offerCompanyInfo}>
                  <h2 className={styles.offerCompany}>{offer.supplierCompany || offer.supplierFullName || 'Компания'}</h2>
                  <div className={styles.offerMeta}>
                    <span className={styles.offerNumber}>КП №{offer.offerNumber || offer.id}</span>
                    <span className={styles.offerDate}>
                      от {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.offerPrice}>
                {formatPrice(offer.price)}
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
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Номер КП</span>
                      <span className={styles.infoValue}>{offer.offerNumber || offer.id}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Дата КП</span>
                      <span className={styles.infoValue}>
                        {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Стоимость</span>
                      <span className={styles.infoValue}>{formatPrice(offer.price)}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Город склада</span>
                      <span className={styles.infoValue}>{offer.city || '—'}</span>
                    </div>
                  </div>

                  {offer.comment && (
                    <div className={styles.commentSection}>
                      <h4 className={styles.commentTitle}>Комментарий к предложению</h4>
                      <p className={styles.commentText}>{offer.comment}</p>
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
                      <span className={styles.infoValue}>{offer.fullName || offer.supplierCompany || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Краткое наименование</span>
                      <span className={styles.infoValue}>{offer.shortName || offer.supplierCompany || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>ИНН</span>
                      <span className={styles.infoValue}>{offer.inn || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>КПП</span>
                      <span className={styles.infoValue}>{offer.kpp || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контактное лицо</span>
                      <span className={styles.infoValue}>{offer.contactPerson || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон</span>
                      <span className={styles.infoValue}>{offer.contactPhone || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Email</span>
                      <span className={styles.infoValue}>{offer.contactEmail || '—'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className={styles.deliverySection}>
                  <h3 className={styles.sectionTitle}>Условия поставки</h3>
                  
                  {offer.hasDelivery && (
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Стоимость доставки</span>
                        <span className={styles.infoValue}>{offer.deliveryCost ? formatPrice(offer.deliveryCost) : '—'}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Срок поставки</span>
                        <span className={styles.infoValue}>{offer.deliveryTime || '—'}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Условия оплаты</span>
                      <span className={styles.infoValue}>{offer.paymentTerms || '—'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Гарантийный срок</span>
                      <span className={styles.infoValue}>{offer.warrantyPeriod || '—'}</span>
                    </div>
                  </div>

                  {offer.hasCommissioning && (
                    <div className={styles.commissioningSection}>
                      <h4 className={styles.subsectionTitle}>Пусконаладочные работы</h4>
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Стоимость ПНР</span>
                          <span className={styles.infoValue}>{offer.commissioningCost ? formatPrice(offer.commissioningCost) : '—'}</span>
                        </div>
                      </div>
                      {offer.commissioningDescription && (
                        <p className={styles.descriptionText}>{offer.commissioningDescription}</p>
                      )}
                    </div>
                  )}

                  {offer.additionalServices && (
                    <div className={styles.additionalSection}>
                      <h4 className={styles.subsectionTitle}>Дополнительные услуги</h4>
                      <p className={styles.descriptionText}>{offer.additionalServices}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'materials' && (
                <div className={styles.materialsSection}>
                  <h3 className={styles.sectionTitle}>Материалы и оборудование</h3>
                  {offer.materials && offer.materials.length > 0 ? (
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
                          {offer.materials.map((material, index) => {
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
                              {formatPrice(offer.materials.reduce((sum, m) => 
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
                  
                  {offer.documents && offer.documents.length > 0 ? (
                    <div className={styles.documentsGrid}>
                      {offer.documents.map((doc, index) => {
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
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 15V3" stroke="currentColor" strokeWidth="2"/>
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
                onClick={() => navigate(`/customer/request/${offer.requestId}/offers`)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
                </svg>
                Вернуться к списку предложений
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}