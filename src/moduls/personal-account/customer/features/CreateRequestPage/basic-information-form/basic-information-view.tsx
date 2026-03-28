import { observer } from 'mobx-react-lite';
import { basicInformationModel } from './basic-information-model';
import BasicInformationViewContainer from '../../../../../../widgets/request-view/basic-information-view-container';
import { configTypeList } from '@/entities/request/config';

export const FormBasicInformationView = observer(() => {

    const { formData, regionList } = basicInformationModel

    return (
        <div className="mb-[32px]">
            <BasicInformationViewContainer
                title='Основная информация'
                items={[
                    {
                        label: "Название объекта:",
                        value: formData.objectName,
                    },
                    {
                        label: "Регион:",
                        value: regionList.find(item => item.id === formData.regionId)?.regionName || "",
                    },
                    {
                        label: "Заказчик:",
                        value: formData.govCustomerName,
                    },
                    {
                        label: "Проектная организация:",
                        value: formData.projectOrganizationName,
                    },
                    {
                        label: "Тип конфигурации:",
                        value: formData.configType == configTypeList[0].id ? configTypeList[0].name : configTypeList[1].name,
                    },
                    {
                        label: "Контактное лицо:",
                        value: formData.contactPerson,
                    },
                    {
                        label: "Телефон:",
                        value: formData.contactPhone,
                    },
                ]}
            />
        </div>
    );
});