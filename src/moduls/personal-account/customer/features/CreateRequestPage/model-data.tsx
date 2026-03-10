import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config"
import { User } from "@/entities/user/type"
import { createRequest, updateRequest } from "@/shared/data/requests"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function CreateRequestDataModel(requestId: string | undefined, user: User) {

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(1)
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

    return ({
        activeStep,
        isSubmitting,
        error,
        isEditMode,
        formData,
        setFormData,
        knsData,
        setKnsData,
        knsExtras,
        setKnsExtras,
        validateStep1,
        validateStep2,
        handleNext,
        handleBack,
        handleSubmit,
        getStepStatus,
    })
}