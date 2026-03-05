// pages/SupplierPreviewPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { getRequestById } from '../data/requests.js'
import { addToFavorites, removeFromFavorites, isRequestFavorite } from '../data/favorites.js'
import Sidebar from '../components/Sidebar.jsx'
import FreeClicksModal from '../components/FreeClicksModal.jsx'
import styles from './SupplierPreviewPage.module.css'

export default function SupplierPreviewPage() {
  const { requestId } = useParams()
  const location = useLocation()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [request, setRequest] = useState(location.state?.request || null)
  const [showFreeClicksModal, setShowFreeClicksModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [freeClicksLeft, setFreeClicksLeft] = useState(5)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
    
    // Загружаем количество бесплатных кликов из localStorage
    const savedClicks = localStorage.getItem('freeClicks')
    if (savedClicks) {
      setFreeClicksLeft(parseInt(savedClicks))
    }
    
    // Проверяем, откликался ли уже на эту заявку
    const respondedRequests = JSON.parse(localStorage.getItem('respondedRequests') || '[]')
    if (requestId && respondedRequests.includes(requestId)) {
      setHasResponded(true)
    }
    
    // Проверяем, в избранном ли заявка
    if (user?.email && requestId) {
      setIsFavorite(isRequestFavorite(user.email, requestId))
    }
  }, [requestId, user])

  useEffect(() => {
    localStorage.setItem('freeClicks', freeClicksLeft.toString())
  }, [freeClicksLeft])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Если нет данных в state, загружаем по ID
  useEffect(() => {
    if (!request && requestId) {
      const loadedRequest = getRequestById(requestId)
      setRequest(loadedRequest)
    }
  }, [requestId, request])

  const handleToggleFavorite = () => {
    if (!user?.email || !requestId) return
    
    if (isFavorite) {
      removeFromFavorites(user.email, requestId)
    } else {
      addToFavorites(user.email, requestId)
    }
    setIsFavorite(!isFavorite)
  }

  const handleRespond = () => {
    // Показываем модальное окно с информацией о бесплатных кликах
    setShowFreeClicksModal(true)
  }

  const handleConfirmFreeClick = () => {
    // Уменьшаем количество бесплатных кликов
    const newClicksLeft = freeClicksLeft - 1
    setFreeClicksLeft(newClicksLeft)
    setShowFreeClicksModal(false)
    setHasResponded(true)
    
    // Сохраняем в localStorage, что откликнулись на эту заявку
    const respondedRequests = JSON.parse(localStorage.getItem('respondedRequests') || '[]')
    respondedRequests.push(requestId)
    localStorage.setItem('respondedRequests', JSON.stringify(respondedRequests))
    
    // Прокручиваем страницу вверх, чтобы показать полную информацию
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoToBilling = () => {
    navigate('/billing', {
      state: {
        message: 'Бесплатные клики закончились. Для продолжения необходимо пополнить счет.'
      }
    })
  }

  const handleCreateOffer = () => {
    navigate(`/supplier/request/${request.id}/offer/new`, {
      state: { 
        request, 
        freeClicksLeft 
      }
    })
  }

  // Функция для получения технических характеристик (без контактной информации)
  const getTechSpecs = (request) => {
    if (!request.kns) return []

    const specs = []
    Object.entries(request.kns).forEach(([key, value]) => {
      if (value && !['contactPerson', 'contactPhone', 'contactEmail', 'govCustomerName'].includes(key)) {
        let label = key
        let displayValue = value
        
        switch(key) {
          case 'capacity': label = 'Производительность'; displayValue = `${value} м³/ч`; break;
          case 'head': label = 'Напор'; displayValue = `${value} м`; break;
          case 'workingPumps': label = 'Рабочих насосов'; break;
          case 'reservePumps': label = 'Резервных насосов'; break;
          case 'stockPumps': label = 'Насосов на склад'; break;
          case 'medium': label = 'Перекачиваемая среда'; break;
          case 'temperature': label = 'Температура'; displayValue = `${value}°C`; break;
          case 'explosionProof': label = 'Взрывозащита'; displayValue = value ? 'Да' : 'Нет'; break;
          case 'inletDepth': label = 'Глубина входа'; displayValue = `${value} м`; break;
          case 'inletDiameter': label = 'Диаметр входа'; displayValue = `${value} мм`; break;
          case 'inletMaterial': label = 'Материал входа'; break;
          case 'outletDepth': label = 'Глубина выхода'; displayValue = `${value} м`; break;
          case 'outletDiameter': label = 'Диаметр выхода'; displayValue = `${value} мм`; break;
          case 'outletMaterial': label = 'Материал выхода'; break;
          case 'stationDiameter': label = 'Диаметр станции'; displayValue = `${value} м`; break;
          case 'stationHeight': label = 'Высота станции'; displayValue = `${value} м`; break;
          default: label = key; break;
        }
        specs.push({ label, value: displayValue })
      }
    })
    return specs
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения</p>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>
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
          <button onClick={() => navigate('/supplier')} className={styles.primaryButton}>
            Вернуться к списку
          </button>
        </div>
      </div>
    )
  }

  const techSpecs = getTechSpecs(request)

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Шапка страницы с кнопкой избранного */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.title}>
                {hasResponded ? 'Заявка' : 'Предпросмотр заявки'}
              </h1>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
                <span className={styles.separator}>›</span>
                <span className={styles.breadcrumb} onClick={() => navigate('/supplier')}>Заявки</span>
                <span className={styles.separator}>›</span>
                <span className={styles.current}>
                  {hasResponded ? request.id : `Предпросмотр ${request.id}`}
                </span>
              </div>
            </div>
            
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
              </svg>
            </button>
          </div>

          {/* Информационный баннер в зависимости от статуса */}
          {!hasResponded ? (
            <div className={styles.infoBanner}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
                <path d="M12 16V12" stroke="#F59E0B" strokeWidth="2"/>
                <circle cx="12" cy="8" r="1" fill="#F59E0B"/>
              </svg>
              <div>
                <strong>Ограниченный доступ</strong>
                <p>Вы видите только технические характеристики. Чтобы увидеть контактную информацию заказчика и полные данные, необходимо откликнуться на заявку.</p>
              </div>
            </div>
          ) : (
            <div className={styles.successBanner}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#10B981"/>
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2"/>
              </svg>
              <div>
                <strong>Вы откликнулись на заявку!</strong>
                <p>Теперь вам доступна полная информация. Можете создать коммерческое предложение.</p>
              </div>
            </div>
          )}

          {/* Основная информация о заявке */}
          <div className={styles.requestCard}>
            <div className={styles.requestHeader}>
              <h2 className={styles.requestTitle}>{request.objectName}</h2>
              <span className={styles.requestId}>{request.id}</span>
            </div>

            {/* Контактная информация (показывается только после отклика) */}
            {hasResponded && (
              <div className={styles.contactSection}>
                <h3 className={styles.sectionTitle}>Контактная информация</h3>
                <div className={styles.contactGrid}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Заказчик:</span>
                    <span className={styles.contactValue}>{request.govCustomerName}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Контактное лицо:</span>
                    <span className={styles.contactValue}>{request.contactPerson}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Телефон:</span>
                    <span className={styles.contactValue}>{request.contactPhone || '—'}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Email:</span>
                    <span className={styles.contactValue}>{request.contactEmail}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Общая информация */}
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Тип конфигурации</span>
                <span className={styles.infoValue}>{request.configType || 'КНС'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Дата создания</span>
                <span className={styles.infoValue}>
                  {new Date(request.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              {request.region && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Регион</span>
                  <span className={styles.infoValue}>{request.region}</span>
                </div>
              )}
            </div>

            {/* Технические характеристики */}
            <h3 className={styles.sectionTitle}>Технические характеристики</h3>
            <div className={styles.specsGrid}>
              {techSpecs.map((spec, index) => (
                <div key={index} className={styles.specItem}>
                  <span className={styles.specLabel}>{spec.label}:</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Дополнительная комплектация (если есть) */}
            {request.knsExtras && Object.values(request.knsExtras).some(v => v) && (
              <>
                <h3 className={styles.sectionTitle}>Дополнительная комплектация</h3>
                <div className={styles.extrasList}>
                  {Object.entries(request.knsExtras)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <span key={key} className={styles.extraBadge}>{key}</span>
                    ))}
                </div>
              </>
            )}

            {/* Блок с информацией о бесплатных кликах (до отклика) */}
            {!hasResponded && (
              <div className={styles.clicksInfo}>
                <div className={styles.clicksInfoIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2"/>
                  </svg>
                </div>
                <div className={styles.clicksInfoContent}>
                  <span className={styles.clicksInfoTitle}>У вас осталось <strong>{freeClicksLeft}</strong> бесплатных откликов</span>
                  <p className={styles.clicksInfoText}>
                    После отклика вы сможете отправить коммерческое предложение и увидеть полную информацию о заказчике.
                  </p>
                </div>
              </div>
            )}

            {/* Кнопка отклика (до отклика) */}
            {!hasResponded && (
              <div className={styles.respondSection}>
                <button
                  className={styles.respondButton}
                  onClick={handleRespond}
                  disabled={freeClicksLeft === 0}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2"/>
                    <path d="M12 5L12 19" stroke="white" strokeWidth="2"/>
                  </svg>
                  {freeClicksLeft > 0 ? 'Откликнуться на заявку' : 'Бесплатные отклики закончились'}
                </button>
                <p className={styles.respondHint}>
                  {freeClicksLeft > 0 
                    ? `Останется ${freeClicksLeft - 1} бесплатных откликов`
                    : 'Пополните счет, чтобы продолжить'}
                </p>
              </div>
            )}

            {/* Кнопка создания коммерческого предложения (после отклика) */}
            {hasResponded && (
              <div className={styles.offerSection}>
                <button
                  className={styles.offerButton}
                  onClick={handleCreateOffer}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2"/>
                  </svg>
                  Создать коммерческое предложение
                </button>
                <p className={styles.offerHint}>
                  После создания КП заказчик сможет увидеть ваше предложение
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Модальное окно с информацией о бесплатных кликах */}
      {showFreeClicksModal && (
        <FreeClicksModal
          clicksLeft={freeClicksLeft}
          onConfirm={handleConfirmFreeClick}
          onClose={() => setShowFreeClicksModal(false)}
          onGoToBilling={handleGoToBilling}
        />
      )}
    </div>
  )
}