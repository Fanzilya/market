// src/pages/supplier/CreateOfferPage/hooks/useOfferForm.js
import { useState, useEffect, useCallback } from 'react'
import { createOffer } from '../../../../data/offers.js'
import { validateOfferForm } from '../utils/validators'

const INITIAL_FORM_STATE = {
  // Основная информация
  fullName: '',
  shortName: '',
  inn: '',
  kpp: '',
  price: '',
  offerNumber: '',
  offerDate: new Date().toISOString().split('T')[0],
  
  // Условия поставки
  hasDelivery: false,
  deliveryCost: '',
  deliveryTime: '',
  paymentTerms: '',
  warrantyPeriod: '',
  
  // Пусконаладочные работы
  hasCommissioning: false,
  commissioningCost: '',
  commissioningDescription: '',
  
  // Материалы
  materials: [],
  
  // Дополнительные услуги
  additionalServices: '',
  
  // Контактная информация
  city: '',
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
  
  // Документы
  documents: [],
  comment: ''
}

export default function useOfferForm({ request, user, onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Загружаем данные компании при монтировании
  useEffect(() => {
    if (user?.company) {
      setFormData(prev => ({
        ...prev,
        fullName: user.company.name || '',
        shortName: user.company.shortName || '',
        inn: user.company.inn || '',
        kpp: user.company.kpp || '',
        contactPerson: user.fullName || '',
        contactEmail: user.email || '',
        contactPhone: user.phone || ''
      }))
    }
  }, [user])

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Очищаем ошибку для этого поля
    setErrors(prev => ({ ...prev, [name]: null, form: null }))
  }, [])

  const updateFormData = useCallback((newData) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validation = validateOfferForm(formData)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const offerId = `OFFER-${Date.now().toString(36).toUpperCase()}`
      
      await createOffer({
        id: offerId,
        createdAt: new Date().toISOString(),
        requestId: request.id,
        supplierEmail: user.email,
        supplierFullName: user.fullName,
        supplierCompany: user.company?.name ?? '',
        ...formData,
        documents: formData.documents.map(doc => doc.file?.name || doc.name),
        status: 'new'
      })

      onSubmit?.(formData)
    } catch (error) {
      setErrors({ form: 'Ошибка при отправке предложения. Попробуйте снова.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    updateFormData,
    setFormData
  }
}