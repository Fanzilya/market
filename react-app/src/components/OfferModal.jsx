// components/OfferModal.jsx
import { useState } from 'react'
import styles from './OfferModal.module.css'

export default function OfferModal({ request, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    price: '',
    currency: 'RUB',
    validityDays: '30',
    deliveryTime: '',
    paymentTerms: '',
    comment: '',
    includeVAT: true,
    attachments: []
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.price.trim()) {
      newErrors.price = 'Укажите цену предложения'
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Введите корректную сумму'
    }

    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = 'Укажите срок поставки'
    }

    if (!formData.paymentTerms.trim()) {
      newErrors.paymentTerms = 'Укажите условия оплаты'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Имитация загрузки
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        createdAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error submitting offer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Создание коммерческого предложения</h2>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.requestInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Заявка:</span>
            <span className={styles.infoValue}>{request.id}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Объект:</span>
            <span className={styles.infoValue}>{request.objectName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Заказчик:</span>
            <span className={styles.infoValue}>{request.govCustomerName}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.priceSection}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Сумма предложения <span className={styles.required}>*</span>
              </label>
              <div className={styles.priceInput}>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`${styles.input} ${errors.price ? styles.error : ''}`}
                  min="0"
                  step="0.01"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className={styles.currencySelect}
                >
                  <option value="RUB">₽</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                </select>
              </div>
              {errors.price && <span className={styles.errorMessage}>{errors.price}</span>}
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="includeVAT"
                  checked={formData.includeVAT}
                  onChange={handleChange}
                />
                <span>Включая НДС</span>
              </label>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Срок действия (дней) <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="validityDays"
                value={formData.validityDays}
                onChange={handleChange}
                className={styles.input}
                min="1"
                max="365"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Срок поставки <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="например: 30 дней"
                className={`${styles.input} ${errors.deliveryTime ? styles.error : ''}`}
              />
              {errors.deliveryTime && <span className={styles.errorMessage}>{errors.deliveryTime}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Условия оплаты <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              placeholder="например: предоплата 50%"
              className={`${styles.input} ${errors.paymentTerms ? styles.error : ''}`}
            />
            {errors.paymentTerms && <span className={styles.errorMessage}>{errors.paymentTerms}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Комментарий
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Дополнительная информация по предложению..."
              className={styles.textarea}
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Вложения
            </label>
            <div className={styles.uploadArea}>
              <input
                type="file"
                multiple
                onChange={(e) => console.log('Files:', e.target.files)}
                className={styles.fileInput}
                id="file-upload"
              />
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                <span className={styles.uploadIcon}>📎</span>
                <span>Прикрепить файлы</span>
              </label>
              <p className={styles.uploadHint}>PDF, DOC, XLS, до 10 МБ</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
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
      </div>
    </div>
  )
}