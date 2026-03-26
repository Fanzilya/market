import Icon from '@/shared/ui-kits/Icon';
import styles from '../WidgetsProfilePage.module.css'

export const ProfileTitle = ({ tile }: any) => {
    return (
        <div className={`${styles.tile} hover:border-[#4A85F6] bg-white`}>
            <div className={styles.tileTitle}>
                <span className={styles.tileIcon}>
                    <Icon name={tile.icon} width={20} height={20} />
                </span>
                {tile.label}
            </div>

            {tile.type == "text" &&
                <div className={styles.tileValue}>
                    {tile.value}
                </div>
            }

            {tile.type == "email" &&
                <a href={`mailto:${tile.value}`} className={styles.tileValue}>
                    {tile.value}
                </a>
            }

            {tile.type == "phone" &&
                <a href={`tel:${tile.value.replace(/[\s\-\(\)]/g, '')}`} className={styles.tileValue}>
                    {tile.value}
                </a>
            }
        </div>
    );
}