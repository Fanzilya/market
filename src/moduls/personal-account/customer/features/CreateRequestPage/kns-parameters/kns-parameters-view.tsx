import { observer } from 'mobx-react-lite';
import { PerfomanceMeasureUnitTranslations, PumpsStartupMethodTranslations } from '@/entities/request/config';
import { knsParametersModel } from './kns-parameters-model';
import { SchemeDocsView } from '@/widgets/scheme-docs/scheme-docs-view';
import { ParametersViewContainer } from '@/widgets/request-view/parameters-view-container';
import { EquipmentDataCheckbox } from '@/widgets/Scheme/src/data/teeska';
import { KnsData } from '@/entities/request/type';



interface Props {
    knsData: KnsData,
    elements: EquipmentDataCheckbox[],
    fileUrl: string,
}


export const KnsParametersView = observer(({ knsData, elements, fileUrl }: Props) => {

    return (
        <>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    {/* <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-slate-50 rounded-2xl">
                    <InfoItem
                        label="Тип конфигурации"
                        value={'КНС'} />

                    <InfoItem
                        label="Дата создания"
                        value={new Date(request?.createdAt).toLocaleDateString('ru-RU')} />

                    {request?.locationRegion &&
                        <InfoItem
                            label="Регион"
                            value={request.locationRegion} />
                    }
                </div> */}


                    <ParametersViewContainer
                        title='Технические параметры'
                        classNames={{
                            items: "!grid-cols-1"
                        }}
                        items={[
                            {
                                label: "Производительность:",
                                value: knsData.capacity + " " + PerfomanceMeasureUnitTranslations[knsData.units],
                            },
                            {
                                label: "Напор:",
                                value: knsData.head ? knsData.head + " м" : "",
                            },
                            {
                                label: "Насосы:",
                                value: `${knsData.workingPumps || '0'} раб. / ${knsData.reservePumps || '0'} рез. / ${knsData.stockPumps || '0'} склад`,
                            },
                            {
                                label: "Среда:",
                                value: knsData.medium,
                            },
                            {
                                label: "Температура:",
                                value: knsData.temperature ? knsData.temperature + " °C" : "",
                            },
                            {
                                label: "Взрывозащита:",
                                value: knsData.explosionProof ? 'Да' : 'Нет',
                            },
                        ]}

                    />

                    <ParametersViewContainer
                        title='Электрические параметры'
                        items={[
                            {
                                label: "Метод пуска:",
                                value: PumpsStartupMethodTranslations[knsData.motorStartMethod],
                            },
                            {
                                label: "Вводов питания:",
                                value: knsData.powerInputs || '1',
                            },
                            {
                                label: "Место установки шкафа:",
                                value: knsData.cabinetLocation,
                            },
                        ]}
                    />

                    {elements.length > 0 && elements[3].checked &&
                        <ParametersViewContainer
                            title='Габаритные размеры'
                            items={[
                                {
                                    label: "A (вход):",
                                    value: knsData.inletDepth || '—' + " м",
                                },
                                {
                                    label: "B (вход):",
                                    value: (knsData.inletDiameter || '—') + " мм " + (knsData.inletMaterial || '—'),
                                },
                                {
                                    label: "C (выход):",
                                    value: (knsData.outletDiameter || '—') + " мм " + (knsData.outletMaterial || '—'),
                                },
                                {
                                    label: "D (выход):",
                                    value: (knsData.outletDepth || '—') + " м",
                                },
                                {
                                    label: "Станция:",
                                    value: (knsData.stationDiameter || '—') + " м × " + (knsData.stationHeight || '—') + " м",
                                },
                                {
                                    label: "Утепление:",
                                    value: (knsData.insulation || '—') + " м",
                                },
                            ]}
                        />
                    }


                    {elements.length > 0 &&
                        <ParametersViewContainer
                            title='Габаритные размеры'
                            list={elements.filter(item => item.checked)}
                        />
                    }
                </div>

                <SchemeDocsView url={fileUrl} />
            </div>
        </>
    );
})


// {elements && (
//     <>
//         <h3 className={styles.previewTitle}>Дополнительная комплектация</h3>
//         <div className={styles.previewList}>
//
//         </div>
//     </>
// )}

