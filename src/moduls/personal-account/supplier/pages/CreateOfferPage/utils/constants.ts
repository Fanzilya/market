// src/pages/supplier/CreateOfferPage/utils/constants.ts
export const OFFER_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  VIEWED: 'viewed',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
}

export const PAYMENT_TERMS = {
  PREPAYMENT_100: '100% предоплата',
  PREPAYMENT_50: '50% предоплата',
  POSTPAYMENT: 'Постоплата',
  CUSTOM: 'Индивидуальные условия'
}

export const UNITS = [
  { value: 'шт', label: 'штуки' },
  { value: 'м', label: 'метры' },
  { value: 'кг', label: 'килограммы' },
  { value: 'компл', label: 'комплекты' },
  { value: 'упак', label: 'упаковки' }
]

export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  CERTIFICATE: 'certificate',
  DRAWING: 'drawing',
  OFFER: 'offer',
  ADDITIONAL: 'additional'
}