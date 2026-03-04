import styles from './scheme-form.moduls.css'

export const SchemeForm = () => {
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Технические параметры</h2>

            {formData.configType === 'КНС' && (
                <>
                    {/* Основные параметры насосов */}
                    <h3 className={styles.subsectionTitle}>Основные параметры</h3>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Производительность (м³/ч, л/с) <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                value={knsData.capacity}
                                onChange={(e) => setKnsData({ ...knsData, capacity: e.target.value })}
                                onFocus={() => setFocusedInput('capacity')}
                                onBlur={() => setFocusedInput(null)}
                                className={`${styles.input} ${focusedInput === 'capacity' ? styles.inputFocused : ''}`}
                                placeholder="м³/ч"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Требуемый напор (м) <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                value={knsData.head}
                                onChange={(e) => setKnsData({ ...knsData, head: e.target.value })}
                                onFocus={() => setFocusedInput('head')}
                                onBlur={() => setFocusedInput(null)}
                                className={`${styles.input} ${focusedInput === 'head' ? styles.inputFocused : ''}`}
                                placeholder="м"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Кол-во рабочих насосов</label>
                            <input
                                type="number"
                                value={knsData.workingPumps}
                                onChange={(e) => setKnsData({ ...knsData, workingPumps: e.target.value })}
                                className={styles.input}
                                placeholder="например: 2"
                                min="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Кол-во резервных насосов</label>
                            <input
                                type="number"
                                value={knsData.reservePumps}
                                onChange={(e) => setKnsData({ ...knsData, reservePumps: e.target.value })}
                                className={styles.input}
                                placeholder="например: 1"
                                min="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Кол-во насосов на склад</label>
                            <input
                                type="number"
                                value={knsData.stockPumps}
                                onChange={(e) => setKnsData({ ...knsData, stockPumps: e.target.value })}
                                className={styles.input}
                                placeholder="например: 0"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Параметры среды */}
                    <h3 className={styles.subsectionTitle}>Параметры среды</h3>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Перекачиваемая среда</label>
                            <select
                                value={knsData.medium}
                                onChange={(e) => setKnsData({ ...knsData, medium: e.target.value })}
                                className={styles.select}
                            >
                                {mediumOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Температура среды (°C)</label>
                            <input
                                type="text"
                                value={knsData.temperature}
                                onChange={(e) => setKnsData({ ...knsData, temperature: e.target.value })}
                                className={styles.input}
                                placeholder="°C"
                            />
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={knsData.explosionProof}
                                onChange={(e) => setKnsData({ ...knsData, explosionProof: e.target.checked })}
                            />
                            <span className={styles.checkboxLabel}>Взрывозащищенное исполнение</span>
                        </label>
                    </div>

                    {/* Габаритные размеры */}
                    <h3 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса насосной станции</h3>

                    <div className={styles.dimensionsSection}>
                        <div className={styles.dimensionsForm}>
                            <table className={styles.dimensionsTable}>
                                <thead>
                                    <tr>
                                        <th>Параметр, (ед. измерения)</th>
                                        <th>Значение</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Глубина залегания подводящего трубопровода, A (м)</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={knsData.inletDepth}
                                                onChange={(e) => setKnsData({ ...knsData, inletDepth: e.target.value })}
                                                className={styles.dimensionInput}
                                                placeholder="м"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Диаметр и материал подводящего трубопровода, B</td>
                                        <td>
                                            <div className={styles.dimensionGroup}>
                                                <input
                                                    type="text"
                                                    value={knsData.inletDiameter}
                                                    onChange={(e) => setKnsData({ ...knsData, inletDiameter: e.target.value })}
                                                    className={styles.dimensionInputSmall}
                                                    placeholder="мм"
                                                />
                                                <input
                                                    type="text"
                                                    value={knsData.inletMaterial}
                                                    onChange={(e) => setKnsData({ ...knsData, inletMaterial: e.target.value })}
                                                    className={styles.dimensionInputSmall}
                                                    placeholder="материал"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Направление подводящего трубопровода, по часам</td>
                                        <td>
                                            <select
                                                value={knsData.inletDirection}
                                                onChange={(e) => setKnsData({ ...knsData, inletDirection: e.target.value })}
                                                className={styles.dimensionSelect}
                                            >
                                                {directionOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Глубина залегания напорного трубопровода, D (м)</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={knsData.outletDepth}
                                                onChange={(e) => setKnsData({ ...knsData, outletDepth: e.target.value })}
                                                className={styles.dimensionInput}
                                                placeholder="м"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Диаметр и материал напорного трубопровода на выходе из насосной станции, C</td>
                                        <td>
                                            <div className={styles.dimensionGroup}>
                                                <input
                                                    type="text"
                                                    value={knsData.outletDiameter}
                                                    onChange={(e) => setKnsData({ ...knsData, outletDiameter: e.target.value })}
                                                    className={styles.dimensionInputSmall}
                                                    placeholder="мм"
                                                />
                                                <input
                                                    type="text"
                                                    value={knsData.outletMaterial}
                                                    onChange={(e) => setKnsData({ ...knsData, outletMaterial: e.target.value })}
                                                    className={styles.dimensionInputSmall}
                                                    placeholder="материал"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Направление напорного трубопровода, по часам</td>
                                        <td>
                                            <select
                                                value={knsData.outletDirection}
                                                onChange={(e) => setKnsData({ ...knsData, outletDirection: e.target.value })}
                                                className={styles.dimensionSelect}
                                            >
                                                {directionOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Количество напорных трубопроводов на выходе из насосной станции</td>
                                        <td>
                                            <select
                                                value={knsData.outletCount}
                                                onChange={(e) => setKnsData({ ...knsData, outletCount: e.target.value })}
                                                className={styles.dimensionSelect}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Предполагаемый диаметр насосной станции (м)</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={knsData.stationDiameter}
                                                onChange={(e) => setKnsData({ ...knsData, stationDiameter: e.target.value })}
                                                className={styles.dimensionInput}
                                                placeholder="м"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Предполагаемая высота насосной станции (м)</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={knsData.stationHeight}
                                                onChange={(e) => setKnsData({ ...knsData, stationHeight: e.target.value })}
                                                className={styles.dimensionInput}
                                                placeholder="м"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Наличие утепления корпуса (указать глубину, м)</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={knsData.insulation}
                                                onChange={(e) => setKnsData({ ...knsData, insulation: e.target.value })}
                                                className={styles.dimensionInput}
                                                placeholder="м"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.dimensionsDiagram}>
                            <KNSSchema data={knsData} extras={knsExtras} />
                        </div>
                    </div>

                    {/* Электрические параметры */}
                    <h3 className={styles.subsectionTitle}>Электрические параметры</h3>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Метод пуска электродвигателей</label>
                            <select
                                value={knsData.motorStartMethod}
                                onChange={(e) => setKnsData({ ...knsData, motorStartMethod: e.target.value })}
                                className={styles.select}
                            >
                                {motorStartOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Количество вводов питания</label>
                            <select
                                value={knsData.powerInputs}
                                onChange={(e) => setKnsData({ ...knsData, powerInputs: e.target.value })}
                                className={styles.select}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Место установки шкафа</label>
                            <select
                                value={knsData.cabinetLocation}
                                onChange={(e) => setKnsData({ ...knsData, cabinetLocation: e.target.value })}
                                className={styles.select}
                            >
                                {cabinetLocationOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Дополнительная комплектация */}
                    <h3 className={styles.subsectionTitle}>Дополнительная комплектация</h3>
                    <div className={styles.extrasGrid}>
                        {Object.entries(knsExtras).map(([key, value]) => (
                            <label key={key} className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => setKnsExtras({ ...knsExtras, [key]: e.target.checked })}
                                />
                                <span className={styles.checkboxLabel}>{key}</span>
                            </label>
                        ))}
                    </div>
                </>
            )}

            {formData.configType !== 'КНС' && (
                <div className={styles.infoMessage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
                        <path d="M12 16V12" stroke="#4A85F6" strokeWidth="2" />
                        <circle cx="12" cy="8" r="1" fill="#4A85F6" />
                    </svg>
                    <p>
                        Для выбранного типа конфигурации дополнительные параметры будут доступны позже.
                        Пожалуйста, продолжите создание заявки с основной информацией.
                    </p>
                </div>
            )}
        </div>
    )
}



