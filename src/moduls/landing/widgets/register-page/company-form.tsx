import { Input } from "@/shared/ui-kits/Input";
import { Selector } from "@/shared/ui-kits/select";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import { observer } from "mobx-react-lite";

interface Props {
    formData: any,
    setFormData: any,
    isLoading: boolean,
    types: SeletectItemInterface[]
}


export const RegisterCompanyForm = observer(({ formData, setFormData, isLoading, types }: Props) => {
    return (
        <>
            <p className="mt-3 font-semibold">Данные об компании</p>

            <Input
                required
                label="Полное наименование компании"
                type="text"
                value={formData.fullCompanyName}
                onChange={(e) => setFormData("fullCompanyName", e)}
                placeholder="ООО «Ромашка»"
                disabled={isLoading}
            />

            <Input
                required
                label="Краткое наименование компании"
                type="text"
                value={formData.shortCompanyName}
                onChange={(e) => setFormData("shortCompanyName", e)}
                placeholder="ООО «Ромашка»"
                disabled={isLoading}
            />

            <Input
                required
                label="ИНН"
                type="text"
                value={formData.inn}
                onChange={(e) => setFormData("inn", e)}
                placeholder="1234567890"
                disabled={isLoading}
            />

            <Input
                required
                label="КПП"
                type="text"
                value={formData.kpp}
                onChange={(e) => setFormData("kpp", e)}
                placeholder="123456789"
                disabled={isLoading}
            />

            <Input
                required
                label="Юридический адрес"
                type="text"
                value={formData.jurAdress}
                onChange={(e) => setFormData("jurAdress", e)}
                placeholder="г. Москва, ул. Примерная, д. 1"
                disabled={isLoading}
            />

            <Input
                required
                label="Тип компании"
                type="text"
                value={formData.companyTypeId}
                onChange={(e) => setFormData("companyTypeId", e)}
                placeholder="ООО / АО / ИП"
                disabled={isLoading}
            />

            <Selector
                placeholder="Тип компании"
                onSelect={(value) => setFormData("companyTypeId", value.value)}
                items={types}

            />

        </>
    );
})