import { InstalationType, LiquidsIntakeType, LiquidType, PipesConditions } from "./config"

export interface IPumpType {
    typeName: string,
    id: string
}

export interface IPumpBaseInformation {
    objectName: string,
    customerName: string, // govCustomerName
    regionId: string,
    configTypeId: string, // configType
    contactName: string, // contactPerson
    phoneNumber: string, //  phoneNumber
    projectOrganizationName: string,
    nameByProjectDocs: string, // objectName
    userId: string,
}


export interface IPumpsForm {
    pumpedLiquidType: LiquidType | string, // Вид перекачиваемой жидкости
    pumpEfficiency: string, // number // Подача (производительность)
    workPumpsCount: string, // number // Кол-во раб
    reservePumpsCount: string, // number // Кол-во резервынй насосов
    // ---
    liquidTemperature: string, // number // Температура
    mineralParticlesSize: string, // number // Крупность минеральных частиц
    mineralParticlesConcentration: string, // number // Содержание минеральных частиц
    bigParticleExistance: boolean, // Наличие в воде крупных механических и длинноволокнистых примесей
    specificWastes: string, // Если есть специафические отходы
    liquidDensity: string, // number
    // ---

    pumpTypeId: string, // Способ установки насоса (configTypes)

    // Если выбрал погружной, то 
    heightOrDepth: string, // number // либо глубина либо высота всасывания
    instalationType: InstalationType | string // либо [] либо [] 

    // АБ
    requiredPressure: string, // number // требуемый напор 
    requiredOutPressure: string, // number // потеря напора на излив
    pressureLoses: string, // number // потеря напора в трубо 
    networkLength: string, // number // Длина сети трубы
    pipesConditions: PipesConditions | string, // состояние сети (enum дадут)
    pumpDiameter: string, // number // диаметр трубы
    geodesicalMarks: string, // геодез отметка
    intakeType: LiquidsIntakeType | string,
    //  7
    explosionProtection: boolean, // Взрывозащищённость

    // 8
    controlType: string, // управление

    // 9
    powerCurrentType: string, // Вид тока питания
    workPower: string, // number // рабочее напряжение
    frequencyConverter: boolean, // наличие преобразователя чистоты
    powerCableLength: string, // number // Длина силового кабеля

    // 10
    liftingTransportEquipment: boolean, // есть || нету
    flushValve: boolean, // есть || нету
    otherLevelMeters: boolean, // есть || нету
    otherRequirements: string, // Доп требования

}

export type IPumpsCreate = IPumpBaseInformation & IPumpsForm & {
};