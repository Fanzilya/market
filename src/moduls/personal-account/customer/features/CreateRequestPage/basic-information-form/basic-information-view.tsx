import { observer } from 'mobx-react-lite';
import { formBasicInformationModel } from './form-basic-information';
import BasicInformationViewContainer from '../../../../../../widgets/request-view/basic-information-view-container';

export const FormBasicInformationView = observer(() => {

    const { formData, regionList } = formBasicInformationModel

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
                        value: regionList.find(item => item.id === formData.regionId)?.name || "",
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
                        value: formData.configType,
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