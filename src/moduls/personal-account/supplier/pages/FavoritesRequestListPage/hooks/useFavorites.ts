// src/pages/SupplierPage/hooks/useFavorites.ts
import { addToFavorites, getFavoriteRequests, removeFromFavorites } from '@/shared/data/favorites'
import { useState, useEffect, useCallback } from 'react'

export default function useFavorites({ user }) {
  const [favoriteRequests, setFavoriteRequests] = useState([])

  useEffect(() => {
    if (user?.email) {
      setFavoriteRequests(getFavoriteRequests(user.email))
    }
  }, [user])

  const handleToggleFavorite = useCallback((e, requestId) => {
    e.stopPropagation()

    if (!user?.email) return

    if (favoriteRequests.includes(requestId)) {
      removeFromFavorites(user.email, requestId)
      setFavoriteRequests(prev => prev.filter(id => id !== requestId))
    } else {
      addToFavorites(user.email, requestId)
      setFavoriteRequests(prev => [...prev, requestId])
    }
  }, [user, favoriteRequests])

  return {
    favoriteRequests,
    handleToggleFavorite
  }
}