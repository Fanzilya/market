// src/pages/supplier/CreateOfferPage/components/Tabs/DocumentsTab.tsx
import React from 'react'
import useDocuments from '../../hooks/useDocuments'
import styles from '../../CreateOfferPage.module.css'

export default function DocumentsTab({ formData, updateFormData, isSubmitting }) {
  const {
    documents,
    documentTypes,
    addDocuments,
    removeDocument
  } = useDocuments(formData.documents || [])

  // Синхронизируем документы с формой
  React.useEffect(() => {
    updateFormData({ documents })
  }, [documents, updateFormData])

  return (
    <div className={styles.tabContent}>
      <h3 className={styles.sectionTitle}>Документы</h3>

      <div className={styles.documentTypesGrid}>
        {Object.entries(documentTypes).map(([type, { label }]) => (
          <DocumentTypeCard
            key={type}
            type={type}
            label={label}
            onUpload={(files) => addDocuments(files, type)}
            disabled={isSubmitting}
          />
        ))}
      </div>

      {documents.length > 0 && (
        <DocumentsList
          documents={documents}
          onRemove={removeDocument}
          disabled={isSubmitting}
        />
      )}
    </div>
  )
}

const DocumentTypeCard = ({ type, label, onUpload, disabled }) => {
  const inputId = `${type}Upload`

  return (
    <div className={styles.documentTypeCard}>
      <div className={styles.documentTypeHeader}>
        <DocumentIcon type={type} />
        <span className={styles.documentTypeTitle}>{label}</span>
      </div>
      <div className={styles.documentTypeUpload}>
        <input
          type="file"
          id={inputId}
          multiple={type === 'additional'}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.dwg,.dxf"
          onChange={(e) => onUpload(e.target.files)}
          className={styles.fileInput}
          disabled={disabled}
        />
        <label htmlFor={inputId} className={styles.documentTypeLabel}>
          <UploadIcon />
          Загрузить
        </label>
      </div>
    </div>
  )
}

const DocumentsList = ({ documents, onRemove, disabled }) => (
  <div className={styles.documentsList}>
    <h4 className={styles.documentsTitle}>Загруженные документы:</h4>
    {documents.map(doc => (
      <div key={doc.id} className={styles.documentItem}>
        <div className={styles.documentIcon}>
          <DocumentIcon type={doc.type} />
        </div>
        <div className={styles.documentInfo}>
          <span className={styles.documentType}>{doc.typeName}</span>
          <span className={styles.documentName}>{doc.name}</span>
          <span className={styles.documentSize}>
            {(doc.size / 1024).toFixed(1)} КБ
          </span>
        </div>
        <button
          type="button"
          className={styles.removeDocument}
          onClick={() => onRemove(doc.id)}
          disabled={disabled}
        >
          <CloseIcon />
        </button>
      </div>
    ))}
  </div>
)

const DocumentIcon = ({ type }) => {
  const icons = {
    passport: (
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
    ),
    certificate: (
      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
    ),
    drawing: (
      <path d="M4 4H20V20H4V4Z" />
    ),
    offer: (
      <path d="M4 4H20V8L12 16L4 8V4Z" />
    ),
    additional: (
      <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L13 2Z" />
    )
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {icons[type] || icons.additional}
      <circle cx="9" cy="14" r="1.5" fill="#4A85F6" />
      <circle cx="15" cy="14" r="1.5" fill="#4A85F6" />
      <circle cx="12" cy="18" r="1.5" fill="#4A85F6" />
    </svg>
  )
}

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 16V4" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8L12 4L16 8" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" />
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" />
  </svg>
)