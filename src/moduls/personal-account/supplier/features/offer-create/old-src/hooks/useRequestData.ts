// src/pages/supplier/CreateOfferPage/hooks/useRequestData.ts
import { getRequestById } from '@/shared/data/requests'
import { useState, useEffect } from 'react'

export default function useRequestData({ requestId, initialState }) {
  const [request, setRequest] = useState(initialState || null)
  const [isLoading, setIsLoading] = useState(!initialState)
  const [error, setError] = useState(null)

  useEffect(() => {
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
    isLoading,
    error
  }
}