import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import styles from './request-form.module.css'
import { observer } from 'mobx-react-lite'
import { useRequestForm } from './use-request-form'
import { FormBasicInformationForm } from '../basic-information-form/basic-information-form'
import { KnsParametersForm } from '../kns-parameters/kns-parameters-form'
import { PumpParametersForm } from '../pump-parameters/pump-parameters-form'
import { useEffect } from 'react'
import { RequestFormView } from './request-form-view'

interface Props {
    requestId?: string
}

export const RequestForm = observer(({ requestId }: Props) => {

    const {
        handleNext,
        handleBack,
        activeStep,
        getStepStatus,
        isEditMode,
        configTypeId,
        setConfigTypeId,
        fullClear,
        setFullClear,
        handleSubmit
    } = useRequestForm(requestId)


    useEffect(() => {
        setFullClear(false)

        return () => {
            setFullClear(true);
        };
    }, []);

    return (
        <>
            <AccountHeader
                title={isEditMode ? 'Редактирование заявки' : 'Создание заявки'}
                breadcrumbs={{
                    current: isEditMode ? `Редактирование ${requestId}` : 'Новая заявка',
                    linksBack: [
                        { text: "Главная", link: "/customer/dashboard" },
                        { text: "Заявки", link: "/customer/request" }
                    ]
                }}
            />

            <div className="bg-white flex items-start gap-4 mb-8">
                {[
                    {
                        value: 1,
                        name: "Основная информация",
                        description: "Объект, заказчик, контакты"
                    },
                    {
                        value: 2,
                        name: "Технические параметры",
                        description: "Конфигурация оборудования"
                    },
                    {
                        value: 3,
                        name: "Проверка и отправка",
                        description: "Финальные данные"
                    },
                ].map((step, key) => (
                    <div key={key} className={`${styles.step} ${styles[getStepStatus(step.value)]}`}>
                        <div className={styles.stepNumber}>{step.value}</div>
                        <div className={styles.stepInfo}>
                            <span className={styles.stepLabel}>{step.name}</span>
                            <span className={styles.stepDesc}>{step.description}</span>
                        </div>
                        {getStepStatus(step.value) === 'completed' && (
                            <svg className={styles.stepIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" fill="#10B981" />
                                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>



            {activeStep === 1 && <FormBasicInformationForm fullClear={fullClear} styles={styles} handleNext={handleNext} setConfigTypeId={setConfigTypeId} />}
            {/* {activeStep === 2 && (configTypeId == "019cdcd9-1892-7f3a-955c-3503ede15a6d" ? <TechnicalParametersStep styles={styles} handleNext={handleNext} handleBack={handleBack} /> : <TechnicalPumpParametersStep />)} */}
            {activeStep === 2 && (configTypeId == "019cdcd9-1892-7f3a-955c-3503ede15a6d"
                ? <KnsParametersForm fullClear={fullClear} styles={styles} handleNext={handleNext} handleBack={handleBack} />
                : <PumpParametersForm fullClear={fullClear} styles={styles} handleNext={handleNext} handleBack={handleBack} />
            )}

            {activeStep === 3 && <RequestFormView handleBack={handleBack} configTypeId={configTypeId} handleSubmit={handleSubmit} />}

            {/* <div className={styles.formActions}>
                    {activeStep > 1 && (
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={handleBack}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Назад
                        </button>
                    )}

                    {activeStep < 3 ? (
                        <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={handleNext}
                        >
                            Далее
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={() => handleSubmit(isEditMode, navigate, requestId)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.spinner} />
                                    {isEditMode ? 'Обновление...' : 'Создание...'}
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
                                        <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
                                        <path d="M12 22V16" stroke="white" strokeWidth="2" />
                                    </svg>
                                    {isEditMode ? 'Обновить заявку' : 'Создать заявку'}
                                </>
                            )}
                        </button>
                    )}

                    <button
                        type="button"
                        className={styles.tertiaryButton}
                        onClick={() => navigate('/customer')}
                    >
                        Отмена
                    </button>
                </div> */}

        </>
    )
})