import { schemeActionsModel } from '@/widgets/Scheme/src/models/scheme-actions-model';
import { observer } from 'mobx-react-lite';
import { cabinetLocationOptions, directionOptions, mediumOptions } from './src/data';
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing';
import { ControllerInstalationPlace, ControllerInstalationPlaceTranslations, directionLabels, PerfomanceMeasureUnit, PerfomanceMeasureUnitTranslations, PipelineMaterial, PipelineMaterialTranslations, PumpEnvironment, PumpEnvironmentTranslations, PumpsStartupMethod, PumpsStartupMethodTranslations } from '@/entities/request/config';
import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';


interface Props {
    knsData: any,
    styles: any,
    formData: any,
    focusedInput: any,
    motorStartOptions: any,
    setKnsData: any,
    elements: any,
    activeElements: any,
    setElementChecked: any,
}

export const TechnicalParametersStep = observer(({ knsData, styles, formData, focusedInput, motorStartOptions, setKnsData, elements, activeElements, setElementChecked }: Props) => {

    return (
        <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Технические параметры</h2>
            <div className={styles.formGrid}>
                <div>
                    <h3 className={styles.subsectionTitle}>Основные параметры</h3>
                    <div className={styles.formGridTech}>
                        <div className="flex gap-3">
                            <Input
                                type="number"
                                value={knsData.capacity}
                                required
                                label='Производительность'
                                onChange={(e) => setKnsData("capacity", e)}
                                classNames={{ container: "w-full" }}
                                placeholder="0"
                            />

                            <div className="flex flex-col gap-2 w-full">
                                <label className={styles.label}>Единица измерения <span className="text-[#ef4444]">*</span></label>
                                <select
                                    value={knsData.motorStartMethod}
                                    onChange={(e) => setKnsData("units", e.target.value)}
                                    className={styles.select}
                                >
                                    {Object.values(PerfomanceMeasureUnit)
                                        .filter(value => typeof value === 'number')
                                        .map(value => (
                                            <option key={value} value={value}>
                                                {PerfomanceMeasureUnitTranslations[value as PerfomanceMeasureUnit]}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Требуемый напор (м) <span className={styles.required}>*</span>
                            </label>
                            <Input
                                type="number"
                                value={knsData.head}
                                onChange={(e) => setKnsData("head", e)}
                                classNames={{ input: styles.input }}
                                placeholder="м"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Кол-во рабочих насосов</label>
                            <Input
                                type="number"
                                value={knsData.workingPumps}
                                onChange={(e) => setKnsData("workingPumps", e)}
                                classNames={{ input: styles.input }}
                                placeholder="например: 2"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Кол-во резервных насосов</label>
                            <Input
                                type="number"
                                value={knsData.reservePumps}
                                onChange={(e) => setKnsData("reservePumps", e)}
                                classNames={{ input: styles.input }}
                                placeholder="например: 1"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Кол-во насосов на склад</label>
                            <Input
                                type="number"
                                value={knsData.stockPumps}
                                onChange={(e) => setKnsData("stockPumps", e)}
                                classNames={{ input: styles.input }}
                                placeholder="например: 0"
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
                                onChange={(e) => setKnsData("medium", e.target.value)}
                                className={styles.select}
                            >
                                {Object.values(PumpEnvironment)
                                    .filter(value => typeof value === 'number')
                                    .map(value => (
                                        <option key={value} value={value}>
                                            {PumpEnvironmentTranslations[value as PumpEnvironment]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Температура среды (°C)</label>
                            <Input
                                type="number"
                                value={knsData.temperature}
                                onChange={(e) => setKnsData("temperature", e)}
                                classNames={{ input: styles.input }}
                                placeholder="°C"
                            />
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={knsData.explosionProof}
                                onChange={(e) => setKnsData("explosionProof", e.target.checked)}
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
                                onChange={(e) => setKnsData("motorStartMethod", e.target.value)}
                                className={styles.select}
                            >
                                {Object.values(PumpsStartupMethod)
                                    .filter(value => typeof value === 'number')
                                    .map(value => (
                                        <option key={value} value={value}>
                                            {PumpsStartupMethodTranslations[value as PumpsStartupMethod]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Количество вводов питания</label>
                            <select
                                value={knsData.powerInputs}
                                onChange={(e) => setKnsData("powerInputs", e.target.value)}
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
                                onChange={(e) => setKnsData("cabinetLocation", e.target.value)}
                                className={styles.select}
                            >
                                {Object.values(ControllerInstalationPlace)
                                    .filter(value => typeof value === 'number')
                                    .map(value => (
                                        <option key={value} value={value}>
                                            {ControllerInstalationPlaceTranslations[value as ControllerInstalationPlace]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <h3 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса насосной станции</h3>
                    <div className={styles.formGridTech}>
                        <div className={styles.dimensionsContainer}>
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Глубина залегания подводящего трубопровода, A (мм)</div>
                                <div className={styles.dimensionValue}>
                                    <Input
                                        type="text"
                                        value={knsData.inletDepth}
                                        onChange={(e) => setKnsData("inletDepth", e)}
                                        classNames={{ input: styles.input }}
                                        placeholder="м"
                                    />
                                </div>
                            </div>

                            {/* Диаметр и материал подводящего трубопровода */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Диаметр и материал подводящего трубопровода, B</div>
                                <div className={styles.dimensionValue}>
                                    <div className={styles.dimensionGroup}>
                                        <Input
                                            type="text"
                                            value={knsData.inletDiameter}
                                            onChange={(e) => setKnsData("inletDiameter", e)}
                                            classNames={{ input: styles.input }}
                                            placeholder="мм"
                                        />

                                        <select
                                            value={knsData.inletMaterial}
                                            onChange={(e) => setKnsData("inletMaterial", e.target.value)}
                                            className={styles.select}
                                        >
                                            {Object.values(PipelineMaterial)
                                                .filter(value => typeof value === 'number')
                                                .map(value => (
                                                    <option key={value} value={value}>
                                                        {PipelineMaterialTranslations[value]}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Направление подводящего трубопровода */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Направление подводящего трубопровода, по часам</div>
                                <div className={styles.dimensionValue}>
                                    <select
                                        value={knsData.inletDirection}
                                        onChange={(e) => setKnsData("inletDirection", e.target.value)}
                                        className={styles.select}
                                    >
                                        {Object.entries(directionLabels).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Глубина напорного трубопровода */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Глубина залегания напорного трубопровода, D (мм)</div>
                                <div className={styles.dimensionValue}>
                                    <Input
                                        type="number"
                                        value={knsData.outletDepth}
                                        onChange={(e) => setKnsData("outletDepth", e)}
                                        classNames={{ input: styles.input }}
                                        placeholder="м"
                                    />
                                </div>
                            </div>

                            {/* Диаметр и материал напорного трубопровода */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Диаметр и материал напорного трубопровода на выходе из насосной станции, C</div>
                                <div className={styles.dimensionValue}>
                                    <div className={styles.dimensionGroup}>
                                        <Input
                                            type="number"
                                            value={knsData.outletDiameter}
                                            onChange={(e) => setKnsData("outletDiameter", e)}
                                            classNames={{ input: styles.input }}
                                            placeholder="мм"
                                        />
                                        <select
                                            value={knsData.outletMaterial}
                                            onChange={(e) => setKnsData("outletMaterial", e.target.value)}
                                            className={styles.select}
                                        >
                                            {Object.values(PipelineMaterial)
                                                .filter(value => typeof value === 'number')
                                                .map(value => (
                                                    <option key={value} value={value}>
                                                        {PipelineMaterialTranslations[value]}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Направление напорного трубопровода */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Направление напорного трубопровода, по часам</div>
                                <div className={styles.dimensionValue}>
                                    <select
                                        value={knsData.outletDirection}
                                        onChange={(e) => setKnsData("outletDirection", e.target.value)}
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
                                        onChange={(e) => setKnsData("outletCount", e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            {/* Диаметр станции */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Предполагаемый диаметр насосной станции (мм)</div>
                                <div className={styles.dimensionValue}>
                                    <Input
                                        type="number"
                                        value={knsData.stationDiameter}
                                        onChange={(e) => setKnsData("stationDiameter", e)}
                                        classNames={{ input: styles.input }}
                                        placeholder="м"
                                    />
                                </div>
                            </div>

                            {/* Высота станции */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Предполагаемая высота насосной станции (мм)</div>
                                <div className={styles.dimensionValue}>
                                    <Input
                                        type="number"
                                        value={knsData.stationHeight}
                                        onChange={(e) => setKnsData("stationHeight", e)}
                                        classNames={{ input: styles.input }}
                                        placeholder="м"
                                    />
                                </div>
                            </div>

                            {/* Утепление */}
                            <div className={styles.formGroup}>
                                <div className={styles.label}>Наличие утепления корпуса (указать глубину, мм)</div>
                                <div className={styles.dimensionValue}>
                                    <Input
                                        type="number"
                                        value={knsData.insulation}
                                        onChange={(e) => setKnsData("insulation", e)}
                                        classNames={{ input: styles.input }}
                                        placeholder="м"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className={styles.subsectionTitle}>Дополнительная комплектация</h3>
                    <div className={styles.extrasGrid}>
                        {elements.map((item, key) => (
                            <label className={styles.checkbox} key={key}>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    disabled={item.disabled}
                                    onChange={(e) => { setElementChecked(item.id, e.target.checked) }}
                                />
                                <span className={styles.checkboxLabel}>{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {elements && <KNSSchemaTesting isActive={elements[3]?.checked} />}
            </div>


            {false && formData.configType !== 'КНС' && (
                <div className={styles.infoMessage}>
                    <Icon name='info' color='#4A85F6' width={24} />

                    <p>
                        Для выбранного типа конфигурации дополнительные параметры будут доступны позже.
                        Пожалуйста, продолжите создание заявки с основной информацией.
                    </p>
                </div>
            )}
        </div>
    );
})