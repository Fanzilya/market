// src/pages/supplier/SupplierBalancePage/utils/formatters.ts
export const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('ru-RU')
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export const formatNumber = (number) => {
  return new Intl.NumberFormat('ru-RU').format(number)
}