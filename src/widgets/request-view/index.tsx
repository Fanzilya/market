import { CurrentRes, EquipmentCurrentRes, RequestRes } from "@/entities/request/type";
import { InfoItem, SpecItem } from "./components";
import ContactInfo from "./contact-info";
import { directionLabels, PerfomanceMeasureUnitTranslations, PipelineMaterialTranslations, PumpsStartupMethodTranslations } from "@/entities/request/config";
import { KNSSchemaTesting } from "../Scheme/scheme-testing";
import ClicksInfo from "./clicks-info";
import RespondButton from "./respond-button";
import OfferButton from "./offer-button";

interface Props {
    request: RequestRes,
    currentModel: CurrentRes,
    equipmentCurrentModel: EquipmentCurrentRes,
    hasResponded: boolean,
    schemeIsActive: boolean,
    freeClicksLeft?: number | string,
    isClicksAvailable?: boolean,
    handleRespond?: () => void,
}

export const RequestView = ({ request, currentModel, equipmentCurrentModel, schemeIsActive, hasResponded, freeClicksLeft, isClicksAvailable, handleRespond }: Props) => {
    return (
        <div className="bg-white rounded-[20px] border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 m-0">{request?.objectName}</h2>
                <div></div>
                {/* <span className="inline-block px-3 py-1.5 bg-[rgba(74,133,246,0.1)] rounded-lg text-sm font-semibold text-[#4A85F6] font-mono">{request.id}</span> */}
            </div>

            {hasResponded && (
                <ContactInfo
                    govCustomerName={request.customerName}
                    contactPerson={request.contactName}
                    contactPhone={request.phoneNumber}
                // contactEmail={request.contactEmail}
                />
            )}

            <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-slate-50 rounded-2xl">
                <InfoItem
                    label="Тип конфигурации"
                    value={'КНС'} />

                <InfoItem
                    label="Дата создания"
                    value={new Date(request?.createdAt).toLocaleDateString('ru-RU')} />

                {request?.locationRegion &&
                    <InfoItem
                        label="Регион"
                        value={request.locationRegion} />
                }

            </div>

            <div className='flex gap-10'>
                <div className='w-full'>
                    <h3 className="text-lg font-semibold text-slate-800 mt-0 mb-4">Технические характеристики</h3>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <SpecItem
                            label={"Производительность:"}
                            value={(currentModel.perfomance || '—') + " " + PerfomanceMeasureUnitTranslations[currentModel.units]} />

                        <SpecItem
                            label={"Требуемый напор:"}
                            value={(currentModel.requiredPumpPressure || '—') + "  м"} />

                        <SpecItem
                            label={"Рабочих насосов:"}
                            value={currentModel.activePumpsCount || '0'} />

                        <SpecItem
                            label={"Резервных насосов:"}
                            value={currentModel.reservePumpsCount || '0'} />

                        <SpecItem
                            label={"Насосов на склад:"}
                            value={currentModel.pumpsToWarehouseCount || '0'} />

                        <SpecItem
                            label={"Перекачиваемая среда:"}
                            value={currentModel.pType || '—'} />

                        <SpecItem
                            label={"Температура среды:"}
                            value={(currentModel.environmentTemperature || '—') + "  °C"} />

                        <SpecItem
                            label={"Взрывозащищенность:"}
                            value={currentModel.explosionProtection ? 'Да' : 'Нет'} />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Габаритные размеры трубопроводов и корпуса</h3>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <SpecItem
                            label={"Глубина подводящего A:"}
                            value={(currentModel.supplyPipelineDepth) + " м"} />

                        <SpecItem
                            label={"Диаметр подводящего B:"}
                            value={`${currentModel.supplyPipelineDiameter} мм ${currentModel.supplyPipelineMaterial ? `(${currentModel.supplyPipelineMaterial})` : ''}`} />

                        <SpecItem
                            label={"Направление подводящего:"}
                            value={directionLabels[currentModel.supplyPipelineDirectionInHours] || currentModel.supplyPipelineDirectionInHours} />

                        <SpecItem
                            label={"Глубина напорного D:"}
                            value={currentModel.pressurePipelineDepth + " м"} />

                        <SpecItem
                            label={"Диаметр напорного C:"}
                            value={`${currentModel.pressurePipelineDiameter} мм ${currentModel.pressurePipelineMaterial ? PipelineMaterialTranslations[currentModel.pressurePipelineMaterial] : ''}`} />

                        <SpecItem
                            label={"Направление напорного:"}
                            value={directionLabels[currentModel.pressurePipelineDirectionInHours] || currentModel.pressurePipelineDirectionInHours} />

                        <SpecItem
                            label={"Количество напорных:"}
                            value={currentModel.hasManyExitPressurePipelines} />

                        <SpecItem
                            label={"Диаметр станции:"}
                            value={(currentModel.expectedDiameterOfPumpStation + " м")} />

                        <SpecItem
                            label={"Высота станции:"}
                            value={currentModel.expectedHeightOfPumpStation} />

                        <SpecItem
                            label={"Утепление корпуса:"}
                            value={currentModel.insulatedHousingDepth + " м"} />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Габаритные размеры трубопроводов и корпуса</h3>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <SpecItem
                            label={"Метод пуска:"}
                            value={PumpsStartupMethodTranslations[currentModel.startupMethod] || currentModel.startupMethod} />

                        <SpecItem
                            label={"Вводов питания:"}
                            value={currentModel.powerContactsToController} />

                        <SpecItem
                            label={"Место установки шкафа:"}
                            value={currentModel.place} />
                    </div>


                    {equipmentCurrentModel.length > 0 && <>
                        <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Дополнительная комплектация</h3>
                        {Object.values(equipmentCurrentModel).some(v => v) && (
                            <div className="flex flex-wrap gap-2.5 mb-8">
                                {equipmentCurrentModel.map((item, key) => (
                                    <span key={key} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-[30px] text-sm text-slate-800 transition-all duration-200 hover:border-[#4A85F6] hover:text-[#4A85F6]">{item.name}</span>
                                ))}
                            </div>
                        )}
                    </>}
                </div>

                <KNSSchemaTesting isActive={schemeIsActive} />
            </div>

            {/* {!hasResponded && (
                <ClicksInfo freeClicksLeft={freeClicksLeft!} />
            )}

            {!hasResponded ? (
                <RespondButton
                    freeClicksLeft={freeClicksLeft!}
                    isClicksAvailable={isClicksAvailable!}
                    onRespond={handleRespond!}
                />
            ) : (
                <OfferButton
                    onCreateOffer={`/supplier/request/${request?.id}/offer/new`}
                />
            )} */}
        </div>
    );
}