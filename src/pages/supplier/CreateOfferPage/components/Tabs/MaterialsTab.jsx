// src/pages/supplier/CreateOfferPage/components/Tabs/MaterialsTab.jsx
import React from 'react'
import useMaterials from '../../hooks/useMaterials'
import styles from '../../CreateOfferPage.module.css'

export default function MaterialsTab({ formData, updateFormData, isSubmitting }) {
  const {
    materials,
    newMaterial,
    handleMaterialChange,
    addMaterial,
    removeMaterial,
    getTotalPrice
  } = useMaterials(formData.materials || [])

  // Синхронизируем материалы с формой
  React.useEffect(() => {
    updateFormData({ materials })
  }, [materials, updateFormData])

  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Материалы и оборудование</h3>
      
      <div className={styles.materialsForm}>
        <h4 className={styles.subsectionTitle}>Добавить материал</h4>
        
        <div className={styles.formGrid}>
          <FormGroup
            label="Наименование"
            name="name"
            value={newMaterial.name}
            onChange={handleMaterialChange}
            placeholder="Насос, труба, фитинг и т.д."
            disabled={isSubmitting}
          />

          <FormGroup
            label="Количество"
            name="quantity"
            value={newMaterial.quantity}
            onChange={handleMaterialChange}
            placeholder="10"
            type="number"
            disabled={isSubmitting}
          />

          <SelectGroup
            label="Ед. измерения"
            name="unit"
            value={newMaterial.unit}
            onChange={handleMaterialChange}
            options={[
              { value: 'шт', label: 'шт' },
              { value: 'м', label: 'м' },
              { value: 'кг', label: 'кг' },
              { value: 'компл', label: 'компл' },
              { value: 'упак', label: 'упак' }
            ]}
            disabled={isSubmitting}
          />

          <FormGroup
            label="Цена за ед."
            name="price"
            value={newMaterial.price}
            onChange={handleMaterialChange}
            placeholder="5 000 ₽"
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="button"
          className={styles.addMaterialButton}
          onClick={addMaterial}
          disabled={isSubmitting}
        >
          <PlusIcon />
          Добавить материал
        </button>
      </div>

      {materials.length > 0 && (
        <div className={styles.materialsList}>
          <h4 className={styles.subsectionTitle}>Добавленные материалы</h4>
          
          <table className={styles.materialsTable}>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Кол-во</th>
                <th>Ед. изм.</th>
                <th>Цена за ед.</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {materials.map(material => {
                const total = material.price * material.quantity
                return (
                  <tr key={material.id}>
                    <td>{material.name}</td>
                    <td>{material.quantity}</td>
                    <td>{material.unit}</td>
                    <td>{material.price.toLocaleString()} ₽</td>
                    <td>{total.toLocaleString()} ₽</td>
                    <td>
                      <button
                        type="button"
                        className={styles.removeMaterialButton}
                        onClick={() => removeMaterial(material.id)}
                        disabled={isSubmitting}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className={styles.totalLabel}>Итого:</td>
                <td className={styles.totalValue}>{getTotalPrice().toLocaleString()} ₽</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  )
}

const FormGroup = ({ label, name, type = 'text', value, onChange, placeholder, disabled }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
      disabled={disabled}
    />
  </div>
)

const SelectGroup = ({ label, name, value, onChange, options, disabled }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={styles.select}
      disabled={disabled}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 4V20" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2"/>
  </svg>
)