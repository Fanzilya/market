import { observer } from 'mobx-react-lite';


interface Props {
    styles: any,
    formData: any,
    knsData: any,
    motorStartOptions: any,
    elements: any,
}

export const FormCheckSend = observer(({ styles, formData, knsData, motorStartOptions, elements }: Props) => {
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Проверка данных</h2>

            <div className={styles.previewCard}>
                <h3 className={styles.previewTitle}>Основная информация</h3>
                <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Объект:</span>
                        <span className={styles.previewValue}>{formData.objectName}</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Заказчик:</span>
                        <span className={styles.previewValue}>{formData.govCustomerName}</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Тип:</span>
                        <span className={styles.previewValue}>{formData.configType}</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Контакт:</span>
                        <span className={styles.previewValue}>{formData.contactPerson}</span>
                    </div>
                </div>

                {formData.configType === 'КНС' && (
                    <>
                        <h3 className={styles.previewTitle}>Основные параметры</h3>
                        <div className={styles.previewGrid}>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Производительность:</span>
                                <span className={styles.previewValue}>{knsData.capacity} м³/ч</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Напор:</span>
                                <span className={styles.previewValue}>{knsData.head} м</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Насосы:</span>
                                <span className={styles.previewValue}>
                                    {knsData.workingPumps || '0'} раб. / {knsData.reservePumps || '0'} рез. / {knsData.stockPumps || '0'} склад
                                </span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Среда:</span>
                                <span className={styles.previewValue}>{knsData.medium}</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Температура:</span>
                                <span className={styles.previewValue}>{knsData.temperature || '—'} °C</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Взрывозащита:</span>
                                <span className={styles.previewValue}>{knsData.explosionProof ? 'Да' : 'Нет'}</span>
                            </div>
                        </div>

                        <h3 className={styles.previewTitle}>Электрические параметры</h3>
                        <div className={styles.previewGrid}>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Метод пуска:</span>
                                <span className={styles.previewValue}>
                                    {motorStartOptions.find(o => o.value === knsData.motorStartMethod)?.label || '—'}
                                </span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Вводов питания:</span>
                                <span className={styles.previewValue}>{knsData.powerInputs || '1'}</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Место установки шкафа:</span>
                                <span className={styles.previewValue}>{knsData.cabinetLocation || 'УХЛ1'}</span>
                            </div>
                        </div>

                        {
                            elements[3].checked &&
                            <>
                                <h3 className={styles.previewTitle}>Габаритные размеры</h3>
                                <div className={styles.previewGrid}>
                                    <div className={styles.previewItem}>
                                        <span className={styles.previewLabel}>A (вход):</span>
                                        <span className={styles.previewValue}>{knsData.inletDepth || '—'} м</span>
                                    </div>
                                    <div className={styles.previewItem}>
                                        <span className={styles.previewLabel}>B (вход):</span>
                                        <span className={styles.previewValue}>
                                            {knsData.inletDiameter || '—'} мм ({knsData.inletMaterial || '—'})
                                        </span>
                                    </div>
                                    <div className={styles.previewItem}>
                                        <span className={styles.previewLabel}>C (выход):</span>
                                        <span className={styles.previewValue}>
                                            {knsData.outletDiameter || '—'} мм ({knsData.outletMaterial || '—'})
                                        </span>
                                    </div>
                                    <div className={styles.previewItem}>
                                        <span className={styles.previewLabel}>D (выход):</span>
                                        <span className={styles.previewValue}>{knsData.outletDepth || '—'} м</span>
                                    </div>
                                    <div className={styles.previewItem}>
                                        <span className={styles.previewLabel}>Станция:</span>
                                        <span className={styles.previewValue}>
                                            ⌀{knsData.stationDiameter || '—'} м × {knsData.stationHeight || '—'} м
                                        </span>
                                    </div>
                                    <div className={styles.previewItem}>
                                        <span className={styles.previewLabel}>Утепление:</span>
                                        <span className={styles.previewValue}>{knsData.insulation || '—'} м</span>
                                    </div>
                                </div>
                            </>
                        }

                        {elements && (
                            <>
                                <h3 className={styles.previewTitle}>Дополнительная комплектация</h3>
                                <div className={styles.previewList}>
                                    {elements
                                        .filter(item => item.checked) // Фильтруем по checked
                                        .map(item => (
                                            <span key={item.id || item.name} className={styles.previewBadge}>
                                                {item.name}
                                            </span>
                                        ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
});