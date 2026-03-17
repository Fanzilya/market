
export const activitySection = () => {
    return (
        <>
            {/* Блок с активностью */}
            <div className={styles.activitySection} >
                <h2 className={styles.sectionTitle}>Недавняя активность</h2>
                <div className={styles.activityGrid}>
                    {activity.map((item, index) => (
                        <div key={index} className={styles.activityCard}>
                            <div className={styles.activityIcon} style={{ background: item.color }}>
                                <Icon name={item.icon} color='white' width={20} height={20} />
                            </div>
                            <div className={styles.activityContent}>
                                <span className={styles.activityTitle}>{item.title}</span>
                                <span className={styles.activityTime}>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


export const isCustomerRecommendationCard = () => {
    return isCustomer && customerRequests.length === 0 && (
        <div className={styles.recommendationCard}>
            <h3 className={styles.recommendationTitle}>Начните работу с платформой</h3>
            <p className={styles.recommendationText}>
                Создайте первую заявку на инженерное оборудование и получите коммерческие предложения от проверенных исполнителей.
            </p>
            <Link
                className={styles.recommendationButton}
                to={'/customer/request/new'}
            >
                Создать заявку
            </Link>
        </div>
    )
}

export const isSupplierRecommendationCard = () => {
    return isSupplier && supplierRequests.length === 0 && (
        <div className={styles.recommendationCard}>
            <h3 className={styles.recommendationTitle}>Начните получать заказы</h3>
            <p className={styles.recommendationText}>
                Просматривайте актуальные заявки заказчиков и создавайте коммерческие предложения. Используйте бесплатные просмотры.
            </p>
            <button
                className={styles.recommendationButton}
                onClick={() => navigate('/supplier')}
            >
                Перейти к заявкам
            </button>
        </div>
    )
}