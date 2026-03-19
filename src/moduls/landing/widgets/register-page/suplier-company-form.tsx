import { Button } from "@/shared/ui-kits/button";
import Icon from "@/shared/ui-kits/Icon";
import { Input } from "@/shared/ui-kits/Input";
import Loader from "@/shared/ui-kits/loader/loader";
import { Selector } from "@/shared/ui-kits/select";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { SuplierCompanyFormInputs } from "./suplier-company-form-inputs";

interface Props {
    formData: any,
    setFormData: any,
    setOpenCompanyForm: (value: boolean) => void,
    openCompanyForm: boolean,
    isLoading: boolean,
    types: SeletectItemInterface[],

    fnsValue: string,
    styles: any,
    setFnsValue: (value: string) => void,
    searchCompany: () => void

    setTabForm: (value: number) => void

    canNextForm: (value: any) => void,
    isLoadingCompanySearch: boolean,
    setTypeForm: (value: "searchInn" | "form") => void
    typeForm: "searchInn" | "form"
    errors: any,
}


export const RegisterCompanyForm = observer(({
    formData, setFormData, isLoading, types, fnsValue, setFnsValue, searchCompany, styles,
    setTabForm, isLoadingCompanySearch, canNextForm, openCompanyForm, typeForm, setTypeForm, errors
}: Props) => {

    return (
        <>
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setTypeForm("form")}
                    className={`w-full py-3 border-b-1 px-4 font-medium transition-all duration-200 ${typeForm == "form"
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-gray-100 hover:text-gray-700'
                        }`}
                >
                    Заполнить вручную
                </button>
                <button
                    onClick={() => setTypeForm("searchInn")}
                    className={`w-full py-3 border-b-1 px-4 font-medium transition-all duration-200 ${typeForm == "searchInn"
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-gray-100 hover:text-gray-700'
                        }`}
                >
                    Найти компанию
                </button>
            </div>

            {typeForm == "searchInn" &&
                <>
                    <div className="flex gap-1 items-end">
                        <Input
                            required
                            label="Поиск по ИНН"
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

                    {isLoadingCompanySearch && <Loader />}

                    {!isLoadingCompanySearch && openCompanyForm &&
                        <SuplierCompanyFormInputs
                            formData={formData}
                            setFormData={setFormData}
                            isLoading={isLoading}
                            types={types}
                            styles={styles}
                            errors={errors}
                        />
                    }
                </>
            }

            {typeForm == "form" && <SuplierCompanyFormInputs
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                types={types}
                styles={styles}
                errors={errors}
            />}

            <Button
                onClick={() => canNextForm(setTabForm)}
                className={`${(!isLoadingCompanySearch) ? "from-[#4A85F6] to-[#3A6BC9]" : "from-[#d0d4dc] to-[#737578]"} bg-gradient-to-br p-4 mt-2 hover:shadow-lg`}
            >
                {isLoadingCompanySearch ? "Поиск ..." : "Продолжить"}
            </Button >
        </>
    );
})