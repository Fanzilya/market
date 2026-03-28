import { observer } from 'mobx-react-lite';
import { pumpParametersModel } from './pump-parameters-model';
import { SchemeDocsView } from '@/widgets/scheme-docs/scheme-docs-view';
import { ParametersViewContainer } from '@/widgets/request-view/parameters-view-container';
import { InstalationTypeTranslations, LiquidsIntakeTypeTranslations, LiquidTypeTranslations, PipesConditionsTranslations } from '@/entities/pumps/config';
import { TitleBlock } from '@/widgets/request-view/request-titles';
import { IPumpsForm, IPumpType } from '@/entities/pumps/type';


interface Props {
    model: IPumpsForm,
    configTypes: IPumpType[],
    fileUrl: string,
    submersibleTypesId: string,
}


export const PupmParametersView = observer(({ model, fileUrl, configTypes, submersibleTypesId, }: Props) => {


    return (
        <>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    <ParametersViewContainer
                        title='Установка насоса'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Способ установки насоса:",
                                value: configTypes.find(item => item.id === model.pumpTypeId)?.typeName!,
                            },
                            {
                                label: "Тип установки насоса агрегата:",
                                value: InstalationTypeTranslations[model.instalationType],
                            },
                            {
                                label: model.pumpTypeId == submersibleTypesId
                                    ? 'Предпологаемая глубина погружения:'
                                    : "Высота всасывания:",
                                value: !model.heightOrDepth ? "" : model.heightOrDepth + " м",
                            },
                            {
                                label: "Требуемый напор:",
                                value: !model.requiredPressure ? "" : model.requiredPressure + " м.вод.ст",
                            },
                            {
                                label: "Потери напора в напорном трубопроводе:",
                                value: !model.pressureLoses ? "" : model.pressureLoses + " м",
                            },
                            {
                                label: "Длина сети:",
                                value: !model.networkLength ? "" : model.networkLength + " м",
                            },
                            {
                                label: "Состояние сети:",
                                value: PipesConditionsTranslations[model.pipesConditions],
                            },
                            {
                                label: "Трубопровода:",
                                value: !model.pumpDiameter ? "" : model.pumpDiameter + " мм",
                            },
                            {
                                label: "Геодезические отметки:",
                                value: model.geodesicalMarks,
                            },
                            {
                                label: "Требуемый напор на излив:",
                                value: !model.requiredOutPressure ? "" : model.requiredOutPressure + " м",
                            },
                        ]}
                    />

                    <ParametersViewContainer
                        title='Конфигурации насоса'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Вид перекачиваемой жидкости:",
                                value: LiquidTypeTranslations[model.pumpedLiquidType],
                            },
                            {
                                label: "Производительность:",
                                value: !model.pumpEfficiency ? "" : model.pumpEfficiency + " м³/ч",
                            },
                            {
                                label: "Кол-во рабочих насосов: ",
                                value: !model.workPumpsCount ? "" : model.workPumpsCount + " шт",
                            },
                            {
                                label: "Кол-во резервных: ",
                                value: !model.reservePumpsCount ? "" : model.reservePumpsCount + " шт",
                            },
                        ]}
                    />

                    <ParametersViewContainer
                        title='Качество воды'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Температура: ",
                                value: !model.liquidTemperature ? "" : model.liquidTemperature + " °C",
                            },
                            {
                                label: "Крупность минеральных частиц: ",
                                value: !model.mineralParticlesSize ? "" : model.mineralParticlesSize + " мм",
                            },
                            {
                                label: "Содержание минеральных частиц: ",
                                value: !model.mineralParticlesConcentration ? "" : model.mineralParticlesConcentration + " гр/м³",
                            },
                            {
                                label: "Наличие в воде крупных механических и длинноволокнистых примесей:",
                                value: model.bigParticleExistance ? "Имеется" : "Нет",
                            },
                            {
                                label: "Если есть специафические отходы, указать: ",
                                value: model.specificWastes,
                            },
                            {
                                label: "Плотность жидкости: ",
                                value: !model.liquidDensity ? "" : model.liquidDensity + " кг/м³",
                            },
                        ]}
                    />

                    <ParametersViewContainer
                        title='Технические характеристики'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Поступление сточных вод:",
                                value: LiquidsIntakeTypeTranslations[model.intakeType],
                            },
                            {
                                label: "Взрывозащита:",
                                value: model.explosionProtection ? 'Да' : 'Нет',
                            },
                            {
                                label: "Управление:",
                                value: model.controlType,
                            },
                        ]}
                    />

                    <ParametersViewContainer
                        title='Питание'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Вид тока:",
                                value: model.powerCurrentType,
                            },
                            {
                                label: "Рабочее напряжение:",
                                value: !model.workPower ? "" : model.workPower + " B",
                            },
                            {
                                label: "Наличие преобразователя частоты V:",
                                value: model.frequencyConverter ? "Да" : "Нет",
                            },
                            {
                                label: "Длина силового кабеля:",
                                value: !model.powerCableLength ? "" : model.powerCableLength + " м",
                            },

                            {
                                label: "Длина силового кабеля:",
                                value: !model.powerCableLength ? "" : model.powerCableLength + " м",
                            },
                        ]}
                    />

                    <ParametersViewContainer
                        title='Необходимость комплектования'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Подъёмно-транспортное оборудование:",
                                value: model.liftingTransportEquipment ? "Да" : "Нет",
                            },
                            {
                                label: "Взмучивающий (промывной) клапан:",
                                value: model.flushValve ? "Да" : "Нет",
                            },
                            {
                                label: "Поплавковый датчик уровня или другие уровнемеры:",
                                value: model.otherLevelMeters ? "Да" : "Нет",
                            },
                        ]}
                    />

                    {model.otherRequirements.trim() && <>
                        <TitleBlock title="Дополнительные требования" />

                        <div className='bg-gray-100 py-4 px-4 rounded-lg'>
                            {model.otherRequirements}
                        </div>
                    </>}
                </div>

                <SchemeDocsView url={fileUrl} />
            </div>
        </>
    );
})