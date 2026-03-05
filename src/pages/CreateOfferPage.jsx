// pages/CreateOfferPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { getRequestById } from '../data/requests.js'
import { createOffer } from '../data/offers.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './CreateOfferPage.module.css'

export default function CreateOfferPage() {
  const { requestId } = useParams()
  const location = useLocation()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [request, setRequest] = useState(location.state?.request || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('main')

  // Состояния для формы
  const [formData, setFormData] = useState({
    // Основная информация
    fullName: '', // Полное наименование организации
    shortName: '', // Краткое наименование
    inn: '', // ИНН
    kpp: '', // КПП
    
    // Информация о предложении
    price: '', // Стоимость
    offerNumber: '', // Номер коммерческого предложения
    offerDate: new Date().toISOString().split('T')[0], // Дата КП
    
    // Условия поставки
    deliveryCost: '', // Стоимость доставки
    deliveryTime: '', // Срок поставки
    paymentTerms: '', // Условия оплаты
    warrantyPeriod: '', // Гарантийный срок
    
    // Дополнительные услуги
    commissioning: '', // Пусконаладочные работы
    additionalServices: '', // Дополнительные услуги
    
    // Контактная информация
    city: '', // Город склада
    contactPerson: '', // Контактное лицо
    contactPhone: '', // Контактный телефон
    contactEmail: '', // Контактный email
    
    // Документы
    documents: [], // Прикрепленные документы
    comment: '' // Комментарий
  })

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

  // Если нет данных в state, загружаем по ID
  useEffect(() => {
    if (!request && requestId) {
      const loadedRequest = getRequestById(requestId)
      setRequest(loadedRequest)
    }
    
    // Загружаем данные компании пользователя
    if (user?.company) {
      setFormData(prev => ({
        ...prev,
        fullName: user.company.name || '',
        shortName: user.company.shortName || '',
        inn: user.company.inn || '',
        kpp: user.company.kpp || '',
        contactPerson: user.fullName || '',
        contactEmail: user.email || '',
        contactPhone: user.phone || ''
      }))
    }
  }, [requestId, request, user])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      // Для файлов добавляем в массив documents
      const fileList = Array.from(files)
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...fileList]
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Укажите полное наименование организации')
      return false
    }
    if (!formData.price.trim()) {
      setError('Укажите стоимость')
      return false
    }
    if (!formData.offerNumber.trim()) {
      setError('Укажите номер коммерческого предложения')
      return false
    }
    if (!formData.offerDate) {
      setError('Укажите дату коммерческого предложения')
      return false
    }
    if (!formData.city.trim()) {
      setError('Укажите город расположения склада')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsSubmitting(true)

    // Создаем предложение
    setTimeout(() => {
      const offerId = `OFFER-${Date.now().toString(36).toUpperCase()}`
      
      createOffer({
        id: offerId,
        createdAt: new Date().toISOString(),
        requestId: request.id,
        supplierEmail: user.email,
        supplierFullName: user.fullName,
        supplierCompany: user.company?.name ?? '',
        ...formData,
        documents: formData.documents.map(file => file.name), // Сохраняем только имена файлов
        status: 'new'
      })
      setIsSubmitting(false)
    
      // Перенаправляем на страницу с полной информацией и передаем флаг refresh
      navigate(`/supplier/request/${request.id}/full`, {
        state: { 
          message: 'Коммерческое предложение успешно отправлено!',
          refresh: true, // Добавляем флаг для обновления данных
          type: 'success'
        }
      })
    }, 800)
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения</p>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔍</div>
          <h2>Заявка не найдена</h2>
          <p>Запрошенная заявка не существует или была удалена</p>
          <button onClick={() => navigate('/supplier')} className={styles.primaryButton}>
            Вернуться к списку
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Шапка страницы */}
          <div className={styles.header}>
            <h1 className={styles.title}>Создание коммерческого предложения</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>›</span>
              <span className={styles.breadcrumb} onClick={() => navigate('/supplier')}>Заявки</span>
              <span className={styles.separator}>›</span>
              <span className={styles.breadcrumb} onClick={() => navigate(`/supplier/request/${request.id}/preview`)}>
                Предпросмотр
              </span>
              <span className={styles.separator}>›</span>
              <span className={styles.current}>Создание КП</span>
            </div>
          </div>

          {/* Уведомление об успешной отправке */}
          {showSuccess && (
            <div className={styles.successNotification}>
              <div className={styles.successIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#10B981"/>
                  <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.successContent}>
                <h3 className={styles.successTitle}>Предложение отправлено!</h3>
                <p className={styles.successMessage}>
                  Ваше коммерческое предложение успешно отправлено. Сейчас вы будете перенаправлены на страницу заявки.
                </p>
              </div>
            </div>
          )}

          {/* Информация о заявке */}
          <div className={styles.requestInfoCard}>
            <div className={styles.requestInfoHeader}>
              <h2 className={styles.requestInfoTitle}>Заявка {request.id}</h2>
              <span className={styles.requestInfoBadge}>Новое КП</span>
            </div>
            <div className={styles.requestInfoGrid}>
              <div className={styles.requestInfoItem}>
                <span className={styles.requestInfoLabel}>Объект</span>
                <span className={styles.requestInfoValue}>{request.objectName}</span>
              </div>
              <div className={styles.requestInfoItem}>
                <span className={styles.requestInfoLabel}>Заказчик</span>
                <span className={styles.requestInfoValue}>{request.govCustomerName}</span>
              </div>
              <div className={styles.requestInfoItem}>
                <span className={styles.requestInfoLabel}>Тип</span>
                <span className={styles.requestInfoValue}>{request.configType || 'КНС'}</span>
              </div>
              <div className={styles.requestInfoItem}>
                <span className={styles.requestInfoLabel}>Дата создания</span>
                <span className={styles.requestInfoValue}>
                  {new Date(request.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          </div>

          {/* Информация о бесплатных кликах */}
          <div className={styles.clicksInfo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2"/>
            </svg>
            <div>
              <strong>Использован 1 бесплатный отклик</strong>
              <p>После отправки КП вам станет доступна полная информация о заказчике.</p>
            </div>
          </div>

          {/* Табы */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'main' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('main')}
            >
              Основная информация
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
              className={`${styles.tab} ${activeTab === 'docs' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('docs')}
            >
              Документы
            </button>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#FECACA"/>
                <path d="M12 7V13" stroke="#DC2626" strokeWidth="2"/>
                <circle cx="12" cy="17" r="1.5" fill="#DC2626"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Вкладка: Основная информация */}
            {activeTab === 'main' && (
              <div className={styles.tabContent}>
                <h3 className={styles.sectionTitle}>Основная информация</h3>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Номер коммерческого предложения <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="offerNumber"
                      value={formData.offerNumber}
                      onChange={handleChange}
                      placeholder="КП-2025-001"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Дата КП <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="date"
                      name="offerDate"
                      value={formData.offerDate}
                      onChange={handleChange}
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Стоимость <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="1 500 000 ₽"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Город склада <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Москва"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Комментарий к предложению</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Дополнительная информация по предложению"
                    className={styles.textarea}
                    rows="4"
                    disabled={showSuccess}
                  />
                </div>
              </div>
            )}

            {/* Вкладка: Информация о компании */}
            {activeTab === 'company' && (
              <div className={styles.tabContent}>
                <h3 className={styles.sectionTitle}>Информация о компании</h3>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Полное наименование организации <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Общество с ограниченной ответственностью «Поставщик»"
                    className={styles.input}
                    disabled={showSuccess}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Краткое наименование</label>
                  <input
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    placeholder="ООО «Поставщик»"
                    className={styles.input}
                    disabled={showSuccess}
                  />
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>ИНН</label>
                    <input
                      type="text"
                      name="inn"
                      value={formData.inn}
                      onChange={handleChange}
                      placeholder="7701234567"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>КПП</label>
                    <input
                      type="text"
                      name="kpp"
                      value={formData.kpp}
                      onChange={handleChange}
                      placeholder="770101001"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>
                </div>

                <h4 className={styles.subsectionTitle}>Контактная информация</h4>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Контактное лицо</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Иванов Иван Иванович"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Телефон</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="+7 (999) 123-45-67"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="info@company.ru"
                    className={styles.input}
                    disabled={showSuccess}
                  />
                </div>
              </div>
            )}

            {/* Вкладка: Условия поставки */}
            {activeTab === 'delivery' && (
              <div className={styles.tabContent}>
                <h3 className={styles.sectionTitle}>Условия поставки</h3>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Стоимость доставки</label>
                    <input
                      type="text"
                      name="deliveryCost"
                      value={formData.deliveryCost}
                      onChange={handleChange}
                      placeholder="50 000 ₽"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Срок поставки</label>
                    <input
                      type="text"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      placeholder="30 дней"
                      className={styles.input}
                      disabled={showSuccess}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Условия оплаты</label>
                  <input
                    type="text"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    placeholder="100% предоплата / 50% предоплата, 50% по факту"
                    className={styles.input}
                    disabled={showSuccess}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Гарантийный срок</label>
                  <input
                    type="text"
                    name="warrantyPeriod"
                    value={formData.warrantyPeriod}
                    onChange={handleChange}
                    placeholder="12 месяцев"
                    className={styles.input}
                    disabled={showSuccess}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Пусконаладочные работы</label>
                  <textarea
                    name="commissioning"
                    value={formData.commissioning}
                    onChange={handleChange}
                    placeholder="Описание пусконаладочных работ, условия и стоимость"
                    className={styles.textarea}
                    rows="3"
                    disabled={showSuccess}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Дополнительные услуги</label>
                  <textarea
                    name="additionalServices"
                    value={formData.additionalServices}
                    onChange={handleChange}
                    placeholder="Шеф-монтаж, обучение персонала, сервисное обслуживание"
                    className={styles.textarea}
                    rows="3"
                    disabled={showSuccess}
                  />
                </div>
              </div>
            )}

            {/* Вкладка: Документы */}
            {activeTab === 'docs' && (
              <div className={styles.tabContent}>
                <h3 className={styles.sectionTitle}>Документы</h3>
                
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    onChange={handleChange}
                    className={styles.fileInput}
                    disabled={showSuccess}
                  />
                  <label htmlFor="fileUpload" className={styles.uploadLabel}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M12 16V4" stroke="#4A85F6" strokeWidth="2"/>
                      <path d="M8 8L12 4L16 8" stroke="#4A85F6" strokeWidth="2"/>
                      <path d="M20 16V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V16" stroke="#4A85F6" strokeWidth="2"/>
                    </svg>
                    <span>Нажмите для загрузки файлов</span>
                    <span className={styles.uploadHint}>PDF, DOC, XLS, JPG до 10 МБ</span>
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className={styles.documentsList}>
                    <h4 className={styles.documentsTitle}>Загруженные файлы:</h4>
                    {formData.documents.map((file, index) => (
                      <div key={index} className={styles.documentItem}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4A85F6" strokeWidth="2"/>
                        </svg>
                        <span className={styles.documentName}>{file.name}</span>
                        <span className={styles.documentSize}>
                          {(file.size / 1024).toFixed(1)} КБ
                        </span>
                        <button
                          type="button"
                          className={styles.removeDocument}
                          onClick={() => removeDocument(index)}
                          disabled={showSuccess}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Кнопки действий */}
            {!showSuccess && (
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => navigate(`/supplier/request/${request.id}/preview`)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner} />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2"/>
                        <path d="M14 2V8H20" stroke="white" strokeWidth="2"/>
                      </svg>
                      Отправить коммерческое предложение
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}

