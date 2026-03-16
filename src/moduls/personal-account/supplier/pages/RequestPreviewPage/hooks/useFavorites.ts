// src/pages/supplier/SupplierPreviewPage/hooks/useFavorites.ts
import { addToFavorites, isRequestFavorite, removeFromFavorites } from '@/shared/data/favorites'
import { useState, useEffect } from 'react'

export default function useFavorites({ user, requestId }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (user?.email && requestId) {
      setIsFavorite(isRequestFavorite(user.email, requestId))
    }
  }, [user, requestId])

  const handleToggleFavorite = () => {
    if (!user?.email || !requestId) return

    if (isFavorite) {
      removeFromFavorites(user.email, requestId)
    } else {
      addToFavorites(user.email, requestId)
    }
    setIsFavorite(!isFavorite)
  }

  return {
    isFavorite,
    handleToggleFavorite
  }
}