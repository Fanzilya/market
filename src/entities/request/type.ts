import { EquipmentDataCheckbox } from "@/widgets/Scheme/src/data/teeska";
import { RequestStatus } from "./config";

export interface BaseInfo {
    objectName: string,
    govCustomerName: string,
    locationRegion: string,
    configType: string,
    contactPerson: string,
    contactPhone: string,
    contactEmail: string,
}

export interface KnsData {
    // Основные параметры
    capacity: string,
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
    customerName: 'string',
    contactName: number,
    phoneNumber: number,
    createdAt: Date,
    status: Number,
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


export interface IRequestId {
    id: string
}

export interface IUserId {
    userId: string
}