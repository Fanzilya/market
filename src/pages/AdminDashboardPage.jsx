// src/pages/AdminDashboardPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { listAllRequests } from '../data/requests.js'
import { listAllOffers } from '../data/offers.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './AdminDashboardPage.module.css'

export default function AdminDashboardPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [stats, setStats] = useState({
    totalRequests: 0,
    publishedRequests: 0,
    pendingRequests: 0,
    archivedRequests: 0,
    totalOffers: 0,
    totalUsers: 4,
    totalCompanies: 3
  })

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

  useEffect(() => {
    const requests = listAllRequests()
    const offers = listAllOffers()

    setStats({
      totalRequests: requests.length,
      publishedRequests: requests.filter(r => !r.archived && r.status === 'published').length,
      pendingRequests: requests.filter(r => !r.archived && r.status === 'active').length,
      archivedRequests: requests.filter(r => r.archived).length,
      totalOffers: offers.length,
      totalUsers: 4,
      totalCompanies: 3
    })
  }, [])

  if (!user || user.role !== 'admin') {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔒</div>
          <h2>Доступ запрещен</h2>
          <p>Эта страница доступна только администраторам</p>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>
            На главную
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
          <div className={styles.header}>
            <h1 className={styles.title}>Панель управления</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.current}>Главная</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📋</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalRequests}</span>
                <span className={styles.statLabel}>Всего заявок</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.publishedRequests}</span>
                <span className={styles.statLabel}>Опубликовано</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>⏳</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.pendingRequests}</span>
                <span className={styles.statLabel}>На модерации</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📦</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.archivedRequests}</span>
                <span className={styles.statLabel}>В архиве</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>💰</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalOffers}</span>
                <span className={styles.statLabel}>Предложений</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalUsers}</span>
                <span className={styles.statLabel}>Пользователей</span>
              </div>
            </div>
          </div>

          <div className={styles.quickActions}>
            <h2 className={styles.sectionTitle}>Быстрые действия</h2>
            <div className={styles.actionsGrid}>
              <button 
                className={styles.actionCard}
                onClick={() => navigate('/admin/requests')}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4A85F6" strokeWidth="2"/>
                </svg>
                <span>Управление заявками</span>
                {stats.pendingRequests > 0 && (
                  <span className={styles.actionBadge}>{stats.pendingRequests}</span>
                )}
              </button>

              <button 
                className={styles.actionCard}
                onClick={() => navigate('/admin/offers')}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="#4A85F6" strokeWidth="2"/>
                </svg>
                <span>Управление предложениями</span>
              </button>

              <button 
                className={styles.actionCard}
                onClick={() => navigate('/admin/users')}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="9" r="4" stroke="#4A85F6" strokeWidth="2"/>
                  <path d="M3 18V17C3 13.7 5.7 11 9 11C12.3 11 15 13.7 15 17V18" stroke="#4A85F6" strokeWidth="2"/>
                </svg>
                <span>Управление пользователями</span>
              </button>

              <button 
                className={styles.actionCard}
                onClick={() => navigate('/admin/companies')}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="14" rx="2" stroke="#4A85F6" strokeWidth="2"/>
                </svg>
                <span>Управление компаниями</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}