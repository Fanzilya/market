// src/pages/supplier/CreateOfferPage/hooks/useDocuments.js
import { useState, useCallback } from 'react'

const DOCUMENT_TYPES = {
  passport: { id: 'passport', label: 'Паспорт на оборудование', icon: '📄' },
  certificate: { id: 'certificate', label: 'Сертификат на оборудование', icon: '📜' },
  drawing: { id: 'drawing', label: 'Чертежи', icon: '📐' },
  offer: { id: 'offer', label: 'КП', icon: '📊' },
  additional: { id: 'additional', label: 'Дополнительные файлы', icon: '📁' }
}

export default function useDocuments(initialDocuments = []) {
  const [documents, setDocuments] = useState(initialDocuments)

  const addDocuments = useCallback((files, type) => {
    const newDocs = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type,
      typeName: DOCUMENT_TYPES[type]?.label || 'Документ',
      uploadedAt: new Date().toISOString()
    }))

    setDocuments(prev => [...prev, ...newDocs])
  }, [])

  const removeDocument = useCallback((docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }, [])

  const getDocumentsByType = useCallback((type) => {
    return documents.filter(doc => doc.type === type)
  }, [documents])

  const clearDocuments = useCallback(() => {
    setDocuments([])
  }, [])

  return {
    documents,
    documentTypes: DOCUMENT_TYPES,
    addDocuments,
    removeDocument,
    getDocumentsByType,
    clearDocuments
  }
}