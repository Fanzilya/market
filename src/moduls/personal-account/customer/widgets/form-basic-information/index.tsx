import Icon from '@/shared/ui-kits/Icon';
import { Input } from '@/shared/ui-kits/Input';
import { observer } from 'mobx-react-lite';
import { InfoLabel } from './info-label';


interface Porps {
    styles: any,
    formData: any,
    setFormData: (data: any) => void

    focusedInput: any,
    setFocusedInput: (data: any) => void
}

export const FormBasicInformation = observer(({ styles, formData, setFormData, focusedInput, setFocusedInput }: Porps) => {
    return (
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
                    <InfoLabel />
                    
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

                <div className={styles.formGroup}>
                    <label className={styles.label}>Тип конфигурации</label>
                    <select
                        value={formData.configType}
                        onChange={(e) => setFormData("configType", e.target.value)}
                        className={styles.select}
                    >
                        <option value='019cdcd9-1892-7f3a-955c-3503ede15a6d'>КНС (Канализационная насосная станция)</option>
                        {/* <option value="ЛОС">ЛОС (Локальные очистные сооружения)</option>
                    <option value="Насосная группа">Насосная группа</option>
                    <option value="Другое">Другое</option> */}
                    </select>
                </div>
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
        </div>
    );
});