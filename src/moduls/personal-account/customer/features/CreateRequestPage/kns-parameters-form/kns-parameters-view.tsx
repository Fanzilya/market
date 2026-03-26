import { schemeActionsModel } from '@/widgets/Scheme/src/models/scheme-actions-model';
import { observer } from 'mobx-react-lite';
import { cabinetLocationOptions, directionOptions, mediumOptions } from '../data/data';
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing';
import { ControllerInstalationPlace, ControllerInstalationPlaceTranslations, directionLabels, PerfomanceMeasureUnit, PerfomanceMeasureUnitTranslations, PipelineMaterial, PipelineMaterialTranslations, PumpEnvironment, PumpEnvironmentTranslations, PumpsStartupMethod, PumpsStartupMethodTranslations } from '@/entities/request/config';
import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { requestTechnicalParametersModel } from './kns-parameters-model';
import { useEffect } from 'react';
import { BackButton, CancelButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { FormViewContainer } from '../ui/form-view-container';


interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
}

export const TechnicalParametersView = observer(({ styles, handleNext, handleBack }: Props) => {

    const { knsData, elements } = requestTechnicalParametersModel

    return (
        <>
            <FormViewContainer
                title='Технические параметры'
                items={[
                    {
                        label: "Производительность:",
                        value: knsData.capacity + " " + PerfomanceMeasureUnitTranslations[knsData.units],
                    },
                    {
                        label: "Напор:",
                        value: knsData.head + " м",
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
                        value: (knsData.temperature || '—') + " °C",
                    },
                    {
                        label: "Взрывозащита:",
                        value: knsData.explosionProof ? 'Да' : 'Нет',
                    },
                ]}
            />

            <FormViewContainer
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
                        value: knsData.cabinetLocation || 'УХЛ1',
                    },
                ]}
            />

            {elements[3].checked &&
                <FormViewContainer
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


            {elements &&
                <FormViewContainer
                    title='Габаритные размеры'
                    list={elements.filter(item => item.checked)}
                />
            }

            <FormBtnContainer>
                <BackButton onClick={handleBack} />
                {/* <SubmitButton /> */}
            </FormBtnContainer >
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

