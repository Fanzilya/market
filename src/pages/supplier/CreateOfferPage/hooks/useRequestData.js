// src/pages/supplier/CreateOfferPage/hooks/useRequestData.js
import { useState, useEffect } from 'react'
import { getRequestById } from '../../../../data/requests.js'

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