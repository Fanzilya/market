import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config"
import { User } from "@/entities/user/type"
import { createRequest, updateRequest } from "@/shared/data/requests"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function CreateRequestDataModel(requestId: string | undefined, user: User) {
    const [activeStep, setActiveStep] = useState(1)
    const [error, setError] = useState('')

    // Основные поля
    const [formData, setFormData] = useState({
        objectName: '123',
        govCustomerName: '123',
        configType: 'КНС',
        contactPerson: user?.fullName || '',
        contactPhone: user?.phone || '',
        contactEmail: user?.email || '',
    })

    // Расширенные поля для КНС
    const [knsData, setKnsData] = useState({
        // Основные параметры
        capacity: '123',
        head: '123',
        workingPumps: '123',
        reservePumps: '123',
        stockPumps: '123',
        medium: 'Хоз-бытовые сточные воды',
        temperature: '123',
        explosionProof: false,

        // Параметры трубопроводов
        inletDepth: '123',
        inletDiameter: '123',
        inletMaterial: '123',
        inletDirection: '12',

        outletDepth: '123',
        outletDiameter: '123',
        outletMaterial: '123',
        outletDirection: '3',
        outletCount: '1',

        // Параметры станции
        stationDiameter: '123',
        stationHeight: '123',
        insulation: '123',

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

    const getStepStatus = (step) => {
        if (step < activeStep) return 'completed'
        if (step === activeStep) return 'active'
        return 'pending'
    }

    return ({
        activeStep,
        error,
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
        getStepStatus,
    })
}