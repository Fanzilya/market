// src/pages/supplier/CreateOfferPage/components/Tabs/DeliveryTab.jsx
import React from 'react'
import styles from '../../CreateOfferPage.module.css'

export default function DeliveryTab({ formData, errors, onChange, isSubmitting }) {
  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Условия поставки</h3>
      
      <CheckboxGroup
        label="Включить доставку"
        name="hasDelivery"
        checked={formData.hasDelivery}
        onChange={onChange}
        disabled={isSubmitting}
      />

      {formData.hasDelivery && (
        <div className={styles.formGrid}>
          <FormGroup
            label="Стоимость доставки"
            name="deliveryCost"
            value={formData.deliveryCost}
            onChange={onChange}
            placeholder="50 000 ₽"
            disabled={isSubmitting}
          />

          <FormGroup
            label="Срок поставки"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={onChange}
            placeholder="30 дней"
            disabled={isSubmitting}
          />
        </div>
      )}

      <FormGroup
        label="Условия оплаты"
        name="paymentTerms"
        value={formData.paymentTerms}
        onChange={onChange}
        placeholder="100% предоплата / 50% предоплата, 50% по факту"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Гарантийный срок"
        name="warrantyPeriod"
        value={formData.warrantyPeriod}
        onChange={onChange}
        placeholder="12 месяцев"
        disabled={isSubmitting}
      />

      <CheckboxGroup
        label="Включить пусконаладочные работы"
        name="hasCommissioning"
        checked={formData.hasCommissioning}
        onChange={onChange}
        disabled={isSubmitting}
      />

      {formData.hasCommissioning && (
        <>
          <FormGroup
            label="Стоимость ПНР"
            name="commissioningCost"
            value={formData.commissioningCost}
            onChange={onChange}
            placeholder="100 000 ₽"
            disabled={isSubmitting}
          />

          <FormGroup
            label="Описание ПНР"
            name="commissioningDescription"
            type="textarea"
            value={formData.commissioningDescription}
            onChange={onChange}
            placeholder="Подробное описание пусконаладочных работ"
            disabled={isSubmitting}
          />
        </>
      )}

      <FormGroup
        label="Дополнительные услуги"
        name="additionalServices"
        type="textarea"
        value={formData.additionalServices}
        onChange={onChange}
        placeholder="Шеф-монтаж, обучение персонала, сервисное обслуживание"
        disabled={isSubmitting}
      />
    </div>
  )
}

const FormGroup = ({ label, name, type = 'text', value, onChange, placeholder, disabled }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textarea}
        rows="3"
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        disabled={disabled}
      />
    )}
  </div>
)

const CheckboxGroup = ({ label, name, checked, onChange, disabled }) => (
  <div className={styles.formGroup}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        disabled={disabled}
      />
      {label}
    </label>
  </div>
)