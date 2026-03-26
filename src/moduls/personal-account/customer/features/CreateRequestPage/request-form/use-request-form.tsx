import { User } from "@/entities/user/type"
import { useState } from "react"


export function useRequestForm(requestId: string | undefined) {
    const isEditMode = !!requestId

    const [activeStep, setActiveStep] = useState(1)

    const handleNext = () => {
        if (activeStep === 1) {
            setActiveStep(2)
        } else if (activeStep === 2) {
            setActiveStep(3)
        }
    }

    const handleBack = () => {
        setActiveStep(prev => prev - 1)
    }

    const getStepStatus = (step) => {
        if (step < activeStep) return 'completed'
        if (step === activeStep) return 'active'
        return 'pending'
    }

    const handleSubmit = () => {
        if (isEditMode) {
            alert("update")
        } else {
            alert("create")
        }
    }


    const create = async (navigate: any, user: User) => {

        // if (!user) return

        // try {
        //     const activeCheckElems: string[] = this.preparationData()

        //     const res = await createRequestApi({
        //         nameByProjectDocs: this.formData.objectName,
        //         objectName: this.formData.objectName,
        //         locationRegion: this.formData.locationRegion,
        //         customerName: this.formData.govCustomerName,
        //         contactName: this.formData.contactPerson,
        //         phoneNumber: this.formData.contactPhone,
        //         userId: user.id?.toString() || "",
        //         configTypeId: this.formData.configType,
        //         projectOrganizationName: this.formData.projectOrganizationName,

        //         // Данные из knsData
        //         perfomance: Number(this.knsData.capacity),
        //         units: Number(this.knsData.units),  // medium вместо units
        //         requiredPumpPressure: Number(this.knsData.head),
        //         activePumpsCount: Number(this.knsData.workingPumps),
        //         reservePumpsCount: Number(this.knsData.reservePumps),
        //         pumpsToWarehouseCount: Number(this.knsData.stockPumps),
        //         pType: Number(this.knsData.medium),  // тоже medium (тип среды)
        //         environmentTemperature: Number(this.knsData.temperature),
        //         explosionProtection: this.knsData.explosionProof,

        //         // Параметры входящего трубопровода
        //         supplyPipelineDepth: Number(this.knsData.inletDepth),
        //         supplyPipelineDiameter: Number(this.knsData.inletDiameter),
        //         supplyPipelineMaterial: Number(this.knsData.inletMaterial),
        //         supplyPipelineDirectionInHours: Number(this.knsData.inletDirection),

        //         // Параметры напорного трубопровода
        //         pressurePipelineDepth: Number(this.knsData.outletDepth),
        //         pressurePipelineDiameter: Number(this.knsData.outletDiameter),
        //         pressurePipelineMaterial: Number(this.knsData.outletMaterial),
        //         pressurePipelineDirectionInHours: Number(this.knsData.outletDirection),
        //         hasManyExitPressurePipelines: !!this.knsData.outletCount,

        //         // Параметры станции
        //         expectedDiameterOfPumpStation: Number(this.knsData.stationDiameter),
        //         expectedHeightOfPumpStation: Number(this.knsData.stationHeight),
        //         insulatedHousingDepth: Number(this.knsData.insulation),

        //         // Электрические параметры
        //         startupMethod: Number(this.knsData.motorStartMethod),
        //         powerContactsToController: Number(this.knsData.powerInputs),
        //         place: Number(this.knsData.cabinetLocation),

        //         // Дополнительные элементы (если нужны)
        //         equipmentGuidList: activeCheckElems, // или другое поле
        //     })

        //     navigate('/customer/request', {
        //         state: {
        //             message: 'Заявка успешно создана',
        //             type: 'success'
        //         }
        //     })
        // } catch (err) {
        //     console.error('Ошибка при сохранении заявки:', err)
        //     this.error = ('Ошибка при создании заявки')
        //     this.isSubmitting = (false)
        // }
    }

    const update = async (navigate: any, requestId: null | number | string) => {
        // try {
        //     preparationData()

        //     const data = {
        //         formData: { ...formData },
        //         knsData: { ...knsData, equipment: elements }
        //     }

        //     const updated = updateRequest(requestId, data)

        //     navigate(`/customer/request/${requestId}`, {
        //         state: {
        //             message: 'Заявка успешно обновлена',
        //             type: 'success'
        //         }
        //     })

        // } catch (err) {
        //     console.error('Ошибка при сохранении заявки:', err)
        //     this.error = ('Ошибка при обновлении заявки')
        //     this.isSubmitting = (false)
        // }
    }


    // validateStep1() {
    //     if (!this.formData.objectName.trim()) {
    //         this.setError('Укажите название объекта')
    //         return false
    //     }
    //     if (!this.formData.govCustomerName.trim()) {
    //         this.setError('Укажите наименование гос. заказчика')
    //         return false
    //     }
    //     return true
    // }

    // handleNext() {
    //     this.setError('')
    //     if (this.activeStep === 1 && this.validateStep1()) {
    //         this.setActiveStep(2)
    //     }
    // }

    // handleBack() {
    //     this.setError('')
    //     this.setActiveStep(prev => prev - 1)
    // }

    return ({
        handleSubmit,
        handleNext,
        handleBack,
        activeStep,
        setActiveStep,
        getStepStatus,
        isEditMode
    })
}