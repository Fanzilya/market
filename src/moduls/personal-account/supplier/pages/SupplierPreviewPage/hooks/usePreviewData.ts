// src/pages/supplier/SupplierPreviewPage/hooks/usePreviewData.ts
import { getRequestById } from '@/shared/data/requests'
import { useState, useEffect } from 'react'

export default function usePreviewData({ requestId, initialState }) {
  const [request, setRequest] = useState(initialState || null)
  const [hasResponded, setHasResponded] = useState(false)
  const [isLoading, setIsLoading] = useState(!initialState)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Проверяем, откликался ли уже на эту заявку
    const respondedRequests = JSON.parse(localStorage.getItem('respondedRequests') || '[]')
    if (requestId && respondedRequests.includes(requestId)) {
      setHasResponded(true)
    }
  }, [requestId])

  useEffect(() => {
    // Если нет данных в state, загружаем по ID
    if (!initialState && requestId) {
      setIsLoading(true)
      try {
        const loadedRequest = getRequestById(requestId)
        if (loadedRequest) {
          setRequest(loadedRequest)
          setError(null)
        } else {
          setError('Заявка не найдена')
        }
      } catch (err) {
        setError('Ошибка при загрузке заявки')
      } finally {
        setIsLoading(false)
      }
    }
  }, [requestId, initialState])

  return {
    request,
    hasResponded,
    setHasResponded,
    isLoading,
    error
  }
}