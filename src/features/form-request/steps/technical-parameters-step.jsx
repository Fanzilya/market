import { observer } from 'mobx-react-lite';
import { CoordinateManager } from '../components/coordinate-manager';
import { KNSSchema } from '../kns-schema';
import { checkBox } from '../scheme-form/components/teeska';
import { useState } from 'react';
import { schemeActionsModel } from '../model/scheme-actions-model';

export const TechnicalParametersStep = observer(({ knsData, styles, formData, focusedInput, motorStartOptions, setKnsData, knsExtras, setKnsExtras }) => {

    // Опции для выпадающих списков
    const mediumOptions = [
        'Хоз-бытовые сточные воды',
        'Ливневые сточные воды',
        'Промышленные стоки',
        'Другое'
    ]

    const cabinetLocationOptions = [
        { value: 'УХЛ1', label: 'УХЛ1' },
        { value: 'УХЛ4', label: 'УХЛ4' }
    ]

    const directionOptions = [
        { value: '12', label: '12 часов (вверх)' },
        { value: '1', label: '1 час (30°)' },
        { value: '2', label: '2 часа (60°)' },
        { value: '3', label: '3 часа (вправо)' },
        { value: '4', label: '4 часа (120°)' },
        { value: '5', label: '5 часов (150°)' },
        { value: '6', label: '6 часов (вниз)' },
        { value: '7', label: '7 часов (210°)' },
        { value: '8', label: '8 часов (240°)' },
        { value: '9', label: '9 часов (влево)' },
        { value: '10', label: '10 часов (300°)' },
        { value: '11', label: '11 часов (330°)' },
    ]

    const { setElements, elements } = schemeActionsModel

    return (
        <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Технические параметры</h2>
            {formData.configType === 'КНС' && (
                <div className={styles.formGrid}>
                    <div>
                        <h3 className={styles.subsectionTitle}>Основные параметры</h3>
                        <div className={styles.formGridTech}>
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
                        <div className={styles.formGridTech}>
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

                        {/* Электрические параметры */}
                        <h3 className={styles.subsectionTitle}>Электрические параметры</h3>
                        <div className={styles.formGridTech}>
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

                        <h3 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса насосной станции</h3>
                        <div className={styles.formGridTech}>
                            <div className={styles.dimensionsContainer}>
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Глубина залегания подводящего трубопровода, A (м)</div>
                                    <div className={styles.dimensionValue}>
                                        <input
                                            type="text"
                                            value={knsData.inletDepth}
                                            onChange={(e) => setKnsData({ ...knsData, inletDepth: e.target.value })}
                                            className={styles.input}
                                            placeholder="м"
                                        />
                                    </div>
                                </div>

                                {/* Диаметр и материал подводящего трубопровода */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Диаметр и материал подводящего трубопровода, B</div>
                                    <div className={styles.dimensionValue}>
                                        <div className={styles.dimensionGroup}>
                                            <input
                                                type="text"
                                                value={knsData.inletDiameter}
                                                onChange={(e) => setKnsData({ ...knsData, inletDiameter: e.target.value })}
                                                className={styles.input}
                                                placeholder="мм"
                                            />
                                            <input
                                                type="text"
                                                value={knsData.inletMaterial}
                                                onChange={(e) => setKnsData({ ...knsData, inletMaterial: e.target.value })}
                                                className={styles.input}
                                                placeholder="материал"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Направление подводящего трубопровода */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Направление подводящего трубопровода, по часам</div>
                                    <div className={styles.dimensionValue}>
                                        <select
                                            value={knsData.inletDirection}
                                            onChange={(e) => setKnsData({ ...knsData, inletDirection: e.target.value })}
                                            className={styles.select}
                                        >
                                            {directionOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Глубина напорного трубопровода */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Глубина залегания напорного трубопровода, D (м)</div>
                                    <div className={styles.dimensionValue}>
                                        <input
                                            type="text"
                                            value={knsData.outletDepth}
                                            onChange={(e) => setKnsData({ ...knsData, outletDepth: e.target.value })}
                                            className={styles.input}
                                            placeholder="м"
                                        />
                                    </div>
                                </div>

                                {/* Диаметр и материал напорного трубопровода */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Диаметр и материал напорного трубопровода на выходе из насосной станции, C</div>
                                    <div className={styles.dimensionValue}>
                                        <div className={styles.dimensionGroup}>
                                            <input
                                                type="text"
                                                value={knsData.outletDiameter}
                                                onChange={(e) => setKnsData({ ...knsData, outletDiameter: e.target.value })}
                                                className={styles.input}
                                                placeholder="мм"
                                            />
                                            <input
                                                type="text"
                                                value={knsData.outletMaterial}
                                                onChange={(e) => setKnsData({ ...knsData, outletMaterial: e.target.value })}
                                                className={styles.input}
                                                placeholder="материал"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Направление напорного трубопровода */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Направление напорного трубопровода, по часам</div>
                                    <div className={styles.dimensionValue}>
                                        <select
                                            value={knsData.outletDirection}
                                            onChange={(e) => setKnsData({ ...knsData, outletDirection: e.target.value })}
                                            className={styles.select}
                                        >
                                            {directionOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Количество напорных трубопроводов */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Количество напорных трубопроводов на выходе из насосной станции</div>
                                    <div className={styles.dimensionValue}>
                                        <select
                                            value={knsData.outletCount}
                                            onChange={(e) => setKnsData({ ...knsData, outletCount: e.target.value })}
                                            className={styles.select}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Диаметр станции */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Предполагаемый диаметр насосной станции (м)</div>
                                    <div className={styles.dimensionValue}>
                                        <input
                                            type="text"
                                            value={knsData.stationDiameter}
                                            onChange={(e) => setKnsData({ ...knsData, stationDiameter: e.target.value })}
                                            className={styles.input}
                                            placeholder="м"
                                        />
                                    </div>
                                </div>

                                {/* Высота станции */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Предполагаемая высота насосной станции (м)</div>
                                    <div className={styles.dimensionValue}>
                                        <input
                                            type="text"
                                            value={knsData.stationHeight}
                                            onChange={(e) => setKnsData({ ...knsData, stationHeight: e.target.value })}
                                            className={styles.input}
                                            placeholder="м"
                                        />
                                    </div>
                                </div>

                                {/* Утепление */}
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Наличие утепления корпуса (указать глубину, м)</div>
                                    <div className={styles.dimensionValue}>
                                        <input
                                            type="text"
                                            value={knsData.insulation}
                                            onChange={(e) => setKnsData({ ...knsData, insulation: e.target.value })}
                                            className={styles.input}
                                            placeholder="м"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className={styles.subsectionTitle}>Дополнительная комплектация</h3>
                        <div className={styles.extrasGrid}>
                            {elements.map((item, key) => (
                                <label className={styles.checkbox} key={Object.entries(knsExtras).length + key}>
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={(e) => {
                                            const newElements = [...elements];
                                            newElements[key] = {
                                                ...newElements[key],
                                                checked: e.target.checked
                                            };
                                            setElements(newElements);
                                        }}
                                    />
                                    <span className={styles.checkboxLabel}>{item.name}</span>
                                </label>
                            ))}

                            {/* {Object.entries(knsExtras).map(([key, value]) => (
                                <label key={key} className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={(e) => setKnsExtras({ ...knsExtras, [key]: e.target.checked })}
                                    />
                                    <span className={styles.checkboxLabel}>{key}</span>
                                </label>
                            ))} */}
                        </div>



                        <CoordinateManager model={schemeActionsModel} />



                    </div>
                    <KNSSchema styles={styles} data={knsData} extras={elements} />
                </div>
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
    );
})