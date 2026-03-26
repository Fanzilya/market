import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formBasicInformationModel } from './form-basic-information';
import { SelectParameters } from '../ui/select-parameters';
import { configTypeList } from '@/entities/request/config';
import { FormViewContainer } from '../ui/form-view-container';

export const FormBasicInformationView = observer(() => {

    const { formData } = formBasicInformationModel

    return (
        <div className="mb-[32px]">
            <FormViewContainer
                title='Основная информация'
                items={[
                    {
                        label: "Объект:",
                        value: formData.objectName,
                    },
                    {
                        label: "Заказчик:",
                        value: formData.govCustomerName,
                    },
                    {
                        label: "Тип:",
                        value: "КНС (Канализационная насосная станция)",
                    },
                    {
                        label: "Контакт:",
                        value: formData.contactPerson,
                    },
                ]}
            />
        </div>
    );
});