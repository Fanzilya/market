// src/pages/ProfilePage/components/Tabs/ProfileInfoTab.jsx
import React, { useState } from 'react'
import ProfileTile from '../ProfileTile'
import useProfileData from '../../hooks/useProfileData'
import styles from '../../ProfilePage.module.css'

export default function ProfileInfoTab({ user }) {
  const { userTiles } = useProfileData(user)
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