// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('customer')
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [knsVisible, setKnsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [currentPartnerSlide, setCurrentPartnerSlide] = useState(0)
  const knsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Проверяем видимость блока КНС
      if (knsRef.current) {
        const rect = knsRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.75
        setKnsVisible(isVisible)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Автоматическое переключение отзывов
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Автоматическое переключение партнеров
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerSlide((prev) => 
        prev === Math.ceil(partners.length / 4) - 1 ? 0 : prev + 1
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Управление заявками',
      description: 'Создавайте, отслеживайте и управляйте всеми заявками в единой системе. Полная прозрачность и контроль.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11C9.76142 11 12 8.76142 12 6C12 3.23858 9.76142 1 7 1C4.23858 1 2 3.23858 2 6C2 8.76142 4.23858 11 7 11Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Работа с исполнителями',
      description: 'Получайте предложения от проверенных исполнителей. Сравнивайте цены и выбирайте лучшие условия.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Аналитика и отчёты',
      description: 'Детальная аналитика по процессам. Конъюнктурный анализ цен и обоснованные решения.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Контроль сроков',
      description: 'Автоматические уведомления о дедлайнах. Никогда не пропускайте важные сроки.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Безопасность данных',
      description: 'Современные методы шифрования. Регулярное резервное копирование.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M21 15C21 15.5523 20.5523 16 20 16H7L3 21V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V15Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Поддержка 24/7',
      description: 'Наша команда готова помочь в любое время. Быстрые ответы на вопросы.',
    },
  ]

  const stats = [
    { value: '500+', label: 'Активных пользователей' },
    { value: '1000+', label: 'Созданных заявок' },
    { value: '98%', label: 'Довольных клиентов' },
    { value: '24/7', label: 'Поддержка' },
  ]

  const customerFeatures = [
    { icon: '📋', text: 'Создание заявок через удобный опросный лист' },
    { icon: '💰', text: 'Сравнение коммерческих предложений' },
    { icon: '📊', text: 'Конъюнктурный анализ цен' },
    { icon: '✅', text: 'Выбор оптимального исполнителя' },
    { icon: '📈', text: 'Контроль выполнения работ' },
  ]

  const supplierFeatures = [
    { icon: '📥', text: 'Просмотр заявок от заказчиков' },
    { icon: '📤', text: 'Отправка коммерческих предложений' },
    { icon: '🔧', text: 'Подбор оборудования под требования' },
    { icon: '📱', text: 'Уведомления о новых заявках' },
    { icon: '📊', text: 'Статистика и аналитика предложений' },
  ]

  const testimonials = [
    {
      name: 'Алексей Иванов',
      role: 'Главный инженер, ГУИС',
      text: 'Платформа значительно упростила процесс сбора коммерческих предложений. Раньше уходили недели, теперь всё автоматизировано.',
      rating: 5,
    },
    {
      name: 'Елена Петрова',
      role: 'Руководитель отдела закупок',
      text: 'Удобный интерфейс, понятные формы. Конъюнктурный анализ цен теперь занимает минуты, а не дни.',
      rating: 5,
    },
    {
      name: 'Сергей Смирнов',
      role: 'Директор по развитию',
      text: 'Как поставщик, я вижу все актуальные заявки и могу быстро реагировать. Отличный инструмент для бизнеса.',
      rating: 5,
    },
  ]

  const partners = [
    {
      id: 1,
      name: 'Грундфос',
      fullName: 'Grundfos',
      logo: '🌊',
      category: 'Насосное оборудование',
      description: 'Мировой лидер в производстве насосного оборудования.',
      country: 'Дания',
      founded: 1945,
      website: 'www.grundfos.com',
      products: 234,
      slug: 'grundfos',
    },
    {
      id: 2,
      name: 'WILO',
      fullName: 'WILO SE',
      logo: '⚙️',
      category: 'Насосы и системы',
      description: 'Немецкий производитель насосов и насосных систем.',
      country: 'Германия',
      founded: 1872,
      website: 'www.wilo.com',
      products: 189,
      slug: 'wilo',
    },
    {
      id: 3,
      name: 'Pedrollo',
      fullName: 'Pedrollo S.p.A.',
      logo: '🔧',
      category: 'Насосное оборудование',
      description: 'Итальянский производитель насосов для бытового и промышленного применения.',
      country: 'Италия',
      founded: 1974,
      website: 'www.pedrollo.com',
      products: 156,
      slug: 'pedrollo',
    },
    {
      id: 4,
      name: 'КИТ',
      fullName: 'Завод КИТ',
      logo: '🏭',
      category: 'Промышленное оборудование',
      description: 'Российский производитель насосного оборудования и комплектующих.',
      country: 'Россия',
      founded: 1998,
      website: 'www.kit.ru',
      products: 98,
      slug: 'kit',
    },
    {
      id: 5,
      name: 'Ebara',
      fullName: 'Ebara Corporation',
      logo: '💧',
      category: 'Насосные станции',
      description: 'Японский производитель промышленных насосов и компрессоров.',
      country: 'Япония',
      founded: 1912,
      website: 'www.ebara.com',
      products: 145,
      slug: 'ebara',
    },
    {
      id: 6,
      name: 'Calpeda',
      fullName: 'Calpeda S.p.A.',
      logo: '🔩',
      category: 'Насосное оборудование',
      description: 'Итальянский производитель насосов для водоснабжения и отопления.',
      country: 'Италия',
      founded: 1959,
      website: 'www.calpeda.it',
      products: 112,
      slug: 'calpeda',
    },
    {
      id: 7,
      name: 'Джилекс',
      fullName: 'Джилекс',
      logo: '🇷🇺',
      category: 'Насосы для воды',
      description: 'Российский производитель насосного оборудования для частных домов и промышленности.',
      country: 'Россия',
      founded: 1993,
      website: 'www.djilex.ru',
      products: 167,
      slug: 'jileks',
    },
    {
      id: 8,
      name: 'Вихрь',
      fullName: 'Вихрь',
      logo: '🌀',
      category: 'Насосное оборудование',
      description: 'Российский производитель насосов и садовой техники.',
      country: 'Россия',
      founded: 2000,
      website: 'www.vihr.ru',
      products: 89,
      slug: 'vihr',
    },
    {
      id: 9,
      name: 'DAB',
      fullName: 'DAB Pumps',
      logo: '⚡',
      category: 'Насосное оборудование',
      description: 'Итальянский производитель насосов для водоснабжения и канализации.',
      country: 'Италия',
      founded: 1975,
      website: 'www.dabpumps.com',
      products: 134,
      slug: 'dab',
    },
    {
      id: 10,
      name: 'Lowara',
      fullName: 'Lowara',
      logo: '🌍',
      category: 'Насосные системы',
      description: 'Итальянский производитель насосов из нержавеющей стали.',
      country: 'Италия',
      founded: 1968,
      website: 'www.lowara.com',
      products: 121,
      slug: 'lowara',
    },
    {
      id: 11,
      name: 'Speroni',
      fullName: 'Speroni',
      logo: '🔨',
      category: 'Насосное оборудование',
      description: 'Итальянский производитель насосов для сельского хозяйства и промышленности.',
      country: 'Италия',
      founded: 1950,
      website: 'www.speroni.it',
      products: 76,
      slug: 'speroni',
    },
    {
      id: 12,
      name: 'Zenit',
      fullName: 'Zenit Italia',
      logo: '💪',
      category: 'Промышленные насосы',
      description: 'Итальянский производитель погружных насосов для промышленности.',
      country: 'Италия',
      founded: 1958,
      website: 'www.zenit.com',
      products: 103,
      slug: 'zenit',
    },
  ]

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const handleLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  const nextPartnerSlide = () => {
    setCurrentPartnerSlide((prev) => 
      prev === Math.ceil(partners.length / 4) - 1 ? 0 : prev + 1
    )
  }

  const prevPartnerSlide = () => {
    setCurrentPartnerSlide((prev) => 
      prev === 0 ? Math.ceil(partners.length / 4) - 1 : prev - 1
    )
  }

  const handlePartnerClick = (slug) => {
    if (user) {
      navigate(`/brand/${slug}`)
    } else {
      navigate('/register')
    }
  }

  return (
    <div className={styles.page}>
      {/* Навигация */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>
            <svg className={styles.logoIcon} viewBox="0 0 40 40" fill="none">
              <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)"/>
              <path d="M20 4L34 28H20V4Z" fill="url(#gradient2)" opacity="0.7"/>
              <defs>
                <linearGradient id="gradient1" x1="6" y1="16" x2="34" y2="16">
                  <stop stopColor="#10B981"/>
                  <stop offset="1" stopColor="#4A85F6"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="20" y1="4" x2="34" y2="28">
                  <stop stopColor="#4A85F6"/>
                  <stop offset="1" stopColor="#3A6BC9"/>
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.logoText}>Лого</span>
          </Link>

          <div className={styles.navLinks}>
            <a href="#home" className={styles.navLink}>Главная</a>
            <a href="#features" className={styles.navLink}>Преимущества</a>
            <a href="#roles" className={styles.navLink}>Возможности</a>
          </div>

          <div className={styles.navRight}>
            {user ? (
              <>
                <div className={styles.userProfile} onClick={() => navigate('/dashboard')}>
                  <div className={styles.avatar}>{initials}</div>
                  <span className={styles.userName}>{user.fullName}</span>
                </div>
                <button className={styles.authButton} onClick={handleLogout}>
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.authButton}>
                  Войти
                </Link>
                <Link to="/register" className={styles.authButtonFilled}>
                  Регистрация
                </Link>
              </>
            )}
          </div>

          <button className={styles.mobileToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <path d="M3 12H21" stroke={PRIMARY} strokeWidth="2"/>
                  <path d="M3 6H21" stroke={PRIMARY} strokeWidth="2"/>
                  <path d="M3 18H21" stroke={PRIMARY} strokeWidth="2"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <a href="#home" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Главная</a>
            <a href="#features" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Преимущества</a>
            <a href="#roles" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Возможности</a>
            {!user && (
              <>
                <Link to="/login" className={styles.mobileAuthButton} onClick={() => setIsMobileMenuOpen(false)}>Войти</Link>
                <Link to="/register" className={styles.mobileAuthButtonFilled} onClick={() => setIsMobileMenuOpen(false)}>Регистрация</Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero секция */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient1} />
          <div className={styles.heroGradient2} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeText}>🚀 Новая платформа</span>
            </div>
            <h1 className={styles.heroTitle}>
              Автоматизация сбора{' '}
              <span className={styles.heroHighlight}>коммерческих предложений</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Единое пространство для заказчиков и поставщиков инженерного оборудования. 
              КНС, ЛОС, насосные группы и другое оборудование.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/register" className={styles.heroButton}>
                <span>Начать бесплатно</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2"/>
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2"/>
                </svg>
              </Link>
              <a href="#features" className={styles.heroButtonOutline}>
                <span>Узнать больше</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>500+</span>
                <span className={styles.heroStatLabel}>компаний</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>1000+</span>
                <span className={styles.heroStatLabel}>заявок</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>98%</span>
                <span className={styles.heroStatLabel}>довольны</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroCard}>
              <svg viewBox="0 0 400 350" fill="none">
                <rect x="0" y="0" width="400" height="350" fill="white" rx="24" />
                <rect x="20" y="20" width="360" height="50" fill="#F8FAFC" rx="12" />
                <rect x="40" y="35" width="120" height="20" fill="#4A85F6" rx="6" />
                <circle cx="340" cy="45" r="15" fill="#4A85F6" />
                
                <rect x="20" y="90" width="120" height="220" fill="#F8FAFC" rx="12" />
                <rect x="30" y="105" width="100" height="15" fill="#E2E8F0" rx="4" />
                <rect x="30" y="130" width="80" height="15" fill="#E2E8F0" rx="4" />
                <rect x="30" y="155" width="90" height="15" fill="#E2E8F0" rx="4" />
                
                <rect x="160" y="90" width="220" height="220" fill="#F8FAFC" rx="12" />
                <rect x="180" y="110" width="100" height="30" fill="#4A85F6" rx="8" />
                <rect x="180" y="155" width="180" height="30" fill="#10B981" rx="8" />
                <rect x="180" y="200" width="160" height="30" fill="#F59E0B" rx="8" />
                
                <circle cx="280" cy="280" r="40" fill="#4A85F6" opacity="0.1" />
                <circle cx="280" cy="280" r="25" fill="#4A85F6" opacity="0.2" />
                <circle cx="280" cy="280" r="10" fill="#4A85F6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Карусель партнеров */}
      <section className={styles.partnersSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Наши партнеры</span>
            <h2 className={styles.sectionTitle}>Ведущие производители</h2>
            <p className={styles.sectionSubtitle}>
              Сотрудничаем с лучшими брендами инженерного оборудования
            </p>
          </div>

          <div className={styles.partnersCarousel}>
            <button 
              className={styles.carouselArrowLeft}
              onClick={prevPartnerSlide}
              aria-label="Предыдущие партнеры"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            <div className={styles.carouselTrack}>
              <div 
                className={styles.carouselSlides}
                style={{ transform: `translateX(-${currentPartnerSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className={styles.carouselSlide}>
                    {partners.slice(slideIndex * 4, slideIndex * 4 + 4).map((partner) => (
                      <div 
                        key={partner.id} 
                        className={styles.partnerCard}
                        onClick={() => handlePartnerClick(partner.slug)}
                      >
                        <div className={styles.partnerLogo}>{partner.logo}</div>
                        <h3 className={styles.partnerName}>{partner.name}</h3>
                        <p className={styles.partnerCategory}>{partner.category}</p>
                        <div className={styles.partnerStats}>
                          <span className={styles.partnerProducts}>{partner.products} товаров</span>
                          <span className={styles.partnerCountry}>{partner.country}</span>
                        </div>
                        <button className={styles.partnerButton}>
                          Перейти в каталог
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button 
              className={styles.carouselArrowRight}
              onClick={nextPartnerSlide}
              aria-label="Следующие партнеры"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          <div className={styles.carouselDots}>
            {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselDot} ${currentPartnerSlide === index ? styles.carouselDotActive : ''}`}
                onClick={() => setCurrentPartnerSlide(index)}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>

          <div className={styles.allPartnersLink}>
            <Link to="/brands" className={styles.viewAllButton}>
              Все производители
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Секция о КНС */}
      <section ref={knsRef} className={styles.kns}>
        <div className={styles.knsContainer}>
          <div className={`${styles.knsInner} ${knsVisible ? styles.knsVisible : ''}`}>
            <div className={styles.knsHeader}>
              <span className={styles.knsBadge}>Инженерное оборудование</span>
              <h2 className={styles.knsTitle}>
                Канализационная насосная станция <span className={styles.knsHighlight}>КНС</span>
              </h2>
            </div>

            <div className={styles.knsGrid}>
              <div className={styles.knsContent}>
                <p className={styles.knsDescription}>
                  Канализационная насосная станция КНС представляет собой емкость, имеющая цилиндрическую вертикальную или горизонтальную форму и оснащенная элементами погружного типа в виде датчиков, насосов, а также обвязкой, обеспечивающей подключение к трубопроводу.
                </p>
                <p className={styles.knsDescription}>
                  Ключевая функция таких систем заключается в заборе и накоплении очищенных и сточных вод с их последующей перекачкой в центральную канализацию или очистные сооружения.
                </p>

                <div className={styles.knsFeatures}>
                  <div className={styles.knsFeature}>
                    <div className={styles.knsFeatureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                        <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <span className={styles.knsFeatureLabel}>Производительность</span>
                      <span className={styles.knsFeatureValue}>до 1000 м³/ч</span>
                    </div>
                  </div>
                  <div className={styles.knsFeature}>
                    <div className={styles.knsFeatureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                        <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <span className={styles.knsFeatureLabel}>Напор</span>
                      <span className={styles.knsFeatureValue}>до 60 метров</span>
                    </div>
                  </div>
                  <div className={styles.knsFeature}>
                    <div className={styles.knsFeatureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                        <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <span className={styles.knsFeatureLabel}>Температура</span>
                      <span className={styles.knsFeatureValue}>до +40°C</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.knsModel}>
                <div className={styles.sketchfabEmbed}>
                  <iframe 
                    title="КНС горизонтальная" 
                    frameBorder="0" 
                    allowFullScreen 
                    mozAllowFullScreen="true" 
                    webkitAllowFullScreen="true" 
                    allow="autoplay; fullscreen; xr-spatial-tracking" 
                    xr-spatial-tracking 
                    execution-while-out-of-viewport 
                    execution-while-not-rendered 
                    web-share 
                    src="https://sketchfab.com/models/3a985e16b80541d4be860fecdb4fd96b/embed"
                    className={styles.sketchfabIframe}
                  />
                </div>
                {/* <p className={styles.sketchfabCredit}>
                  <a href="https://sketchfab.com/3d-models/3a985e16b80541d4be860fecdb4fd96b?utm_medium=embed&utm_campaign=share-popup&utm_content=3a985e16b80541d4be860fecdb4fd96b" target="_blank" rel="nofollow">
                    КНС горизонтальная
                  </a> by 
                  <a href="https://sketchfab.com/agros?utm_medium=embed&utm_campaign=share-popup&utm_content=3a985e16b80541d4be860fecdb4fd96b" target="_blank" rel="nofollow">
                    Агростройсервис
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Преимущества</span>
            <h2 className={styles.sectionTitle}>Почему выбирают нашу платформу</h2>
            <p className={styles.sectionSubtitle}>
              Мы создали инструмент, который экономит время и деньги
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${styles.featureCard} ${hoveredFeature === index ? styles.featureCardHover : ''}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className={styles.roles}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Возможности</span>
            <h2 className={styles.sectionTitle}>Для каждой роли — свои инструменты</h2>
            <p className={styles.sectionSubtitle}>
              Заказчики и поставщики получают именно то, что им нужно
            </p>
          </div>

          <div className={styles.rolesTabs}>
            <button
              className={`${styles.rolesTab} ${activeTab === 'customer' ? styles.rolesTabActive : ''}`}
              onClick={() => setActiveTab('customer')}
            >
              <span className={styles.rolesTabIcon}>🏢</span>
              <span>Для Заказчиков</span>
            </button>
            <button
              className={`${styles.rolesTab} ${activeTab === 'supplier' ? styles.rolesTabActive : ''}`}
              onClick={() => setActiveTab('supplier')}
            >
              <span className={styles.rolesTabIcon}>🔧</span>
              <span>Для Исполнителей</span>
            </button>
          </div>

          <div className={styles.rolesGrid}>
            {(activeTab === 'customer' ? customerFeatures : supplierFeatures).map((feature, index) => (
              <div key={index} className={styles.roleCard}>
                <div className={styles.roleIcon}>{feature.icon}</div>
                <p className={styles.roleText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Отзывы</span>
            <h2 className={styles.sectionTitle}>Что говорят наши клиенты</h2>
          </div>

          <div className={styles.testimonialsSlider}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${styles.testimonialCard} ${activeTestimonial === index ? styles.testimonialActive : ''}`}
              >
                <div className={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className={styles.testimonialName}>{testimonial.name}</div>
                    <div className={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonialDot} ${activeTestimonial === index ? styles.testimonialDotActive : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Готовы оптимизировать работу?</h2>
          <p className={styles.ctaSubtitle}>
            Присоединяйтесь к сотням компаний, которые уже используют нашу платформу
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/register" className={styles.ctaButton}>
              Создать аккаунт
            </Link>
            <Link to="/login" className={styles.ctaButtonOutline}>
              Войти
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L6 28H34L20 4Z" fill="url(#gradient1)"/>
              </svg>
              <span className={styles.footerLogoText}>Лого</span>
            </div>
            <p className={styles.footerDescription}>
              Платформа для автоматизации сбора коммерческих предложений
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Продукт</h4>
            <a href="#features" className={styles.footerLink}>Преимущества</a>
            <a href="#roles" className={styles.footerLink}>Возможности</a>
            <Link to="/register" className={styles.footerLink}>Регистрация</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Поддержка</h4>
            <a href="#" className={styles.footerLink}>Документация</a>
            <a href="#" className={styles.footerLink}>FAQ</a>
            <a href="#" className={styles.footerLink}>Контакты</a>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Компания</h4>
            <a href="#" className={styles.footerLink}>О нас</a>
            <a href="#" className={styles.footerLink}>Блог</a>
            <a href="#" className={styles.footerLink}>Карьера</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerText}>© 2025 Лого. Все права защищены.</p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Политика конфиденциальности</a>
            <a href="#" className={styles.footerLink}>Условия использования</a>
          </div>
        </div>
      </footer>
    </div>
  )
}