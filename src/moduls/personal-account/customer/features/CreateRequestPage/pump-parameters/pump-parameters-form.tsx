import { observer } from 'mobx-react-lite';
import { Input } from '@/shared/ui-kits/Input';
import { pumpParametersModel } from './pump-parameters-model';
import { BackButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { useEffect } from 'react';
import { SchemeDocsForm } from '@/widgets/scheme-docs/scheme-docs-form';
import { Selector } from '@/shared/ui-kits/select';
import { getObjectNumberList } from '@/utils/get-object-keys-list';
import { InstalationTypeTranslations, LiquidsIntakeType, LiquidsIntakeTypeTranslations, LiquidType, LiquidTypeTranslations, PipesConditions, PipesConditionsTranslations, PumpManagement, PumpManagementTranslations } from '@/entities/pumps/config';
import { Textarea } from '@/shared/ui-kits/Input/Textarea';

interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
    fullClear: boolean,
}

export const PumpParametersForm = observer(({ styles, handleNext, handleBack, fullClear }: Props) => {

    const { clearForm, validateForm, setModelData, initData, model, configTypes, controlTypeVlue,
        setControlTypeVlue, instalationTypeCurrentList, errorModel, setFile, fileUrl, file, submersibleTypesId } = pumpParametersModel

    useEffect(() => {
        if (configTypes.length == 0) {
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
        <div className={styles.stepContent} >
            <h2 className={styles.sectionTitle}>Технические параметры насосов</h2>
            <div className={styles.formGrid}>
                <div>

                    <h3 className={styles.subsectionTitle}>Установка насоса</h3>
                    <div className={styles.formGridTech}>
                        <Selector
                            required
                            placeholder={"Способ установки насоса"}
                            label={"Способ установки насоса"}
                            items={configTypes.map(item => {
                                return {
                                    value: item.id,
                                    title: item.typeName
                                }
                            })}
                            defaultValue={model.pumpTypeId}
                            onSelect={(e) => setModelData("pumpTypeId", e.value)}
                            error={errorModel.errors.pumpTypeId}
                        />


                        {model.pumpTypeId.length > 0 && <>

                            <Selector
                                required
                                key={instalationTypeCurrentList.join(',')}
                                placeholder={"Тип установки насоса агрегата"}
                                label={"Тип установки насоса агрегата"}
                                items={instalationTypeCurrentList.map(item => {
                                    return {
                                        value: item,
                                        title: InstalationTypeTranslations[item]
                                    }
                                })}
                                defaultValue={model.instalationType}
                                onSelect={(e) => setModelData("instalationType", e.value)}
                                error={errorModel.errors.instalationType}
                            />

                            <Input
                                label={model.pumpTypeId == submersibleTypesId
                                    ? 'Предпологаемая глубина погружения, м'
                                    : "Высота всасывания, м"
                                }
                                type="number"
                                value={model.heightOrDepth}
                                onChange={(e) => setModelData("heightOrDepth", e)}
                                error={errorModel.errors.heightOrDepth}
                                placeholder="0 м"
                            />

                            <Input
                                label='Требуемый напор, м.вод.ст'
                                type="number"
                                value={model.requiredPressure}
                                onChange={(e) => setModelData("requiredPressure", e)}
                                error={errorModel.errors.requiredPressure}
                                placeholder="0 м.вод.ст"
                            />

                            <Input
                                label='Потери напора в напорном трубопроводе, м'
                                type="number"
                                value={model.pressureLoses}
                                onChange={(e) => setModelData("pressureLoses", e)}
                                error={errorModel.errors.pressureLoses}
                                placeholder="0 м"
                            />

                            <Input
                                label='Длина сети, м'
                                type="number"
                                value={model.networkLength}
                                onChange={(e) => setModelData("networkLength", e)}
                                error={errorModel.errors.networkLength}
                                placeholder="0 м"
                            />

                            <Selector
                                placeholder={"Состояние сети"}
                                label={"Состояние сети"}
                                items={getObjectNumberList(PipesConditions).map(item => {
                                    return {
                                        value: item,
                                        title: PipesConditionsTranslations[item]
                                    }
                                })}
                                defaultValue={model.pipesConditions}
                                onSelect={(e) => setModelData("pipesConditions", e.value)}
                                error={errorModel.errors.pipesConditions}
                            />

                            <Input
                                label='Трубопровода, мм'
                                type="number"
                                value={model.pumpDiameter}
                                onChange={(e) => setModelData("pumpDiameter", e)}
                                error={errorModel.errors.pumpDiameter}
                                placeholder="0 мм"
                            />

                            <Input
                                label='Геодезические отметки'
                                type="string"
                                value={model.geodesicalMarks}
                                onChange={(e) => setModelData("geodesicalMarks", e)}
                                error={errorModel.errors.geodesicalMarks}
                                placeholder="0 м"
                            />

                            <Input
                                label='Требуемый напор на излив, м'
                                type="number"
                                value={model.requiredOutPressure}
                                onChange={(e) => setModelData("requiredOutPressure", e)}
                                error={errorModel.errors.requiredOutPressure}
                                placeholder="0 м"
                            />
                        </>}
                    </div>
                    {model.pumpTypeId.length > 0 && <>
                        <h3 className={styles.subsectionTitle}>Конфигурации насоса</h3>
                        <div className={styles.formGridTech}>
                            <Selector
                                placeholder={"Вид перекачиваемой жидкости"}
                                label={"Вид перекачиваемой жидкости"}
                                items={getObjectNumberList(LiquidType).map(item => {
                                    return {
                                        title: LiquidTypeTranslations[item],
                                        value: item
                                    }
                                })}
                                defaultValue={String(model.pumpedLiquidType)}
                                onSelect={(e) => setModelData("pumpedLiquidType", e.value)}
                                error={errorModel.errors.pumpedLiquidType}
                            />

                            <Input
                                required
                                label='Производительность, м³/ч'
                                type="number"
                                value={model.pumpEfficiency || ""}
                                onChange={(e) => setModelData("pumpEfficiency", e)}
                                error={errorModel.errors.pumpEfficiency}
                                placeholder="0 м³/ч"
                            />

                            <Input
                                label='Кол-во рабочих насосов, шт'
                                type="number"
                                value={model.workPumpsCount || ""}
                                onChange={(e) => setModelData("workPumpsCount", e)}
                                error={errorModel.errors.workPumpsCount}
                                placeholder="0 шт"
                            />
                            <Input
                                label='Кол-во резервных, шт'
                                type="number"
                                value={model.reservePumpsCount || ""}
                                onChange={(e) => setModelData("reservePumpsCount", e)}
                                error={errorModel.errors.reservePumpsCount}
                                placeholder="0 шт"
                            />
                        </div>

                        <h3 className={styles.subsectionTitle}>Качество воды</h3>
                        <div className={styles.formGridTech}>
                            <Input
                                label='Температура, °C'
                                type="number"
                                value={model.liquidTemperature}
                                onChange={(e) => setModelData("liquidTemperature", e)}
                                error={errorModel.errors.liquidTemperature}
                                placeholder="0 °C"
                            />

                            <Input
                                label='Крупность минеральных частиц, мм'
                                type="number"
                                value={model.mineralParticlesSize}
                                onChange={(e) => setModelData("mineralParticlesSize", e)}
                                error={errorModel.errors.mineralParticlesSize}
                                placeholder="0 мм"
                            />
                            <Input
                                label='Содержание минеральных частиц, гр/м³'
                                type="number"
                                value={model.mineralParticlesConcentration}
                                onChange={(e) => setModelData("mineralParticlesConcentration", e)}
                                error={errorModel.errors.mineralParticlesConcentration}
                                placeholder="0 гр/м³"
                            />

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={model.bigParticleExistance}
                                        onChange={(e) => setModelData("bigParticleExistance", e.target.checked)}
                                    />
                                    <span className={styles.checkboxLabel}>Наличие в воде крупных механических и длинноволокнистых примесей таких как, тпяпки, бумага палки и т.д.</span>
                                </label>
                            </div>

                            <Input
                                label='Если есть специафические отходы, указать'
                                type="text"
                                value={model.specificWastes}
                                onChange={(e) => setModelData("specificWastes", e)}
                                error={errorModel.errors.specificWastes}
                                placeholder="Специафические отходы"
                            />

                            <Input
                                label='Плотность жидкости кг/м³'
                                type="number"
                                value={model.liquidDensity}
                                onChange={(e) => setModelData("liquidDensity", e)}
                                error={errorModel.errors.liquidDensity}
                                placeholder="0 кг/м³"
                            />
                        </div>


                        <h3 className={styles.subsectionTitle}>Технические характеристики</h3>
                        <div className={styles.formGridTech}>
                            <Selector
                                placeholder={"Поступление сточных вод"}
                                label={"Поступление сточных вод"}
                                items={getObjectNumberList(LiquidsIntakeType).map(item => {
                                    return {
                                        title: LiquidsIntakeTypeTranslations[item],
                                        value: item
                                    }
                                })}
                                defaultValue={String(model.intakeType)}
                                onSelect={(e) => setModelData("intakeType", e.value)}
                                error={errorModel.errors.intakeType}
                            />

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={model.explosionProtection}
                                        onChange={(e) => setModelData("explosionProtection", e.value)}
                                    />
                                    <span className={styles.checkboxLabel}>Взрывозащищенное исполнение</span>
                                </label>
                            </div>

                            <Selector
                                placeholder={"Управление"}
                                label={"Управление"}
                                items={getObjectNumberList(PumpManagement)
                                    .map(item => {
                                        return {
                                            value: item,
                                            title: PumpManagementTranslations[item]
                                        }
                                    })}

                                defaultValue={String(controlTypeVlue || "")}
                                onSelect={(e) => setControlTypeVlue(e.value, e.title)}
                                error={errorModel.errors.controlType}
                            />

                            {controlTypeVlue == PumpManagement.Other &&
                                <Input
                                    label='Укажите способ управления'
                                    type="text"
                                    value={model.controlType}
                                    onChange={(e) => setModelData("controlType", e)}
                                    error={errorModel.errors.controlType}
                                    placeholder=""
                                />
                            }



                        </div>

                        <h3 className={styles.subsectionTitle}>Питание</h3>
                        <div className={styles.formGridTech}>
                            <Input
                                label='Вид тока'
                                type="text"
                                value={model.powerCurrentType}
                                onChange={(e) => setModelData("powerCurrentType", e)}
                                error={errorModel.errors.powerCurrentType}
                                placeholder="Вид тока"
                            />
                            <Input
                                label='Рабочее напряжение, B'
                                type="text"
                                value={model.workPower}
                                onChange={(e) => setModelData("workPower", e)}
                                error={errorModel.errors.workPower}
                                placeholder="0 B"
                            />

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={model.frequencyConverter}
                                        onChange={(e) => setModelData("frequencyConverter", e.value)}
                                    />
                                    <span className={styles.checkboxLabel}>Наличие преобразователя частоты V</span>
                                </label>
                            </div>

                            <Input
                                label='Длина силового кабеля, м'
                                type="text"
                                value={model.powerCableLength}
                                onChange={(e) => setModelData("powerCableLength", e)}
                                error={errorModel.errors.powerCableLength}
                                placeholder="0 м"
                            />

                        </div>

                        <h3 className={styles.subsectionTitle}>Необходимость комплектования</h3>
                        <div className={styles.formGridTech}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={model.liftingTransportEquipment}
                                    onChange={(e) => setModelData("liftingTransportEquipment", e.value)}
                                />
                                <span className={styles.checkboxLabel}>Подъёмно-транспортное оборудование</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={model.flushValve}
                                    onChange={(e) => setModelData("flushValve", e.value)}
                                />
                                <span className={styles.checkboxLabel}>Взмучивающий (промывной) клапан</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={model.otherLevelMeters}
                                    onChange={(e) => setModelData("otherLevelMeters", e.value)}
                                />
                                <span className={styles.checkboxLabel}>Поплавковый датчик уровня или другие уровнемеры</span>
                            </label>
                        </div>

                        <h3 className={styles.subsectionTitle}>Дополнительные требования</h3>
                        <div className={styles.formGridTech}>
                            <Textarea
                                value={model.otherRequirements}
                                onChange={(e) => setModelData("otherRequirements", e)}
                                error={errorModel.errors.otherRequirements}
                                placeholder="Дополнительные требования..."
                                classNames={{
                                    input: "h-[200px]",
                                }}
                            />
                        </div>
                    </>
                    }
                </div>

                <SchemeDocsForm setFile={setFile} isError={errorModel.errors?.fileUrl?.length > 0} fileUrl={fileUrl} fileData={file} />
            </div>

            <FormBtnContainer>
                <BackButton onClick={handleBackButton} />
                <NextButton onClick={onHandleNext} />
            </FormBtnContainer >

        </div>
    );
})