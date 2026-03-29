import { offersByRequestsApi } from '@/entities/offer/api';
import { OfferFull } from '@/entities/offer/type';
import { getPumpSingle } from '@/entities/pumps/api';
import { IPumpsForm } from '@/entities/pumps/type';
import { currentKnsApi, equipmentCurrentKnsApi, requestSingleApi, requestSupplierSingleApi } from '@/entities/request/api';
import { PerfomanceMeasureUnit } from '@/entities/request/config';
import { ApiResponse, BaseInfoFull, IRequest, KnsData } from '@/entities/request/type';
import { EquipmentDataCheckbox } from '@/widgets/Scheme/src/data/teeska';
import { makeAutoObservable } from 'mobx';


class RequestDetailModel {

    request: BaseInfoFull = {
        id: "",
        objectName: "",
        govCustomerName: "",
        regionId: "",
        configType: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        projectOrganizationName: "",
        regionName: "",
        innerId: "",
    }

    offers: OfferFull[] = []

    knsData: KnsData = {
        perfomance: '',
        units: PerfomanceMeasureUnit.LiterSecond,
        head: '',
        workingPumps: '',
        reservePumps: '',
        stockPumps: '',
        medium: '',
        temperature: '',
        explosionProof: false,

        // Параметры трубопроводов
        inletDepth: '',
        inletDiameter: '',
        inletMaterial: '',
        inletDirection: '',

        outletDepth: '',
        outletDiameter: '',
        outletMaterial: '',
        outletDirection: '',
        outletCount: '',

        // Параметры станции
        stationDiameter: '',
        stationHeight: '',
        insulation: '',

        // Электрические параметры
        motorStartMethod: '',
        powerInputs: '1',
        cabinetLocation: 'УХЛ1',
    }
    knsElementsData: EquipmentDataCheckbox[] = []

    pumpData: IPumpsForm = {
        pumpedLiquidType: '',
        pumpEfficiency: "",
        workPumpsCount: "",
        reservePumpsCount: "",
        liquidTemperature: "",
        mineralParticlesSize: "",
        mineralParticlesConcentration: "",
        bigParticleExistance: false,
        specificWastes: "",
        liquidDensity: "",
        pumpTypeId: "",
        heightOrDepth: "",
        instalationType: "",
        requiredPressure: "",
        requiredOutPressure: "",
        pressureLoses: "",
        networkLength: "",
        pipesConditions: '',
        pumpDiameter: "",
        geodesicalMarks: "",
        intakeType: '',
        explosionProtection: false,
        controlType: "",
        powerCurrentType: "",
        workPower: "",
        frequencyConverter: false,
        powerCableLength: "",
        liftingTransportEquipment: false,
        flushValve: false,
        otherLevelMeters: false,
        otherRequirements: "",
    }

    isLoader: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    async init(id: string, accountData: any, type: string) {
        this.isLoader = true

        try {
            if (type == "kns") {
                const [resquestRes, offerRes, configRes, equipmentCurrentRes] = await Promise.all([
                    requestSingleApi({ id: id }),
                    offersByRequestsApi({ requestId: id }),
                    currentKnsApi({ requestId: id }),
                    equipmentCurrentKnsApi({ requestId: id })
                ])
                this.formingRequest(resquestRes.data)
                this.formingKns(configRes.data, equipmentCurrentRes.data)
                this.formingOffers(offerRes.data)
            } else {
                const [resquestRes, offerRes, configRes] = await Promise.all([
                    requestSingleApi({ id: id }),
                    offersByRequestsApi({ requestId: id }),
                    getPumpSingle({ requestId: id })
                ])
                this.formingRequest(resquestRes.data)
                this.formingPump(configRes.data)
                this.formingOffers(offerRes.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }

    formingRequest(data: any) {
        this.request = {
            objectName: data.objectName,
            govCustomerName: data.customerName,
            regionId: data.locationRegion, // СДЕЛАТЬ ДОБАВЛЕНИЕ РЕГИОНА
            configType: data.configTypeId,
            contactPerson: data.contactName,
            contactPhone: data.phoneNumber,
            contactEmail: "",
            projectOrganizationName: data.projectOrganizationName,
            regionName: data.locationRegion, // СДЕЛАТЬ ДОБАВЛЕНИЕ РЕГИОНА
            innerId: data.innerId,
            schemeFileId: data.schemeFileId,
        }
    }

    formingKns(data: any, elements: any) {
        this.knsData = {
            // Данные из knsData
            perfomance: data.perfomance,
            units: data.units,  // medium вместо units
            head: data.requiredPumpPressure,
            workingPumps: data.activePumpsCount,
            reservePumps: data.reservePumpsCount,
            stockPumps: data.pumpsToWarehouseCount,
            medium: data.pType,  // тоже medium (тип среды)
            temperature: data.environmentTemperature,
            explosionProof: data.explosionProtection,

            // Параметры входящего трубопровода
            inletDepth: data.supplyPipelineDepth,
            inletDiameter: data.supplyPipelineDiameter,
            inletMaterial: data.supplyPipelineMaterial,
            inletDirection: data.supplyPipelineDirectionInHours,

            // Параметры напорного трубопровода 
            outletDepth: data.pressurePipelineDepth,
            outletDiameter: data.pressurePipelineDiameter,
            outletMaterial: data.pressurePipelineMaterial,
            outletDirection: data.pressurePipelineDirectionInHours,
            outletCount: data.chasManyExitPressurePipelinesonfigParametrsData,

            // Параметры станции
            stationDiameter: data.expectedDiameterOfPumpStation,
            stationHeight: data.expectedHeightOfPumpStation,
            insulation: data.insulatedHousingDepth,

            // Электрические параметры
            motorStartMethod: data.startupMethod,
            powerInputs: data.powerContactsToController,
            cabinetLocation: data.place,

            // Дополнительные элементы (если нужны)
            equipmentGuidList: data.equipmentGuidList!,
        }

        let resData: any = [];
        elements.forEach(element => {
            resData.push({
                ...element,
                checked: false,
            })
        });
        this.knsElementsData = resData
    }

    formingPump(data: any) {
        this.pumpData = {
            pumpedLiquidType: data.pumpedLiquidType,
            pumpEfficiency: data.pumpEfficiency,
            workPumpsCount: data.workPumpsCount,
            reservePumpsCount: data.reservePumpsCount,
            liquidTemperature: data.liquidTemperature,
            mineralParticlesSize: data.mineralParticlesSize,
            mineralParticlesConcentration: data.mineralParticlesConcentration,
            bigParticleExistance: data.bigParticleExistance,
            specificWastes: data.specificWastes,
            liquidDensity: data.liquidDensity,
            pumpTypeId: data.pumpTypeId,
            heightOrDepth: data.heightOrDepth,
            instalationType: data.instalationType,
            requiredPressure: data.requiredPressure,
            requiredOutPressure: data.requiredOutPressure,
            pressureLoses: data.pressureLoses,
            networkLength: data.networkLength,
            pipesConditions: data.pipesConditions,
            pumpDiameter: data.pumpDiameter,
            geodesicalMarks: data.geodesicalMarks,
            intakeType: data.intakeType,
            explosionProtection: data.explosionProtection,
            controlType: data.controlType,
            powerCurrentType: data.powerCurrentType,
            workPower: data.workPower,
            frequencyConverter: data.frequencyConverter,
            powerCableLength: data.powerCableLength,
            liftingTransportEquipment: data.liftingTransportEquipment,
            flushValve: data.flushValve,
            otherLevelMeters: data.otherLevelMeters,
            otherRequirements: data.otherRequirements,
        }
    }

    formingOffers(data: any) {
        this.offers = data
    }
}

export const requestDetailModel = new RequestDetailModel()