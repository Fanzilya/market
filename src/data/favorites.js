// src/data/favorites.js

const FAVORITES_KEY = 'supplier_favorites'

/**
 * Получить все избранные заявки поставщика
 * @param {string} supplierEmail - Email поставщика
 * @returns {Array} Массив ID избранных заявок
 */
export const getFavoriteRequests = (supplierEmail) => {
  if (!supplierEmail) return []
  
  try {
    const allFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}')
    return allFavorites[supplierEmail] || []
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
    return []
  }
}

/**
 * Добавить заявку в избранное
 * @param {string} supplierEmail - Email поставщика
 * @param {string} requestId - ID заявки
 * @returns {boolean} Успешно ли добавлено
 */
export const addToFavorites = (supplierEmail, requestId) => {
  if (!supplierEmail || !requestId) return false

  try {
    const allFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}')
    
    if (!allFavorites[supplierEmail]) {
      allFavorites[supplierEmail] = []
    }

    // Проверяем, нет ли уже такой заявки
    if (allFavorites[supplierEmail].includes(requestId)) return false

    allFavorites[supplierEmail].push(requestId)

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(allFavorites))
    
    // Вызываем событие для обновления UI
    window.dispatchEvent(new CustomEvent('favorites-updated', { 
      detail: { supplierEmail, requestId, action: 'add' } 
    }))
    
    return true
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
    return false
  }
}

/**
 * Удалить заявку из избранного
 * @param {string} supplierEmail - Email поставщика
 * @param {string} requestId - ID заявки
 * @returns {boolean} Успешно ли удалено
 */
export const removeFromFavorites = (supplierEmail, requestId) => {
  if (!supplierEmail || !requestId) return false

  try {
    const allFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}')
    
    if (!allFavorites[supplierEmail]) return false

    const initialLength = allFavorites[supplierEmail].length
    allFavorites[supplierEmail] = allFavorites[supplierEmail].filter(id => id !== requestId)

    // Если после удаления массив стал пустым, удаляем запись о пользователе
    if (allFavorites[supplierEmail].length === 0) {
      delete allFavorites[supplierEmail]
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(allFavorites))
    
    // Вызываем событие для обновления UI
    window.dispatchEvent(new CustomEvent('favorites-updated', { 
      detail: { supplierEmail, requestId, action: 'remove' } 
    }))
    
    return true
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error)
    return false
  }
}

/**
 * Проверить, есть ли заявка в избранном
 * @param {string} supplierEmail - Email поставщика
 * @param {string} requestId - ID заявки
 * @returns {boolean} Есть ли заявка в избранном
 */
export const isRequestFavorite = (supplierEmail, requestId) => {
  if (!supplierEmail || !requestId) return false

  try {
    const allFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}')
    return allFavorites[supplierEmail]?.includes(requestId) || false
  } catch (error) {
    console.error('Ошибка при проверке избранного:', error)
    return false
  }
}

/**
 * Получить все избранные заявки с полными данными
 * @param {string} supplierEmail - Email поставщика
 * @param {Array} allRequests - Все заявки
 * @returns {Array} Массив избранных заявок с полными данными
 */
export const getFavoriteRequestsWithData = (supplierEmail, allRequests) => {
  const favoriteIds = getFavoriteRequests(supplierEmail)
  return allRequests.filter(request => favoriteIds.includes(request.id))
}