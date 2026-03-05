// src/pages/SupplierBalancePage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './SupplierBalancePage.module.css'

export default function SupplierBalancePage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('balance')
  const [selectedPackage, setSelectedPackage] = useState(null)

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

  // Моковые данные баланса
  const balanceData = {
    coins: 2450,
    freeClicks: 3,
    totalClicks: 156,
    totalSpent: 45600,
    registrationDate: '2024-01-15',
    lastTransaction: '2025-03-04'
  }

  // История транзакций
  const transactions = [
    {
      id: 1,
      date: '2025-03-04',
      type: 'expense',
      description: 'Отклик на заявку №REQ-2025-001',
      amount: -50,
      balance: 2450
    },
    {
      id: 2,
      date: '2025-03-01',
      type: 'income',
      description: 'Пополнение баланса',
      amount: 1000,
      balance: 2500
    },
    {
      id: 3,
      date: '2025-02-28',
      type: 'expense',
      description: 'Отклик на заявку №REQ-2025-045',
      amount: -50,
      balance: 1500
    },
    {
      id: 4,
      date: '2025-02-25',
      type: 'expense',
      description: 'Отклик на заявку №REQ-2025-032',
      amount: -50,
      balance: 1550
    },
    {
      id: 5,
      date: '2025-02-20',
      type: 'income',
      description: 'Пополнение баланса',
      amount: 500,
      balance: 1600
    },
    {
      id: 6,
      date: '2025-02-15',
      type: 'bonus',
      description: 'Бонус за регистрацию',
      amount: 100,
      balance: 1100
    }
  ]

  // Тарифные пакеты
  const coinPackages = [
    {
      id: 1,
      coins: 500,
      price: 500,
      popular: false,
      bonus: 0
    },
    {
      id: 2,
      coins: 1000,
      price: 950,
      popular: true,
      bonus: 50,
      oldPrice: 1000
    },
    {
      id: 3,
      coins: 2000,
      price: 1800,
      popular: false,
      bonus: 200,
      oldPrice: 2000
    },
    {
      id: 4,
      coins: 5000,
      price: 4250,
      popular: false,
      bonus: 750,
      oldPrice: 5000
    },
    {
      id: 5,
      coins: 10000,
      price: 8000,
      popular: false,
      bonus: 2000,
      oldPrice: 10000
    }
  ]

  // Статистика откликов
  const clicksData = [
    { month: 'Янв', clicks: 12 },
    { month: 'Фев', clicks: 18 },
    { month: 'Мар', clicks: 15 },
    { month: 'Апр', clicks: 22 },
    { month: 'Май', clicks: 25 },
    { month: 'Июн', clicks: 20 },
    { month: 'Июл', clicks: 28 },
    { month: 'Авг', clicks: 30 },
    { month: 'Сен', clicks: 24 },
    { month: 'Окт', clicks: 19 },
    { month: 'Ноя', clicks: 16 },
    { month: 'Дек', clicks: 21 }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg)
  }

  const handlePayment = () => {
    if (!selectedPackage) {
      alert('Выберите тарифный пакет')
      return
    }
    alert(`Оплата пакета ${selectedPackage.coins} монет на сумму ${formatPrice(selectedPackage.price)}`)
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
          {/* Шапка страницы */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Монетный счет</h1>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
                <span className={styles.separator}>›</span>
                <span className={styles.current}>Монетный счет</span>
              </div>
            </div>
          </div>

          {/* Баланс карточка */}
          <div className={styles.balanceCard}>
            <div className={styles.balanceHeader}>
              <div className={styles.balanceTitle}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
                  <path d="M12 6V18M8 9H16M8 15H16" stroke="#B8860B" strokeWidth="2"/>
                </svg>
                <span>Текущий баланс</span>
              </div>
              <div className={styles.balanceActions}>
                <button className={styles.historyButton} onClick={() => setActiveTab('history')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  История
                </button>
              </div>
            </div>
            
            <div className={styles.balanceAmount}>
              <span className={styles.coinIcon}>🪙</span>
              <span className={styles.coinValue}>{balanceData.coins.toLocaleString()}</span>
              <span className={styles.coinLabel}>монет</span>
            </div>

            <div className={styles.balanceStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Бесплатных откликов</span>
                <span className={styles.statValue}>{balanceData.freeClicks}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Всего откликов</span>
                <span className={styles.statValue}>{balanceData.totalClicks}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Потрачено всего</span>
                <span className={styles.statValue}>{formatPrice(balanceData.totalSpent)}</span>
              </div>
            </div>
          </div>

          {/* Табы */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'balance' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('balance')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V18M8 9H16M8 15H16" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Пополнение
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
              </svg>
              История операций
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'stats' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 17V20M9 13V20M15 9V20M21 3V20" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Статистика
            </button>
          </div>

          {/* Контент табов */}
          <div className={styles.tabContent}>
            {/* Вкладка: Пополнение */}
            {activeTab === 'balance' && (
              <div className={styles.balanceSection}>
                <h3 className={styles.sectionTitle}>Выберите пакет монет</h3>
                
                <div className={styles.packagesGrid}>
                  {coinPackages.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`${styles.packageCard} ${selectedPackage?.id === pkg.id ? styles.packageSelected : ''} ${pkg.popular ? styles.packagePopular : ''}`}
                      onClick={() => handleSelectPackage(pkg)}
                    >
                      {pkg.popular && (
                        <div className={styles.popularBadge}>Хит продаж</div>
                      )}
                      <div className={styles.packageIcon}>
                        <span className={styles.coinStack}>🪙🪙🪙</span>
                      </div>
                      <div className={styles.packageCoins}>
                        {pkg.coins.toLocaleString()} <span>монет</span>
                      </div>
                      {pkg.bonus > 0 && (
                        <div className={styles.packageBonus}>
                          +{pkg.bonus} бонусных
                        </div>
                      )}
                      <div className={styles.packagePrice}>
                        {pkg.oldPrice && (
                          <span className={styles.oldPrice}>{formatPrice(pkg.oldPrice)}</span>
                        )}
                        <span className={styles.currentPrice}>{formatPrice(pkg.price)}</span>
                      </div>
                      <div className={styles.pricePerCoin}>
                        {(pkg.price / pkg.coins).toFixed(2)} ₽ за монету
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.paymentSection}>
                  <h3 className={styles.sectionTitle}>Способ оплаты</h3>
                  
                  <div className={styles.paymentMethods}>
                    <label className={styles.paymentMethod}>
                      <input type="radio" name="payment" defaultChecked />
                      <span className={styles.paymentMethodIcon}>💳</span>
                      <span>Банковская карта</span>
                    </label>
                    <label className={styles.paymentMethod}>
                      <input type="radio" name="payment" />
                      <span className={styles.paymentMethodIcon}>📱</span>
                      <span>СБП</span>
                    </label>
                    <label className={styles.paymentMethod}>
                      <input type="radio" name="payment" />
                      <span className={styles.paymentMethodIcon}>🏦</span>
                      <span>Безналичный расчет</span>
                    </label>
                  </div>

                  <button
                    className={styles.payButton}
                    onClick={handlePayment}
                    disabled={!selectedPackage}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    </svg>
                    Оплатить {selectedPackage ? formatPrice(selectedPackage.price) : ''}
                  </button>
                </div>

                <div className={styles.infoBlock}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="#4A85F6" strokeWidth="2"/>
                  </svg>
                  <div>
                    <strong>Как это работает</strong>
                    <p>1 монета = 1 отклик на заявку. Бонусные монеты начисляются автоматически при пополнении. Срок действия монет не ограничен.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка: История операций */}
            {activeTab === 'history' && (
              <div className={styles.historySection}>
                <div className={styles.historyHeader}>
                  <h3 className={styles.sectionTitle}>История операций</h3>
                  <div className={styles.historyFilters}>
                    <select className={styles.filterSelect}>
                      <option>Все операции</option>
                      <option>Пополнения</option>
                      <option>Списания</option>
                      <option>Бонусы</option>
                    </select>
                  </div>
                </div>

                <div className={styles.transactionsList}>
                  {transactions.map(transaction => (
                    <div key={transaction.id} className={styles.transactionItem}>
                      <div className={styles.transactionIcon}>
                        {transaction.type === 'income' && '💰'}
                        {transaction.type === 'expense' && '📤'}
                        {transaction.type === 'bonus' && '🎁'}
                      </div>
                      <div className={styles.transactionInfo}>
                        <div className={styles.transactionDesc}>{transaction.description}</div>
                        <div className={styles.transactionDate}>{formatDate(transaction.date)}</div>
                      </div>
                      <div className={styles.transactionAmount}>
                        <span className={transaction.amount > 0 ? styles.positive : styles.negative}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} 🪙
                        </span>
                      </div>
                      <div className={styles.transactionBalance}>
                        {transaction.balance} 🪙
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.pagination}>
                  <button className={styles.pageButton} disabled>‹</button>
                  <button className={`${styles.pageButton} ${styles.active}`}>1</button>
                  <button className={styles.pageButton}>2</button>
                  <button className={styles.pageButton}>3</button>
                  <button className={styles.pageButton}>›</button>
                </div>
              </div>
            )}

            {/* Вкладка: Статистика */}
            {activeTab === 'stats' && (
              <div className={styles.statsSection}>
                <h3 className={styles.sectionTitle}>Статистика использования</h3>
                
                <div className={styles.statsCards}>
                  <div className={styles.statsCard}>
                    <div className={styles.statsCardIcon}>📊</div>
                    <div className={styles.statsCardInfo}>
                      <span className={styles.statsCardValue}>{balanceData.totalClicks}</span>
                      <span className={styles.statsCardLabel}>Всего откликов</span>
                    </div>
                  </div>
                  <div className={styles.statsCard}>
                    <div className={styles.statsCardIcon}>📈</div>
                    <div className={styles.statsCardInfo}>
                      <span className={styles.statsCardValue}>{Math.round(balanceData.totalClicks / 12)}</span>
                      <span className={styles.statsCardLabel}>В среднем в месяц</span>
                    </div>
                  </div>
                  <div className={styles.statsCard}>
                    <div className={styles.statsCardIcon}>💎</div>
                    <div className={styles.statsCardInfo}>
                      <span className={styles.statsCardValue}>{balanceData.coins}</span>
                      <span className={styles.statsCardLabel}>Доступно монет</span>
                    </div>
                  </div>
                </div>

                <h4 className={styles.chartTitle}>Активность по месяцам</h4>
                
                <div className={styles.chartContainer}>
                  {clicksData.map((item, index) => (
                    <div key={index} className={styles.chartBar}>
                      <div 
                        className={styles.chartBarFill}
                        style={{ height: `${(item.clicks / 30) * 100}%` }}
                      >
                        <span className={styles.chartBarValue}>{item.clicks}</span>
                      </div>
                      <div className={styles.chartBarLabel}>{item.month}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Дата регистрации</span>
                    <span className={styles.infoValue}>{formatDate(balanceData.registrationDate)}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Последняя операция</span>
                    <span className={styles.infoValue}>{formatDate(balanceData.lastTransaction)}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Средняя стоимость отклика</span>
                    <span className={styles.infoValue}>50 ₽</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Бесплатных откликов осталось</span>
                    <span className={styles.infoValue}>{balanceData.freeClicks}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}