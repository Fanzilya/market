// pages/DashboardPage.jsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { listRequestsForCustomerEmail, listAllRequests } from '../data/requests.js'
import { listOffersBySupplierEmail } from '../data/offers.js'
import Sidebar from '../components/Sidebar.jsx'
import NotificationBell from '../components/NotificationBell.jsx'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
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

  // Временная функция для подсчета КП (заглушка)
  const countOffersForRequest = (requestId) => {
    return 0 // Пока всегда возвращаем 0
  }

  // Получаем реальные данные для статистики
  const customerRequests = useMemo(() => {
    if (!user?.email || user.role !== 'customer') return []
    return listRequestsForCustomerEmail(user.email)
  }, [user])

  const supplierRequests = useMemo(() => {
    if (user?.role !== 'supplier') return []
    return listAllRequests()
  }, [user])

  const supplierOffers = useMemo(() => {
    if (!user?.email || user.role !== 'supplier') return []
    // Проверяем, существует ли функция
    if (typeof listOffersBySupplierEmail === 'function') {
      return listOffersBySupplierEmail(user.email)
    }
    return []
  }, [user])

  // Определяем, какой контент показывать в зависимости от роли
  const isCustomer = user?.role === 'customer'
  const isSupplier = user?.role === 'supplier'

  // Сервисы для заказчика
  const customerServices = [
    {
      category: 'Заявки',
      title: 'Мои заявки',
      description: 'Создавайте и управляйте заявками на инженерное оборудование. Получайте коммерческие предложения от исполнителей.',
      icon: 'requests',
      color: '#1877F2',
      actions: [
        { label: 'Перейти к заявкам', type: 'primary', link: '/customer' },
        { label: 'Создать заявку', type: 'secondary', link: '/customer/request/new' }
      ],
      stats: {
        'Всего': customerRequests.length,
        'С КП': customerRequests.filter(r => countOffersForRequest(r.id) > 0).length
      }
    },
    {
      category: 'Аналитика',
      title: 'Конъюнктурный анализ',
      description: 'Сравнивайте коммерческие предложения, выбирайте оптимальные решения и формируйте отчёты для экспертизы.',
      icon: 'analysis',
      color: '#10B981',
      actions: [
        { label: 'Перейти к анализу', type: 'secondary', link: '/customer/analysis' }
      ],
      stats: {
        'Предложений': '0',
        'Анализов': '0'
      }
    },
    {
      category: 'Сервисы',
      title: 'Каталог оборудования',
      description: 'Просматривайте каталог производителей, техническую информацию и актуальные цены.',
      icon: 'catalog',
      color: '#F59E0B',
      actions: [
        { label: 'Открыть каталог', type: 'secondary', link: '/catalog' }
      ],
      badges: ['КНС', 'ЛОС', 'Насосы', 'Трубопроводы']
    }
  ]

  // Сервисы для исполнителя
  const supplierServices = [
    {
      category: 'Заявки',
      title: 'Доступные заявки',
      description: 'Просматривайте заявки заказчиков, изучайте технические требования и создавайте коммерческие предложения.',
      icon: 'requests',
      color: '#1877F2',
      actions: [
        { label: 'Перейти к заявкам', type: 'primary', link: '/supplier' }
      ],
      stats: {
        'Новых': supplierRequests.length,
        'Активных': supplierRequests.length
      },
      extraAction: {
        label: 'Бесплатных кликов: 5',
        link: '/billing'
      }
    },
    {
      category: 'Предложения',
      title: 'Мои коммерческие предложения',
      description: 'Отслеживайте статусы отправленных предложений, просматривайте историю откликов.',
      icon: 'offers',
      color: '#10B981',
      actions: [
        { label: 'Мои предложения', type: 'secondary', link: '/supplier/offers' }
      ],
      stats: {
        'Отправлено': supplierOffers.length,
        'Просмотрено': '0'
      }
    },
    {
      category: 'Инструменты',
      title: 'Подбор оборудования',
      description: 'Используйте сервисы для подбора материалов и комплектации инженерного оборудования.',
      icon: 'tools',
      color: '#F59E0B',
      actions: [
        { label: 'Подобрать материалы', type: 'secondary', link: '/supplier/materials' }
      ],
      badges: ['КНС', 'ЛОС', 'Насосные группы']
    }
  ]

  // Общие сервисы для всех
  const commonServices = [
    {
      category: 'Профиль',
      title: 'Настройки аккаунта',
      description: 'Управляйте данными профиля, настройками уведомлений и безопасностью.',
      icon: 'profile',
      color: '#8B5CF6',
      actions: [
        { label: 'Профиль', type: 'secondary', link: '/profile' },
        { label: 'Настройки', type: 'secondary', link: '/settings' }
      ]
    }
  ]

  // Формируем итоговый список сервисов на основе роли
  const services = useMemo(() => {
    let baseServices = []
    if (isCustomer) {
      baseServices = [...customerServices]
    } else if (isSupplier) {
      baseServices = [...supplierServices]
    }
    return [...baseServices, ...commonServices]
  }, [isCustomer, isSupplier, customerRequests.length, supplierRequests.length, supplierOffers.length])

  // Активность для заказчика
  const customerActivity = [
    {
      icon: 'requests',
      color: '#1877F2',
      title: customerRequests.length > 0 ? 'Последняя заявка' : 'Заявок пока нет',
      time: customerRequests.length > 0
        ? new Date(customerRequests[0]?.createdAt).toLocaleDateString('ru-RU')
        : 'Создайте первую заявку'
    },
    {
      icon: 'offers',
      color: '#10B981',
      title: 'Коммерческие предложения',
      time: '0 откликов'
    },
    {
      icon: 'login',
      color: '#F59E0B',
      title: 'Последний вход',
      time: 'Только что'
    }
  ]

  // Активность для исполнителя
  const supplierActivity = [
    {
      icon: 'requests',
      color: '#1877F2',
      title: 'Доступно заявок',
      time: `${supplierRequests.length} новых заявок`
    },
    {
      icon: 'offers',
      color: '#10B981',
      title: 'Мои отклики',
      time: `${supplierOffers.length} отправлено`
    },
    {
      icon: 'login',
      color: '#F59E0B',
      title: 'Последний вход',
      time: 'Только что'
    }
  ]

  // Выбираем активность по роли
  const activity = isCustomer ? customerActivity : supplierActivity

  const getIcon = (iconName) => {
    const icons = {
      requests: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      analysis: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M21 21H4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 15L10 11L13 14L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      catalog: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      offers: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      tools: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14.7 6.3C15.1 5.9 15.5 5.6 16 5.4C16.5 5.1 17 5 17.5 5C18.4 5 19.2 5.3 19.9 5.9L16 9.8L17.5 11.5L21.4 7.6C22 8.3 22.3 9.1 22.3 10C22.3 11.4 21.8 12.5 20.7 13.6C19.6 14.7 18.5 15.2 17.2 15.2C16.4 15.2 15.7 15 14.9 14.7L6.7 22.9C6.1 23.5 5.4 23.8 4.6 23.8C3.8 23.8 3.1 23.5 2.5 22.9C1.9 22.3 1.6 21.6 1.6 20.8C1.6 20 1.9 19.3 2.5 18.7L10.7 10.5C10.3 9.6 10.1 8.7 10.1 7.8C10.1 6.4 10.6 5.2 11.7 4.1C12.8 3 14 2.5 15.4 2.5C16.2 2.5 17 2.7 17.8 3.1L14 6.9L14.7 6.3Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      profile: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      login: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
    return icons[iconName] || icons.requests
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

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <div className={styles.mainContent}>
        {/* Шапка */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Личный кабинет</h1>
            <div className={styles.userGreeting}>
              <span className={styles.userName}>{user?.fullName}</span>
              <span className={styles.userRoleBadge}>
                {user?.role === 'customer' ? 'Заказчик' : 'Исполнитель'}
              </span>
            </div>
          </div>

          {/* Правый блок со статистикой и уведомлениями */}
          <div className={styles.headerRight}>
            {/* Статистика в зависимости от роли */}
            {isCustomer && (
              <div className={styles.headerStats}>
                <div className={styles.headerStat}>
                  <span className={styles.headerStatValue}>{customerRequests.length}</span>
                  <span className={styles.headerStatLabel}>Всего заявок</span>
                </div>
                <div className={styles.headerStatDivider}></div>
                <div className={styles.headerStat}>
                  <span className={styles.headerStatValue}>
                    {customerRequests.filter(r => countOffersForRequest(r.id) > 0).length}
                  </span>
                  <span className={styles.headerStatLabel}>С КП</span>
                </div>
              </div>
            )}

            {isSupplier && (
              <div className={styles.headerStats}>
                <div className={styles.headerStat}>
                  <span className={styles.headerStatValue}>{supplierRequests.length}</span>
                  <span className={styles.headerStatLabel}>Доступно заявок</span>
                </div>
                <div className={styles.headerStatDivider}></div>
                <div className={styles.headerStat}>
                  <span className={styles.headerStatValue}>{supplierOffers.length}</span>
                  <span className={styles.headerStatLabel}>Мои отклики</span>
                </div>
              </div>
            )}

            {/* Уведомления */}
            <NotificationBell user={user} />
          </div>
        </div>

        {/* Информационный блок для исполнителя о бесплатных кликах */}
        {isSupplier && (
          <div className={styles.infoBanner}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#1877F2" strokeWidth="2" />
              <path d="M12 6V12L16 14" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className={styles.infoBannerContent}>
              <span className={styles.infoBannerTitle}>У вас 5 бесплатных просмотров</span>
              <span className={styles.infoBannerText}>После использования каждый просмотр заявки будет стоить 100 ₽</span>
            </div>
            <button className={styles.infoBannerButton} onClick={() => navigate('/billing')}>
              Пополнить счет
            </button>
          </div>
        )}

        {/* Сетка сервисов */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              className={styles.serviceCard}
              style={{ '--card-accent': service.color }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardCategory}>{service.category}</div>
                <div className={styles.cardIcon} style={{ color: service.color }}>
                  {getIcon(service.icon)}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>

              {service.stats && (
                <div className={styles.cardStats}>
                  {Object.entries(service.stats).map(([key, value]) => (
                    <div key={key} className={styles.stat}>
                      <span className={styles.statNumber}>{value}</span>
                      <span className={styles.statKey}>{key}</span>
                    </div>
                  ))}
                </div>
              )}

              {service.badges && (
                <div className={styles.cardBadges}>
                  {service.badges.map((badge, i) => (
                    <span key={i} className={styles.badge}>{badge}</span>
                  ))}
                </div>
              )}

              <div className={styles.cardActions}>
                {service.actions.map((action, i) => (
                  <button
                    key={i}
                    className={`${styles.actionButton} ${styles[action.type]}`}
                    onClick={() => navigate(action.link)}
                  >
                    {action.label}
                    {action.type === 'secondary' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {service.extraAction && (
                <button
                  className={styles.extraAction}
                  onClick={() => navigate(service.extraAction.link)}
                >
                  {service.extraAction.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Блок с активностью */}
        <div className={styles.activitySection}>
          <h2 className={styles.sectionTitle}>Недавняя активность</h2>
          <div className={styles.activityGrid}>
            {activity.map((item, index) => (
              <div key={index} className={styles.activityCard}>
                <div className={styles.activityIcon} style={{ background: item.color }}>
                  {getIcon(item.icon)}
                </div>
                <div className={styles.activityContent}>
                  <span className={styles.activityTitle}>{item.title}</span>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Рекомендации в зависимости от роли */}
        {isCustomer && customerRequests.length === 0 && (
          <div className={styles.recommendationCard}>
            <h3 className={styles.recommendationTitle}>Начните работу с платформой</h3>
            <p className={styles.recommendationText}>
              Создайте первую заявку на инженерное оборудование и получите коммерческие предложения от проверенных исполнителей.
            </p>
            <button
              className={styles.recommendationButton}
              onClick={() => navigate('/customer/request/new')}
            >
              Создать заявку
            </button>
          </div>
        )}

        {isSupplier && supplierRequests.length === 0 && (
          <div className={styles.recommendationCard}>
            <h3 className={styles.recommendationTitle}>Начните получать заказы</h3>
            <p className={styles.recommendationText}>
              Просматривайте актуальные заявки заказчиков и создавайте коммерческие предложения. Используйте бесплатные просмотры.
            </p>
            <button
              className={styles.recommendationButton}
              onClick={() => navigate('/supplier')}
            >
              Перейти к заявкам
            </button>
          </div>
        )}
      </div>
    </div>
  )
}