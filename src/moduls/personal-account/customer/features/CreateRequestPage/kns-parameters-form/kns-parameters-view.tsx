import { schemeActionsModel } from '@/widgets/Scheme/src/models/scheme-actions-model';
import { observer } from 'mobx-react-lite';
import { cabinetLocationOptions, directionOptions, mediumOptions } from '../data/data';
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing';
import { ControllerInstalationPlace, ControllerInstalationPlaceTranslations, directionLabels, PerfomanceMeasureUnit, PerfomanceMeasureUnitTranslations, PipelineMaterial, PipelineMaterialTranslations, PumpEnvironment, PumpEnvironmentTranslations, PumpsStartupMethod, PumpsStartupMethodTranslations } from '@/entities/request/config';
import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { requestTechnicalParametersModel } from './kns-parameters-model';
import { useEffect } from 'react';
import { BackButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { FormViewContainer } from '../ui/form-view-container';


interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
}

export const TechnicalParametersView = observer(({ styles, handleNext, handleBack }: Props) => {

    const { knsData } = requestTechnicalParametersModel

    return (
        <FormViewContainer
            title='Технические параметры'
            items={[
                {
                    label: "Объект:",
                    value: knsData.objectName,
                },
                {
                    label: "Заказчик:",
                    value: knsData.govCustomerName,
                },
                {
                    label: "Тип:",
                    value: "КНС (Канализационная насосная станция)",
                },
                {
                    label: "Контакт:",
                    value: knsData.contactPerson,
                },
            ]}
        />
    );
})