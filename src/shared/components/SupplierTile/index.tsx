// components/SupplierTile.tsx
import styles from './SupplierTile.module.css'

export default function SupplierTile({
  icon,
  title,
  value,
  empty = false,
  primary = '#4A85F6',
  hovered = false,
  onHover,
  onLeave
}) {
  return (
    <div
      className={`${styles.tile} ${hovered ? styles.tileHover : ''}`}
      style={{ '--primary': primary }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.tileTitle}>
        <span className={styles.tileIcon}>{icon}</span>
        {title}
      </div>
      <div className={`${styles.tileValue} ${empty ? styles.emptyValue : ''}`}>
        {value}
      </div>
    </div>
  )
}