// src/pages/CreateRequestPage.tsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/features/user/context/context'
import { CreateRequestDataModel } from '../../features/CreateRequestPage/model-data'
import { directionOptions, motorStartOptions } from '../../features/CreateRequestPage/data'
import styles from './CreateRequestPage.module.css'
import { TechnicalParametersStep } from '@customer/widgets/CreateRequestPage/technical-parameters-step'
import { getRequestById } from '@/shared/data/requests'
import { observer } from 'mobx-react-lite'
import { requestModel } from '../../features/CreateRequestPage/request-model'

export const CreateRequestPage = observer(() => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const {
    activeStep,
    isSubmitting,
    error,
    isEditMode,
    formData,
    setFormData,
    knsData,
    setKnsData,
    knsExtras,
    setKnsExtras,
    handleNext,
    handleBack,
    handleSubmit,
    getStepStatus,
  } = CreateRequestDataModel(requestId, user!)


  const { elements, initData, activeElements, setElementChecked
  } = requestModel


  useEffect(() => {
    if (elements.length === 0) {
      initData()
    }
  }, [])



  // Загружаем данные заявки для редактирования
  useEffect(() => {
    if (isEditMode && requestId) {
      const existingRequest = getRequestById(requestId)
      if (existingRequest) {
        setFormData({
          objectName: existingRequest.objectName || '',
          govCustomerName: existingRequest.govCustomerName || '',
          configType: existingRequest.configType || 'КНС',
          contactPerson: existingRequest.contactPerson || user?.fullName || '',
          contactPhone: existingRequest.contactPhone || user?.phone || '',
          contactEmail: existingRequest.contactEmail || user?.email || '',
        })

        if (existingRequest.kns) {
          setKnsData(existingRequest.kns)
        }

        if (existingRequest.knsExtras) {
          setKnsExtras(existingRequest.knsExtras)
        }
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
        {activeStep === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Основная информация</h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Название объекта <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.objectName}
                  onChange={(e) => setFormData({ ...formData, objectName: e.target.value })}
                  onFocus={() => setFocusedInput('objectName')}
                  onBlur={() => setFocusedInput(null)}
                  className={`${styles.input} ${focusedInput === 'objectName' ? styles.inputFocused : ''}`}
                  placeholder="Например: КНС №1, ЖК «Северный»"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Гос. заказчик <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.govCustomerName}
                  onChange={(e) => setFormData({ ...formData, govCustomerName: e.target.value })}
                  onFocus={() => setFocusedInput('govCustomer')}
                  onBlur={() => setFocusedInput(null)}
                  className={`${styles.input} ${focusedInput === 'govCustomer' ? styles.inputFocused : ''}`}
                  placeholder="Например: ГКУ «Управление строительства»"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Тип конфигурации</label>
                <select
                  value={formData.configType}
                  onChange={(e) => setFormData({ ...formData, configType: e.target.value })}
                  className={styles.select}
                >
                  <option value="КНС">КНС (Канализационная насосная станция)</option>
                  {/* <option value="ЛОС">ЛОС (Локальные очистные сооружения)</option>
                    <option value="Насосная группа">Насосная группа</option>
                    <option value="Другое">Другое</option> */}
                </select>
              </div>
            </div>

            <h3 className={styles.subsectionTitle}>Контактная информация</h3>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Контактное лицо</label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className={`${styles.input} ${styles.inputDisabled}`}
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Телефон</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className={styles.input}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className={`${styles.input} ${styles.inputDisabled}`}
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        {/* Шаг 2: Технические параметры */}
        {activeStep === 2 && <TechnicalParametersStep
          styles={styles}
          knsData={knsData}
          formData={formData}
          focusedInput={focusedInput}
          motorStartOptions={motorStartOptions}
          setKnsData={setKnsData}
          // directionOptions={directionOptions}
          knsExtras={knsExtras}
          setKnsExtras={setKnsExtras}
          elements={elements}
          activeElements={activeElements}
          setElementChecked={setElementChecked}
        />}

        {/* Шаг 3: Проверка и отправка */}
        {activeStep === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Проверка данных</h2>

            <div className={styles.previewCard}>
              <h3 className={styles.previewTitle}>Основная информация</h3>
              <div className={styles.previewGrid}>
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Объект:</span>
                  <span className={styles.previewValue}>{formData.objectName}</span>
                </div>
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Заказчик:</span>
                  <span className={styles.previewValue}>{formData.govCustomerName}</span>
                </div>
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Тип:</span>
                  <span className={styles.previewValue}>{formData.configType}</span>
                </div>
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Контакт:</span>
                  <span className={styles.previewValue}>{formData.contactPerson}</span>
                </div>
              </div>

              {formData.configType === 'КНС' && (
                <>
                  <h3 className={styles.previewTitle}>Основные параметры</h3>
                  <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Производительность:</span>
                      <span className={styles.previewValue}>{knsData.capacity} м³/ч</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Напор:</span>
                      <span className={styles.previewValue}>{knsData.head} м</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Насосы:</span>
                      <span className={styles.previewValue}>
                        {knsData.workingPumps || '0'} раб. / {knsData.reservePumps || '0'} рез. / {knsData.stockPumps || '0'} склад
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Среда:</span>
                      <span className={styles.previewValue}>{knsData.medium}</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Температура:</span>
                      <span className={styles.previewValue}>{knsData.temperature || '—'} °C</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Взрывозащита:</span>
                      <span className={styles.previewValue}>{knsData.explosionProof ? 'Да' : 'Нет'}</span>
                    </div>
                  </div>

                  <h3 className={styles.previewTitle}>Габаритные размеры</h3>
                  <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>A (вход):</span>
                      <span className={styles.previewValue}>{knsData.inletDepth || '—'} м</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>B (вход):</span>
                      <span className={styles.previewValue}>
                        {knsData.inletDiameter || '—'} мм ({knsData.inletMaterial || '—'})
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>C (выход):</span>
                      <span className={styles.previewValue}>
                        {knsData.outletDiameter || '—'} мм ({knsData.outletMaterial || '—'})
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>D (выход):</span>
                      <span className={styles.previewValue}>{knsData.outletDepth || '—'} м</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Станция:</span>
                      <span className={styles.previewValue}>
                        ⌀{knsData.stationDiameter || '—'} м × {knsData.stationHeight || '—'} м
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Утепление:</span>
                      <span className={styles.previewValue}>{knsData.insulation || '—'} м</span>
                    </div>
                  </div>

                  <h3 className={styles.previewTitle}>Электрические параметры</h3>
                  <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Метод пуска:</span>
                      <span className={styles.previewValue}>
                        {motorStartOptions.find(o => o.value === knsData.motorStartMethod)?.label || '—'}
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Вводов питания:</span>
                      <span className={styles.previewValue}>{knsData.powerInputs || '1'}</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span className={styles.previewLabel}>Место установки шкафа:</span>
                      <span className={styles.previewValue}>{knsData.cabinetLocation || 'УХЛ1'}</span>
                    </div>
                  </div>

                  {Object.values(knsExtras).some(v => v) && (
                    <>
                      <h3 className={styles.previewTitle}>Дополнительная комплектация</h3>
                      <div className={styles.previewList}>
                        {Object.entries(knsExtras)
                          .filter(([_, value]) => value)
                          .map(([key]) => (
                            <span key={key} className={styles.previewBadge}>{key}</span>
                          ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}

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
              onClick={handleSubmit}
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