import { getPumpSingle } from '@/entities/pumps/api';
import { IPumpsForm } from '@/entities/pumps/type';
import { getAllRegionsApi } from '@/entities/regions/api';
import { IRegion } from '@/entities/regions/type';
import { clickAccountApi, currentKnsApi, equipmentCurrentKnsApi, payStatusApi, requestSingleApi, requestSupplierSingleApi, requestSupplierSingleHalfApi, viewUserApi } from '@/entities/request/api';
import { PerfomanceMeasureUnit } from '@/entities/request/config';
import { BaseInfoFull, KnsData } from '@/entities/request/type';
import { ACCOUNT_SUPPLY } from '@/entities/user/config';
import { ISupplierAccount } from '@/entities/user/type';
import { EquipmentDataCheckbox } from '@/widgets/Scheme/src/data/teeska';
import { makeAutoObservable } from 'mobx';


class SupplierPreviewModel {

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


    accountData: ISupplierAccount = {
        coins: 0,
        userId: "",
        user: "",
        accountRequests: "",
        id: "",
    }

    isLoader: boolean = true
    isPay: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    async clickRequestUser(requestId) {
        try {
            const res = await clickAccountApi({
                requestId: requestId,
                accountId: this.accountData.id,
            })

            const newData = {
                ...this.accountData,
                coins: (Number(this.accountData.coins) - 1)
            }

            localStorage.setItem(ACCOUNT_SUPPLY, JSON.stringify(newData))
            this.accountData = newData

            this.isPay = true

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }

    async viewUser(requestId: string) {
        try {
            const res = await viewUserApi({
                requestId: requestId,
                accountId: this.accountData.id,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async init(id: string, accountData: any, type: string) {
        this.isLoader = true
        this.accountData = accountData

        try {
            const res = await payStatusApi({ requestId: id, accountId: this.accountData.id })
            this.isPay = res.data
        } catch (error) {
            console.log(error)
        }

        try {
            if (type == "kns") {
                const [resquestRes, configRes, equipmentCurrentRes] = await Promise.all([
                    this.isPay ? requestSupplierSingleApi({ requestId: id, accountId: this.accountData.id }) : requestSupplierSingleHalfApi({ requestId: id, accountId: this.accountData.id }),
                    currentKnsApi({ requestId: id }),
                    equipmentCurrentKnsApi({ requestId: id })
                ])
                resquestRes && this.formingRequest(resquestRes.data)
                this.formingKns(configRes.data, equipmentCurrentRes.data)
            } else {
                const [resquestRes, configRes] = await Promise.all([
                    this.isPay ? requestSupplierSingleApi({ requestId: id, accountId: this.accountData.id }) : requestSupplierSingleHalfApi({ requestId: id, accountId: this.accountData.id }),
                    getPumpSingle({ requestId: id })
                ])
                resquestRes && this.formingRequest(resquestRes.data)
                this.formingPump(configRes.data)
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
}

export const supplierPreviewModel = new SupplierPreviewModel()  