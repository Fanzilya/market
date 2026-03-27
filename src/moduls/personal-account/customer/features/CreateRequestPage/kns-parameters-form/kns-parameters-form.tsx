import { schemeActionsModel } from '@/widgets/Scheme/src/models/scheme-actions-model';
import { observer } from 'mobx-react-lite';
import { cabinetLocationOptions, directionOptions, mediumOptions } from '../data/data';
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing';
import { ControllerInstalationPlace, ControllerInstalationPlaceTranslations, directionLabels, PerfomanceMeasureUnit, PerfomanceMeasureUnitTranslations, PipelineMaterial, PipelineMaterialTranslations, PumpEnvironment, PumpEnvironmentTranslations, PumpsStartupMethod, PumpsStartupMethodTranslations } from '@/entities/request/config';
import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { knsParametersModel } from './kns-parameters-model';
import { useEffect } from 'react';
import { BackButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { SchemeDocsForm } from '@/widgets/scheme-docs/scheme-docs-form';
import { Selector } from '@/shared/ui-kits/select';


interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
    fullClear: boolean,

}

export const KnsParametersForm = observer(({ styles, handleNext, handleBack, fullClear }: Props) => {

    const { elements, initData, setKnsData, knsData, setElementChecked, clearForm, setFile, errorModel, validateForm, fileUrl, file } = knsParametersModel

    useEffect(() => {
        if (elements.length == 0) {
            initData()
        }

        if (fullClear) {
            errorModel.clearErrors()
            clearForm()
        }
    }, [])

    const handleBackButton = () => {
        clearForm()
        handleBack()
    }

    const onHandleNext = () => {
        if (validateForm()) {
            handleNext()
        }
    }

    return (
        <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Технические параметры</h2>
            <div className={styles.formGrid}>
                <div>
                    <h3 className={styles.subsectionTitle}>Основные параметры</h3>
                    <div className={styles.formGridTech}>
                        <div className="flex gap-3 flex-wrap">
                            <Input
                                type="number"
                                value={knsData.capacity}
                                required
                                label='Производительность'
                                onChange={(e) => setKnsData("capacity", e)}
                                error={errorModel.errors.capacity}
                                classNames={{ container: "min-w-[50%] flex-1" }}
                                placeholder="0"
                            />

                            <Selector
                                required
                                placeholder={"Единица измерения"}
                                label={"Единица измерения"}
                                classNames={{ wripper: "w-[20%] min-w-[250px]" }}
                                items={
                                    Object.values(PerfomanceMeasureUnit)
                                        .filter(value => typeof value === 'number')
                                        .map(value => {
                                            return {
                                                title: PerfomanceMeasureUnitTranslations[value as PumpEnvironment],
                                                value: value
                                            }
                                        })
                                }
                                defaultValue={String(knsData.units)}
                                onSelect={(e) => setKnsData("units", e.value)}
                                error={errorModel.errors.units}
                            />
                        </div>

                        <Input
                            label='Требуемый напор (м)'
                            required
                            type="number"
                            value={knsData.head}
                            onChange={(e) => setKnsData("head", e)}
                            error={errorModel.errors.head}
                            classNames={{ input: styles.input }}
                            placeholder="м"
                        />

                        <Input
                            type="number"
                            label='Кол-во рабочих насосов'
                            value={knsData.workingPumps}
                            onChange={(e) => setKnsData("workingPumps", e)}
                            error={errorModel.errors.workingPumps}
                            classNames={{ input: styles.input }}
                            placeholder="например: 2"
                        />

                        <Input
                            type="number"
                            label='Кол-во резервных насосов'
                            value={knsData.reservePumps}
                            onChange={(e) => setKnsData("reservePumps", e)}
                            error={errorModel.errors.reservePumps}
                            classNames={{ input: styles.input }}
                            placeholder="например: 1"
                        />

                        <Input
                            type="number"
                            label='Кол-во насосов на склад'
                            value={knsData.stockPumps}
                            onChange={(e) => setKnsData("stockPumps", e)}
                            error={errorModel.errors.stockPumps}
                            classNames={{ input: styles.input }}
                            placeholder="например: 0"
                        />
                    </div>

                    {/* Параметры среды */}
                    <h3 className={styles.subsectionTitle}>Параметры среды</h3>
                    <div className={styles.formGridTech}>
                        <Selector
                            required
                            placeholder={"Перекачиваемая среда"}
                            label={"Перекачиваемая среда"}
                            items={Object.values(PumpEnvironment)
                                .filter(value => typeof value === 'number')
                                .map(value => {
                                    return {
                                        title: PumpEnvironmentTranslations[value as PumpEnvironment],
                                        value: String(value)
                                    }
                                })
                            }
                            defaultValue={knsData.medium}
                            onSelect={(e) => setKnsData("medium", e.value)}
                            error={errorModel.errors.medium}
                        />

                        <Input
                            type="number"
                            label='Температура среды (°C)'
                            value={knsData.temperature}
                            onChange={(e) => setKnsData("temperature", e)}
                            error={errorModel.errors.temperature}
                            classNames={{ input: styles.input }}
                            placeholder="°C"
                        />
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

                        <Selector
                            required
                            placeholder={"Метод пуска электродвигателей"}
                            label={"Метод пуска электродвигателей"}
                            items={Object.values(PumpsStartupMethod)
                                .filter(value => typeof value === 'number')
                                .map(value => {
                                    return {
                                        value: String(value),
                                        title: PumpsStartupMethodTranslations[value as PumpsStartupMethod]
                                    }
                                })
                            }
                            defaultValue={knsData.motorStartMethod}
                            onSelect={(e) => setKnsData("motorStartMethod", e.value)}
                            error={errorModel.errors.motorStartMethod}
                        />

                        <Selector
                            required
                            placeholder={"Количество вводов питания"}
                            label={"Количество вводов питания"}
                            items={[
                                {
                                    value: "1",
                                    title: "1",
                                },
                                {
                                    value: "2",
                                    title: "2",
                                }
                            ]}
                            onSelect={(e) => setKnsData("powerInputs", e.value)}
                            defaultValue={knsData.powerInputs}
                            error={errorModel.errors.powerInputs}
                        />


                        <Selector
                            required
                            placeholder={"Место установки шкафа"}
                            label={"Место установки шкафа"}
                            items={Object.values(ControllerInstalationPlace)
                                .filter(value => typeof value === 'number')
                                .map(value => {
                                    return {
                                        value: String(value),
                                        title: ControllerInstalationPlaceTranslations[value as ControllerInstalationPlace]
                                    }
                                })
                            }
                            defaultValue={knsData.cabinetLocation}
                            onSelect={(e) => setKnsData("cabinetLocation", e.value)}
                            error={errorModel.errors.cabinetLocation}
                        />
                    </div>

                    <h3 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса насосной станции</h3>
                    <div className={styles.formGridTech}>
                        <Input
                            label='Глубина залегания подводящего трубопровода, A (мм)'
                            type="text"
                            value={knsData.inletDepth}
                            onChange={(e) => setKnsData("inletDepth", e)}
                            error={errorModel.errors.inletDepth}
                            classNames={{ input: styles.input }}
                            placeholder="м"
                        />

                        {/* Диаметр и материал подводящего трубопровода */}
                        <div className="flex gap-3 flex-wrap">
                            <Input
                                type="text"
                                label='Диаметр подводящего трубопровода, B'
                                value={knsData.inletDiameter}
                                onChange={(e) => setKnsData("inletDiameter", e)}
                                error={errorModel.errors.inletDiameter}
                                classNames={{ container: "min-w-[50%] flex-1" }}
                                placeholder="мм"
                            />

                            <Selector
                                placeholder={"Материал"}
                                label={"Материал"}
                                classNames={{ wripper: "w-[20%] min-w-[250px]" }}
                                items={Object.values(PipelineMaterial)
                                    .filter(value => typeof value === 'number')
                                    .map(value => {
                                        return {
                                            value: String(value),
                                            title: PipelineMaterialTranslations[value]
                                        }
                                    })
                                }
                                defaultValue={knsData.inletMaterial}
                                onSelect={(e) => setKnsData("inletMaterial", e.value)}
                                error={errorModel.errors.inletMaterial}
                            />
                        </div>


                        {/* Направление подводящего трубопровода */}

                        <Selector
                            required
                            placeholder={"Направление подводящего трубопровода, по часам"}
                            label={"Направление подводящего трубопровода, по часам"}
                            items={
                                Object.entries(directionLabels).map(([value, label]) => {
                                    return {
                                        value: String(value),
                                        title: label
                                    }
                                })
                            }
                            defaultValue={knsData.inletDirection}
                            onSelect={(e) => setKnsData("inletDirection", e.value)}
                            error={errorModel.errors.inletDirection}
                        />

                        {/* Глубина напорного трубопровода */}
                        <Input
                            label='Глубина залегания напорного трубопровода, D (мм)'
                            type="number"
                            value={knsData.outletDepth}
                            onChange={(e) => setKnsData("outletDepth", e)}
                            error={errorModel.errors.outletDepth}
                            classNames={{ input: styles.input }}
                            placeholder="м"
                        />

                        {/* Диаметр и материал напорного трубопровода */}
                        <div className="flex gap-3 flex-wrap">

                            <Input
                                label='Диаметр напорного трубопровода на выходе из насосной станции, C'
                                type="number"
                                value={knsData.outletDiameter}
                                onChange={(e) => setKnsData("outletDiameter", e)}
                                error={errorModel.errors.outletDiameter}
                                classNames={{ container: "min-w-[50%] flex-1" }}
                                placeholder="мм"
                            />

                            <Selector
                                required
                                placeholder={"Материал"}
                                label={"Материал"}
                                classNames={{ wripper: "w-[20%] min-w-[250px]" }}
                                items={Object.values(PipelineMaterial)
                                    .filter(value => typeof value === 'number')
                                    .map(value => {
                                        return {
                                            value: String(value),
                                            title: PipelineMaterialTranslations[value]
                                        }
                                    })
                                }
                                defaultValue={knsData.outletMaterial}
                                onSelect={(e) => setKnsData("outletMaterial", e.value)}
                                error={errorModel.errors.outletMaterial}
                            />
                        </div>


                        {/* Направление напорного трубопровода */}
                        <Selector
                            required
                            placeholder={"Направление напорного трубопровода, по часам"}
                            label={"Направление напорного трубопровода, по часам"}
                            items={directionOptions.map(opt => {
                                return {
                                    value: opt.value,
                                    title: opt.label
                                }
                            })}
                            defaultValue={knsData.outletDirection}
                            onSelect={(e) => setKnsData("outletDirection", e.value)}
                            error={errorModel.errors.outletDirection}
                        />

                        {/* Количество напорных трубопроводов */}
                        <Selector
                            required
                            placeholder={"Количество напорных трубопроводов на выходе из насосной станции"}
                            label={"Количество напорных трубопроводов на выходе из насосной станции"}
                            items={[
                                {
                                    value: "1",
                                    title: "1"
                                },
                                {
                                    value: "2",
                                    title: "2"
                                },
                            ]}
                            defaultValue={knsData.outletCount}
                            onSelect={(e) => setKnsData("outletCount", e.value)}
                            error={errorModel.errors.outletCount}
                        />

                        {/* Диаметр станции */}
                        <Input
                            label='Предполагаемый диаметр насосной станции (мм)'
                            type="number"
                            value={knsData.stationDiameter}
                            onChange={(e) => setKnsData("stationDiameter", e)}
                            error={errorModel.errors.stationDiameter}
                            classNames={{ input: styles.input }}
                            placeholder="м"
                        />

                        {/* Высота станции */}
                        <Input
                            type="number"
                            label='Предполагаемая высота насосной станции (мм)'
                            value={knsData.stationHeight}
                            onChange={(e) => setKnsData("stationHeight", e)}
                            error={errorModel.errors.stationHeight}
                            classNames={{ input: styles.input }}
                            placeholder="м"
                        />

                        {/* Утепление */}
                        <Input
                            type="number"
                            label='Наличие утепления корпуса (указать глубину, мм)'
                            value={knsData.insulation}
                            onChange={(e) => setKnsData("insulation", e)}
                            error={errorModel.errors.insulation}
                            classNames={{ input: styles.input }}
                            placeholder="м"
                        />
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

                {/* {elements && <KNSSchemaTesting isActive={elements[3]?.checked} />} */}
                <SchemeDocsForm setFile={setFile} isError={errorModel.errors?.fileUrl?.length > 0} fileUrl={fileUrl} fileData={file} />
            </div>

            <FormBtnContainer>
                <BackButton onClick={handleBackButton} />
                <NextButton onClick={onHandleNext} />
            </FormBtnContainer >
        </div>
    );
})