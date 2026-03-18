export const REQUESTS_KEY = 'requests';

export enum RequestStatus {
    New,
    Moderation,
    Rejected,
    Published
}

export enum PerfomanceMeasureUnit {
    LiterSecond,
    CubicMeter
}

export enum PumpsStartupMethod {
    Direct,
    Smooth,
    FrequencyControl
}
export enum PumpEnvironment {
    Domestic,
    Storm,
    Industrial
}

export enum PipelineMaterial {
    Polyethylene,
    Polypropylene,
    Steel
}

export enum ControllerInstalationPlace {
    UHL1,
    UHL2,
    UHL3,
    UHL4
}


// Объекты с переводами
export const RequestStatusTranslations: Record<RequestStatus, string> = {
    [RequestStatus.New]: 'Новый',
    [RequestStatus.Moderation]: 'На модерации',
    [RequestStatus.Rejected]: 'Отклонён',
    [RequestStatus.Published]: 'Опубликован'
};

export const PerfomanceMeasureUnitTranslations: Record<PerfomanceMeasureUnit, string> = {
    [PerfomanceMeasureUnit.LiterSecond]: 'л.с.',
    [PerfomanceMeasureUnit.CubicMeter]: 'м³/ч'
};

export const PumpsStartupMethodTranslations: Record<PumpsStartupMethod, string> = {
    [PumpsStartupMethod.Direct]: 'Прямой пуск',
    [PumpsStartupMethod.Smooth]: 'Плавный пуск (свыше 45 кВт)',
    [PumpsStartupMethod.FrequencyControl]: 'Частотное регулирование'
};

export const PumpEnvironmentTranslations: Record<PumpEnvironment, string> = {
    [PumpEnvironment.Domestic]: 'Хоз-бытовые',
    [PumpEnvironment.Storm]: 'Ливневые',
    [PumpEnvironment.Industrial]: 'Производственные'
};

export const PipelineMaterialTranslations: Record<PipelineMaterial, string> = {
    [PipelineMaterial.Polyethylene]: 'Полиэтилен',
    [PipelineMaterial.Polypropylene]: 'Полипропилен',
    [PipelineMaterial.Steel]: 'Сталь'
};

export const ControllerInstalationPlaceTranslations: Record<ControllerInstalationPlace, string> = {
    [ControllerInstalationPlace.UHL1]: 'УХЛ1',
    [ControllerInstalationPlace.UHL2]: 'УХЛ2',
    [ControllerInstalationPlace.UHL3]: 'УХЛ3',
    [ControllerInstalationPlace.UHL4]: 'УХЛ4'
};


export const directionLabels = {
    1: '1 час (30°)',
    2: '2 часа (60°)',
    3: '3 часа (вправо)',
    4: '4 часа (120°)',
    5: '5 часов (150°)',
    6: '6 часов (вниз)',
    7: '7 часов (210°)',
    8: '8 часов (240°)',
    9: '9 часов (влево)',
    10: '10 часов (300°)',
    11: '11 часов (330°)',
    12: '12 часов (вверх)',
}



export interface IRequestStats {
    all: number,
    news: number,
    moderation: number,
    rejected: number,
    published: number,
    archived: number,
}


export const tabsButton: { name: string, value: keyof IRequestStats }[] = [
    {
        name: "Все",
        value: "all",
    },
    {
        name: "Новые",
        value: "news",
    },
    {
        name: "На модерации",
        value: "moderation",
    },
    {
        name: "Отклонено",
        value: "rejected",
    },
    {
        name: "Опубликовано",
        value: "published",
    },
    {
        name: "Архив",
        value: "archived",
    },
]

