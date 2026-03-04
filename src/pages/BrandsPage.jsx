// src/pages/BrandsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import Sidebar from '../components/Sidebar.jsx'
import { getAllBrands } from '../data/brands.js'
// import styles from './BrandsPage.module.css'

export default function BrandsPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [hoveredCard, setHoveredCard] = useState(null)

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

  const brands = getAllBrands()

  const countries = ['all', ...new Set(brands.map(b => b.country))]

  const filteredBrands = brands.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || b.country === selectedCountry
    return matchesSearch && matchesCountry
  })

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

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Производители оборудования</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>Производители</span>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{brands.length}</span>
            <span className={styles.statLabel}>Всего брендов</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{brands.filter(b => b.country === 'Россия').length}</span>
            <span className={styles.statLabel}>Российских</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{brands.filter(b => b.country === 'Италия').length}</span>
            <span className={styles.statLabel}>Итальянских</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{brands.reduce((acc, b) => acc + b.products, 0)}</span>
            <span className={styles.statLabel}>Всего товаров</span>
          </div>
        </div>

        <div className={styles.filtersBar}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              type="text"
              placeholder="Поиск по названию бренда, категории..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Страна:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={styles.filterSelect}
            >
              {countries.map(country => (
                <option key={country} value={country}>
                  {country === 'all' ? 'Все страны' : country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.brandsGrid}>
          {filteredBrands.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2"/>
              </svg>
              <h3>Производители не найдены</h3>
              <p>Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            filteredBrands.map((brand, index) => (
              <div
                key={brand.id}
                className={`${styles.brandCard} ${hoveredCard === index ? styles.brandCardHover : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/brand/${brand.slug}`)}
              >
                <div className={styles.brandLogo}>{brand.logo}</div>
                <div className={styles.brandInfo}>
                  <h3 className={styles.brandName}>{brand.name}</h3>
                  <p className={styles.brandFullName}>{brand.fullName}</p>
                  <span className={styles.brandCategory}>{brand.category}</span>
                </div>
                <div className={styles.brandStats}>
                  <div className={styles.brandStat}>
                    <span className={styles.brandStatLabel}>Страна</span>
                    <span className={styles.brandStatValue}>{brand.country}</span>
                  </div>
                  <div className={styles.brandStat}>
                    <span className={styles.brandStatLabel}>Основан</span>
                    <span className={styles.brandStatValue}>{brand.founded}</span>
                  </div>
                  <div className={styles.brandStat}>
                    <span className={styles.brandStatLabel}>Товаров</span>
                    <span className={styles.brandStatValue}>{brand.products}</span>
                  </div>
                </div>
                <button className={styles.viewButton}>
                  Перейти в каталог
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}