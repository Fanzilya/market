import { InstalationType, LiquidType, PipesConditions } from "./config"

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


export interface IPumpsCreate {
    pumpedLiquidType: LiquidType, // Вид перекачиваемой жидкости
    pumpEfficiency: number, // Подача (производительность)
    // Кол-во раб 
    // Кол-во резервынй насосов
    // ---
    liquidTemperature: number, // counts
    mineralParticlesSize: number, // counts
    mineralParticlesConcentration: number, // counts
    bigParticleExistance: boolean, // counts
    specificWastes: string, // counts (Пишет вручную)
    liquidDensity: number, // counts
    // ---

    pumpTypeId: string, // Способ установки насоса (configTypes)

    // Если выбрал погружной, то 
    heightOrDepth: number, // либо глубина либо высота всасывания
    InstalationType: InstalationType // либо [] либо [] 

    // АБ
    requiredPressure: number, // требуемый напор 
    requiredOutPressure: number, // потеря напора на излив
    pressureLoses: number, // потеря напора в трубо 
    networkLength: number, // Длина сети трубы
    pipesConditions: PipesConditions, // состояние сети (enum дадут)
    pumpDiameter: number, // диаметр трубы
    geodesicalMarks: string, // геодез отметка
    // ТУТТУТУТТУТУТТУ LiquidsIntakeType
    //  7
    explosionProtection: boolean, // Взрывозащищённость

    // 8
    controlType: string, // управление

    // 9
    powerCurrentType: string, // Вид тока питания
    workPower: number, // рабочее напряжение
    frequencyConverter: boolean, // наличие преобразователя чистоты
    powerCableLength: number, // Длина силового кабеля

    // 10
    liftingTransportEquipment: boolean, // есть || нету
    flushValve: boolean, // есть || нету
    otherLevelMeters: boolean, // есть || нету
    otherRequirements: string, // Доп требования

}




























