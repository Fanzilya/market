// src/pages/ProfilePage/components/Tabs/ProfileInfoTab.tsx
import React, { useState } from 'react'
import useProfileData from '@/moduls/personal-account/common/features/ProfilePage/useProfileData'
import styles from '../WidgetsProfilePage.module.css'
import ProfileTile from '../ProfileTitle'

export default function ProfileInfoTab({ user, isSupplier }) {
  const { userTiles } = useProfileData(user, isSupplier)
  const [hoveredTile, setHoveredTile] = useState(null)

  return (
    <div className={styles.tilesGrid}>
      {userTiles.map(tile => (
        <ProfileTile
          key={tile.id}
          icon={tile.icon}
          title={tile.label}
          value={tile.value}
          empty={tile.empty}
          hovered={hoveredTile === tile.id}
          onHover={() => setHoveredTile(tile.id)}
          onLeave={() => setHoveredTile(null)}
        />
      ))}
    </div>
  )
}