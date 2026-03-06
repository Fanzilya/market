// src/pages/CreateRequestPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionUser } from '../../../auth/demoAuth.js'
import { createRequest, getRequestById, updateRequest } from '../../../data/requests.js'
import Sidebar from '../../../components/Sidebar.jsx'
import styles from './CreateRequestPage.module.css'
import { ErrorBox } from '@/components/error-box/error-box.jsx'
import { InformationStep } from '@/features/form-request/steps/information-step.jsx'
// import { SchemeForm } from '@/features/scheme-form/'
// import { InformationStep } from '@/features/form-request/steps/information-step.js'
// import { CheckingSendingStep } from '@/features/form-request/steps/checking-sending-step.jsx'
// import { TechnicalParametersStep } from '@/features/form-request/steps/technical-parameters-step.jsx'

export default function CreateRequestPage() {
    const { requestId } = useParams()
    const user = getSessionUser()
    const navigate = useNavigate()
    const [isMounted, setIsMounted] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [activeStep, setActiveStep] = useState(3)
    const [focusedInput, setFocusedInput] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const isEditMode = !!requestId

    // Основные поля
    const [formData, setFormData] = useState({
        objectName: '',
        govCustomerName: '',
        configType: 'КНС',
        contactPerson: user?.fullName || '',
        contactPhone: user?.phone || '',
        contactEmail: user?.email || '',
    })

    // Расширенные поля для КНС
    const [knsData, setKnsData] = useState({
        // Основные параметры
        capacity: '',
        head: '',
        workingPumps: '',
        reservePumps: '',
        stockPumps: '',
        medium: 'Хоз-бытовые сточные воды',
        temperature: '',
        explosionProof: false,

        // Параметры трубопроводов
        inletDepth: '',
        inletDiameter: '',
        inletMaterial: '',
        inletDirection: '12',

        outletDepth: '',
        outletDiameter: '',
        outletMaterial: '',
        outletDirection: '3',
        outletCount: '1',

        // Параметры станции
        stationDiameter: '',
        stationHeight: '',
        insulation: '',

        // Электрические параметры
        motorStartMethod: 'direct',
        powerInputs: '1',
        cabinetLocation: 'УХЛ1',

        // Дополнительные элементы конструктора схемы
        element1Name: '',
        element1Value: '',
        element2Param: '',
    })

    // Дополнительная комплектация для КНС
    const [knsExtras, setKnsExtras] = useState({
        'Канальный измельчитель': false,
        'Шиберный затвор на подводящей трубе': false,
        'Расходомер на напорном трубопроводе': false,
        'Газоанализатор': false,
        'Диспетчеризация': false,
        'Наземный павильон': false,
        'Грузоподъемное устройство': false,
        'Колодец с задвижкой перед КНС': false,
        'Колодец с запорной арматурой после КНС': false,
    })

    // Загружаем тему один раз при монтировании
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        setDarkMode(savedTheme === 'dark')
        setIsMounted(true)
    }, [])

    // Применяем тему при изменении darkMode
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
        if (darkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    }, [darkMode])

    // Загружаем данные заявки для редактирования
    useEffect(() => {
        if (isEditMode && requestId) {
            const existingRequest = getRequestById(requestId)
            if (existingRequest) {
                setFormData({
                    objectName: existingRequest.objectName || '',
                    govCustomerName: existingRequest.govCustomerName || '',
                    configType: existingRequest.configType || 'КНС',
                    contactPerson: existingRequest.contactPerson || user?.fullName || '',
                    contactPhone: existingRequest.contactPhone || user?.phone || '',
                    contactEmail: existingRequest.contactEmail || user?.email || '',
                })

                if (existingRequest.kns) {
                    setKnsData(existingRequest.kns)
                }

                if (existingRequest.knsExtras) {
                    setKnsExtras(existingRequest.knsExtras)
                }
            }
        }
    }, [isEditMode, requestId])

    const validateStep1 = () => {
        if (!formData.objectName.trim()) {
            setError('Укажите название объекта')
            return false
        }
        if (!formData.govCustomerName.trim()) {
            setError('Укажите наименование гос. заказчика')
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (formData.configType === 'КНС') {
            if (!knsData.capacity.trim()) {
                setError('Укажите производительность')
                return false
            }
            if (!knsData.head.trim()) {
                setError('Укажите требуемый напор')
                return false
            }
        }
        return true
    }

    const handleNext = () => {
        setError('')
        if (activeStep === 1 && validateStep1()) {
            setActiveStep(2)
        } else if (activeStep === 2 && validateStep2()) {
            setActiveStep(3)
        }
    }

    const handleBack = () => {
        setError('')
        setActiveStep(prev => prev - 1)
    }

    const handleSubmit = () => {
        setError('')
        setIsSubmitting(true)

        // Собираем все данные для сохранения
        const requestData = {
            // Основная информация
            objectName: formData.objectName,
            govCustomerName: formData.govCustomerName,
            configType: formData.configType,
            contactPerson: formData.contactPerson,
            contactPhone: formData.contactPhone,
            contactEmail: formData.contactEmail,

            // Данные КНС (только если выбран тип КНС)
            kns: formData.configType === 'КНС' ? {
                // Основные параметры
                capacity: knsData.capacity,
                head: knsData.head,
                workingPumps: knsData.workingPumps,
                reservePumps: knsData.reservePumps,
                stockPumps: knsData.stockPumps,
                medium: knsData.medium,
                temperature: knsData.temperature,
                explosionProof: knsData.explosionProof,

                // Параметры трубопроводов
                inletDepth: knsData.inletDepth,
                inletDiameter: knsData.inletDiameter,
                inletMaterial: knsData.inletMaterial,
                inletDirection: knsData.inletDirection,

                outletDepth: knsData.outletDepth,
                outletDiameter: knsData.outletDiameter,
                outletMaterial: knsData.outletMaterial,
                outletDirection: knsData.outletDirection,
                outletCount: knsData.outletCount,

                // Параметры станции
                stationDiameter: knsData.stationDiameter,
                stationHeight: knsData.stationHeight,
                insulation: knsData.insulation,

                // Электрические параметры
                motorStartMethod: knsData.motorStartMethod,
                powerInputs: knsData.powerInputs,
                cabinetLocation: knsData.cabinetLocation,

                // Дополнительные элементы конструктора схемы
                element1Name: knsData.element1Name,
                element1Value: knsData.element1Value,
                element2Param: knsData.element2Param,
            } : null,

            // Дополнительная комплектация
            knsExtras: formData.configType === 'КНС' ? knsExtras : null,
        }

        // Имитация отправки на сервер
        setTimeout(() => {
            try {
                if (isEditMode) {
                    // Обновление существующей заявки
                    const updated = updateRequest(requestId, requestData)

                    if (updated) {
                        // Перенаправляем на страницу просмотра заявки с сообщением об успехе
                        navigate(`/customer/request/${requestId}`, {
                            state: {
                                message: 'Заявка успешно обновлена',
                                type: 'success'
                            }
                        })
                    } else {
                        setError('Не удалось обновить заявку')
                        setIsSubmitting(false)
                    }
                } else {
                    // Создание новой заявки
                    const id = `REQ-${Date.now().toString(36).toUpperCase()}`
                    const newRequest = createRequest({
                        id,
                        createdAt: new Date().toISOString(),
                        customerEmail: user.email,
                        customerFullName: user.fullName,
                        ...requestData
                    })

                    if (newRequest) {
                        navigate('/customer', {
                            state: {
                                message: 'Заявка успешно создана',
                                type: 'success'
                            }
                        })
                    } else {
                        setError('Не удалось создать заявку')
                        setIsSubmitting(false)
                    }
                }
            } catch (err) {
                console.error('Ошибка при сохранении заявки:', err)
                setError(isEditMode ? 'Ошибка при обновлении заявки' : 'Ошибка при создании заявки')
                setIsSubmitting(false)
            }
        }, 800)
    }

    const getStepStatus = (step) => {
        if (step < activeStep) return 'completed'
        if (step === activeStep) return 'active'
        return 'pending'
    }

    const motorStartOptions = [
        { value: 'direct', label: 'Прямой пуск' },
        { value: 'soft', label: 'Плавный пуск (свыше 45 кВт)' },
        { value: 'frequency', label: 'Частотное регулирование' }
    ]

    if (!user) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorCard}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h2>Сессия не найдена</h2>
                    <p>Пожалуйста, войдите в систему для продолжения.</p>
                    <button onClick={() => navigate('/login')} className={styles.primaryButton}>
                        Перейти к входу
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
            <Sidebar
                user={user}
                onLogout={() => navigate('/login')}
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
            />

            <main className={styles.main}>
                {/* Шапка страницы */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            {isEditMode ? 'Редактирование заявки' : 'Создание заявки'}
                        </h1>
                        <div className={styles.breadcrumbs}>
                            <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
                            <span className={styles.separator}>/</span>
                            <span className={styles.breadcrumb} onClick={() => navigate('/customer')}>Заявки</span>
                            <span className={styles.separator}>/</span>
                            <span className={styles.current}>
                                {isEditMode ? `Редактирование ${requestId}` : 'Новая заявка'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Карточка создания заявки */}
                <div className={styles.createCard}>
                    {/* Шаги создания */}
                    <div className={styles.steps}>
                        {[
                            { label: "Основная информация", desc: "Объект, заказчик, контакты" },
                            { label: "Технические параметры", desc: "Конфигурация оборудования" },
                            { label: "Проверка и отправка", desc: "Финальные данные" },
                        ].map((item, key) => (
                            <div className={`${styles.step} ${styles[getStepStatus(key + 1)]}`}>
                                <div className={styles.stepNumber}>{key + 1}</div>
                                <div className={styles.stepInfo}>
                                    <span className={styles.stepLabel}>{item.label}</span>
                                    <span className={styles.stepDesc}>{item.desc}</span>
                                </div>
                                {getStepStatus(key + 1) === 'completed' && (
                                    <svg className={styles.stepIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" fill="#10B981" />
                                        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>

                    {error && <ErrorBox />}



                    {activeStep === 1 && <InformationStep />}
                    {/* {activeStep === 2 && <TechnicalParametersStep />} */}
                    {/* {activeStep === 3 && <CheckingSendingStep />} */}


                    {/* Кнопки навигации */}
                    <div className={styles.formActions}>
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
                                onClick={handleSubmit}
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
                    </div>
                </div>
            </main>
        </div>
    )
}