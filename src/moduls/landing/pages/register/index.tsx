// src/pages/RegisterPage.tsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import styles from './RegisterPage.module.css'
import { AuthLayout } from '../../widgets/layout/layout'
import { registerCompanyModel } from '../../features/RegisterPage/model/register-company-model'
import { registerUserModel } from '../../features/RegisterPage/model/register-user-model'
import { toast } from 'react-toastify'
import { TabCounter } from '../../widgets/register-page/tab-counter'
import { RegisterUserForm } from '../../features/RegisterPage/ui/register-user-form'
import { Button } from '@/shared/ui-kits/button'
import { RegisterCompanyForm } from '../../features/RegisterPage/ui/register-company-form'

export const RegisterPage = observer(() => {


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
    clearCompanyData,
    isCompanyCreate,
    setOpenCompanyForm,
    openCompanyForm,
    setTypeForm,
    typeForm,
    validateCompanyForm,
    canRegister,
    allClearData
  } = registerCompanyModel

  const {
    errors,
    formData,
    setFormData,
    isLoading,
    handleSubmit,
    validateForm,
    clearFormsData,
    canRegisterUser,
    setIsLoading
  } = registerUserModel


  const navigate = useNavigate()
  const [tabForm, setTabForm] = useState<number>(1)

  const onSubmit = async () => {

    const isUserValid = await validateForm()
    const isCompanyValid = await validateCompanyForm()

    if (!isCompanyValid) {
      if (errorsCompany.fnsValue) {
        toast.error('')
      }
      else {
        toast.error('Пожалуйста, заполните все обязательные поля компании')
      }

      return
    }

    if (!isUserValid) {
      toast.error('Пожалуйста, заполните все обязательные поля пользователя')
      return
    }

    setIsLoading(true)


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
    clearCompanyData()
    clearFormsData()
    allClearData()
  }, [])



  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Создайте аккаунт для начала работы"

      formBlock={
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
                    onClick={() => { if (canRegisterUser()) setTabForm(2) }}
                    className={`${true ? "from-[#4A85F6] to-[#3A6BC9]" : "from-[#d0d4dc] to-[#737578]"} bg-gradient-to-br p-4 mt-2 hover:shadow-lg`}
                  >
                    Продолжить
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
              isLoadingCompanySearch={isLoadingCompanySearch}
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
                    className={`w-full p-4 bg-gradient-to-br hover:shadow-lg`}
                    disabled={!(!isLoading && canRegister)}
                    styleColor={canRegister ? "blue" : "gray"}
                  >
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
          <div className={styles.loginLink}>
            Уже есть аккаунт? <Link to="/login" className={styles.link}>Войти</Link>
          </div>
        </>
      }

      informationBlock={
        <>
          <div className={styles.promoBadge}>Для производителей</div>

          <h2 className={styles.promoTitle}>
            Хотите разместить свою продукцию?
          </h2>

          <p className={styles.promoDescription}>
            Зарегистрируйтесь как <strong>Исполнитель</strong> и получите доступ к инструментам для продвижения вашего бренда.
          </p>

          <div className={styles.promoFeatures}>
            <div className={styles.promoFeature}>
              <span>Размещение неограниченного количества товаров</span>
            </div>
            <div className={styles.promoFeature}>
              <span>Прямые запросы от заказчиков</span>
            </div>
            <div className={styles.promoFeature}>
              <span>Статистика просмотров и аналитика</span>
            </div>
          </div>
        </>
      }
    />
  )
})