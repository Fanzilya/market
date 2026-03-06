// src/pages/ProfilePage/components/Tabs/CompanyInfoTab.jsx
import React, { useState } from 'react'
import ProfileTile from '../ProfileTile'
import useProfileData from '../../hooks/useProfileData'
import styles from '../../ProfilePage.module.css'

export default function CompanyInfoTab({ user, isSupplier }) {
  const { companyTiles } = useProfileData(user, isSupplier)
  const [hoveredTile, setHoveredTile] = useState(null)

  if (!isSupplier || !user.company) {
    return (
      <div className={styles.emptyState}>
        <p>Информация о компании отсутствует</p>
      </div>
    )
  }

  return (
    <div className={styles.tilesGrid}>
      {companyTiles.map(tile => (
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