import { useState } from 'react'
import styles from './scheme-form.module.css'
import { KNSSchema } from '../kns-schema'
import { checkBox } from './components/teeska'

export const SchemeForm = ({ knsData, setKnsData, directionOptions, knsExtras, setKnsExtras }) => {
    const [elements, setElements] = useState(checkBox)

    return (
        <>
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

            <h3 className={styles.subsectionTitle}>Дополнительная комплектация</h3>
            <div className={styles.extrasGrid}>
                {checkBox.map((item, key) => (
                    <label className={styles.checkbox} key={Object.entries(knsExtras).length + key}>
                        <input
                            type="checkbox"
                            checked={false}
                            onChange={(e) => setElement2(e.target.checked)}
                        />
                        <span className={styles.checkboxLabel}>Элемент 2</span>
                    </label>
                ))}

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
    )
}



