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
    styles: any,
    setFnsValue: (value: string) => void,
    searchCompany: () => void

    setTabForm: (value: number) => void

    canNextForm: boolean,
    isLoadingCompanySearch: boolean,
    getCompanyByInn: (value: any) => void
    clearCompanyData: () => void
}


export const RegisterCompanyForm = observer(({
    formData, setFormData, isLoading, types, fnsValue, setFnsValue, searchCompany, styles,
    setTabForm, isLoadingCompanySearch, getCompanyByInn, canNextForm, clearCompanyData
}: Props) => {

    const [isFromWord, setIsFromWord] = useState<boolean>(true)

    const switchForm = (value: boolean) => {
        clearCompanyData()
        setIsFromWord(value)
    }


    return (
        <>
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => switchForm(true)}
                    className={`w-full py-3 border-b-1 px-4 font-medium transition-all duration-200 ${isFromWord
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-gray-100 hover:text-gray-700'
                        }`}
                >
                    Заполнить вручную
                </button>
                <button
                    onClick={() => switchForm(false)}
                    className={`w-full py-3 border-b-1 px-4 font-medium transition-all duration-200 ${!isFromWord
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-gray-100 hover:text-gray-700'
                        }`}
                >
                    Найти компанию
                </button>
            </div>

            {!isFromWord
                ? <div className="flex gap-1 items-end">
                    <Input
                        required
                        label="ИНН"
                        type="text"
                        value={fnsValue}
                        onChange={(e) => setFnsValue(e)}
                        placeholder="000000000000"
                        disabled={isLoading}
                        classNames={{
                            container: "w-full"
                        }}
                    />

                    <Button className="h-[47.5px] w-[47.5px] p-2 !rounded-" onClick={searchCompany} styleColor={fnsValue.length > 9 ? "blue" : "gray"}>
                        <Icon name="search" color="white" />
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

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Тип компании <span className="text-red-500">*</span></label>
                        <Selector
                            placeholder="Тип компании"
                            onSelect={(value) => setFormData("companyTypeId", value.value)}
                            items={types}

                        />
                    </div>
                </>
            }

            <Button onClick={() => setTabForm(2)}
                className={`${canNextForm ? "from-[#4A85F6] to-[#3A6BC9]" : "from-[#4f4f4f] to-[#a2a3a5]"} bg-gradient-to-br p-4 mt-2 hover:shadow-lg`}
                disabled={!canNextForm}
            >
                {isLoadingCompanySearch ? "Поиск ..." : "Продолжить"}
            </Button >
        </>
    );
})