import { getOfferById } from "@/shared/data/offers"
import { getRequestById } from "@/shared/data/requests"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function DataOfferModel(offerId: string) {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('details')


    const offer = getOfferById(offerId || "")
    const request = offer ? getRequestById(offer.requestId) : null

    // Функция для форматирования цены
    const formatPrice = (price) => {
        if (!price && price !== 0) return '—'
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
    }

    // Функция для получения типа документа
    const getDocumentType = (doc) => {
        if (typeof doc === 'string') {
            // Определяем тип по расширению файла
            const extension = doc.split('.').pop()?.toLowerCase() || ""
            if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image'
            if (['pdf'].includes(extension)) return 'pdf'
            if (['doc', 'docx'].includes(extension)) return 'word'
            if (['xls', 'xlsx'].includes(extension)) return 'excel'
            if (['dwg', 'dxf', 'cdw'].includes(extension)) return 'drawing'
            return 'document'
        }
        return doc?.type || 'document'
    }

    // Функция для получения названия типа документа
    const getDocumentTypeName = (doc) => {
        if (typeof doc === 'string') {
            const type = getDocumentType(doc)
            const typeNames = {
                image: 'Изображение',
                pdf: 'PDF документ',
                word: 'Word документ',
                excel: 'Excel документ',
                drawing: 'Чертеж',
                document: 'Документ'
            }
            return typeNames[type] || 'Документ'
        }
        return doc?.typeName ||
            (doc?.type === 'passport' ? 'Паспорт' :
                doc?.type === 'certificate' ? 'Сертификат' :
                    doc?.type === 'drawing' ? 'Чертеж' :
                        doc?.type === 'offer' ? 'КП' : 'Документ')
    }

    // Функция для получения иконки документа по типу
    const getDocumentIcon = (doc) => {
        const type = typeof doc === 'string' ? getDocumentType(doc) : doc?.type

        switch (type) {
            case 'passport':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M16 17H8M16 13H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                )
            case 'certificate':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                )
            case 'drawing':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" />
                    </svg>
                )
            case 'offer':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20V8L12 16L4 8V4Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M4 8H20" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                )
            case 'pdf':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 7L14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12H16M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                )
            case 'image':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M22 16L18 12L14 16L10 12L2 20" stroke="currentColor" strokeWidth="2" />
                    </svg>
                )
            default:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                )
        }
    }

    // Функция для получения имени документа
    const getDocumentName = (doc) => {
        if (typeof doc === 'string') {
            return doc.split('/').pop() || doc
        }
        return doc?.file?.name || doc?.name || 'Документ'
    }

    // Функция для получения размера документа
    const getDocumentSize = (doc) => {
        if (typeof doc === 'object' && doc?.file?.size) {
            return (doc.file.size / 1024).toFixed(1) + ' КБ'
        }
        return null
    }

    return {
        navigate,
        activeTab,
        setActiveTab,
        offer,
        request,
        formatPrice,
        getDocumentType,
        getDocumentTypeName,
        getDocumentIcon,
        getDocumentName,
        getDocumentSize,
    }
}