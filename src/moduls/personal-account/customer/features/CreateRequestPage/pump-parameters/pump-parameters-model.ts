import { getPumpTypes } from "@/entities/pumps/api"
import { InstalationType, LiquidsIntakeType, LiquidType, PipesConditions, PumpManagement, submersibleTypesId } from "@/entities/pumps/config"
import { IPumpsForm, IPumpType } from "@/entities/pumps/type"
import { ErrorModelClass } from "@/shared/libs/error-model"
import { getObjectNumberList } from "@/utils/get-object-keys-list"
import { makeAutoObservable } from "mobx"

class PumpParametersModel {


    configTypes: IPumpType[] = []
    controlTypeVlue: PumpManagement | null = null
    instalationTypeCurrentList: string[] = []

    model: IPumpsForm = {
        pumpedLiquidType: '',
        pumpEfficiency: "",
        workPumpsCount: "",
        reservePumpsCount: "",
        liquidTemperature: "",
        mineralParticlesSize: "",
        mineralParticlesConcentration: "",
        bigParticleExistance: false,
        specificWastes: "",
        liquidDensity: "",
        pumpTypeId: "",
        heightOrDepth: "",
        instalationType: "",
        requiredPressure: "",
        requiredOutPressure: "",
        pressureLoses: "",
        networkLength: "",
        pipesConditions: '',
        pumpDiameter: "",
        geodesicalMarks: "",
        intakeType: '',
        explosionProtection: false,
        controlType: "",
        powerCurrentType: "",
        workPower: "",
        frequencyConverter: false,
        powerCableLength: "",
        liftingTransportEquipment: false,
        flushValve: false,
        otherLevelMeters: false,
        otherRequirements: "",
    }

    file: File | null = null
    fileUrl: string = ""
    errorModel: any = new ErrorModelClass<IPumpsForm & { fileUrl: string }>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFile(file: File | null, url: string) {
        this.file = file;
        this.fileUrl = url
    }

    setControlTypeVlue(value: PumpManagement, title: string) {
        this.controlTypeVlue = value
        if (value != PumpManagement.Other) {
            this.model.controlType = title
        } else {
            this.model.controlType = ""
        }
    }

    clearForm() {
        this.file = null
        this.fileUrl = ""

        this.errorModel.clearErrors()

        this.model = {
            pumpedLiquidType: '',
            pumpEfficiency: "",
            workPumpsCount: "",
            reservePumpsCount: "",
            liquidTemperature: "",
            mineralParticlesSize: "",
            mineralParticlesConcentration: "",
            bigParticleExistance: false,
            specificWastes: "",
            liquidDensity: "",
            pumpTypeId: "",
            heightOrDepth: "",
            instalationType: "",
            requiredPressure: "",
            requiredOutPressure: "",
            pressureLoses: "",
            networkLength: "",
            pipesConditions: '',
            pumpDiameter: "",
            geodesicalMarks: "",
            intakeType: '',
            explosionProtection: false,
            controlType: "",
            powerCurrentType: "",
            workPower: "",
            frequencyConverter: false,
            powerCableLength: "",
            liftingTransportEquipment: false,
            flushValve: false,
            otherLevelMeters: false,
            otherRequirements: "",

        }
    }

    validateForm() {
        this.errorModel.clearErrors()

        if (!this.model.pumpEfficiency?.trim()) {
            this.errorModel.setError("pumpEfficiency", "Укажите производительность");
        }

        if (!this.model.instalationType) {
            this.errorModel.setError("instalationType", "Выберите тип установки");
        }

        if (!this.model.pumpTypeId?.trim()) {
            this.errorModel.setError("pumpTypeId", "Выберите тип насоса");
        }

        if (!this.fileUrl?.trim()) {
            this.errorModel.setError("fileUrl", "Добавьте схему");
        }

        // if (!this.model.pumpedLiquidType) {
        //     this.errorModel.setError("pumpedLiquidType", "Выберите тип перекачиваемой жидкости");
        // }
        // if (this.model.pumpEfficiency && (this.model.pumpEfficiency < 0 || this.model.pumpEfficiency > 100)) {
        //     this.errorModel.setError("pumpEfficiency", "КПД насоса должен быть от 0 до 100");
        // }
        // if (!this.model.liquidTemperature && this.model.liquidTemperature !== 0) {
        //     this.errorModel.setError("liquidTemperature", "Укажите температуру жидкости");
        // }
        // if (!this.model.mineralParticlesSize && this.model.mineralParticlesSize !== 0) {
        //     this.errorModel.setError("mineralParticlesSize", "Укажите размер минеральных частиц");
        // }
        // if (!this.model.mineralParticlesConcentration && this.model.mineralParticlesConcentration !== 0) {
        //     this.errorModel.setError("mineralParticlesConcentration", "Укажите концентрацию минеральных частиц");
        // }
        // if (!this.model.bigParticleExistance && this.model.bigParticleExistance !== false) {
        //     this.errorModel.setError("bigParticleExistance", "Укажите наличие крупных частиц");
        // }
        // if (!this.model.specificWastes?.trim()) {
        //     this.errorModel.setError("specificWastes", "Укажите специфические отходы");
        // }
        // if (!this.model.liquidDensity && this.model.liquidDensity !== 0) {
        //     this.errorModel.setError("liquidDensity", "Укажите плотность жидкости");
        // }
        // if (!this.model.requiredPressure && this.model.requiredPressure !== 0) {
        //     this.errorModel.setError("requiredPressure", "Укажите требуемое давление");
        // }
        // if (!this.model.requiredOutPressure && this.model.requiredOutPressure !== 0) {
        //     this.errorModel.setError("requiredOutPressure", "Укажите требуемое выходное давление");
        // }
        // if (!this.model.pressureLoses && this.model.pressureLoses !== 0) {
        //     this.errorModel.setError("pressureLoses", "Укажите потери давления");
        // }
        // if (!this.model.networkLength && this.model.networkLength !== 0) {
        //     this.errorModel.setError("networkLength", "Укажите длину сети");
        // }
        // if (!this.model.pipesConditions) {
        //     this.errorModel.setError("pipesConditions", "Выберите состояние труб");
        // }
        // if (!this.model.pumpDiameter && this.model.pumpDiameter !== 0) {
        //     this.errorModel.setError("pumpDiameter", "Укажите диаметр насоса");
        // }
        // if (!this.model.geodesicalMarks?.trim()) {
        //     this.errorModel.setError("geodesicalMarks", "Укажите геодезические отметки");
        // }
        // if (!this.model.explosionProtection && this.model.explosionProtection !== false) {
        //     this.errorModel.setError("explosionProtection", "Укажите взрывозащиту");
        // }
        // if (!this.model.controlType?.trim()) {
        //     this.errorModel.setError("controlType", "Выберите тип управления");
        // }
        // if (!this.model.powerCurrentType?.trim()) {
        //     this.errorModel.setError("powerCurrentType", "Выберите тип тока питания");
        // }
        // if (!this.model.workPower && this.model.workPower !== 0) {
        //     this.errorModel.setError("workPower", "Укажите рабочую мощность");
        // }
        // if (!this.model.frequencyConverter && this.model.frequencyConverter !== false) {
        //     this.errorModel.setError("frequencyConverter", "Укажите наличие частотного преобразователя");
        // }
        // if (!this.model.powerCableLength && this.model.powerCableLength !== 0) {
        //     this.errorModel.setError("powerCableLength", "Укажите длину силового кабеля");
        // }
        // if (!this.model.liftingTransportEquipment && this.model.liftingTransportEquipment !== false) {
        //     this.errorModel.setError("liftingTransportEquipment", "Укажите наличие грузоподъемного оборудования");
        // }
        // if (!this.model.flushValve && this.model.flushValve !== false) {
        //     this.errorModel.setError("flushValve", "Укажите наличие промывочного клапана");
        // }
        // if (!this.model.otherLevelMeters && this.model.otherLevelMeters !== false) {
        //     this.errorModel.setError("otherLevelMeters", "Укажите наличие других уровнемеров");
        // }
        // if (!this.model.otherRequirements?.trim()) {
        //     this.errorModel.setError("otherRequirements", "Укажите другие требования");
        // }
        // if (!this.model.heightOrDepth && this.model.heightOrDepth !== 0) {
        //     this.errorModel.setError("heightOrDepth", "Укажите высоту/глубину");
        // }



        return Object.keys(this.errorModel.errors).length === 0
    }

    setModelData<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        this.model[name] = value;


        if (name == "pumpTypeId") {

            this.model.pumpTypeName = this.configTypes.find(item => item.id === this.model.pumpTypeId)?.typeName

            if (value != this.model.pumpTypeId) {
                this.model.instalationType = ""
            }

            if (value == submersibleTypesId) {
                this.instalationTypeCurrentList = [InstalationType.HalfStable.toString(), InstalationType.Portable.toString()]
            } else {
                this.instalationTypeCurrentList = [InstalationType.Horizontal.toString(), InstalationType.Vertical.toString()]
            }
        }
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
