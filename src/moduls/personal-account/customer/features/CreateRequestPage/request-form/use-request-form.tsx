import { createPumpApi } from "@/entities/pumps/api"
import { IPumpsForm } from "@/entities/pumps/type"
import { createRequestApi } from "@/entities/request/api"
import { configTypeKeys } from "@/entities/request/config"
import { BaseInfo, KnsData } from "@/entities/request/type"
import { useAuth } from "@/features/user/context/context"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export function useRequestForm(requestId: string | undefined) {
    const isEditMode = !!requestId
    const { user } = useAuth()
    const navigate = useNavigate()
    const [fullClear, setFullClear] = useState<boolean>(true)
    const [activeStep, setActiveStep] = useState(1)
    const [configTypeId, setConfigTypeId] = useState<string>()

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

    const handleSubmit = async ({ basicData, configParametrsData, fileData }: { basicData: BaseInfo, configParametrsData: KnsData | IPumpsForm, fileData: File }) => {

        if (!user) return
        console.log(fileData)
        let resultId: string | boolean = false;
        if (configTypeId == configTypeKeys.pupm) {
            resultId = await createPump(basicData, configParametrsData)
        } else {
            resultId = await createKns(basicData, configParametrsData)
        }

        if (resultId) {
            const fileRes = await fileUpload(resultId, fileData)
            if (fileRes) {
                toast.success("Заявка успешно создалась")

                navigate('/customer/request')
            }
        }
    }


    const createPump = async (basicData: BaseInfo, configParametrsData: IPumpsForm) => {
        try {
            const res = await createPumpApi({
                objectName: basicData.objectName,
                customerName: basicData.govCustomerName,
                regionId: basicData.regionId,
                configTypeId: basicData.configType,
                contactName: basicData.govCustomerName,
                phoneNumber: basicData.contactPhone,
                projectOrganizationName: basicData.projectOrganizationName,
                nameByProjectDocs: basicData.objectName,
                userId: user?.id,

                pumpedLiquidType: Number(configParametrsData.pumpedLiquidType) || 0,
                pumpEfficiency: Number(configParametrsData.pumpEfficiency) || 0,
                workPumpsCount: Number(configParametrsData.workPumpsCount) || 0,
                reservePumpsCount: Number(configParametrsData.reservePumpsCount) || 0,
                liquidTemperature: Number(configParametrsData.liquidTemperature) || 0,
                mineralParticlesSize: Number(configParametrsData.mineralParticlesSize) || 0,
                mineralParticlesConcentration: configParametrsData.mineralParticlesConcentration || 0,
                bigParticleExistance: configParametrsData.bigParticleExistance,
                specificWastes: configParametrsData.specificWastes,
                liquidDensity: Number(configParametrsData.liquidDensity) || 0,
                pumpTypeId: configParametrsData.pumpTypeId,
                heightOrDepth: Number(configParametrsData.heightOrDepth) || 0,
                instalationType: Number(configParametrsData.instalationType) || 0,
                requiredPressure: Number(configParametrsData.requiredPressure) || 0,
                requiredOutPressure: Number(configParametrsData.requiredOutPressure) || 0,
                pressureLoses: Number(configParametrsData.pressureLoses) || 0,
                networkLength: Number(configParametrsData.networkLength) || 0,
                pipesConditions: Number(configParametrsData.pipesConditions) || 0,
                pumpDiameter: Number(configParametrsData.pumpDiameter) || 0,
                geodesicalMarks: configParametrsData.geodesicalMarks,
                intakeType: Number(configParametrsData.intakeType) || 0,
                explosionProtection: configParametrsData.explosionProtection,
                controlType: configParametrsData.controlType,
                powerCurrentType: configParametrsData.powerCurrentType,
                workPower: Number(configParametrsData.workPower) || 0,
                frequencyConverter: configParametrsData.frequencyConverter,
                powerCableLength: Number(configParametrsData.powerCableLength) || 0,
                liftingTransportEquipment: configParametrsData.liftingTransportEquipment,
                flushValve: configParametrsData.flushValve,
                otherLevelMeters: configParametrsData.otherLevelMeters,
                otherRequirements: configParametrsData.otherRequirements,
            })

            return res.data

        } catch (error) {
            console.log(error)
            toast.error("Ошибка при создании")
            return false
        }
    }

    const createKns = async (basicData: BaseInfo, configParametrsData: KnsData) => {
        try {
            const res = await createRequestApi({
                nameByProjectDocs: basicData.objectName,
                objectName: basicData.objectName,
                locationRegion: basicData.regionId,
                customerName: basicData.govCustomerName,
                contactName: basicData.contactPerson,
                phoneNumber: basicData.contactPhone,
                userId: user.id,
                configTypeId: basicData.configType,
                projectOrganizationName: basicData.projectOrganizationName,

                // Данные из knsData
                perfomance: Number(configParametrsData.perfomance) || 0,
                units: Number(configParametrsData.units) || 0,  // medium вместо units
                requiredPumpPressure: Number(configParametrsData.head) || 0,
                activePumpsCount: Number(configParametrsData.workingPumps) || 0,
                reservePumpsCount: Number(configParametrsData.reservePumps) || 0,
                pumpsToWarehouseCount: Number(configParametrsData.stockPumps) || 0,
                pType: Number(configParametrsData.medium) || 0,  // тоже medium (тип среды)
                environmentTemperature: Number(configParametrsData.temperature) || 0,
                explosionProtection: configParametrsData.explosionProof,

                // Параметры входящего трубопровода
                supplyPipelineDepth: Number(configParametrsData.inletDepth) || 0,
                supplyPipelineDiameter: Number(configParametrsData.inletDiameter) || 0,
                supplyPipelineMaterial: Number(configParametrsData.inletMaterial) || 0,
                supplyPipelineDirectionInHours: Number(configParametrsData.inletDirection) || 0,

                // Параметры напорного трубопровода 
                pressurePipelineDepth: Number(configParametrsData.outletDepth) || 0,
                pressurePipelineDiameter: Number(configParametrsData.outletDiameter) || 0,
                pressurePipelineMaterial: Number(configParametrsData.outletMaterial) || 0,
                pressurePipelineDirectionInHours: Number(configParametrsData.outletDirection) || 0,
                hasManyExitPressurePipelines: !!configParametrsData.outletCount,

                // Параметры станции
                expectedDiameterOfPumpStation: Number(configParametrsData.stationDiameter) || 0,
                expectedHeightOfPumpStation: Number(configParametrsData.stationHeight) || 0,
                insulatedHousingDepth: Number(configParametrsData.insulation) || 0,

                // Электрические параметры
                startupMethod: Number(configParametrsData.motorStartMethod) || 0,
                powerContactsToController: Number(configParametrsData.powerInputs) || 0,
                place: Number(configParametrsData.cabinetLocation) || 0,

                // Дополнительные элементы (если нужны)
                equipmentGuidList: configParametrsData.equipmentGuidList!,
            })

            return res.data
        } catch (error) {
            console.log(error)
            toast.error("Ошибка при создании")
            return false
        }
    }


    const fileUpload = async (resultId: string, fileData: File) => {

        try {

            const formData = new FormData();
            formData.append("RequestId", resultId);
            formData.append("File", fileData);

            const response = await fetch("https://triapi.ru/market/api/Request/schemeFile/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log(result.id)
            return true
        } catch (error) {
            console.log(error)
            toast.error("Ошибка при создании")
            return false
        }


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

    return ({
        handleSubmit,
        handleNext,
        handleBack,
        activeStep,
        setActiveStep,
        getStepStatus,
        isEditMode,
        configTypeId,
        setConfigTypeId,
        fullClear,
        setFullClear
    })
}