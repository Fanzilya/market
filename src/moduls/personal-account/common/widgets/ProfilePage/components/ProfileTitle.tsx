// src/pages/ProfilePage/components/ProfileTile.jsx
import styles from './WidgetsProfilePage.module.css'

export default function ProfileTile({ icon, title, value, empty, hovered, onHover, onLeave }) {
    return (
        <div
            className={`${styles.tile} ${hovered ? styles.tileHover : ''} ${empty ? styles.tileEmpty : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className={styles.tileTitle}>
                <span className={styles.tileIcon}>
                    {icon}
                </span>
                {title}
            </div>
            <div className={styles.tileValue}>
                {value}
            </div>
        </div>
    )
}