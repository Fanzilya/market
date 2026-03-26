import { equipmentsApi } from "@/entities/request/api"
import { PerfomanceMeasureUnit } from "@/entities/request/config"
import { KnsData } from "@/entities/request/type"
import { EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska"
import { makeAutoObservable } from "mobx"

class RequestTechnicalParametersModel {

    error: string = ('')

    knsData: KnsData = {
        // Основные параметры
        capacity: '',
        units: PerfomanceMeasureUnit.LiterSecond,
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

    elements: EquipmentDataCheckbox[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setKnsData<K extends keyof typeof this.knsData>(name: K, value: typeof this.knsData[K]) {
        this.knsData[name] = value;
    }

    setElementChecked(id: number, checked: boolean) {
        // ruleSchemeObjectModel.checkForDisable(this.elements, id, checked)
        this.elements = this.elements.map(element => {
            if (element.id === id) return { ...element, checked }
            return element
        })
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


    get activeElements() {
        return this.elements.filter(element => element.checked)
    }



    clear() {
        this.knsData = {
            capacity: '',
            units: PerfomanceMeasureUnit.LiterSecond,
            head: '',
            workingPumps: '',
            reservePumps: '',
            stockPumps: '',
            medium: '',
            temperature: '',
            explosionProof: false,

            inletDepth: '',
            inletDiameter: '',
            inletMaterial: '',
            inletDirection: '',

            outletDepth: '',
            outletDiameter: '',
            outletMaterial: '',
            outletDirection: '',
            outletCount: '',

            stationDiameter: '',
            stationHeight: '',
            insulation: '',

            motorStartMethod: '',
            powerInputs: '',
            cabinetLocation: '',

            element1Name: '',
            element1Value: '',
            element2Param: '',
        }

        this.elements.forEach(element => {
            element.checked = false
        });

    }

    async initData() {

        try {
            const res = await equipmentsApi()
            let resData: any = [];

            res.data.forEach(element => {
                resData.push({
                    ...element,
                    checked: false,
                })
            });
            this.elements = resData

            console.log(resData)

        } catch (error) {
            console.log(error)
        }
    }
}

export const requestTechnicalParametersModel = new RequestTechnicalParametersModel()
