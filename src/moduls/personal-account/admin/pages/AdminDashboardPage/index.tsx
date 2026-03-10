// src/pages/AdminDashboardPage.tsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listAllRequests } from '@/shared/data/requests'
import { listAllOffers } from '@/shared/data/offers'
import styles from './AdminDashboardPage.module.css'
import { cardsActions } from '../../features/AdminDashboardPage/data'
import { IconAdminDashboard } from '../../features/AdminDashboardPage/components'
import Icon from '@/shared/ui-kits/Icon'

export const AdminDashboardPage = () => {

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


  return (
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
          {cardsActions.map((link, key) => (
            <Link to={link.link} className={styles.actionCard}>
              <Icon name={link.iconName} />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}