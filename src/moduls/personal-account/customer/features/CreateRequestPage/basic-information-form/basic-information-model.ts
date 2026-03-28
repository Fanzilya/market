import { makeAutoObservable, runInAction } from "mobx";
import { BaseInfo } from "@/entities/request/type";
import { getAllRegionsApi } from "@/entities/regions/api";
import { IRegion } from "@/entities/regions/type";
import { ErrorModelClass } from "@/shared/libs/error-model";

class BasicInformationModel {

    formData: BaseInfo = {
        objectName: '',
        govCustomerName: '',
        regionId: '',
        configType: "",
        contactPerson: '',
        contactPhone: '',
        contactEmail: '',
        projectOrganizationName: '',
    }

    regionList: IRegion[] = []

    errorModel: any = new ErrorModelClass<BaseInfo>();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get errors() {
        return this.errorModel.errors
    }

    validateForm() {
        this.errorModel.clearErrors()

        if (!this.formData.objectName?.trim()) {
            this.errorModel.setError("objectName", "Укажите наименование объекта");
        } else if (this.formData.objectName.length < 3) {
            this.errorModel.setError("objectName", "Наименование объекта должно содержать минимум 3 символа");
        } else if (this.formData.objectName.length > 255) {
            this.errorModel.setError("objectName", "Наименование объекта не должно превышать 255 символов");
        }

        // 2. Наименование государственного заказчика
        if (!this.formData.govCustomerName?.trim()) {
            this.errorModel.setError("govCustomerName", "Укажите наименование государственного заказчика");
        } else if (this.formData.govCustomerName.length < 3) {
            this.errorModel.setError("govCustomerName", "Наименование заказчика должно содержать минимум 3 символа");
        }

        // 3. Регион
        if (!this.formData.regionId?.trim()) {
            this.errorModel.setError("regionId", "Выберите регион");
        }

        // 4. Тип конфигурации
        if (!this.formData.configType?.trim()) {
            this.errorModel.setError("configType", "Выберите тип конфигурации");
        }

        // 5. Контактное лицо
        if (!this.formData.contactPerson?.trim()) {
            this.errorModel.setError("contactPerson", "Укажите контактное лицо");
        } else if (this.formData.contactPerson.length < 2) {
            this.errorModel.setError("contactPerson", "ФИО контактного лица должно содержать минимум 2 символа");
        } else if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(this.formData.contactPerson)) {
            this.errorModel.setError("contactPerson", "ФИО должно содержать только буквы, пробелы и дефисы");
        }

        // 6. Контактный телефон
        if (!this.formData.contactPhone?.trim()) {
            this.errorModel.setError("contactPhone", "Укажите контактный телефон");
        } else if (!this.errorModel.isValidPhone(this.formData.contactPhone)) {
            this.errorModel.setError("contactPhone", "Укажите корректный номер телефона (например: +7 (999) 123-45-67)");
        }

        // 7. Контактный email
        // if (!this.formData.contactEmail?.trim()) {
        //     this.errorModel.setError("contactEmail", "Укажите контактный email");
        // } else if (!this.errorModel.isValidEmail(this.formData.contactEmail)) {
        //     this.errorModel.setError("contactEmail", "Укажите корректный email адрес (например: name@domain.com)");
        // }

        // 8. Наименование проектной организации
        if (!this.formData.projectOrganizationName?.trim()) {
            this.errorModel.setError("projectOrganizationName", "Укажите наименование проектной организации");
        } else if (this.formData.projectOrganizationName.length < 3) {
            this.errorModel.setError("projectOrganizationName", "Наименование организации должно содержать минимум 3 символа");
        }

        return Object.keys(this.errorModel.errors).length === 0
    }

    setFormData<K extends keyof typeof this.formData>(name: K, value: typeof this.formData[K]) {
        runInAction(() => {
            this.formData[name] = value;
        });
    }

    clearForm() {
        this.formData = {
            objectName: '',
            govCustomerName: '',
            regionId: '',
            configType: "019cdcd9-1892-7f3a-955c-3503ede15a6d",
            contactPerson: '',
            contactPhone: '',
            contactEmail: '',
            projectOrganizationName: '',
        }
    }

    async init() {
        const res = await getAllRegionsApi()
        this.regionList = res.data
    }
}

export const basicInformationModel = new BasicInformationModel()