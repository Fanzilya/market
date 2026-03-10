// src/pages/ProfilePage/components/ProfileTile.jsx
import Icon from '@/shared/ui-kits/Icon'
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
                    <Icon name={icon} width={20} height={20} />
                </span>
                {title}
            </div>
            <div className={styles.tileValue}>
                {value}
            </div>
        </div>
    )
}