// src/pages/supplier/CreateOfferPage/components/Tabs/CompanyInfoTab.jsx
import React from 'react'
import styles from '../../CreateOfferPage.module.css'

export default function CompanyInfoTab({ formData, errors, onChange, isSubmitting }) {
  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Информация о компании</h3>
      
      <FormGroup
        label="Полное наименование организации"
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        error={errors.fullName}
        required
        placeholder="Общество с ограниченной ответственностью «Поставщик»"
        disabled={isSubmitting}
      />

      <FormGroup
        label="Краткое наименование"
        name="shortName"
        value={formData.shortName}
        onChange={onChange}
        placeholder="ООО «Поставщик»"
        disabled={isSubmitting}
      />

      <div className={styles.formGrid}>
        <FormGroup
          label="ИНН"
          name="inn"
          value={formData.inn}
          onChange={onChange}
          placeholder="7701234567"
          disabled={isSubmitting}
        />

        <FormGroup
          label="КПП"
          name="kpp"
          value={formData.kpp}
          onChange={onChange}
          placeholder="770101001"
          disabled={isSubmitting}
        />
      </div>

      <h4 className={styles.subsectionTitle}>Контактная информация</h4>

      <div className={styles.formGrid}>
        <FormGroup
          label="Контактное лицо"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={onChange}
          placeholder="Иванов Иван Иванович"
          disabled={isSubmitting}
        />

        <FormGroup
          label="Телефон"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={onChange}
          placeholder="+7 (999) 123-45-67"
          disabled={isSubmitting}
        />
      </div>

      <FormGroup
        label="Email"
        name="contactEmail"
        type="email"
        value={formData.contactEmail}
        onChange={onChange}
        placeholder="info@company.ru"
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
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${error ? styles.error : ''}`}
      disabled={disabled}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)