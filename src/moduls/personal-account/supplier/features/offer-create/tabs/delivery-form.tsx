import { IOfferCreate } from "@/entities/offer/type";
import { Input } from "@/shared/ui-kits/Input";
import { Textarea } from "@/shared/ui-kits/Input/Textarea";
import { observer } from "mobx-react-lite"

interface Props {
    model: IOfferCreate,
    setModel: <K extends keyof IOfferCreate>(name: K, value: IOfferCreate[K]) => void
}


export const DeliveryForm = observer(({ model, setModel }: Props) => {
    return (
        <>
            <h3 className={"text-[18px] font-semibold text-[#1E293B] mb-[10px]  "}>Условия поставки</h3 >
            <div className='bg-white rounded-2xl border-[1px_solid_#E2E8F0] p-[24px]'>

                <Input
                    label='Гарантированный период, мес.'
                    placeholder='Гарантированный период, мес.'
                    type='number'
                    value={model.garantyPeriod}
                    onChange={(e) => setModel("garantyPeriod", e)}
                />

                <Textarea
                    classNames={{
                        container: "mt-[16px]",
                        input: "h-[150px]"
                    }}
                    label='Условия оплаты'
                    placeholder='Условия оплаты'
                    value={model.paymentTerms}
                    onChange={(e) => setModel("paymentTerms", e)}
                />

                <Textarea
                    classNames={{
                        container: "mt-[16px]",
                        input: "h-[150px]"
                    }}
                    label='Условия доставки'
                    placeholder='Условия доставки'
                    value={model.deliveryTerms}
                    onChange={(e) => setModel("deliveryTerms", e)}
                />
            </div>
        </>
    );
})