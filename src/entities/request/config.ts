export const REQUESTS_KEY = 'requests';

export enum RequestStatus {
    New,
    Moderation,
    Rejected,
    Published
}

export enum PerfomanceMeasureUnit {
    HorsePower = 0,
    CubicMeter
}

export enum PumpsStartupMethod {
    Direct = 0,
    Smooth,
    FrequencyControl
}
export enum PumpEnvironment {
    Domestic = 0,
    Storm,
    Industrial
}

export enum PipelineMaterial {
    Polyethylene = 0,
    Polypropylene,
    Steel
}

export enum ControllerInstalationPlace {
    UHL1 = 0,
    UHL2 = 1,
    UHL3 = 2,
    UHL4 = 3
}
