// src/pages/CreateRequestPage.tsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/features/user/context/context'
import { CreateRequestDataModel } from '../../features/CreateRequestPage/model-data'
import { directionOptions, motorStartOptions } from '../../features/CreateRequestPage/data'
import styles from './CreateRequestPage.module.css'
import { TechnicalParametersStep } from '@/moduls/personal-account/customer/widgets/technical-parameters-step'
import { getRequestById } from '@/shared/data/requests'
import { observer } from 'mobx-react-lite'
import { requestModel } from '../../features/CreateRequestPage/request-model'
import { FormBasicInformation } from '../../widgets/form-basic-information'
import { FormCheckSend } from '../../widgets/form-check-send'

export const CreateRequestPage = observer(() => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const isEditMode = !!requestId

  const {
    activeStep,
    handleNext,
    handleBack,
    getStepStatus,
  } = CreateRequestDataModel(requestId, user!)

  const {
    isSubmitting,
    create,
    update,
    elements,
    initData,
    activeElements,
    setElementChecked,
    formData,
    error,
    setFormData,
    knsData,
    setKnsData,
  } = requestModel

  useEffect(() => {
    if (elements.length === 0) {
      initData()
    }
  }, [elements])



  const handleSubmit = () => {
    if (isEditMode) {
      // update()
    } else {
      create(navigate, user!)
    }
  }


  // Загружаем данные заявки для редактирования
  useEffect(() => {
    if (isEditMode && requestId) {
      const existingRequest = getRequestById(requestId)
      if (existingRequest) {

        // setFormData({
        //   objectName: existingRequest.objectName || '',
        //   govCustomerName: existingRequest.govCustomerName || '',
        //   configType: existingRequest.configType || 'КНС',
        //   contactPerson: existingRequest.contactPerson || user?.fullName || '',
        //   contactPhone: existingRequest.contactPhone || user?.phone || '',
        //   contactEmail: existingRequest.contactEmail || user?.email || '',
        // })

        // if (existingRequest.kns) {
        //   setKnsData(existingRequest.kns)
        // }

        // if (existingRequest.knsExtras) {
        //   setKnsExtras(existingRequest.knsExtras)
        // }
      }
    }
  }, [isEditMode, requestId])

  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {isEditMode ? 'Редактирование заявки' : 'Создание заявки'}
          </h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
            <span className={styles.separator}>/</span>
            <span className={styles.breadcrumb} onClick={() => navigate('/customer')}>Заявки</span>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>
              {isEditMode ? `Редактирование ${requestId}` : 'Новая заявка'}
            </span>
          </div>
        </div>
      </div>

      {/* Карточка создания заявки */}
      <div className={styles.createCard}>
        {/* Шаги создания */}
        <div className={styles.steps}>
          <div className={`${styles.step} ${styles[getStepStatus(1)]}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepInfo}>
              <span className={styles.stepLabel}>Основная информация</span>
              <span className={styles.stepDesc}>Объект, заказчик, контакты</span>
            </div>
            {getStepStatus(1) === 'completed' && (
              <svg className={styles.stepIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#10B981" />
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
              </svg>
            )}
          </div>

          <div className={`${styles.step} ${styles[getStepStatus(2)]}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepInfo}>
              <span className={styles.stepLabel}>Технические параметры</span>
              <span className={styles.stepDesc}>Конфигурация оборудования</span>
            </div>
          </div>

          <div className={`${styles.step} ${styles[getStepStatus(3)]}`}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepInfo}>
              <span className={styles.stepLabel}>Проверка и отправка</span>
              <span className={styles.stepDesc}>Финальные данные</span>
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#FECACA" />
              <path d="M12 7V13" stroke="#DC2626" strokeWidth="2" />
              <circle cx="12" cy="17" r="1.5" fill="#DC2626" />
            </svg>
            {error}
          </div>
        )}

        {/* Шаг 1: Основная информация */}
        {activeStep === 1 && <FormBasicInformation
          styles={styles}
          formData={formData}
          setFormData={setFormData}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />}

        {/* Шаг 2: Технические параметры */}
        {activeStep === 2 && <TechnicalParametersStep
          styles={styles}
          knsData={knsData}
          formData={formData}
          focusedInput={focusedInput}
          motorStartOptions={motorStartOptions}
          setKnsData={setKnsData}
          elements={elements}
          activeElements={activeElements}
          setElementChecked={setElementChecked}
        />}

        {/* Шаг 3: Проверка и отправка */}
        {activeStep === 3 && <FormCheckSend
          styles={styles}
          formData={formData}
          knsData={knsData}
          motorStartOptions={motorStartOptions}
          elements={elements}
        />}

        {/* Кнопки навигации */}
        <div className={styles.formActions}>
          {activeStep > 1 && (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleBack}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
              </svg>
              Назад
            </button>
          )}

          {activeStep < 3 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleNext}
            >
              Далее
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => handleSubmit(isEditMode, navigate, requestId)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} />
                  {isEditMode ? 'Обновление...' : 'Создание...'}
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
                    <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
                    <path d="M12 22V16" stroke="white" strokeWidth="2" />
                  </svg>
                  {isEditMode ? 'Обновить заявку' : 'Создать заявку'}
                </>
              )}
            </button>
          )}

          <button
            type="button"
            className={styles.tertiaryButton}
            onClick={() => navigate('/customer')}
          >
            Отмена
          </button>
        </div>
      </div>
    </>
  )
})