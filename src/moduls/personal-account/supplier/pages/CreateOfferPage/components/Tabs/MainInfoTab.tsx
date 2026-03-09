// src/pages/supplier/CreateOfferPage/components/Tabs/MainInfoTab.tsx
import React from 'react'
import styles from '../../CreateOfferPage.module.css'

export default function MainInfoTab({ formData, errors, onChange, isSubmitting }) {
  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Основная информация</h3>

      <div className={styles.formGrid}>
        <FormGroup
          label="Номер коммерческого предложения"
          name="offerNumber"
          value={formData.offerNumber}
          onChange={onChange}
          error={errors.offerNumber}
          required
          placeholder="КП-2025-001"
          disabled={isSubmitting}
        />

        <FormGroup
          label="Дата КП"
          name="offerDate"
          type="date"
          value={formData.offerDate}
          onChange={onChange}
          error={errors.offerDate}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.formGrid}>
        <FormGroup
          label="Стоимость"
          name="price"
          value={formData.price}
          onChange={onChange}
          error={errors.price}
          required
          placeholder="1 500 000 ₽"
          disabled={isSubmitting}
        />

        <FormGroup
          label="Город склада"
          name="city"
          value={formData.city}
          onChange={onChange}
          error={errors.city}
          required
          placeholder="Москва"
          disabled={isSubmitting}
        />
      </div>

      <FormGroup
        label="Комментарий к предложению"
        name="comment"
        type="textarea"
        value={formData.comment}
        onChange={onChange}
        placeholder="Дополнительная информация по предложению"
        disabled={isSubmitting}
      />
    </div>
  )
}

const FormGroup = ({ label, name, type = 'text', value, onChange, error, required, placeholder, disabled }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>
      {label} {required && <span className={styles.required}>*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        rows="4"
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ''}`}
        disabled={disabled}
      />
    )}
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)