export const RequestTabs = () => {
    return (
        <>
            {/* Табы */}
            <div className={styles.tabs} >
                <button
                    className={`${styles.tab} ${activeTab === 'requests' ? styles.tabActive : ''}`}
                    onClick={() => { setActiveTab('requests'); setSelectedItems([]); }}
                >
                    <Icon name='requests' />
                    Заявки
                    {requests.filter(r => !r.archived && r.status === 'active').length > 0 && (
                        <span className={styles.tabBadge}>{requests.filter(r => !r.archived && r.status === 'active').length}</span>
                    )}
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'offers' ? styles.tabActive : ''}`}
                    onClick={() => { setActiveTab('offers'); setSelectedItems([]); }}
                >
                    <Icon name='offers' />
                    Предложения
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
                    onClick={() => { setActiveTab('users'); setSelectedItems([]); }}
                >
                    <Icon name='users' />

                    Пользователи
                </button>
            </div>
        </>
    );
}