// src/pages/ProductPage.tsx
import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '@/shared/data/products'
import { getBrandBySlug } from '@/shared/data/brands'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import styles from './ProductPage.module.css'

export const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)

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

  const product = useMemo(() => {
    return getProductById(id)
  }, [id])

  const brand = useMemo(() => {
    if (!product) return null
    return getBrandBySlug(product.brand)
  }, [product])



  const handleAddToCart = () => {
    alert(`Товар "${product.name}" добавлен в корзину. Количество: ${quantity}`)
  }

  const handleCreateRequest = () => {
    // Проверяем авторизацию перед созданием заявки
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/customer/request/new', {
        state: {
          product: product,
          brand: brand
        }
      })
    } else {
      navigate('/login', {
        state: {
          from: `/product/${id}`,
          message: 'Для создания заявки необходимо войти в систему'
        }
      })
    }
  }

  const handleBrandClick = () => {
    if (brand) {
      navigate(`/brand/${brand.slug}`)
    }
  }

  return !product ?
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔍</div>
          <h2>Товар не найден</h2>
          <p>Запрошенный товар не существует или был удален</p>
          <button onClick={() => navigate('/brands')} className={styles.primaryButton}>
            Вернуться к брендам
          </button>
        </div>
      </div>
    </div>
    :
    <div className={styles.container}>
      {/* Шапка страницы */}
      <div className={styles.header}>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.breadcrumbs}>
          <Link to={"/"} className={styles.breadcrumb}>Главная</Link>
          <span className={styles.separator}>/</span>
          <Link to={'/brands'} className={styles.breadcrumb}>Производители</Link>
          <span className={styles.separator}>/</span>
          {brand && (
            <>
              <span className={styles.breadcrumb} onClick={handleBrandClick}>
                {brand.name}
              </span>
              <span className={styles.separator}>/</span>
            </>
          )}
          <span className={styles.current}>{product.name}</span>
        </div>
      </div>

      {/* Основная информация о товаре */}
      <div className={styles.productCard}>
        <div className={styles.productGallery}>
          <div className={styles.mainImage}>
            <span className={styles.productEmoji}>{product.image}</span>
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <div>
              <h2 className={styles.productName}>{product.name}</h2>
              {brand && (
                <div
                  className={styles.productBrand}
                  onClick={handleBrandClick}
                >
                   <img src={brand.logo} className="container w-full h-full"/>
                  <span>{brand.name}</span>
                </div>
              )}
            </div>
            {/* <button 
                  className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      fill={isFavorite ? 'currentColor' : 'none'}
                    />
                  </svg>
                </button> */}
          </div>

          <div className={styles.productMeta}>
            <span className={styles.productCategory}>{product.category}</span>
            <span className={styles.productId}>Артикул: {product.id}</span>
          </div>






          <div className={styles.productShipping}>
            <div className={styles.shippingItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#64748B" strokeWidth="2" />
                <path d="M2 8H22" stroke="#64748B" strokeWidth="2" />
              </svg>
              <span>Доставка по всей России</span>
            </div>
            <div className={styles.shippingItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="#64748B" strokeWidth="2" />
              </svg>
              <span>Гарантия 12 месяцев</span>
            </div>
          </div>
        </div>
      </div>

      {/* Табы с информацией */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'description' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Описание
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'specs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Характеристики
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'docs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('docs')}
        >
          Документация
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'description' && (
          <div className={styles.description}>
            <p>{product.description}</p>
            <p>
              Данное оборудование идеально подходит для использования в системах
              водоснабжения, отопления и канализации. Высокое качество материалов
              и сборки обеспечивает длительный срок службы.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className={styles.specs}>
            <div className={styles.specsGrid}>
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className={styles.specItem}>
                  <span className={styles.specLabel}>{key}:</span>
                  <span className={styles.specValue}>{value}</span>
                </div>
              ))}
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Производитель:</span>
                <span className={styles.specValue}>{brand?.name || product.brand}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Страна производства:</span>
                <span className={styles.specValue}>{brand?.country || '—'}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className={styles.docs}>
            <div className={styles.documentItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4A85F6" strokeWidth="2" />
              </svg>
              <div className={styles.documentInfo}>
                <span className={styles.documentName}>Технический паспорт</span>
                <span className={styles.documentSize}>PDF, 2.5 MB</span>
              </div>
              <button className={styles.downloadButton}>
                Скачать
              </button>
            </div>
            <div className={styles.documentItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4A85F6" strokeWidth="2" />
              </svg>
              <div className={styles.documentInfo}>
                <span className={styles.documentName}>Руководство по эксплуатации</span>
                <span className={styles.documentSize}>PDF, 4.8 MB</span>
              </div>
              <button className={styles.downloadButton}>
                Скачать
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Похожие товары */}
      {brand && (
        <div className={styles.similarProducts}>
          <h3 className={styles.similarTitle}>Другие товары {brand.name}</h3>
          <div className={styles.similarGrid}>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={styles.similarCard}
                onClick={() => navigate(`/brands/product/p${item}`)}
              >
                <div className={styles.similarImage}>📦</div>
                <h4 className={styles.similarName}>Модель {item}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

}