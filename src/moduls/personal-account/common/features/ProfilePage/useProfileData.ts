// src/pages/general/ProfilePage/hooks/useProfileData.ts
import { useMemo } from 'react'
import { getUserTiles, getCompanyTiles } from './tilesConfig'
import * as Icons from '../../widgets/ProfilePage/components/ProfilesIcons'  // импорт без расширения - работает

export default function useProfileData(user, isSupplier) {
  const userTiles = useMemo(() =>
    getUserTiles(user).map(tile => ({
      ...tile,
      icon: tile.icon
    }))
    , [user])

  const companyTiles = useMemo(() =>
    isSupplier ? getCompanyTiles(user.company).map(tile => ({
      ...tile,
      icon: tile.icon
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