import { Button } from "@/shared/ui-kits/button";
import Icon from "@/shared/ui-kits/Icon";
import { Input } from "@/shared/ui-kits/Input";
import { Selector } from "@/shared/ui-kits/select";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface Props {
    formData: any,
    setFormData: any,
    isLoading: boolean,
    types: SeletectItemInterface[],

    fnsValue: string,
    setFnsValue: (value: string) => void,
    searchCompany: () => void
}


export const RegisterCompanyForm = observer(({ formData, setFormData, isLoading, types, fnsValue, setFnsValue, searchCompany }: Props) => {

    const [isFnsSearch, setIsFnsSearch] = useState<boolean>(true)

    return (
        <>
            <p className="mt-3 font-semibold">Данные об компании</p>

            <div className="flex gap-1">
                <Button onClick={() => setIsFnsSearch(true)} className={` w-full py-1.5 ${!isFnsSearch && "opacity-30"}`}>Найти компанию</Button>
                <Button onClick={() => setIsFnsSearch(false)} className={` w-full py-1.5 ${isFnsSearch && "opacity-30"}`}>Заполнить вручную</Button>
            </div>


            {isFnsSearch
                ? <div className="flex gap-1 items-end">
                    <Input
                        required
                        label="Полное наименование компании"
                        type="text"
                        value={fnsValue}
                        onChange={(e) => setFnsValue(e)}
                        placeholder="000000000000"
                        disabled={isLoading}
                        classNames={{
                            container: "w-full"
                        }}
                    />

                    <Button className="mb-1.5 p-1.5 !rounded-[100px]" onClick={searchCompany} styleColor={fnsValue.length > 9 ? "blue" : "gray"}>
                        <Icon name="check" color="white" />
                    </Button>
                </div>
                : <>

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
            }
        </>
    );
})