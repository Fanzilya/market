import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config";
import { SchemeObject, SchemeObjectCheckBox } from "@/widgets/Scheme/src/data/teeska";
import { makeAutoObservable, runInAction } from "mobx";

class SchemeSettingModel {
    models: SchemeObjectCheckBox[] = [];
    idFocusObject: number | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        // Автоматически инициализируем store при создании
        this.init();
    }

    /**
     * Инициализация данных из localStorage
     */
    init() {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY_SCHEME_SETTINGS);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                runInAction(() => {
                    this.models = parsedData;
                });
                console.log('Данные успешно загружены из localStorage');
            } else {
                console.log('В localStorage нет сохраненных данных');
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных из localStorage:', error);
            // В случае ошибки устанавливаем пустой массив
            runInAction(() => {
                this.models = [];
            });
        }
    }

    /**
     * Сохранение данных в localStorage
     */
    saveToStorage() {
        try {
            const dataToSave = JSON.stringify(this.models);
            localStorage.setItem(STORAGE_KEY_SCHEME_SETTINGS, dataToSave);
            console.log('Данные успешно сохранены в localStorage');
            return true;
        } catch (error) {
            console.error('Ошибка при сохранении данных в localStorage:', error);
            return false;
        }
    }

    /**
     * Добавление новой записи
     */
    addModel(model: SchemeObject | SchemeObject[]) {
        runInAction(() => {
            this.models.push(...(Array.isArray(model) ? model : [model]));
            this.saveToStorage();
        });
    }

    /**
     * Удаление записи по индексу
     */
    removeModel(id: number) {
        const index = this.models.findIndex(m => m.id === id);

        if (index >= 0 && index < this.models.length) {
            runInAction(() => {
                this.models.splice(index, 1);
                this.saveToStorage();
            });
        }
    }

    get focusedModel() {
        return this.models.find(m => m.id === this.idFocusObject)
    }

    updateModel(id: number, updates: Partial<SchemeObject>) {
        const index = this.models.findIndex(m => m.id === id);
        if (index === -1) return;

        runInAction(() => {
            this.models[index] = {
                ...this.models[index],
                ...updates
            };
        });
    }

    /**
     * Опеределение индекса нужно модели
     */
    setIdFocus(id: number | null) {
        this.idFocusObject = id
    }
}

export const schemeSettingModel = new SchemeSettingModel();