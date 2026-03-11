import { observer } from 'mobx-react-lite';


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
                    <input
                        type="text"
                        value={formData.objectName}
                        onChange={(e) => setFormData("objectName", e.target.value)}
                        onFocus={() => setFocusedInput('objectName')}
                        onBlur={() => setFocusedInput(null)}
                        className={`${styles.input} ${focusedInput === 'objectName' ? styles.inputFocused : ''}`}
                        placeholder="Например: КНС №1, ЖК «Северный»"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Регион <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.locationRegion}
                        onChange={(e) => setFormData("locationRegion", e.target.value)}
                        onFocus={() => setFocusedInput('locationRegion')}
                        onBlur={() => setFocusedInput(null)}
                        className={`${styles.input} ${focusedInput === 'locationRegion' ? styles.inputFocused : ''}`}
                        placeholder="Например: КНС №1, ЖК «Северный»"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Гос. заказчик <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.govCustomerName}
                        onChange={(e) => setFormData("govCustomerName", e.target.value)}
                        onFocus={() => setFocusedInput('govCustomer')}
                        onBlur={() => setFocusedInput(null)}
                        className={`${styles.input} ${focusedInput === 'govCustomer' ? styles.inputFocused : ''}`}
                        placeholder="Например: ГКУ «Управление строительства»"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Тип конфигурации</label>
                    <select
                        value={formData.configType}
                        onChange={(e) => setFormData("configType", e.target.value)}
                        className={styles.select}
                    >
                        <option value="КНС">КНС (Канализационная насосная станция)</option>
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
                    <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData("contactPerson", e.target.value)}
                        className={`${styles.input}`}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Телефон</label>
                    <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData("contactPhone", e.target.value)}
                        className={styles.input}
                        placeholder="+7 (___) ___-__-__"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData("contactEmail", e.target.value)}
                        className={`${styles.input}`}
                    />
                </div>
            </div>
        </div>
    );
});