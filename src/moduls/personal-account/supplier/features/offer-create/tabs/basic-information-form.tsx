import { IOfferCreate } from "@/entities/offer/type";
import { Input } from "@/shared/ui-kits/Input";
import { Textarea } from "@/shared/ui-kits/Input/Textarea";
import { Selector } from "@/shared/ui-kits/select";
import { observer } from "mobx-react-lite";
import { useState } from "react";


interface Props {
    model: IOfferCreate,
    setModel: <K extends keyof IOfferCreate>(name: K, value: IOfferCreate[K]) => void
}

export const BasicInformationForm = observer(({ model, setModel }: Props) => {

    return (
        <div>
            <h3 className={"text-[18px] font-semibold text-[#1E293B] mb-[10px] "}>Основная информация</h3 >
            <div className='grid grid-cols-2 gap-[16px] bg-white rounded-2xl border-[1px_solid_#E2E8F0] p-[24px]'>
                <Input
                    label='Местоположение склада'
                    placeholder='Местоположение склада'
                    required
                    value={model.warehouseLocation}
                    onChange={(e) => setModel("warehouseLocation", e.toString())}
                />

                <Input
                    label='Номер коммерческого предложения'
                    placeholder='Номер коммерческого предложения'
                    required
                    type='number'
                    value={model.supportingDocumentDate}
                    onChange={(e) => setModel("offerNumber", e)}
                />

                <div>
                    <Input
                        label='Cайта поставщика'
                        placeholder='Cайта поставщика'
                        value={model.supplierSiteURL}
                        onChange={(e) => setModel("supplierSiteURL", e.toString())}
                    />

                </div>

                <Input
                    label='Страна производитель'
                    placeholder='Страна производитель'
                    required
                    value={model.manufacturerCountry}
                    onChange={(e) => setModel("manufacturerCountry", e.toString())}
                />
                <Input
                    label='Цена без НДС, ₽'
                    placeholder='Цена без НДС'
                    required
                    value={model.currentPriceNoNDS || ""}
                    type='number'
                    onChange={(e) => setModel("currentPriceNoNDS", e)}
                />
                <div className="flex items-center gap-3">
                    <Input
                        type='number'
                        label='Цена с НДС, ₽'
                        placeholder='Цена с НДС'
                        disabled
                        value={(model.currentPriceNDS) || ""}
                        onChange={(e) => setModel("currentPriceNDS", e.value)}
                        classNames={{
                            container: "flex-1"
                        }}
                    />

                    <Selector
                        label="Процент НДС"
                        placeholder="22%"
                        onSelect={(e) => setModel("proccent", e.value)}
                        classNames={{
                            wripper: "w-[20%]"
                        }}
                        defaultValue={model?.proccent || ""}
                        items={[
                            {
                                value: 0.22,
                                title: "22%",
                            },
                            {
                                value: 0.05,
                                title: "5%",
                            },
                            {
                                value: 0.3,
                                title: "30%",
                            },
                        ]}
                    />

                </div>
                <Input
                    label='Дата оформления сопроводительного документа'
                    placeholder='Дата оформления сопроводительного документа'
                    required
                    type='date'
                    value={model.supportingDocumentDate}
                    onChange={(e) => setModel("supportingDocumentDate", e)}
                />
            </div>
        </div>
    );
})