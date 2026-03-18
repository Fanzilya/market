import { RegisterRequestDTO } from "@/entities/user/type";
import { Button } from "@/shared/ui-kits/button";
import { Input } from "@/shared/ui-kits/Input";
import { useEffect, useState } from "react";
import { registerUserModel } from "../../features/RegisterPage/register-user-model";
import { useNavigate } from "react-router-dom";
import { TabCounter } from "./tab-counter";
import { RegisterCompanyForm } from "./suplier-company-form";
import { SuplierUserForm } from "./suplier-user-form";
import { registerCompanyModel } from "../../features/RegisterPage/register-company-model";
import { observer } from "mobx-react-lite";

interface Props {
    // isLoading: boolean,
    styles: any,
    // formData: RegisterRequestDTO,
    // setFormData: <K extends keyof RegisterRequestDTO> (name: K, value: RegisterRequestDTO) => void

    // onSubmit: () => void
    // setTabForm: (value: number) => void
}


export const SuplierForm = observer(({ styles }: Props) => {

    const {
        error,
        setFormCompanyData,
        companyData,
        init,
        types,

        setFnsValue,
        fnsValue,
        searchCompany,
        isLoadingCompanySearch,
        getCompanyByInn,
        canNextForm,
        clearCompanyData
    } = registerCompanyModel

    const {
        formData,
        setFormData,
        isLoading,
        handleSubmit,
        clearFormsData
    } = registerUserModel


    const navigate = useNavigate()
    const [tabForm, setTabForm] = useState<number>(1)

    const onSubmit = () => {
        handleSubmit(navigate)
    }

    useEffect(() => {
        if (types.length == 0) {
            init()
        }
    }, [])


    return (
        <>

            <TabCounter
                tabForm={tabForm}
            />

            {tabForm == 1 &&
                <RegisterCompanyForm
                    styles={styles}
                    formData={companyData}
                    setFormData={setFormCompanyData}
                    isLoading={isLoading}
                    types={types}
                    setFnsValue={setFnsValue}
                    fnsValue={fnsValue}
                    searchCompany={searchCompany}
                    setTabForm={setTabForm}
                    isLoadingCompanySearch={isLoadingCompanySearch}
                    getCompanyByInn={getCompanyByInn}
                    canNextForm={canNextForm}
                    clearCompanyData={clearCompanyData}
                />
            }

            {tabForm == 2 &&
                <SuplierUserForm
                    isLoading={isLoading}
                    styles={styles}
                    formData={formData}
                    setFormData={setFormData}
                    setTabForm={setTabForm}
                    onSubmit={onSubmit}
                />
            }
        </>
    );
})