import { Button } from "@/shared/ui-kits/button";
import { useEffect, useState } from "react";
import { registerUserModel } from "../../features/RegisterPage/register-user-model";
import { useNavigate } from "react-router-dom";
import { TabCounter } from "./tab-counter";
import { RegisterCompanyForm } from "./register-company-form";
import { registerCompanyModel } from "../../features/RegisterPage/register-company-model";
import { observer } from "mobx-react-lite";
import { RegisterUserForm } from "./register-user-form";
import { Role } from "@/entities/user/role";
import { toast } from "react-toastify";

interface Props {
    styles: any,
}

export const RegistrForm = observer(({ styles }: Props) => {

    const {
        errorsCompany,
        setFormCompanyData,
        companyData,
        init,
        types,

        setFnsValue,
        fnsValue,
        createCompany,
        getCompanyData,
        isLoadingCompanySearch,
        canNextForm,
        clearCompanyData,
        isCompanyCreate,
        setOpenCompanyForm,
        openCompanyForm,
        setTypeForm,
        typeForm,
        validateCompanyForm
    } = registerCompanyModel

    const {
        errors,
        formData,
        setFormData,
        isLoading,
        handleSubmit,
        validateForm,
        clearFormsData,
    } = registerUserModel


    const navigate = useNavigate()
    const [tabForm, setTabForm] = useState<number>(1)

    const onSubmit = async () => {
        const isUserValid = await validateForm()
        const isCompanyValid = await validateCompanyForm()

        if (!isCompanyValid) {
            toast.error('Пожалуйста, заполните все обязательные поля компании')
            return
        }

        if (!isUserValid) {
            toast.error('Пожалуйста, заполните все обязательные поля пользователя')
            return
        }

        try {
            let companyId: string = "";

            if (isCompanyCreate) {
                companyId = await createCompany()
                if (!companyId) {
                    throw new Error('Не удалось создать компанию')
                }
            } else {
                companyId = companyData.id!
            }
            await handleSubmit(navigate, companyId)
        } catch (error) {
            console.error('❌ Ошибка в onSubmit:', error)
            toast.error('Произошла ошибка при регистрации')
        }
    }

    useEffect(() => {
        if (types.length == 0) {
            init()
        }
        clearFormsData()
        clearCompanyData()
    }, [])

    return (
        <>
            <TabCounter tabForm={tabForm} />


            {tabForm == 1 &&
                <>
                    <RegisterUserForm
                        formData={formData}
                        setFormData={setFormData}
                        styles={styles}
                        isLoading={isLoading}
                        errors={errors}
                        bottom={
                            <Button
                                onClick={() => setTabForm(2)}
                                className={`${(!isLoadingCompanySearch) ? "from-[#4A85F6] to-[#3A6BC9]" : "from-[#d0d4dc] to-[#737578]"} bg-gradient-to-br p-4 mt-2 hover:shadow-lg`}
                            >
                                {isLoadingCompanySearch ? "Поиск ..." : "Продолжить"}
                            </Button >
                        }
                    />
                </>
            }

            {tabForm == 2 &&
                <RegisterCompanyForm
                    styles={styles}
                    formData={companyData}
                    setFormData={setFormCompanyData}
                    isLoading={isLoading}
                    openCompanyForm={openCompanyForm}
                    setOpenCompanyForm={setOpenCompanyForm}
                    types={types}
                    setFnsValue={setFnsValue}
                    fnsValue={fnsValue}
                    searchCompany={getCompanyData}
                    setTabForm={setTabForm}
                    isLoadingCompanySearch={isLoadingCompanySearch}
                    getCompanyByInn={getCompanyData}
                    canNextForm={canNextForm}
                    clearCompanyData={clearCompanyData}
                    setTypeForm={setTypeForm}
                    typeForm={typeForm}
                    errors={errorsCompany}

                    botttom={
                        <div className="flex gap-2 mt-2">
                            <Button onClick={() => setTabForm(1)}
                                className='w-full p-4'
                                styleColor="gray"
                                disabled={isLoading}>
                                Назад
                            </Button>
                            <Button onClick={onSubmit}
                                className='w-full p-4 bg-gradient-to-br from-[#4A85F6] to-[#3A6BC9] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:ring-offset-2'
                                disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className={styles.spinner} />
                                        Регистрация...
                                    </>
                                ) : (
                                    'Зарегистрироваться'
                                )}
                            </Button>
                        </div>
                    }
                />
            }
        </>
    );
})