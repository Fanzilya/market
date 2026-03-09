// src/pages/supplier/SupplierPreviewPage/components/TechSpecs.tsx
import styles from '../SupplierPreviewPage.module.css'
import { getTechSpecs } from '../utils/techSpecsHelper'

export default function TechSpecs({ kns }) {
  const specs = getTechSpecs(kns)

  if (specs.length === 0) return null

  return (
    <>
      <h3 className={styles.sectionTitle}>Технические характеристики</h3>
      <div className={styles.specsGrid}>
        {specs.map((spec, index) => (
          <SpecItem key={index} label={spec.label} value={spec.value} />
        ))}
      </div>
    </>
  )
}

const SpecItem = ({ label, value }) => (
  <div className={styles.specItem}>
    <span className={styles.specLabel}>{label}:</span>
    <span className={styles.specValue}>{value}</span>
  </div>
)