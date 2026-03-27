import { getPumpTypes } from "@/entities/pumps/api"
import { InstalationType, LiquidType, PipesConditions } from "@/entities/pumps/config"
import { IPumpsCreate, IPumpType } from "@/entities/pumps/type"
import { ErrorModelClass } from "@/shared/libs/error-model"
import { makeAutoObservable } from "mobx"

class PumpParametersModel {


    configTypes: IPumpType[] = []

    model: IPumpsCreate = {
        pumpedLiquidType: LiquidType.FacilityLiquids,
        pumpEfficiency: 0,
        liquidTemperature: 0,
        mineralParticlesSize: 0,
        mineralParticlesConcentration: 0,
        bigParticleExistance: false,
        specificWastes: "",
        liquidDensity: 0,
        pumpTypeId: "",
        heightOrDepth: 0,
        InstalationType: InstalationType.HalfStable,
        requiredPressure: 0,
        requiredOutPressure: 0,
        pressureLoses: 0,
        networkLength: 0,
        pipesConditions: PipesConditions.New,
        pumpDiameter: 0,
        geodesicalMarks: "",
        explosionProtection: false,
        controlType: "",
        powerCurrentType: "",
        workPower: 0,
        frequencyConverter: false,
        powerCableLength: 0,
        liftingTransportEquipment: false,
        flushValve: false,
        otherLevelMeters: false,
        otherRequirements: "",
    }

    file: File | null = null
    fileUrl: string = ""
    errorModel: any = new ErrorModelClass<IPumpsCreate & { fileUrl: string }>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFile(file: File | null, url: string) {
        this.file = file;
        this.fileUrl = url
    }

    clearForm() {

        this.errorModel.clearErrors()

        this.model = {
            pumpTypeId: "",
            pumpedLiquidType: 0,
            pumpEfficiency: 0,
            liquidTemperature: 0,
            mineralParticlesSize: 0,
            mineralParticlesConcentration: 0,
            bigParticleExistance: false,
            specificWastes: "",
            liquidDensity: 0,
            requiredPressure: 0,
            requiredOutPressure: 0,
            pressureLoses: 0,
            networkLength: 0,
            pipesConditions: 0,
            pumpDiameter: 0,
            geodesicalMarks: "",
            explosionProtection: false,
            controlType: "",
            powerCurrentType: "",
            workPower: 0,
            frequencyConverter: false,
            powerCableLength: 0,
            liftingTransportEquipment: false,
            flushValve: false,
            otherLevelMeters: false,
            otherRequirements: "",
            heightOrDepth: 0,
            instalationType: 0

        }
    }

    validateForm() {
        this.errorModel.clearErrors()

        if (!this.model.pumpTypeId?.trim()) {
            this.errorModel.setError("pumpTypeId", "Выберите тип насоса");
        }
        if (!this.model.pumpedLiquidType) {
            this.errorModel.setError("pumpedLiquidType", "Выберите тип перекачиваемой жидкости");
        }
        if (!this.model.pumpEfficiency) {
            this.errorModel.setError("pumpEfficiency", "Укажите КПД насоса");
        }
        if (this.model.pumpEfficiency && (this.model.pumpEfficiency < 0 || this.model.pumpEfficiency > 100)) {
            this.errorModel.setError("pumpEfficiency", "КПД насоса должен быть от 0 до 100");
        }
        if (!this.model.liquidTemperature && this.model.liquidTemperature !== 0) {
            this.errorModel.setError("liquidTemperature", "Укажите температуру жидкости");
        }
        if (!this.model.mineralParticlesSize && this.model.mineralParticlesSize !== 0) {
            this.errorModel.setError("mineralParticlesSize", "Укажите размер минеральных частиц");
        }
        if (!this.model.mineralParticlesConcentration && this.model.mineralParticlesConcentration !== 0) {
            this.errorModel.setError("mineralParticlesConcentration", "Укажите концентрацию минеральных частиц");
        }
        if (!this.model.bigParticleExistance && this.model.bigParticleExistance !== false) {
            this.errorModel.setError("bigParticleExistance", "Укажите наличие крупных частиц");
        }
        if (!this.model.specificWastes?.trim()) {
            this.errorModel.setError("specificWastes", "Укажите специфические отходы");
        }
        if (!this.model.liquidDensity && this.model.liquidDensity !== 0) {
            this.errorModel.setError("liquidDensity", "Укажите плотность жидкости");
        }
        if (!this.model.requiredPressure && this.model.requiredPressure !== 0) {
            this.errorModel.setError("requiredPressure", "Укажите требуемое давление");
        }
        if (!this.model.requiredOutPressure && this.model.requiredOutPressure !== 0) {
            this.errorModel.setError("requiredOutPressure", "Укажите требуемое выходное давление");
        }
        if (!this.model.pressureLoses && this.model.pressureLoses !== 0) {
            this.errorModel.setError("pressureLoses", "Укажите потери давления");
        }
        if (!this.model.networkLength && this.model.networkLength !== 0) {
            this.errorModel.setError("networkLength", "Укажите длину сети");
        }
        if (!this.model.pipesConditions) {
            this.errorModel.setError("pipesConditions", "Выберите состояние труб");
        }
        if (!this.model.pumpDiameter && this.model.pumpDiameter !== 0) {
            this.errorModel.setError("pumpDiameter", "Укажите диаметр насоса");
        }
        if (!this.model.geodesicalMarks?.trim()) {
            this.errorModel.setError("geodesicalMarks", "Укажите геодезические отметки");
        }
        if (!this.model.explosionProtection && this.model.explosionProtection !== false) {
            this.errorModel.setError("explosionProtection", "Укажите взрывозащиту");
        }
        if (!this.model.controlType?.trim()) {
            this.errorModel.setError("controlType", "Выберите тип управления");
        }
        if (!this.model.powerCurrentType?.trim()) {
            this.errorModel.setError("powerCurrentType", "Выберите тип тока питания");
        }
        if (!this.model.workPower && this.model.workPower !== 0) {
            this.errorModel.setError("workPower", "Укажите рабочую мощность");
        }
        if (!this.model.frequencyConverter && this.model.frequencyConverter !== false) {
            this.errorModel.setError("frequencyConverter", "Укажите наличие частотного преобразователя");
        }
        if (!this.model.powerCableLength && this.model.powerCableLength !== 0) {
            this.errorModel.setError("powerCableLength", "Укажите длину силового кабеля");
        }
        if (!this.model.liftingTransportEquipment && this.model.liftingTransportEquipment !== false) {
            this.errorModel.setError("liftingTransportEquipment", "Укажите наличие грузоподъемного оборудования");
        }
        if (!this.model.flushValve && this.model.flushValve !== false) {
            this.errorModel.setError("flushValve", "Укажите наличие промывочного клапана");
        }
        if (!this.model.otherLevelMeters && this.model.otherLevelMeters !== false) {
            this.errorModel.setError("otherLevelMeters", "Укажите наличие других уровнемеров");
        }
        if (!this.model.otherRequirements?.trim()) {
            this.errorModel.setError("otherRequirements", "Укажите другие требования");
        }
        if (!this.model.heightOrDepth && this.model.heightOrDepth !== 0) {
            this.errorModel.setError("heightOrDepth", "Укажите высоту/глубину");
        }
        if (!this.model.instalationType) {
            this.errorModel.setError("instalationType", "Выберите тип установки");
        }


        return Object.keys(this.errorModel.errors).length === 0
    }

    setModelData<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        this.model[name] = value;
    }

    async initData() {
        try {
            const res = await getPumpTypes()
            this.configTypes = res.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const pumpParametersModel = new PumpParametersModel()
