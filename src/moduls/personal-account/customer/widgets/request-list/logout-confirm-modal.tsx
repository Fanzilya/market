interface Props {
    styles: any,
    setShowLogoutConfirm: any,
    confirmLogout: any,
}

export const LogoutConfirmModal = ({ styles, setShowLogoutConfirm, confirmLogout }: Props) => {
    return (
        <>
            {/* Модальное окно подтверждения выхода */}
            <div className={styles.modalOverlay} onClick={() => setShowLogoutConfirm(false)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalIcon}>👋</div>
                    <h3 className={styles.modalTitle}>Выйти из аккаунта?</h3>
                    <p className={styles.modalMessage}>Вы будете перенаправлены на страницу входа</p>
                    <div className={styles.modalActions}>
                        <button className={styles.modalCancel} onClick={() => setShowLogoutConfirm(false)}>
                            Отмена
                        </button>
                        <button className={styles.modalConfirm} onClick={confirmLogout}>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}