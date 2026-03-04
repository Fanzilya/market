// src/pages/RequestDetailPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { getRequestById } from '../data/requests.js'
import { listOffersByRequestId } from '../data/offers.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './RequestDetailPage.module.css'

// Компонент схемы КНС
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

  // Расчет количества насосов
  const totalPumps = (parseInt(workingPumps) || 2) + (parseInt(reservePumps) || 1)

  return (
    <div className={styles.schemaContainer}>
      <svg width="100%" height="500" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
        {/* Основная схема КНС (вид сбоку) */}
        <g transform="translate(400, 250)">

          {/* Корпус станции */}
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

          {/* Подписи размеров станции */}
          <text x="-120" y="-160" fontSize="10" fill="#64748b">⌀{stationDiameter}м</text>
          <text x="120" y="0" fontSize="10" fill="#64748b" transform="rotate(90, 120, 0)">H={stationHeight}м</text>

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

          {/* Насосы */}
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

            {/* Решетка-дробилка */}
            {extras?.['Канальный измельчитель'] && (
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
            {extras?.['Шиберный затвор на подводящей трубе'] && (
              <g transform="translate(120, 40)">
                <rect x="0" y="0" width="20" height="20" fill="#8B5CF6" opacity="0.6" rx="2" />
                <text x="10" y="12" textAnchor="middle" fontSize="7" fill="white">з</text>
              </g>
            )}

            {extras?.['Расходомер на напорном трубопроводе'] && (
              <g transform="translate(150, 30)">
                <circle cx="0" cy="0" r="10" fill="#EC4899" opacity="0.6" />
                <text x="0" y="2" textAnchor="middle" fontSize="7" fill="white">FM</text>
              </g>
            )}
          </g>

          {/* Дополнительное оборудование */}
          {extras?.['Грузоподъемное устройство'] && (
            <g transform="translate(150, -120)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="0" cy="-10" r="8" fill="#F59E0B" />
              <text x="15" y="0" fontSize="8" fill="#F59E0B">таль</text>
            </g>
          )}

          {extras?.['Газоанализатор'] && (
            <g transform="translate(-150, -120)">
              <rect x="0" y="0" width="30" height="20" fill="#3B82F6" opacity="0.6" rx="3" />
              <text x="15" y="12" textAnchor="middle" fontSize="7" fill="white">GA</text>
            </g>
          )}
        </g>

        {/* Легенда */}
        <g transform="translate(50, 400)">
          <text x="0" y="0" fontSize="12" fill="#1e293b" fontWeight="600">Обозначения:</text>
          <rect x="0" y="10" width="12" height="12" fill="#F59E0B" />
          <text x="18" y="20" fontSize="9" fill="#64748b">Трубопроводы</text>
          <rect x="0" y="30" width="12" height="12" fill="#10B981" />
          <text x="18" y="40" fontSize="9" fill="#64748b">Насосы</text>
          <circle cx="6" cy="58" r="4" fill="#4A85F6" />
          <text x="18" y="62" fontSize="9" fill="#64748b">Корпус</text>
        </g>
      </svg>
    </div>
  )
}

export default function RequestDetailPage() {
  const { requestId } = useParams()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const request = useMemo(() => {
    return requestId ? getRequestById(requestId) : null
  }, [requestId])

  const offers = useMemo(() => {
    if (!requestId) return []
    return listOffersByRequestId(requestId)
  }, [requestId])

  // Проверяем, есть ли КП и находится ли заявка в архиве
  const hasOffers = offers.length > 0
  const isArchived = request?.archived === true

  // Редактирование доступно только если нет КП И заявка не в архиве
  const canEdit = !hasOffers && !isArchived

  // Функция для перехода к списку КП
  const goToOffers = () => {
    navigate(`/customer/request/${requestId}/offers`)
  }

  // Опции для отображения
  const motorStartOptions = {
    direct: 'Прямой пуск',
    soft: 'Плавный пуск (свыше 45 кВт)',
    frequency: 'Частотное регулирование'
  }

  const directionLabels = {
    '12': '12 часов (вверх)',
    '1': '1 час (30°)',
    '2': '2 часа (60°)',
    '3': '3 часа (вправо)',
    '4': '4 часа (120°)',
    '5': '5 часов (150°)',
    '6': '6 часов (вниз)',
    '7': '7 часов (210°)',
    '8': '8 часов (240°)',
    '9': '9 часов (влево)',
    '10': '10 часов (300°)',
    '11': '11 часов (330°)',
  }

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

  if (!request) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔍</div>
          <h2>Заявка не найдена</h2>
          <p>Запрошенная заявка не существует или была удалена</p>
          <button onClick={() => navigate('/customer')} className={styles.primaryButton}>
            Вернуться к заявкам
          </button>
        </div>
      </div>
    )
  }

  const isSupplier = user.role === 'supplier'

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
            <h1 className={styles.title}>Заявка {request.id}</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>/</span>
              <span className={styles.breadcrumb} onClick={() => navigate(isSupplier ? '/supplier' : '/customer')}>
                {isSupplier ? 'Заявки' : 'Мои заявки'}
              </span>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>{request.id}</span>
            </div>
          </div>

          <div className={styles.headerActions}>
            {!isSupplier && (
              <>
                {isArchived && (
                  <span className={styles.archiveBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    В архиве
                  </span>
                )}
                <button
                  className={`${styles.editButton} ${!canEdit ? styles.editButtonDisabled : ''}`}
                  onClick={() => canEdit ? navigate(`/customer/request/${requestId}/edit`) : null}
                  disabled={!canEdit}
                  title={!canEdit ? (hasOffers ? 'Редактирование недоступно: есть коммерческие предложения' : 'Заявка в архиве') : ''}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
                    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Редактировать
                </button>
              </>
            )}

            {/* Кнопка перехода к КП (показываем всегда, если есть КП) */}
            {hasOffers && (
              <button
                className={styles.offersButton}
                onClick={goToOffers}
                title="Перейти к списку коммерческих предложений"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                </svg>
                КП ({offers.length})
              </button>
            )}

            <button
              className={styles.backButton}
              onClick={() => navigate(isSupplier ? '/supplier' : '/customer')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
              </svg>
              Назад
            </button>
          </div>
        </div>

        {/* Карточка заявки */}
        <div className={styles.requestCard}>
          <div className={styles.requestHeader}>
            <h2 className={styles.requestTitle}>{request.objectName}</h2>
            <span className={styles.requestId}>{request.id}</span>
            {isArchived && (
              <span className={styles.archiveChip}>Архивная заявка</span>
            )}
          </div>

          {/* Основная информация */}
          <div className={styles.requestInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Заказчик:</span>
              <span className={styles.infoValue}>{request.govCustomerName}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Тип конфигурации:</span>
              <span className={styles.infoValue}>{request.configType}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Дата создания:</span>
              <span className={styles.infoValue}>
                {new Date(request.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
            {request.updatedAt && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Последнее обновление:</span>
                <span className={styles.infoValue}>
                  {new Date(request.updatedAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            )}
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Контактное лицо:</span>
              <span className={styles.infoValue}>{request.contactPerson}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Телефон:</span>
              <span className={styles.infoValue}>{request.contactPhone || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{request.contactEmail}</span>
            </div>
          </div>

          {/* Схема КНС (только для типа КНС) */}
          {request.configType === 'КНС' && request.kns && (
            <div className={styles.schemaSection}>
              <h3 className={styles.sectionTitle}>Схема КНС</h3>
              <div className={styles.schemaWrapper}>
                <KNSSchema data={request.kns} extras={request.knsExtras} />
              </div>
            </div>
          )}

          {/* Конфигурация КНС */}
          {request.configType === 'КНС' && request.kns && (
            <>
              <h3 className={styles.sectionTitle}>Конфигурация КНС</h3>

              {/* Основные параметры */}
              <div className={styles.paramsSection}>
                <h4 className={styles.subsectionTitle}>Основные параметры</h4>
                <div className={styles.paramsGrid}>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Производительность:</span>
                    <span className={styles.paramValue}>{request.kns.capacity || '—'} м³/ч</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Требуемый напор:</span>
                    <span className={styles.paramValue}>{request.kns.head || '—'} м</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Рабочих насосов:</span>
                    <span className={styles.paramValue}>{request.kns.workingPumps || '0'}</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Резервных насосов:</span>
                    <span className={styles.paramValue}>{request.kns.reservePumps || '0'}</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Насосов на склад:</span>
                    <span className={styles.paramValue}>{request.kns.stockPumps || '0'}</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Перекачиваемая среда:</span>
                    <span className={styles.paramValue}>{request.kns.medium || '—'}</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Температура среды:</span>
                    <span className={styles.paramValue}>{request.kns.temperature || '—'} °C</span>
                  </div>
                  <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>Взрывозащищенность:</span>
                    <span className={styles.paramValue}>{request.kns.explosionProof ? 'Да' : 'Нет'}</span>
                  </div>
                </div>
              </div>

              {/* Габаритные размеры трубопроводов и корпуса */}
              <div className={styles.paramsSection}>
                <h4 className={styles.subsectionTitle}>Габаритные размеры трубопроводов и корпуса</h4>
                <div className={styles.paramsGrid}>
                  {request.kns.inletDepth && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Глубина подводящего A:</span>
                      <span className={styles.paramValue}>{request.kns.inletDepth} м</span>
                    </div>
                  )}
                  {request.kns.inletDiameter && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Диаметр подводящего B:</span>
                      <span className={styles.paramValue}>
                        {request.kns.inletDiameter} мм {request.kns.inletMaterial ? `(${request.kns.inletMaterial})` : ''}
                      </span>
                    </div>
                  )}
                  {request.kns.inletDirection && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Направление подводящего:</span>
                      <span className={styles.paramValue}>
                        {directionLabels[request.kns.inletDirection] || request.kns.inletDirection}
                      </span>
                    </div>
                  )}
                  {request.kns.outletDepth && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Глубина напорного D:</span>
                      <span className={styles.paramValue}>{request.kns.outletDepth} м</span>
                    </div>
                  )}
                  {request.kns.outletDiameter && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Диаметр напорного C:</span>
                      <span className={styles.paramValue}>
                        {request.kns.outletDiameter} мм {request.kns.outletMaterial ? `(${request.kns.outletMaterial})` : ''}
                      </span>
                    </div>
                  )}
                  {request.kns.outletDirection && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Направление напорного:</span>
                      <span className={styles.paramValue}>
                        {directionLabels[request.kns.outletDirection] || request.kns.outletDirection}
                      </span>
                    </div>
                  )}
                  {request.kns.outletCount && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Количество напорных:</span>
                      <span className={styles.paramValue}>{request.kns.outletCount}</span>
                    </div>
                  )}
                  {request.kns.stationDiameter && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Диаметр станции:</span>
                      <span className={styles.paramValue}>{request.kns.stationDiameter} м</span>
                    </div>
                  )}
                  {request.kns.stationHeight && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Высота станции:</span>
                      <span className={styles.paramValue}>{request.kns.stationHeight} м</span>
                    </div>
                  )}
                  {request.kns.insulation && (
                    <div className={styles.paramItem}>
                      <span className={styles.paramLabel}>Утепление корпуса:</span>
                      <span className={styles.paramValue}>{request.kns.insulation} м</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Электрические параметры */}
              {(request.kns.motorStartMethod || request.kns.powerInputs || request.kns.cabinetLocation) && (
                <div className={styles.paramsSection}>
                  <h4 className={styles.subsectionTitle}>Электрические параметры</h4>
                  <div className={styles.paramsGrid}>
                    {request.kns.motorStartMethod && (
                      <div className={styles.paramItem}>
                        <span className={styles.paramLabel}>Метод пуска:</span>
                        <span className={styles.paramValue}>
                          {motorStartOptions[request.kns.motorStartMethod] || request.kns.motorStartMethod}
                        </span>
                      </div>
                    )}
                    {request.kns.powerInputs && (
                      <div className={styles.paramItem}>
                        <span className={styles.paramLabel}>Вводов питания:</span>
                        <span className={styles.paramValue}>{request.kns.powerInputs}</span>
                      </div>
                    )}
                    {request.kns.cabinetLocation && (
                      <div className={styles.paramItem}>
                        <span className={styles.paramLabel}>Место установки шкафа:</span>
                        <span className={styles.paramValue}>{request.kns.cabinetLocation}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Дополнительная комплектация */}
              {request.knsExtras && Object.values(request.knsExtras).some(v => v) && (
                <div className={styles.extrasSection}>
                  <h4 className={styles.subsectionTitle}>Дополнительная комплектация</h4>
                  <div className={styles.extrasList}>
                    {Object.entries(request.knsExtras)
                      .filter(([_, value]) => value)
                      .map(([key]) => (
                        <span key={key} className={styles.extraBadge}>{key}</span>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Коммерческие предложения */}
          {offers.length > 0 && (
            <div className={styles.offersSection}>
              <div className={styles.offersHeader}>
                <h3 className={styles.sectionTitle}>
                  Коммерческие предложения ({offers.length})
                </h3>
                <button
                  className={styles.viewAllOffersButton}
                  onClick={goToOffers}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Все КП
                </button>
              </div>
              <div className={styles.offersList}>
                {offers.slice(0, 3).map((offer, index) => (
                  <div key={index} className={styles.offerCard}>
                    <div className={styles.offerHeader}>
                      <span className={styles.offerSupplier}>
                        {offer.supplierCompany || offer.supplierFullName}
                      </span>
                      <span className={styles.offerDate}>
                        {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className={styles.offerPrice}>
                      <span className={styles.priceLabel}>Цена:</span>
                      <span className={styles.priceValue}>{offer.price} ₽</span>
                    </div>
                    {offer.comment && (
                      <div className={styles.offerComment}>
                        <p>{offer.comment}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {offers.length > 3 && (
                <button
                  className={styles.viewAllLink}
                  onClick={goToOffers}
                >
                  Показать все предложения ({offers.length}) →
                </button>
              )}
            </div>
          )}

          {/* Если нет КП, показываем кнопку для просмотра (но она будет неактивной или информационной) */}
          {!hasOffers && !isSupplier && (
            <div className={styles.noOffersSection}>
              <p className={styles.noOffersText}>
                На данную заявку пока нет коммерческих предложений
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}