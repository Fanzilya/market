// src/pages/supplier/SupplierPreviewPage/components/ContactInfo.tsx
import styles from '../SupplierPreviewPage.module.css'

export default function ContactInfo({
  govCustomerName,
  contactPerson,
  contactPhone,
  // contactEmail
}) {
  return (
    <div className={styles.contactSection}>
      <h3 className={styles.sectionTitle}>Контактная информация</h3>
      <div className={styles.contactGrid}>
        <ContactItem label="Заказчик:" value={govCustomerName} />
        <ContactItem label="Контактное лицо:" value={contactPerson} />
        <ContactItem label="Телефон:" value={contactPhone || '—'} />
        {/* <ContactItem label="Email:" value={contactEmail} /> */}
      </div>
    </div>
  )
}

const ContactItem = ({ label, value }) => (
  <div className={styles.contactItem}>
    <span className={styles.contactLabel}>{label}</span>
    <span className={styles.contactValue}>{value}</span>
  </div>
)