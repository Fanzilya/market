// src/data/offers.js

const OFFERS_KEY = 'offers'

// Вспомогательная функция для загрузки
function loadOffers() {
  return JSON.parse(localStorage.getItem(OFFERS_KEY) || '[]')
}

// Вспомогательная функция для сохранения
function saveOffers(offers) {
  localStorage.setItem(OFFERS_KEY, JSON.stringify(offers))
  // Вызываем событие для обновления всех компонентов
  window.dispatchEvent(new CustomEvent('offers-updated'))
}

// Получить все предложения
export const listAllOffers = () => {
  return loadOffers()
}

// Получить предложение по ID
export const getOfferById = (offerId) => {
  const offers = loadOffers()
  return offers.find(offer => offer.id === offerId) || null
}

// Получить предложения по ID заявки
export const listOffersByRequestId = (requestId) => {
  const offers = loadOffers()
  return offers.filter(offer => offer.requestId === requestId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Получить предложения поставщика для конкретной заявки
export const getOffersBySupplierForRequest = (supplierEmail, requestId) => {
  if (!supplierEmail || !requestId) return []
  
  const offers = loadOffers()
  return offers.filter(offer => 
    offer.requestId === requestId && 
    offer.supplierEmail?.toLowerCase() === supplierEmail.toLowerCase()
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Получить все предложения поставщика
export const getOffersBySupplier = (supplierEmail) => {
  if (!supplierEmail) return []
  
  const offers = loadOffers()
  return offers.filter(offer => 
    offer.supplierEmail?.toLowerCase() === supplierEmail.toLowerCase()
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Создать новое предложение
export const createOffer = (offer) => {
  const offers = loadOffers()
  offers.push(offer)
  saveOffers(offers)
  return offer
}

// Обновить предложение
export const updateOffer = (offerId, updatedData) => {
  const offers = loadOffers()
  const index = offers.findIndex(o => o.id === offerId)
  
  if (index !== -1) {
    offers[index] = { ...offers[index], ...updatedData, updatedAt: new Date().toISOString() }
    saveOffers(offers)
    return offers[index]
  }
  return null
}

// Удалить предложение
export const deleteOffer = (offerId) => {
  const offers = loadOffers()
  const filtered = offers.filter(o => o.id !== offerId)
  saveOffers(filtered)
  return true
}

// Подсчитать количество предложений по заявке
export const countOffersByRequestId = (requestId) => {
  const offers = loadOffers()
  return offers.filter(offer => offer.requestId === requestId).length
}