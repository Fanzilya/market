import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import styles from './request-form.module.css'
import { observer } from 'mobx-react-lite'
import { useRequestForm } from './use-request-form'
import { FormBasicInformationForm } from '../basic-information-form/basic-information-form'
import { FormBasicInformationView } from '../basic-information-form/basic-information-view'
import { KnsParametersView } from '../kns-parameters/kns-parameters-view'
import { PupmParametersView } from '../pump-parameters/pump-parameters-view'
import { BackButton, FormBtnContainer, SubmitButton } from '../ui/form-btn-container'
import { basicInformationModel } from '../basic-information-form/basic-information-model'
import { knsParametersModel } from '../kns-parameters/kns-parameters-model'
import { pumpParametersModel } from '../pump-parameters/pump-parameters-model'
import { BaseInfo, KnsData } from '@/entities/request/type'
import { IPumpsForm } from '@/entities/pumps/type'
import { configTypeKeys } from '@/entities/request/config'

interface Props {
    configTypeId?: string,
    handleBack: () => void,
    handleSubmit: ({ basicData, configParametrsData }: { basicData: BaseInfo, configParametrsData: KnsData | IPumpsForm }) => void,
}


export const RequestFormView = observer(({ configTypeId, handleBack, handleSubmit }: Props) => {

    const { formData } = basicInformationModel
    const { knsData, preparationData, file: filekns } = knsParametersModel
    const { model, file: filePump } = pumpParametersModel


    const onSubmit = () => {
        handleSubmit({
            basicData: formData,
            configParametrsData: configTypeId == configTypeKeys.pupm
                ? model
                : {
                    ...knsData,
                    equipmentGuidList: preparationData()
                },
            fileData: configTypeId == configTypeKeys.pupm ? filePump : filekns
        })
    }

    return (
        <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Проверка данных</h2>

            <FormBasicInformationView />

            {configTypeId == "019cdcd9-1892-7f3a-955c-3503ede15a6d"
                ? <KnsParametersView />
                : <PupmParametersView />
            }

            <FormBtnContainer>
                <BackButton onClick={handleBack} />
                <SubmitButton onClick={onSubmit} />
            </FormBtnContainer >

            {/* <h3 className={styles.previewTitle}>Электрические параметры</h3>
                <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Метод пуска:</span>
                        <span className={styles.previewValue}>
                            {PumpsStartupMethodTranslations[knsData.motorStartMethod]}
                        </span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Вводов питания:</span>
                        <span className={styles.previewValue}>{knsData.powerInputs || '1'}</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Место установки шкафа:</span>
                        <span className={styles.previewValue}>{knsData.cabinetLocation || 'УХЛ1'}</span>
                    </div>
                </div>

                {
                    elements[3].checked &&
                    <>
                        <h3 className={styles.previewTitle}>Габаритные размеры</h3>
                        <div className={styles.previewGrid}>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>A (вход):</span>
                                <span className={styles.previewValue}>{knsData.inletDepth || '—'} м</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>B (вход):</span>
                                <span className={styles.previewValue}>
                                    {knsData.inletDiameter || '—'} мм ({knsData.inletMaterial || '—'})
                                </span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>C (выход):</span>
                                <span className={styles.previewValue}>
                                    {knsData.outletDiameter || '—'} мм ({knsData.outletMaterial || '—'})
                                </span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>D (выход):</span>
                                <span className={styles.previewValue}>{knsData.outletDepth || '—'} м</span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Станция:</span>
                                <span className={styles.previewValue}>
                                    ⌀{knsData.stationDiameter || '—'} м × {knsData.stationHeight || '—'} м
                                </span>
                            </div>
                            <div className={styles.previewItem}>
                                <span className={styles.previewLabel}>Утепление:</span>
                                <span className={styles.previewValue}>{knsData.insulation || '—'} м</span>
                            </div>
                        </div>
                    </>
                }

                {elements && (
                    <>
                        <h3 className={styles.previewTitle}>Дополнительная комплектация</h3>
                        <div className={styles.previewList}>
                            {elements
                                .filter(item => item.checked) // Фильтруем по checked
                                .map(item => (
                                    <span key={item.id || item.name} className={styles.previewBadge}>
                                        {item.name}
                                    </span>
                                ))}
                        </div>
                    </>
                )} */}
        </div>
    )
})