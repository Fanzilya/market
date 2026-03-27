import { equipmentsApi } from "@/entities/request/api"
import { PerfomanceMeasureUnit } from "@/entities/request/config"
import { KnsData } from "@/entities/request/type"
import { ErrorModelClass } from "@/shared/libs/error-model"
import { EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska"
import { makeAutoObservable } from "mobx"

class KnsParametersModel {

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

    file: File | null = null
    fileUrl: string = ""
    errorModel: any = new ErrorModelClass<EquipmentDataCheckbox & { fileUrl: string }>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    clearForm() {
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

    validateForm() {
        this.errorModel.clearErrors()

        // Основные параметры
        if (!this.knsData.capacity?.trim()) {
            this.errorModel.setError("capacity", "Укажите производительность");
        }
        if (!this.knsData.head?.trim()) {
            this.errorModel.setError("head", "Укажите напор");
        }
        if (!this.knsData.workingPumps?.trim()) {
            this.errorModel.setError("workingPumps", "Укажите количество рабочих насосов");
        }
        if (!this.knsData.reservePumps?.trim()) {
            this.errorModel.setError("reservePumps", "Укажите количество резервных насосов");
        }
        if (!this.knsData.stockPumps?.trim()) {
            this.errorModel.setError("stockPumps", "Укажите количество складских насосов");
        }
        if (!this.knsData.medium.trim()) {
            this.errorModel.setError("medium", "Укажите перекачиваемую среду");
        }
        if (!this.knsData.temperature?.trim()) {
            this.errorModel.setError("temperature", "Укажите температуру");
        }

        // Параметры трубопроводов (всас)
        if (!this.knsData.inletDepth?.trim()) {
            this.errorModel.setError("inletDepth", "Укажите глубину всасывающего трубопровода");
        }
        if (!this.knsData.inletDiameter?.trim()) {
            this.errorModel.setError("inletDiameter", "Укажите диаметр всасывающего трубопровода");
        }
        if (!this.knsData.inletMaterial?.trim()) {
            this.errorModel.setError("inletMaterial", "Укажите материал всасывающего трубопровода");
        }
        if (!this.knsData.inletDirection?.trim()) {
            this.errorModel.setError("inletDirection", "Укажите направление всасывающего трубопровода");
        }

        // Параметры трубопроводов (нагнетание)
        if (!this.knsData.outletDepth?.trim()) {
            this.errorModel.setError("outletDepth", "Укажите глубину нагнетательного трубопровода");
        }
        if (!this.knsData.outletDiameter?.trim()) {
            this.errorModel.setError("outletDiameter", "Укажите диаметр нагнетательного трубопровода");
        }
        if (!this.knsData.outletMaterial?.trim()) {
            this.errorModel.setError("outletMaterial", "Укажите материал нагнетательного трубопровода");
        }
        if (!this.knsData.outletDirection?.trim()) {
            this.errorModel.setError("outletDirection", "Укажите направление нагнетательного трубопровода");
        }
        if (!this.knsData.outletCount?.trim()) {
            this.errorModel.setError("outletCount", "Укажите количество нагнетательных трубопроводов");
        }

        // Параметры станции
        if (!this.knsData.stationDiameter?.trim()) {
            this.errorModel.setError("stationDiameter", "Укажите диаметр станции");
        }
        if (!this.knsData.stationHeight?.trim()) {
            this.errorModel.setError("stationHeight", "Укажите высоту станции");
        }
        if (!this.knsData.insulation?.trim()) {
            this.errorModel.setError("insulation", "Укажите тип изоляции");
        }

        // Электрические параметры
        if (!this.knsData.motorStartMethod?.trim()) {
            this.errorModel.setError("motorStartMethod", "Укажите способ пуска электродвигателя");
        }
        if (!this.knsData.powerInputs?.trim()) {
            this.errorModel.setError("powerInputs", "Укажите количество вводов питания");
        }
        if (!this.knsData.cabinetLocation?.trim()) {
            this.errorModel.setError("cabinetLocation", "Укажите месторасположение шкафа управления");
        }

        // Дополнительные элементы
        if (!this.knsData.element1Name?.trim()) {
            this.errorModel.setError("element1Name", "Укажите наименование элемента 1");
        }
        if (!this.knsData.element1Value?.trim()) {
            this.errorModel.setError("element1Value", "Укажите значение элемента 1");
        }
        if (!this.knsData.element2Param?.trim()) {
            this.errorModel.setError("element2Param", "Укажите параметр элемента 2");
        }

        if (!this.fileUrl?.trim()) {
            this.errorModel.setError("fileUrl", "Добавьте схему");
        }

        return Object.keys(this.errorModel.errors).length === 0
    }

    setFile(file: File | null, url: string) {
        this.file = file;
        this.fileUrl = url
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
        const ids = this.elements
            .filter(item => item.checked)
            .map(item => item.id?.toString())
            .filter(Boolean);

        return ids.length > 0 ? ids : []
    }

    get activeElements() {
        return this.elements.filter(element => element.checked)
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
        } catch (error) {
            console.log(error)
        }
    }
}

export const knsParametersModel = new KnsParametersModel()
