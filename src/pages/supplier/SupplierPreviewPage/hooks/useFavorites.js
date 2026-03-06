// src/pages/supplier/SupplierPreviewPage/hooks/useFavorites.js
import { useState, useEffect } from 'react'
import { addToFavorites, removeFromFavorites, isRequestFavorite } from '../../../../data/favorites.js'

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