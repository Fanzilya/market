interface Props {
    styles: any,
    setShowArchiveConfirm: any,
    handleArchiveRequest: any,
}


export const ArchiveConfirmModal = ({ styles, setShowArchiveConfirm, handleArchiveRequest }: Props) => {
    return (
        <>
            {/* Модальное окно подтверждения архивации */}
            <div className={styles.modalOverlay} onClick={() => setShowArchiveConfirm(false)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalIcon}>📦</div>
                    <h3 className={styles.modalTitle}>Отправить в архив?</h3>
                    <p className={styles.modalMessage}>
                        Заявка будет перемещена в архив. Вы сможете просматривать её, но не сможете редактировать.
                    </p>
                    <div className={styles.modalActions}>
                        <button className={styles.modalCancel} onClick={() => setShowArchiveConfirm(false)}>
                            Отмена
                        </button>
                        <button className={styles.modalConfirm} onClick={handleArchiveRequest}>
                            Отправить в архив
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}