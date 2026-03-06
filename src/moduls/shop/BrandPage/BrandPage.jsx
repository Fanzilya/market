// src/pages/BrandPage.jsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../components/Header.jsx'
import Footer from '../../../components/Footer.jsx'
import { getBrandBySlug } from '../../../data/brands.js'
import { getProductsByBrand } from '../../../data/products.js'
import styles from './BrandPage.module.css'

export default function BrandPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('products')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProduct, setHoveredProduct] = useState(null)

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

  const brand = getBrandBySlug(slug)
  const products = getProductsByBrand(slug)

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map(p => p.category))]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter(p => p.category === selectedCategory)
  }, [products, selectedCategory])

  if (!brand) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.errorContainer}>
              <div className={styles.errorCard}>
                <div className={styles.errorIcon}>🔍</div>
                <h2>Производитель не найден</h2>
                <p>Запрошенный производитель не существует или был удален</p>
                <button onClick={() => navigate('/brands')} className={styles.primaryButton}>
                  Вернуться к списку
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Шапка страницы */}
          <div className={styles.header}>
            <h1 className={styles.title}>{brand.name}</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/')}>Главная</span>
              <span className={styles.separator}>/</span>
              <span className={styles.breadcrumb} onClick={() => navigate('/brands')}>Производители</span>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>{brand.name}</span>
            </div>
          </div>

          {/* Информация о бренде */}
          <div className={styles.brandHeader}>
            <div className={styles.brandLogo}>
              <span className={styles.logoEmoji}>{brand.logo}</span>
            </div>
            <div className={styles.brandInfo}>
              <h2 className={styles.brandName}>{brand.fullName}</h2>
              <div className={styles.brandMeta}>
                <span className={styles.brandCountry}>{brand.country}</span>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.brandFounded}>Основан в {brand.founded}</span>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.brandProducts}>{products.length} товаров</span>
              </div>
              <p className={styles.brandDescription}>{brand.description}</p>
              <div className={styles.brandActions}>
                <a
                  href={`https://${brand.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.websiteButton}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Официальный сайт
                </a>
              </div>
            </div>
          </div>

          {/* Табы */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'products' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 7H16" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12H14" stroke="currentColor" strokeWidth="2" />
              </svg>
              Товары и оборудование
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'documents' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
              </svg>
              Документация
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'products' && (
              <>
                <div className={styles.categoryFilter}>
                  <label className={styles.filterLabel}>Категория:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.categorySelect}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'Все категории' : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.productsGrid}>
                  {filteredProducts.length === 0 ? (
                    <div className={styles.emptyState}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#CBD5E1" strokeWidth="2" />
                        <path d="M9 12H15" stroke="#CBD5E1" strokeWidth="2" />
                        <path d="M12 9V15" stroke="#CBD5E1" strokeWidth="2" />
                      </svg>
                      <h3>Товары не найдены</h3>
                      <p>В данной категории пока нет товаров</p>
                    </div>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className={`${styles.productCard} ${hoveredProduct === index ? styles.productCardHover : ''}`}
                        onMouseEnter={() => setHoveredProduct(index)}
                        onMouseLeave={() => setHoveredProduct(null)}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className={styles.productImage}>{product.image}</div>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <span className={styles.productCategory}>{product.category}</span>
                        <p className={styles.productDescription}>{product.description}</p>
                        <div className={styles.productFooter}>
                          <span className={styles.productPrice}>{product.price} ₽</span>
                          <button className={styles.productButton}>
                            Подробнее
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'documents' && (
              <div className={styles.documentsList}>
                <div className={styles.documentItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <div className={styles.documentInfo}>
                    <span className={styles.documentName}>Каталог продукции 2025</span>
                    <span className={styles.documentSize}>PDF, 15 MB</span>
                  </div>
                  <button className={styles.downloadButton}>
                    Скачать
                  </button>
                </div>
                <div className={styles.documentItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <div className={styles.documentInfo}>
                    <span className={styles.documentName}>Сертификаты соответствия</span>
                    <span className={styles.documentSize}>PDF, 8 MB</span>
                  </div>
                  <button className={styles.downloadButton}>
                    Скачать
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}