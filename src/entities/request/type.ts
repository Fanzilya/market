import { EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska";
import { PerfomanceMeasureUnit, PipelineMaterial, PumpsStartupMethod, RequestStatus } from "./config";
import { User } from "../user/type";

export interface BaseInfo {
    objectName: string,
    govCustomerName: string,
    regionId: string,
    configType: string,
    contactPerson: string,
    contactPhone: string,
    contactEmail: string,
    projectOrganizationName: string,
}

export interface KnsData {
    // Основные параметры
    capacity: string,
    units: PerfomanceMeasureUnit,
    head: string,
    workingPumps: string,
    reservePumps: string,
    stockPumps: string,
    medium: string,
    temperature: string,
    explosionProof: boolean,

    // Параметры трубопроводов
    inletDepth: string,
    inletDiameter: string,
    inletMaterial: string,
    inletDirection: string,

    outletDepth: string,
    outletDiameter: string,
    outletMaterial: string,
    outletDirection: string,
    outletCount: string,

    // Параметры станции
    stationDiameter: string,
    stationHeight: string,
    insulation: string,

    // Электрические параметры
    motorStartMethod: string,
    powerInputs: string,
    cabinetLocation: string,

    // Дополнительные элементы конструктора схемы
    element1Name: string,
    element1Value: string,
    element2Param: string,
    elements?: EquipmentDataCheckbox
}


export interface CreateRequest {
    nameByProjectDocs: string,
    objectName: string,
    locationRegion: string,
    customerName: string,
    contactName: string,
    phoneNumber: string,
    userId: string,
    configTypeId: string,
    projectOrganizationName: string,
    perfomance: number,
    units: number,
    requiredPumpPressure: number,
    activePumpsCount: number,
    reservePumpsCount: number,
    pumpsToWarehouseCount: number,
    pType: number,
    environmentTemperature: number,
    explosionProtection: boolean,
    supplyPipelineDepth: number,
    supplyPipelineDiameter: number,
    startupMethod: number,
    supplyPipelineMaterial: number,
    supplyPipelineDirectionInHours: number,
    pressurePipelineDepth: number,
    pressurePipelineDiameter: number,
    pressurePipelineMaterial: number,
    pressurePipelineDirectionInHours: number,
    hasManyExitPressurePipelines: boolean,
    expectedDiameterOfPumpStation: number,
    expectedHeightOfPumpStation: number,
    insulatedHousingDepth: number,
    powerContactsToController: number,
    place: number,
    equipmentGuidList: string[]
}

export interface IRequest {
    nameByProjectDocs: number,
    objectName: number,
    locationRegion: number,
    customerName: string,
    contactName: number,
    phoneNumber: number,
    createdAt: Date | null,
    status: RequestStatus,
    isArchived: boolean,
    userId: string,
    // user: string,
    configTypeId: string,
    // requestConfigType: string,
    // knsConfigs: string,
    // equipRequest: string,
    // favoriteRequests: string,
    id: string
}


// FOR API 
export interface IRequestId {
    id: string
}

export interface IRequestIdFull {
    requestId: string
}

export interface IUserId {
    userId: string
}

export interface FavouritesAddIds {
    requestId: string
    userId: string
}

export interface IBiznesView {
    requestId: string
    accountId: string
}



// API ANSWER

export interface RequestRes {
    /** Название по проектной документации */
    innerId?: string;
    /** Название по проектной документации */
    nameByProjectDocs: string;
    /** Наименование объекта */
    objectName: string;
    /** Регион расположения */
    locationRegion: string;
    /** Наименование заказчика */
    customerName: string;
    /** Контактное лицо */
    contactName: string;
    /** Номер телефона */
    phoneNumber: string;
    contactEmail? string;
    /** Дата создания (в формате ISO) */
    createdAt: string; // Можно использовать Date после парсинга
    /** Статус запроса */
    status: RequestStatus | null;
    /** Флаг архивации */
    isArchived: boolean;
    /** ID пользователя */
    userId: string;
    /** Объект пользователя (может быть null) */
    user: User | null;
    /** ID типа конфигурации */
    configTypeId: string;
    /** Тип конфигурации (может быть null) */
    requestConfigType: string | null;
    /** Конфигурации КНС (может быть null) */
    knsConfigs: any; // TODO: Уточнить тип
    /** Оборудование запроса (может быть null) */
    equipRequest: any; // TODO: Уточнить тип
    /** Избранные запросы (может быть null) */
    favoriteRequests: any; // TODO: Уточнить тип
    /** Уникальный идентификатор запроса */
    id: string;
    isFavorite: string;
    supplierRequestStatus: "Viewed" | "Payed" | "New";
}

export interface CurrentRes {
    /** Производительность */
    perfomance: number;
    /** Единицы измерения (вероятно, код единицы измерения) */
    units: PerfomanceMeasureUnit;
    /** Требуемое давление насоса */
    requiredPumpPressure: number;
    /** Количество рабочих насосов */
    activePumpsCount: number;
    /** Количество резервных насосов */
    reservePumpsCount: number;
    /** Количество насосов на складе */
    pumpsToWarehouseCount: number;
    /** Способ запуска */
    startupMethod: PumpsStartupMethod;
    /** Тип насоса */
    pType: number;
    /** Температура окружающей среды */
    environmentTemperature: number;
    /** Наличие взрывозащиты */
    explosionProtection: boolean;
    /** Глубина подводящего трубопровода */
    supplyPipelineDepth: number;
    /** Диаметр подводящего трубопровода */
    supplyPipelineDiameter: number;
    /** Материал подводящего трубопровода */
    supplyPipelineMaterial: number | string;
    /** Направление подводящего трубопровода (в часах) */
    supplyPipelineDirectionInHours: number; // от 1 до 12
    /** Глубина напорного трубопровода */
    pressurePipelineDepth: number;
    /** Диаметр напорного трубопровода */
    pressurePipelineDiameter: number;
    /** Материал напорного трубопровода */
    pressurePipelineMaterial: PipelineMaterial; // TODO: Уточнить enum
    /** Направление напорного трубопровода (в часах) */
    pressurePipelineDirectionInHours: number; // от 1 до 12
    /** Наличие нескольких выходов напорных трубопроводов */
    hasManyExitPressurePipelines: boolean;
    /** Ожидаемый диаметр насосной станции */
    expectedDiameterOfPumpStation: number;
    /** Ожидаемая высота насосной станции */
    expectedHeightOfPumpStation: number;
    /** Глубина утепленного корпуса */
    insulatedHousingDepth: number;
    /** Мощность контактов контроллера */
    powerContactsToController: number;
    /** Место размещения */
    place: number;
    /** ID связанного запроса */
    requestId: string;
    /** Объект запроса (может быть null) */
    request: RequestRes | null;
    /** Уникальный идентификатор текущей конфигурации */
    id: string;
}

export interface EquipmentItem {
    /** Наименование оборудования */
    name: string;
    /** ID типа конфигурации */
    configTypeId: string;
    /** Тип (может быть null) */
    type: null; // TODO: Уточнить тип
    /** Уникальный идентификатор оборудования */
    id: string;
}

// Тип для массива оборудования
export type EquipmentCurrentRes = EquipmentItem[];

export interface ApiResponse {
    /** Информация о запросе */
    request: RequestRes | null;
    /** Текущая конфигурация */
    current: CurrentRes | null;
    /** Список оборудования */
    equipmentCurrent: EquipmentCurrentRes | null;
}