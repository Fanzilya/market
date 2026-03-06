// src/pages/general/ProfilePage/hooks/useProfileData.js
import { useMemo } from 'react'
import { getUserTiles, getCompanyTiles } from '../config/tilesConfig'
import * as Icons from '../utils/icons'  // импорт без расширения - работает

export default function useProfileData(user, isSupplier) {
  const userTiles = useMemo(() => 
    getUserTiles(user).map(tile => ({
      ...tile,
      icon: Icons[tile.icon] || Icons.user
    }))
  , [user])

  const companyTiles = useMemo(() => 
    isSupplier ? getCompanyTiles(user.company).map(tile => ({
      ...tile,
      icon: Icons[tile.icon] || Icons.building
    })) : []
  , [isSupplier, user.company])

  const initials = useMemo(() => 
    user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
  , [user.fullName])

  return {
    userTiles,
    companyTiles,
    initials
  }
}