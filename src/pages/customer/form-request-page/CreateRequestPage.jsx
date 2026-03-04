// src/pages/CreateRequestPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionUser } from '../../../auth/demoAuth.js'
import { createRequest, getRequestById, updateRequest } from '../../../data/requests.js'
import Sidebar from '../../../components/Sidebar.jsx'
import styles from './CreateRequestPage.module.css'

// Компонент схемы КНС (вынесен отдельно)
const KNSSchema = ({ data, extras }) => {
  const {
    // Основные параметры
    workingPumps = '2',
    reservePumps = '1',

    // Параметры трубопроводов
    inletDiameter = '250',
    inletDirection = '12',
    outletDiameter = '200',
    outletDirection = '3',
    outletCount = '1',

    // Параметры станции
    stationDiameter = '3',
    stationHeight = '5',
    insulation = '1.5'
  } = data

  // Преобразование направления в угол для отображения
  const getDirectionAngle = (direction) => {
    const hour = parseInt(direction) || 12
    return (hour * 30) % 360
  }

  const inletAngle = getDirectionAngle(inletDirection)
  const outletAngle = getDirectionAngle(outletDirection)

  // Расчет количества насосов
  const totalPumps = (parseInt(workingPumps) || 2) + (parseInt(reservePumps) || 1)

  return (
    <div className={styles.schemaContainer}>
      <svg width="100%" height="600" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(400, 300)">

          <rect
            x="-100"
            y="-150"
            width="200"
            height="300"
            fill="none"
            stroke="#4A85F6"
            strokeWidth="3"
            rx="10"
          />

          {/* Утепление (если указано) */}
          {insulation && parseFloat(insulation) > 0 && (
            <>
              <rect
                x="-105"
                y="-155"
                width="210"
                height={parseFloat(insulation) * 50 + 310}
                fill="rgba(74, 133, 246, 0.1)"
                stroke="#4A85F6"
                strokeWidth="1"
                strokeDasharray="5,5"
                rx="12"
              />
              <text
                x="0"
                y="-180"
                textAnchor="middle"
                fontSize="10"
                fill="#4A85F6"
              >
                Утепление {insulation}м
              </text>
            </>
          )}

          {/* Лестница */}
          <line
            x1="80"
            y1="-120"
            x2="80"
            y2="120"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {[-100, -50, 0, 50, 100].map((y, i) => (
            <line
              key={i}
              x1="70"
              y1={y}
              x2="90"
              y2={y}
              stroke="#94a3b8"
              strokeWidth="2"
            />
          ))}
          <text x="95" y="-130" fontSize="8" fill="#64748b">Лестница</text>

          {/* Вентиляционные трубы */}
          <line x1="-80" y1="-160" x2="-80" y2="-140" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="-80" cy="-165" r="5" fill="#94a3b8" />
          <line x1="80" y1="-160" x2="80" y2="-140" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="80" cy="-165" r="5" fill="#94a3b8" />
          <text x="-90" y="-180" fontSize="8" fill="#64748b">Вент. труба 2шт</text>

          {/* Насосы (отображаем в зависимости от количества) */}
          {[...Array(totalPumps)].map((_, i) => {
            const x = -60 + i * 40
            const y = -30 + (i % 2) * 30
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width="30"
                  height="50"
                  fill="#10B981"
                  opacity="0.8"
                  rx="5"
                />
                <circle cx={x + 15} cy={y - 5} r="5" fill="#10B981" />
                <text
                  x={x + 15}
                  y={y + 30}
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                >
                  Н{i + 1}
                </text>
              </g>
            )
          })}
          <text x="-70" y="-50" fontSize="8" fill="#10B981">
            Насосы: {workingPumps} раб + {reservePumps} рез
          </text>

          {/* Подводящий трубопровод A (слева) */}
          <g>
            <line
              x1="-200"
              y1="50"
              x2="-100"
              y2="50"
              stroke="#F59E0B"
              strokeWidth="3"
            />
            <circle cx="-210" cy="50" r="8" fill="#F59E0B" />
            <text x="-230" y="45" fontSize="10" fill="#F59E0B">A</text>
            <text x="-200" y="30" fontSize="9" fill="#64748b">
              {inletDiameter}мм
            </text>

            {/* Решетка-дробилка (если выбрана) */}
            {extras['Канальный измельчитель'] && (
              <g transform="translate(-160, 40)">
                <rect x="0" y="0" width="30" height="20" fill="#EF4444" opacity="0.6" rx="3" />
                <text x="15" y="12" textAnchor="middle" fontSize="8" fill="white">реш</text>
                <text x="15" y="30" fontSize="8" fill="#EF4444">1шт</text>
              </g>
            )}
          </g>

          {/* Напорный трубопровод B (справа) */}
          <g>
            <line
              x1="100"
              y1="50"
              x2="200"
              y2="50"
              stroke="#F59E0B"
              strokeWidth="3"
            />
            <circle cx="210" cy="50" r="8" fill="#F59E0B" />
            <text x="220" y="45" fontSize="10" fill="#F59E0B">B</text>
            <text x="150" y="30" fontSize="9" fill="#64748b">
              {outletDiameter}мм
            </text>

            {/* Задвижки и клапаны */}
            {extras['Шиберный затвор на подводящей трубе'] && (
              <g transform="translate(120, 40)">
                <rect x="0" y="0" width="20" height="20" fill="#8B5CF6" opacity="0.6" rx="2" />
                <text x="10" y="12" textAnchor="middle" fontSize="7" fill="white">з</text>
              </g>
            )}

            {extras['Расходомер на напорном трубопроводе'] && (
              <g transform="translate(150, 30)">
                <circle cx="0" cy="0" r="10" fill="#EC4899" opacity="0.6" />
                <text x="0" y="2" textAnchor="middle" fontSize="7" fill="white">FM</text>
              </g>
            )}
          </g>

          {/* Обратные клапаны (если выбраны) */}
          {extras['Колодец с задвижкой перед КНС'] && (
            <g transform="translate(-120, 20)">
              <path d="M0,0 L10,-10 L20,0 L10,10 Z" fill="#8B5CF6" opacity="0.6" />
              <text x="10" y="0" textAnchor="middle" fontSize="7" fill="white">OK</text>
            </g>
          )}

          {/* Наземный павильон */}
          {extras['Наземный павильон'] && (
            <g transform="translate(-50, -220)">
              <rect
                x="0"
                y="0"
                width="100"
                height="60"
                fill="#8B5CF6"
                opacity="0.3"
                stroke="#8B5CF6"
                strokeWidth="2"
                rx="5"
              />
              <rect
                x="10"
                y="10"
                width="80"
                height="40"
                fill="white"
                stroke="#8B5CF6"
                strokeWidth="1"
                rx="3"
              />
              <circle cx="30" cy="20" r="3" fill="#8B5CF6" />
              <circle cx="70" cy="20" r="3" fill="#8B5CF6" />
              <text x="50" y="40" textAnchor="middle" fontSize="10" fill="#8B5CF6">
                Павильон
              </text>
              <text x="50" y="70" textAnchor="middle" fontSize="9" fill="#8B5CF6">
                Таль эл. 1шт
              </text>
            </g>
          )}

          {/* Грузоподъемное устройство */}
          {extras['Грузоподъемное устройство'] && (
            <g transform="translate(150, -120)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="0" cy="-10" r="8" fill="#F59E0B" />
              <text x="15" y="0" fontSize="8" fill="#F59E0B">таль</text>
            </g>
          )}

          {/* Газоанализатор */}
          {extras['Газоанализатор'] && (
            <g transform="translate(-150, -120)">
              <rect x="0" y="0" width="30" height="20" fill="#3B82F6" opacity="0.6" rx="3" />
              <text x="15" y="12" textAnchor="middle" fontSize="7" fill="white">GA</text>
            </g>
          )}
        </g>

        {/* Легенда с количеством */}
        <g transform="translate(50, 500)">
          <text x="0" y="0" fontSize="12" fill="#1e293b" fontWeight="600">Комплектация:</text>

          {Object.entries(extras).map(([key, value], index) => {
            if (!value) return null

            let count = '1'
            if (key.includes('задвижк')) count = '4'
            if (key.includes('Обратный клапан')) count = '2'
            if (key.includes('Поплавковый')) count = '4'
            if (key.includes('Вентиляционная')) count = '2'
            if (key.includes('Цепь')) count = '3'
            if (key.includes('Направляющие')) count = '3'

            return (
              <g key={key} transform={`translate(0, ${(index + 1) * 20})`}>
                <circle cx="5" cy="5" r="3" fill="#4A85F6" />
                <text x="15" y="8" fontSize="10" fill="#64748b">
                  {key} - {count} шт
                </text>
              </g>
            )
          })}
        </g>

        <g transform="translate(650, 500)">
          <text x="0" y="0" fontSize="11" fill="#1e293b">Габариты:</text>
          <text x="0" y="20" fontSize="10" fill="#64748b">A: вх. {inletDiameter}мм</text>
          <text x="0" y="35" fontSize="10" fill="#64748b">B: вых. {outletDiameter}мм</text>
          <text x="0" y="50" fontSize="10" fill="#64748b">C: станция ⌀{stationDiameter}м</text>
          <text x="0" y="65" fontSize="10" fill="#64748b">H: {stationHeight}м</text>
        </g>
      </svg>
    </div>
  )
}

export default function CreateRequestPage() {
  const { requestId } = useParams()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const isEditMode = !!requestId

  // Основные поля
  const [formData, setFormData] = useState({
    objectName: '',
    govCustomerName: '',
    configType: 'КНС',
    contactPerson: user?.fullName || '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || '',
  })

  // Расширенные поля для КНС
  const [knsData, setKnsData] = useState({
    // Основные параметры
    capacity: '',
    head: '',
    workingPumps: '',
    reservePumps: '',
    stockPumps: '',
    medium: 'Хоз-бытовые сточные воды',
    temperature: '',
    explosionProof: false,

    // Параметры трубопроводов
    inletDepth: '',
    inletDiameter: '',
    inletMaterial: '',
    inletDirection: '12',

    outletDepth: '',
    outletDiameter: '',
    outletMaterial: '',
    outletDirection: '3',
    outletCount: '1',

    // Параметры станции
    stationDiameter: '',
    stationHeight: '',
    insulation: '',

    // Электрические параметры
    motorStartMethod: 'direct',
    powerInputs: '1',
    cabinetLocation: 'УХЛ1',
  })

  // Дополнительная комплектация для КНС
  const [knsExtras, setKnsExtras] = useState({
    'Канальный измельчитель': false,
    'Шиберный затвор на подводящей трубе': false,
    'Расходомер на напорном трубопроводе': false,
    'Газоанализатор': false,
    'Диспетчеризация': false,
    'Наземный павильон': false,
    'Грузоподъемное устройство': false,
    'Колодец с задвижкой перед КНС': false,
    'Колодец с запорной арматурой после КНС': false,
  })

  // Загружаем тему один раз при монтировании
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
    setIsMounted(true)
  }, [])

  // Применяем тему при изменении darkMode
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

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
  }, [isEditMode, requestId]) // Убрали user из зависимостей

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'

  const validateStep1 = () => {
    if (!formData.objectName.trim()) {
      setError('Укажите название объекта')
      return false
    }
    if (!formData.govCustomerName.trim()) {
      setError('Укажите наименование гос. заказчика')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (formData.configType === 'КНС') {
      if (!knsData.capacity.trim()) {
        setError('Укажите производительность')
        return false
      }
      if (!knsData.head.trim()) {
        setError('Укажите требуемый напор')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    setError('')
    if (activeStep === 1 && validateStep1()) {
      setActiveStep(2)
    } else if (activeStep === 2 && validateStep2()) {
      setActiveStep(3)
    }
  }

  const handleBack = () => {
    setError('')
    setActiveStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    setError('')
    setIsSubmitting(true)

    // Собираем все данные для сохранения
    const requestData = {
      // Основная информация
      objectName: formData.objectName,
      govCustomerName: formData.govCustomerName,
      configType: formData.configType,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,

      // Данные КНС (только если выбран тип КНС)
      kns: formData.configType === 'КНС' ? {
        // Основные параметры
        capacity: knsData.capacity,
        head: knsData.head,
        workingPumps: knsData.workingPumps,
        reservePumps: knsData.reservePumps,
        stockPumps: knsData.stockPumps,
        medium: knsData.medium,
        temperature: knsData.temperature,
        explosionProof: knsData.explosionProof,

        // Параметры трубопроводов
        inletDepth: knsData.inletDepth,
        inletDiameter: knsData.inletDiameter,
        inletMaterial: knsData.inletMaterial,
        inletDirection: knsData.inletDirection,

        outletDepth: knsData.outletDepth,
        outletDiameter: knsData.outletDiameter,
        outletMaterial: knsData.outletMaterial,
        outletDirection: knsData.outletDirection,
        outletCount: knsData.outletCount,

        // Параметры станции
        stationDiameter: knsData.stationDiameter,
        stationHeight: knsData.stationHeight,
        insulation: knsData.insulation,

        // Электрические параметры
        motorStartMethod: knsData.motorStartMethod,
        powerInputs: knsData.powerInputs,
        cabinetLocation: knsData.cabinetLocation,
      } : null,

      // Дополнительная комплектация
      knsExtras: formData.configType === 'КНС' ? knsExtras : null,
    }

    // Имитация отправки на сервер
    setTimeout(() => {
      try {
        if (isEditMode) {
          // Обновление существующей заявки
          const updated = updateRequest(requestId, requestData)

          if (updated) {
            // Перенаправляем на страницу просмотра заявки с сообщением об успехе
            navigate(`/customer/request/${requestId}`, {
              state: {
                message: 'Заявка успешно обновлена',
                type: 'success'
              }
            })
          } else {
            setError('Не удалось обновить заявку')
            setIsSubmitting(false)
          }
        } else {
          // Создание новой заявки
          const id = `REQ-${Date.now().toString(36).toUpperCase()}`
          const newRequest = createRequest({
            id,
            createdAt: new Date().toISOString(),
            customerEmail: user.email,
            customerFullName: user.fullName,
            ...requestData
          })

          if (newRequest) {
            navigate('/customer', {
              state: {
                message: 'Заявка успешно создана',
                type: 'success'
              }
            })
          } else {
            setError('Не удалось создать заявку')
            setIsSubmitting(false)
          }
        }
      } catch (err) {
        console.error('Ошибка при сохранении заявки:', err)
        setError(isEditMode ? 'Ошибка при обновлении заявки' : 'Ошибка при создании заявки')
        setIsSubmitting(false)
      }
    }, 800)
  }

  const getStepStatus = (step) => {
    if (step < activeStep) return 'completed'
    if (step === activeStep) return 'active'
    return 'pending'
  }

  // Опции для выпадающих списков
  const mediumOptions = [
    'Хоз-бытовые сточные воды',
    'Ливневые сточные воды',
    'Промышленные стоки',
    'Другое'
  ]

  const directionOptions = [
    { value: '12', label: '12 часов (вверх)' },
    { value: '1', label: '1 час (30°)' },
    { value: '2', label: '2 часа (60°)' },
    { value: '3', label: '3 часа (вправо)' },
    { value: '4', label: '4 часа (120°)' },
    { value: '5', label: '5 часов (150°)' },
    { value: '6', label: '6 часов (вниз)' },
    { value: '7', label: '7 часов (210°)' },
    { value: '8', label: '8 часов (240°)' },
    { value: '9', label: '9 часов (влево)' },
    { value: '10', label: '10 часов (300°)' },
    { value: '11', label: '11 часов (330°)' },
  ]

  const motorStartOptions = [
    { value: 'direct', label: 'Прямой пуск' },
    { value: 'soft', label: 'Плавный пуск (свыше 45 кВт)' },
    { value: 'frequency', label: 'Частотное регулирование' }
  ]

  const cabinetLocationOptions = [
    { value: 'УХЛ1', label: 'УХЛ1' },
    { value: 'УХЛ4', label: 'УХЛ4' }
  ]

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения.</p>
          <button onClick={() => navigate('/login')} className={styles.primaryButton}>
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/login')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        {/* Шапка страницы */}
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
          {activeStep === 2 && (
            <SchemeForm />
          )}

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
      </main>
    </div>
  )
}