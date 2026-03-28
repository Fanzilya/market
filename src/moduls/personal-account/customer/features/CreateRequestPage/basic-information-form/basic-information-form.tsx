import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { basicInformationModel } from './basic-information-model';
import { SelectParameters } from '../ui/select-parameters';
import { configTypeList } from '@/entities/request/config';
import { CancelButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { useNavigate } from 'react-router-dom';
import { Selector } from '@/shared/ui-kits/select';

interface Porps {
    fullClear: boolean,
    styles: any,
    handleNext: () => void,
    setConfigTypeId: (value: string) => void,

}

export const FormBasicInformationForm = observer(({ fullClear, styles, handleNext, setConfigTypeId }: Porps) => {

    const [isHovered, setIsHovered] = useState(false);
    const { formData, setFormData, regionList, init, errors, validateForm, errorModel, clearForm } = basicInformationModel

    const navigate = useNavigate()

    const onHandleNext = () => {
        if (validateForm()) {
            setConfigTypeId(formData.configType)
            handleNext()
        }
    }

    useEffect(() => {
        if (regionList.length == 0) {
            init()
        }

        if (fullClear) {
            errorModel.clearErrors()
            clearForm()
        }
    }, [])

    return (
        <>
            <div className={styles.stepContent}>
                <h2 className={styles.sectionTitle}>Основная информация</h2>
                <div className={styles.formGrid}>
                    <Input
                        label='Название объекта'
                        required
                        type="text"
                        value={formData.objectName}
                        onChange={(e) => setFormData("objectName", e)}
                        classNames={{
                            input: styles.input
                        }}
                        placeholder="Например: КНС №1, ЖК «Северный»"
                        error={errors.objectName}
                    />

                    <Selector
                        placeholder={"Регион"}
                        items={regionList.map((item) => {
                            return {
                                value: item.id,
                                title: item.regionName,
                            }
                        })}
                        onSelect={(e) => setFormData("regionId", e.value)}
                        label={"Регион"}
                        required
                        defaultValue={formData.regionId}
                        error={errors.regionId}
                    />

                    <Input
                        type="text"
                        value={formData.govCustomerName}
                        onChange={(e) => setFormData("govCustomerName", e)}
                        placeholder="Например: ГКУ «Управление строительства»"
                        error={errors.govCustomerName}
                        label={
                            <label className="text-sm font-medium text-slate-800 flex items-center gap-1 relative">
                                Заказчик
                                <span className="text-[#ef4444] text-[16px]">*</span>
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <Icon name='info' color="oklch(27.9% 0.041 260.031)" height={15} width={15} />

                                    {/* Тултип */}
                                    {isHovered && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-slate-200 text-xs text-slate-600 z-50">
                                            {/* Треугольник-стрелочка */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5">
                                                <div className="border-8 border-transparent border-t-white drop-shadow-lg"></div>
                                            </div>

                                            {/* Текст */}
                                            Специализированное юридическое лицо, уполномоченное застройщиком управлять строительством, заключать договоры с подрядчиками, готовить документы и контролировать качество работ от имени застройщика
                                        </div>
                                    )}
                                </div>
                            </label>
                        }
                    />

                    <Input
                        label='Проектная организация'
                        required
                        type="text"
                        value={formData.projectOrganizationName}
                        onChange={(e) => setFormData("projectOrganizationName", e)}
                        classNames={{
                            input: styles.input
                        }}
                        placeholder="Например: ООО «Проф проект"
                        error={errors.projectOrganizationName}
                    />


                    <Selector
                        placeholder={"Тип конфигурации"}
                        items={configTypeList.map((item) => {
                            return {
                                value: item.id,
                                title: item.name,
                            }
                        })}
                        onSelect={(e) => setFormData("configType", e.value)}
                        label={"Тип конфигурации"}
                        defaultValue={formData.configType}
                        required
                        error={errors.configType}
                    />
                </div>

                <h3 className={styles.subsectionTitle}>Контактная информация</h3>

                <div className={styles.formGrid}>
                    <Input
                        required
                        label='Контактное лицо'
                        type="text"
                        placeholder='Контактное лицо'
                        value={formData.contactPerson}
                        onChange={(e) => setFormData("contactPerson", e)}
                        classNames={{
                            input: styles.input
                        }}
                        error={errors.contactPerson}
                    />

                    <Input
                        label='Телефон'
                        required
                        type="phone"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData("contactPhone", e)}
                        classNames={{
                            input: styles.input
                        }}
                        placeholder="+7 (___) ___-__-__"
                        error={errors.contactPhone}
                    />

                    {/* <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData("contactEmail", e.target.value)}
                        className={styles.input}
                    />
                </div> */}
                </div>

                <FormBtnContainer>
                    <CancelButton onClick={() => navigate(-1)} />
                    <NextButton onClick={onHandleNext} />
                </FormBtnContainer >
            </div>


            {/* <div className={`${styles.infoMessage} mt-[20px]`}>
                <Icon name='info' color='#4A85F6' width={24} />

                <p>
                    Для выбранного типа конфигурации дополнительные параметры будут доступны позже.
                    Пожалуйста, продолжите создание заявки с основной информацией.
                </p>
            </div> */}
        </>
    );
});