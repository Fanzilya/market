// src/pages/supplier/SupplierPreviewPage/components/ExtrasSection.tsx
import styles from '../SupplierPreviewPage.module.css'

export default function ExtrasSection({ knsExtras }) {
  if (!knsExtras) return null

  const activeExtras = Object.entries(knsExtras)
    .filter(([_, value]) => value)
    .map(([key]) => key)

  if (activeExtras.length === 0) return null

  return (
    <>
      <h3 className={styles.sectionTitle}>Дополнительная комплектация</h3>
      <div className={styles.extrasList}>
        {activeExtras.map((extra) => (
          <span key={extra} className={styles.extraBadge}>{extra}</span>
        ))}
      </div>
    </>
  )
}