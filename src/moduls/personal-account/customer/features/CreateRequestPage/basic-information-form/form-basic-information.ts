import { makeAutoObservable, runInAction } from "mobx";
import { savedData } from "../data/tech-data";
import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config";
import { checkBox, EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska";
import { ruleSchemeObjectModel } from "../kns-parameters-form/kns-rule-scheme-model";
import { BaseInfo, KnsData } from "@/entities/request/type";
import { PerfomanceMeasureUnit, REQUESTS_KEY } from "@/entities/request/config";
import { requestRevision, updateRequest } from "@/shared/data/requests";
import { createRequestApi, equipmentsApi } from "@/entities/request/api";
import { User } from "@/entities/user/type";

class FormBasicInformationModel {

    formData: BaseInfo = {
        objectName: '',
        govCustomerName: '',
        locationRegion: '',
        configType: "019cdcd9-1892-7f3a-955c-3503ede15a6d",
        contactPerson: '',
        contactPhone: '',
        contactEmail: '',
        projectOrganizationName: '',
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {
        runInAction(() => {
            this.formData[name] = value;
        });
    }
}

export const formBasicInformationModel = new FormBasicInformationModel()