import { makeAutoObservable, runInAction } from "mobx";
import { savedData } from "./data";
import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config";
import { EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska";
import { ruleSchemeObjectModel } from "./rule-scheme-object-model";

class RequestModel {

    activeStep: number = 1;
    isSubmitting: boolean = false
    error: string = ('')
    formData = {
        objectName: '',
        govCustomerName: '',
        configType: 'КНС',
        contactPerson: '',
        contactPhone: '',
        contactEmail: '',
    }

    knsData = {
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
    }

    elements: EquipmentDataCheckbox[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
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

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {
        runInAction(() => {
            this.formData[name] = value;
        });
    }

    setKnsData<K extends keyof typeof this.knsData>(name: K, value: typeof this.knsData[K]) {
        this.knsData[name] = value;
    }

    validateStep1() {
        if (!this.formData.objectName.trim()) {
            this.setError('Укажите название объекта')
            return false
        }
        if (!this.formData.govCustomerName.trim()) {
            this.setError('Укажите наименование гос. заказчика')
            return false
        }
        return true
    }

    validateStep2() {
        if (this.formData.configType === 'КНС') {
            if (!this.knsData.capacity.trim()) {
                this.setError('Укажите производительность')
                return false
            }
            if (!this.knsData.head.trim()) {
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

    initData() {
        savedData()
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY_SCHEME_SETTINGS) || "")

        data.forEach(element => {
            this.elements.push({
                ...element,
                checked: element.isActive,
                disabled: false,
            })
        });
    }

    get activeElements() {
        return this.elements.filter(element => element.checked)
    }

    setElementChecked(id: number, checked: boolean) {

        ruleSchemeObjectModel.checkForDisable(this.elements, id, checked)

        this.elements = this.elements.map(element => {
            if (element.id === id) {
                return {
                    ...element,
                    checked
                }
            }
            return element
        })
    }
}

export const requestModel = new RequestModel()