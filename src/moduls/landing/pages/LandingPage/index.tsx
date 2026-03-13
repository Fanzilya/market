// src/pages/LandingPage.tsx
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LandingPage.module.css'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import { features, partners, testimonials } from '../../features/Landing/data'

export const LandingPage = () => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [knsVisible, setKnsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [currentPartnerSlide, setCurrentPartnerSlide] = useState(0)
  const knsRef = useRef(null)

  useEffect(() => {
    // 1. Scroll handler для knsRef
    const handleScroll = () => {
      if (knsRef.current) {
        const rect = knsRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.75
        setKnsVisible(isVisible)
      }
    }

    // 2. Testimonials interval
    const testimonialsInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // 3. Partners interval
    const partnersInterval = setInterval(() => {
      setCurrentPartnerSlide((prev) =>
        prev === Math.ceil(partners.length / 4) - 1 ? 0 : prev + 1
      )
    }, 14000)

    // Добавляем слушатель скролла
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(testimonialsInterval)
      clearInterval(partnersInterval)
    }
  }, []) // Пустой массив зависимостей - эффект выполнится один раз при монтировании


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

  const handleManufacturerClick = () => {
    navigate('/login', {
      state: {
        from: '/',
        message: 'Для размещения информации о продукции необходимо войти в систему как производитель'
      }
    })
  }

  return (
    <>

      {/* Hero секция */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient1} />
          <div className={styles.heroGradient2} />
        </div>

        <div className={styles.container}>
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
                    <path d="M5 12H19" stroke="white" strokeWidth="2" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" />
                  </svg>
                </Link>
                <Link to="/brands" className={styles.heroButtonOutline}>
                  <span>Каталог брендов</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
                  </svg>
                </Link>
              </div>

              {/* <div className={styles.heroStats}>
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
              </div> */}
            </div>

            <div className={styles.heroRight}>
              {/* <div className={styles.heroCard}>
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
                
              </div> */}
              <img src="public\фон для главной страницы.png"  />
            </div>
          </div>
        </div>
      </section>

      {/* НОВЫЙ БЛОК: Для производителей */}


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
            <button className={styles.carouselArrowLeft} onClick={prevPartnerSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <div className={styles.carouselTrack}>
              <div className={styles.carouselSlides} style={{ transform: `translateX(-${currentPartnerSlide * 100}%)` }}>
                {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className={styles.carouselSlide}>
                    {partners.slice(slideIndex * 4, slideIndex * 4 + 4).map((partner) => (
                      <Link to={`/brands/${partner.slug}`} key={partner.id} className={styles.partnerCard} >
                        <div className={styles.partnerLogo}><img src={partner.logo} className="container w-full h-full" /></div>
                        {/* <div className={styles.partnerLogo}>{partner.logo}</div> */}
                        <h3 className={styles.partnerName}>{partner.name}</h3>
                        {/* <p className={styles.partnerCategory}>{partner.category}</p>
                        <div className={styles.partnerStats}>
                          <span className={styles.partnerProducts}>{partner.products} товаров</span>
                          <span className={styles.partnerCountry}>{partner.country}</span>
                        </div> */} 
                        <button className={styles.partnerButton}>
                          Перейти в каталог
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.carouselArrowRight} onClick={nextPartnerSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className={styles.carouselDots}>
            {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselDot} ${currentPartnerSlide === index ? styles.carouselDotActive : ''}`}
                onClick={() => setCurrentPartnerSlide(index)}
              />
            ))}
          </div>

          <div className={styles.allPartnersLink}>
            <Link to="/brands" className={styles.viewAllButton}>
              Все производители
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/*
      <section className={styles.manufacturerPromo}>
        <div className={styles.container}>
          <div className={styles.manufacturerPromoContent}>
            <div className={styles.manufacturerPromoText}>
              <span className={styles.manufacturerPromoBadge}>Для производителей</span>
              <h2 className={styles.manufacturerPromoTitle}>
                Разместите свою продукцию на платформе
              </h2>
              <p className={styles.manufacturerPromoDescription}>
                Получите доступ к тысячам заказчиков инженерного оборудования. 
                Размещайте каталоги, BIM-модели и получайте прямые запросы от проектировщиков и строителей.
              </p>
              
              <div className={styles.manufacturerPromoFeatures}>
                <div className={styles.manufacturerPromoFeature}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#4A85F6" strokeWidth="2"/>
                  </svg>
                  <span>Размещение неограниченного количества товаров</span>
                </div>
               
                <div className={styles.manufacturerPromoFeature}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#4A85F6" strokeWidth="2"/>
                  </svg>
                  <span>Прямые заявки от заказчиков на вашу продукцию</span>
                </div>
                <div className={styles.manufacturerPromoFeature}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#4A85F6" strokeWidth="2"/>
                  </svg>
                  <span>Статистика просмотров и аналитика спроса</span>
                </div>
              </div>

              <div className={styles.manufacturerPromoActions}>
                <button 
                  className={styles.manufacturerPromoButton}
                  onClick={handleManufacturerClick}
                >
                  Разместить продукцию
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2"/>
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2"/>
                  </svg>
                </button>
                
              </div>
            </div>

            <div className={styles.manufacturerPromoImage}>
              <div className={styles.manufacturerPromoCard}>
                <svg viewBox="0 0 400 350" fill="none">
                  <rect x="0" y="0" width="400" height="350" fill="white" rx="24" />
                  <rect x="30" y="30" width="340" height="80" fill="#F8FAFC" rx="12" />
                  <rect x="50" y="50" width="120" height="20" fill="#4A85F6" rx="6" />
                  <rect x="200" y="50" width="150" height="20" fill="#E2E8F0" rx="6" />
                  
                  <rect x="30" y="130" width="160" height="60" fill="#F8FAFC" rx="8" />
                  <rect x="50" y="150" width="120" height="20" fill="#4A85F6" opacity="0.8" rx="4" />
                  
                  <rect x="210" y="130" width="160" height="60" fill="#F8FAFC" rx="8" />
                  <rect x="230" y="150" width="120" height="20" fill="#10B981" opacity="0.8" rx="4" />
                  
                  <rect x="30" y="210" width="340" height="40" fill="#F8FAFC" rx="8" />
                  <rect x="50" y="225" width="200" height="10" fill="#4A85F6" rx="4" />
                  
                  <circle cx="300" cy="270" r="40" fill="#4A85F6" opacity="0.1" />
                  <circle cx="300" cy="270" r="25" fill="#4A85F6" opacity="0.2" />
                  <circle cx="300" cy="270" r="10" fill="#4A85F6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Секция о КНС */}
      <section ref={knsRef}
        className={`${styles.kns}`}
      >

        <div className={styles.container}>
          <div className={`${knsVisible ? styles.knsVisible : styles.knsInner}`}>
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
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
                        <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2" />
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
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
                        <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2" />
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
                        <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
                        <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2" />
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
                    src="https://sketchfab.com/models/3a985e16b80541d4be860fecdb4fd96b/embed"
                    className={styles.sketchfabIframe}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
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


      {/* <section className={styles.roles}>
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
      </section> */}

      {/* Stats */}
      {/* <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
                  {[...Array(testimonial.rating)].map((_, i) => <span key={i}>⭐</span>)}
                </div>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{testimonial.name.charAt(0)}</div>
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
        <div className={styles.container}>
          <div className={styles.ctaContent}>
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
        </div>
      </section>
    </>
  )
}