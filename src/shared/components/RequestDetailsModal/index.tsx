// components/RequestDetailsModal.tsx
import { useState } from 'react'
import styles from './RequestDetailsModal.module.css'

export default function RequestDetailsModal({
  request,
  userEmail,
  hasOffer,
  onSubmit,
  onClose
}) {
  const [offerPrice, setOfferPrice] = useState('')
  const [offerComment, setOfferComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOfferForm, setShowOfferForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Имитация отправки
    setTimeout(() => {
      onSubmit({
        price: offerPrice,
        comment: offerComment,
        createdAt: new Date().toISOString()
      })
      setIsSubmitting(false)
    }, 500)
  }

  // Данные конфигурации для демонстрации
  const configData = {
    производительность: request.performance || '3',
    напор: request.pressure || '3',
    рабочихНасосов: request.workingPumps || '6',
    резервныхНасосов: request.reservePumps || '1',
    среда: request.medium || 'Ливневые сточные воды',
    температура: request.temperature || '35',
    взрывозащита: request.explosionProof || 'Да'
  }

  const допКомплектация = request.additionalEquipment || [
    'Расходомер на напорном трубопроводе',
    'Газовализатор',
    'Наземный павильон',
    'Грузоподъемное устройство'
  ]

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Заявка {request.id}</h2>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.breadcrumbs}>
          <span className={styles.breadcrumb}>Главная</span>
          <span className={styles.separator}>›</span>
          <span className={styles.breadcrumb}>Заявки</span>
          <span className={styles.separator}>›</span>
          <span className={styles.breadcrumbActive}>{request.id}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>НАЗВАНИЕ ОБЪЕКТА</span>
                <span className={styles.infoValue}>{request.objectName || 'КНС'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ГОС. ЗАКАЗЧИК</span>
                <span className={styles.infoValue}>{request.govCustomerName || 'ГУИС'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ТИП КОНФИГУРАЦИИ</span>
                <span className={styles.infoValue}>{request.configType || 'КНС'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>КОНТАКТНОЕ ЛИЦО</span>
                <span className={styles.infoValue}>{request.contactPerson || 'Петров Пётр Петрович'}</span>
              </div>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.83 21 20.67 21 20.5 21C10.62 21 2.5 12.88 2.5 3C2.5 2.83 2.5 2.67 2.51 2.5C2.57 1.94 3.02 1.5 3.58 1.5H6.58C7.17 1.5 7.68 1.91 7.78 2.49L8.28 5.36C8.38 5.92 8.14 6.49 7.67 6.81L5.94 8.01C7.34 10.79 9.64 13.09 12.42 14.49L13.62 12.76C13.94 12.29 14.51 12.05 15.07 12.15L17.94 12.65C18.52 12.75 18.93 13.26 18.93 13.85V16.92Z" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{request.contactPhone || '+7 (900) 000-00-00'}</span>
              </div>
              <div className={styles.contactRow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" />
                </svg>
                <a href={`mailto:${request.contactEmail || 'email@marketplays.ru'}`}>
                  {request.contactEmail || 'email@marketplays.ru'}
                </a>
              </div>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Конфигурация КНС</h3>

          <div className={styles.configTable}>
            <div className={styles.configRow}>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>ПРОИЗВОДИТЕЛЬНОСТЬ</span>
                <span className={styles.configValue}>{configData.производительность}</span>
              </div>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>ТРЕБУЕМЫЙ НАПОР</span>
                <span className={styles.configValue}>{configData.напор}</span>
              </div>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>РАБОЧИХ НАСОСОВ</span>
                <span className={styles.configValue}>{configData.рабочихНасосов}</span>
              </div>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>РЕЗЕРВНЫХ НАСОСОВ</span>
                <span className={styles.configValue}>{configData.резервныхНасосов}</span>
              </div>
            </div>

            <div className={styles.configRow}>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>ПЕРЕКАЧИВАЕМАЯ СРЕДА</span>
                <span className={styles.configValue}>{configData.среда}</span>
              </div>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>ТЕМПЕРАТУРА СРЕДЫ</span>
                <span className={styles.configValue}>{configData.температура}</span>
              </div>
              <div className={styles.configCell}>
                <span className={styles.configLabel}>ВЗРЫВОЗАЩИЩЕННОСТЬ</span>
                <span className={styles.configValue}>{configData.взрывозащита}</span>
              </div>
              <div className={styles.configCell}></div>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Доп. комплектация</h3>

          <div className={styles.equipmentList}>
            {допКомплектация.map((item, index) => (
              <div key={index} className={styles.equipmentItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
                  <path d="M8 12L11 15L16 9" stroke="#4A85F6" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {hasOffer ? (
            <div className={styles.myOfferSection}>
              <h3 className={styles.sectionTitle}>Моё предложение</h3>
              <div className={styles.offerCard}>
                <div className={styles.offerHeader}>
                  <span className={styles.offerCompany}>{userEmail}</span>
                  <span className={styles.offerDate}>
                    {new Date().toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className={styles.offerPrice}>
                  <span className={styles.priceLabel}>Цена:</span>
                  <span className={styles.priceValue}>12 000 ₽</span>
                </div>
                <div className={styles.offerComment}>
                  <span className={styles.commentLabel}>Комментарий:</span>
                  <p>Файл приложен</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.offerActions}>
              {!showOfferForm ? (
                <button
                  className={styles.createOfferButton}
                  onClick={() => setShowOfferForm(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Создать предложение
                </button>
              ) : (
                <form onSubmit={handleSubmit} className={styles.offerForm}>
                  <h4 className={styles.formTitle}>Новое предложение</h4>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Цена</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="например: 12 000"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Комментарий</label>
                    <textarea
                      className={styles.textarea}
                      value={offerComment}
                      onChange={(e) => setOfferComment(e.target.value)}
                      placeholder="Дополнительная информация..."
                      rows="3"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Файл</label>
                    <div className={styles.fileUpload}>
                      <input type="file" id="file" className={styles.fileInput} />
                      <label htmlFor="file" className={styles.fileLabel}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" />
                          <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Прикрепить файл
                      </label>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => setShowOfferForm(false)}
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить предложение'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className={styles.footer}>
            <button className={styles.backButton} onClick={onClose}>
              ← Вернуться к списку
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}