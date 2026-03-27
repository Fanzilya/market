import { equipmentsApi } from "@/entities/request/api"
import { PerfomanceMeasureUnit } from "@/entities/request/config"
import { KnsData } from "@/entities/request/type"
import { EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska"
import { makeAutoObservable } from "mobx"

class PumpParametersModel {

    model = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setKnsData<K extends keyof typeof this.model>(name: K, value: typeof this.model[K]) {
        this.model[name] = value;
    }

    clear() {
        this.model = {}
    }

    async initData() {
    }
}

export const pumpParametersModel = new PumpParametersModel()
