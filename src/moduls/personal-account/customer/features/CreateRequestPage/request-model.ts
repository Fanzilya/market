import { makeAutoObservable, runInAction } from "mobx";
import { savedData } from "./data";
import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config";
import { checkBox, EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska";
import { ruleSchemeObjectModel } from "./rule-scheme-object-model";
import { BaseInfo, KnsData } from "@/entities/request/type";
import { REQUESTS_KEY } from "@/entities/request/config";
import { requestRevision, updateRequest } from "@/shared/data/requests";
import { createRequestApi, equipmentsApi } from "@/entities/request/api";
import { User } from "@/entities/user/type";

class RequestModel {

    activeStep: number = 1;
    isSubmitting: boolean = false
    error: string = ('')

    model: { formData: BaseInfo, knsData: KnsData, } = {
        formData: {
            objectName: '',
            govCustomerName: '',
            locationRegion: '',
            configType: "019cdcd9-1892-7f3a-955c-3503ede15a6d",
            contactPerson: '',
            contactPhone: '',
            contactEmail: '',
            projectOrganizationName: '',
        },

        knsData: {
            // Основные параметры
            capacity: '',
            head: '',
            workingPumps: '',
            reservePumps: '',
            stockPumps: '',
            medium: '',
            temperature: '',
            explosionProof: false,

            // Параметры трубопроводов
            inletDepth: '',
            inletDiameter: '',
            inletMaterial: '',
            inletDirection: '',

            outletDepth: '',
            outletDiameter: '',
            outletMaterial: '',
            outletDirection: '',
            outletCount: '',

            // Параметры станции
            stationDiameter: '',
            stationHeight: '',
            insulation: '',

            // Электрические параметры
            motorStartMethod: '',
            powerInputs: '',
            cabinetLocation: '',

            // Дополнительные элементы конструктора схемы
            element1Name: '',
            element1Value: '',
            element2Param: '',
        }
    }

    elements: EquipmentDataCheckbox[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get formData() {
        return this.model.formData
    }
    get knsData() {
        return this.model.knsData
    }

    setActiveStep(value: number) {
        this.activeStep = value;
    }

    setIsSubmitting(value: boolean) {
        this.isSubmitting = value;
    }

    setError(value: string) {
        this.error = value;
    }

    setFormData<K extends keyof typeof this.model.formData>(name: K, value: typeof this.model.formData[K]) {
        runInAction(() => {
            this.model.formData[name] = value;
        });
    }

    setKnsData<K extends keyof typeof this.model.knsData>(name: K, value: typeof this.model.knsData[K]) {
        this.model.knsData[name] = value;
    }

    validateStep1() {
        if (!this.model.formData.objectName.trim()) {
            this.setError('Укажите название объекта')
            return false
        }
        if (!this.model.formData.govCustomerName.trim()) {
            this.setError('Укажите наименование гос. заказчика')
            return false
        }
        return true
    }

    validateStep2() {
        if (this.model.formData.configType === 'КНС') {
            if (!this.model.knsData.capacity.trim()) {
                this.setError('Укажите производительность')
                return false
            }
            if (!this.model.knsData.head.trim()) {
                this.setError('Укажите требуемый напор')
                return false
            }
        }
        return true
    }

    handleNext() {
        this.setError('')
        if (this.activeStep === 1 && this.validateStep1()) {
            this.setActiveStep(2)
        } else if (this.activeStep === 2 && this.validateStep2()) {
            this.setActiveStep(3)
        }
    }

    handleBack() {
        this.setError('')
        this.setActiveStep(prev => prev - 1)
    }

    isInit: boolean = false

    async initData() {
        if (this.isInit) return
        this.isInit = true
        const res = await equipmentsApi()

        let resData: any = [];

        res.data.forEach(element => {
            resData.push({
                ...element,
                checked: false,
            })
        });

        this.elements = resData
    }

    get activeElements() {
        return this.elements.filter(element => element.checked)
    }

    setElementChecked(id: number, checked: boolean) {

        // ruleSchemeObjectModel.checkForDisable(this.elements, id, checked)


        this.elements = this.elements.map(element => {
            if (element.id === id) {
                return {
                    ...element,
                    checked
                }
            }
            return element
        })

        console.log(this.elements)
    }

    preparationData() {
        this.error = ''
        this.isSubmitting = true

        const ids = this.elements
            .filter(item => item.checked)
            .map(item => item.id?.toString())
            .filter(Boolean);

        return ids.length > 0 ? ids : []
    }

    async create(navigate: any, user: User) {

        if (!user) return

        try {
            const activeCheckElems: string[] = this.preparationData()

            const res = await createRequestApi({
                nameByProjectDocs: this.model.formData.objectName,
                objectName: this.model.formData.objectName,
                locationRegion: this.model.formData.locationRegion,
                customerName: this.model.formData.govCustomerName,
                contactName: this.model.formData.contactPerson,
                phoneNumber: this.model.formData.contactPhone,
                userId: user.id?.toString() || "",
                configTypeId: this.model.formData.configType,

                // Данные из knsData
                perfomance: Number(this.model.knsData.capacity),
                units: Number(this.model.knsData.medium),  // medium вместо units
                requiredPumpPressure: Number(this.model.knsData.head),
                activePumpsCount: Number(this.model.knsData.workingPumps),
                reservePumpsCount: Number(this.model.knsData.reservePumps),
                pumpsToWarehouseCount: Number(this.model.knsData.stockPumps),
                pType: Number(this.model.knsData.medium),  // тоже medium (тип среды)
                environmentTemperature: Number(this.model.knsData.temperature),
                explosionProtection: this.model.knsData.explosionProof,

                // Параметры входящего трубопровода
                supplyPipelineDepth: Number(this.model.knsData.inletDepth),
                supplyPipelineDiameter: Number(this.model.knsData.inletDiameter),
                supplyPipelineMaterial: Number(this.model.knsData.inletMaterial),
                supplyPipelineDirectionInHours: Number(this.model.knsData.inletDirection),

                // Параметры напорного трубопровода
                pressurePipelineDepth: Number(this.model.knsData.outletDepth),
                pressurePipelineDiameter: Number(this.model.knsData.outletDiameter),
                pressurePipelineMaterial: Number(this.model.knsData.outletMaterial),
                pressurePipelineDirectionInHours: Number(this.model.knsData.outletDirection),
                hasManyExitPressurePipelines: !!this.model.knsData.outletCount,

                // Параметры станции
                expectedDiameterOfPumpStation: Number(this.model.knsData.stationDiameter),
                expectedHeightOfPumpStation: Number(this.model.knsData.stationHeight),
                insulatedHousingDepth: Number(this.model.knsData.insulation),

                // Электрические параметры
                startupMethod: Number(this.model.knsData.motorStartMethod),
                powerContactsToController: Number(this.model.knsData.powerInputs),
                place: Number(this.model.knsData.cabinetLocation),

                // Дополнительные элементы (если нужны)
                equipmentGuidList: activeCheckElems, // или другое поле
            })

            console.log(res)


            navigate('/customer/request', {
                state: {
                    message: 'Заявка успешно создана',
                    type: 'success'
                }
            })
        } catch (err) {
            console.error('Ошибка при сохранении заявки:', err)
            this.error = ('Ошибка при создании заявки')
            this.isSubmitting = (false)
        }
    }

    async update(navigate: any, requestId: null | number | string) {
        try {
            this.preparationData()

            const data = {
                formData: { ...this.model.formData },
                knsData: { ...this.model.knsData, equipment: this.elements }
            }

            const updated = updateRequest(requestId, data)

            navigate(`/customer/request/${requestId}`, {
                state: {
                    message: 'Заявка успешно обновлена',
                    type: 'success'
                }
            })

        } catch (err) {
            console.error('Ошибка при сохранении заявки:', err)
            this.error = ('Ошибка при обновлении заявки')
            this.isSubmitting = (false)
        }
    }
}

export const requestModel = new RequestModel()