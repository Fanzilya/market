// src/pages/supplier/CreateOfferPage/utils/formatters.js
export const formatPrice = (price) => {
  if (!price) return ''
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('ru-RU')
}

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' Б'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ'
  return (bytes / (1024 * 1024)).toFixed(1) + ' МБ'
}

export const calculateTotal = (materials) => {
  return materials.reduce((sum, m) => sum + (m.price * m.quantity), 0)
}