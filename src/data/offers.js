const OFFERS_KEY = 'marketplays_offers_v1'

function safeParse(raw, fallback) {
  try {
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function loadAll() {
  return safeParse(localStorage.getItem(OFFERS_KEY), [])
}

function saveAll(items) {
  localStorage.setItem(OFFERS_KEY, JSON.stringify(items))
}

export function listOffersByRequestId(requestId) {
  return loadAll()
    .filter((o) => o.requestId === requestId)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export function countOffersByRequestId(requestId) {
  return listOffersByRequestId(requestId).length
}

export function createOffer(offer) {
  const all = loadAll()
  all.push(offer)
  saveAll(all)
  return offer
}

// src/data/offers.js (добавьте этот экспорт, если его нет)

export function listOffersBySupplierEmail(email) {
  // Ваша реализация
  return []
}

// Если нужен listAllOffers, добавьте его:
export function listAllOffers() {
  // Ваша реализация
  return []
}

// src/data/offers.js (добавить функцию)

// Получить предложения конкретного поставщика для конкретной заявки
export const getOffersBySupplierForRequest = (supplierEmail, requestId) => {
  if (!supplierEmail || !requestId) return []
  
  const allOffers = JSON.parse(localStorage.getItem('offers') || '[]')
  return allOffers.filter(offer => 
    offer.requestId === requestId && 
    offer.supplierEmail.toLowerCase() === supplierEmail.toLowerCase()
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
} 