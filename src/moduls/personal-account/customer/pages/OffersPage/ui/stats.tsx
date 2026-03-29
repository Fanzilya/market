interface Props {
    styles: any,
    stats: any,
}


export const Stats = ({ styles, stats }: Props) => {
    return (

        <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <span className={styles.statValue}>{stats.total}</span>
                <span className={styles.statLabel}>Всего КП</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statValue}>{stats.minPrice.toLocaleString()} ₽</span>
                <span className={styles.statLabel}>Мин. цена</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statValue}>{stats.maxPrice.toLocaleString()} ₽</span>
                <span className={styles.statLabel}>Макс. цена</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statValue}>{stats.avgPrice.toLocaleString()} ₽</span>
                <span className={styles.statLabel}>Ср. цена</span>
            </div>
        </div>


    );
}