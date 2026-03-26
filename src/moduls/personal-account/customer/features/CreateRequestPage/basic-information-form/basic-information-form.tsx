import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formBasicInformationModel } from './form-basic-information';
import { SelectParameters } from '../ui/select-parameters';
import { configTypeList } from '@/entities/request/config';
import { CancelButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { useNavigate } from 'react-router-dom';

interface Porps {
    styles: any,
    handleNext: () => void,
    setConfigTypeId: (value: string) => void,

}

export const FormBasicInformationForm = observer(({ styles, handleNext, setConfigTypeId }: Porps) => {

    const [isHovered, setIsHovered] = useState(false);
    const { formData, setFormData } = formBasicInformationModel

    const navigate = useNavigate()

    const onHandleNext = () => {
        setConfigTypeId(formData.configType)
        handleNext()
    }

    return (
        <>
            <div className={styles.stepContent}>
                <h2 className={styles.sectionTitle}>Основная информация</h2>

                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Название объекта <span className={styles.required}>*</span>
                        </label>
                        <Input
                            type="text"
                            value={formData.objectName}
                            onChange={(e) => setFormData("objectName", e)}
                            classNames={{
                                input: styles.input
                            }}
                            placeholder="Например: КНС №1, ЖК «Северный»"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Регион <span className={styles.required}>*</span></label>
                        <Input
                            type="text"
                            value={formData.locationRegion}
                            onChange={(e) => setFormData("locationRegion", e)}
                            classNames={{
                                input: styles.input
                            }}
                            placeholder="Регион"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className="relative inline-block">
                            <label className="text-sm font-medium text-slate-800 flex items-center gap-1">
                                Заказчик
                                <span className="text-[#ef4444] text-[16px]">*</span>
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <Icon name='info' color="oklch(27.9% 0.041 260.031)" width={15} />

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
                        </div>

                        <Input
                            type="text"
                            value={formData.govCustomerName}
                            onChange={(e) => setFormData("govCustomerName", e)}
                            classNames={{
                                input: styles.input
                            }}
                            placeholder="Например: ГКУ «Управление строительства»"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Проектная организация <span className={styles.required}>*</span>
                        </label>
                        <Input
                            type="text"
                            value={formData.projectOrganizationName}
                            onChange={(e) => setFormData("projectOrganizationName", e)}
                            classNames={{
                                input: styles.input
                            }}
                            placeholder="Например: ООО «Проф проект"
                        />
                    </div>


                    <SelectParameters
                        required
                        label="Тип конфигурации"
                        value={formData.configType}
                        onChange={(e) => setFormData("configType", e)}
                        items={configTypeList.map((item) => {
                            return {
                                value: item.id,
                                text: item.name,
                            }
                        })}
                    />
                </div>

                <h3 className={styles.subsectionTitle}>Контактная информация</h3>

                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Контактное лицо</label>
                        <Input
                            type="text"
                            placeholder='Контактное лицо'
                            value={formData.contactPerson}
                            onChange={(e) => setFormData("contactPerson", e)}
                            classNames={{
                                input: styles.input
                            }}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Телефон</label>
                        <Input
                            type="phone"
                            value={formData.contactPhone}
                            onChange={(e) => setFormData("contactPhone", e)}
                            classNames={{
                                input: styles.input
                            }}
                            placeholder="+7 (___) ___-__-__"
                        />
                    </div>

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


            <div className={`${styles.infoMessage} mt-[20px]`}>
                <Icon name='info' color='#4A85F6' width={24} />

                <p>
                    Для выбранного типа конфигурации дополнительные параметры будут доступны позже.
                    Пожалуйста, продолжите создание заявки с основной информацией.
                </p>
            </div>

        </>
    );
});