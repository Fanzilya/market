// тип перекачиваемой жидкости
export enum LiquidType {
    HouseholdLiquids = 1,
    FacilityLiquids,
    RainIceLiquids
}

// Поступление сточных вод
export enum LiquidsIntakeType {
    Even = 1,
    Periodic,
    Uneven
}

// способ установки
export enum InstalationType {
    HalfStable = 1,
    Portable,
    Vertical,
    Horizontal
}

// Состояние сети
export enum PipesConditions {
    New = 1,
    TenYears,
    Old
}

export enum PumpManagement {
    Manual = 1,
    RemoteСontrol,
    AutoFloatSensor,
    AutoPneumatic,
    Other,
}

export const LiquidTypeTranslations: Record<LiquidType, string> = {
    [LiquidType.HouseholdLiquids]: 'Хоз. бытовые стоки',
    [LiquidType.FacilityLiquids]: 'Промышленные стоки',
    [LiquidType.RainIceLiquids]: 'Дождевые, талые стоки',
};
export const LiquidsIntakeTypeTranslations: Record<LiquidsIntakeType, string> = {
    [LiquidsIntakeType.Even]: 'Равномерное',
    [LiquidsIntakeType.Periodic]: 'Периодическое',
    [LiquidsIntakeType.Uneven]: 'Неравномерное',
};
export const InstalationTypeTranslations: Record<InstalationType, string> = {
    [InstalationType.HalfStable]: 'Полупостоянная',
    [InstalationType.Portable]: 'Переносной',
    [InstalationType.Vertical]: 'Вертикальный',
    [InstalationType.Horizontal]: 'Горизонтальный',
};
export const PipesConditionsTranslations: Record<PipesConditions, string> = {
    [PipesConditions.New]: 'Новый',
    [PipesConditions.TenYears]: 'Срок эксплуатации 10 лет',
    [PipesConditions.Old]: 'Старые',
};

export const PumpManagementTranslations: Record<PumpManagement, string> = {
    [PumpManagement.Manual]: 'Ручное',
    [PumpManagement.RemoteСontrol]: 'Дистанционное ',
    [PumpManagement.AutoFloatSensor]: 'Автоматическое с помощью поплавкового датчика',
    [PumpManagement.AutoPneumatic]: 'Автоматическое пневматическое',
    [PumpManagement.Other]: 'Другой способ управления',
};



export const submersibleTypesId = "019d2f11-b1b0-767d-8280-b2594a149346";