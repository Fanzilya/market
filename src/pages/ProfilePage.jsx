// src/pages/ProfilePage.jsx
import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './ProfilePage.module.css'

export const  ProfilePage = ()=> {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredTile, setHoveredTile] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    setIsMounted(true)
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

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_LIGHT = 'rgba(74, 133, 246, 0.1)'

  const onLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения.</p>
          <Link to="/login" className={styles.primaryButton}>
            Перейти к входу
          </Link>
        </div>
      </div>
    )
  }

  const isSupplier = user.role === 'supplier'
  const initials = user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  // Данные для тайлов пользователя
  const userTiles = [
    { 
      id: 'fullName', 
      icon: 'user', 
      label: 'ФИО', 
      value: user.fullName 
    },
    { 
      id: 'email', 
      icon: 'email', 
      label: 'Email', 
      value: user.email 
    },
    { 
      id: 'phone', 
      icon: 'phone', 
      label: 'Телефон', 
      value: user.phone || '—',
      empty: !user.phone
    },
    { 
      id: 'role', 
      icon: 'role', 
      label: 'Роль', 
      value: user.roleLabel 
    }
  ]

  // Данные для тайлов компании (для поставщика)
  const companyTiles = isSupplier && user.company ? [
    { 
      id: 'companyName', 
      icon: 'building', 
      label: 'Наименование', 
      value: user.company.name || '—',
      empty: !user.company.name
    },
    { 
      id: 'shortName', 
      icon: 'building', 
      label: 'Краткое наименование', 
      value: user.company.shortName || '—',
      empty: !user.company.shortName
    },
    { 
      id: 'companyType', 
      icon: 'building', 
      label: 'Тип компании', 
      value: user.company.typeName || '—',
      empty: !user.company.typeName
    },
    { 
      id: 'inn', 
      icon: 'document', 
      label: 'ИНН', 
      value: user.company.inn || '—',
      empty: !user.company.inn
    },
    { 
      id: 'kpp', 
      icon: 'document', 
      label: 'КПП', 
      value: user.company.kpp || '—',
      empty: !user.company.kpp
    },
    { 
      id: 'ogrn', 
      icon: 'document', 
      label: 'ОГРН', 
      value: user.company.ogrn || '—',
      empty: !user.company.ogrn
    },
    { 
      id: 'legalAddress', 
      icon: 'location', 
      label: 'Юридический адрес', 
      value: user.company.legalAddress || '—',
      empty: !user.company.legalAddress
    },
    { 
      id: 'about', 
      icon: 'info', 
      label: 'О компании', 
      value: user.company.about || '—',
      empty: !user.company.about
    }
  ] : []

  const getIcon = (iconName) => {
    const icons = {
      user: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      email: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      phone: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.83 21 20.67 21 20.5 21C10.62 21 2.5 12.88 2.5 3C2.5 2.83 2.5 2.67 2.51 2.5C2.57 1.94 3.02 1.5 3.58 1.5H6.58C7.17 1.5 7.68 1.91 7.78 2.49L8.28 5.36C8.38 5.92 8.14 6.49 7.67 6.81L5.94 8.01C7.34 10.79 9.64 13.09 12.42 14.49L13.62 12.76C13.94 12.29 14.51 12.05 15.07 12.15L17.94 12.65C18.52 12.75 18.93 13.26 18.93 13.85V16.92Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      role: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      building: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 21H21" stroke="currentColor" strokeWidth="2"/>
          <path d="M5 21V7L13 3V21" stroke="currentColor" strokeWidth="2"/>
          <path d="M19 21V11L13 7" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      document: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      location: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      info: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 16V12" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="8" r="1" fill="currentColor"/>
        </svg>
      )
    }
    return icons[iconName] || icons.user
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar 
        user={user}
        onLogout={onLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        {/* Шапка страницы */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Профиль</h1>
            <div className={styles.breadcrumbs}>
              <Link to="/dashboard" className={styles.breadcrumbLink}>Главная</Link>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>Профиль</span>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <button 
              className={styles.actionButton}
              onClick={() => navigate('/settings')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="currentColor" strokeWidth="2"/>
                <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Настройки
            </button>
            
          </div>
        </div>

        {/* Профиль пользователя */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarLarge}>
              {initials}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{user.fullName}</h2>
              <div className={styles.profileMeta}>
                <span className={styles.roleBadge}>{user.roleLabel}</span>
                <span className={styles.email}>{user.email}</span>
                {user.phone && <span className={styles.phone}>{user.phone}</span>}
              </div>
            </div>
          </div>

          {/* Табы */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Основная информация
            </button>
            {isSupplier && (
              <button 
                className={`${styles.tab} ${activeTab === 'company' ? styles.active : ''}`}
                onClick={() => setActiveTab('company')}
              >
                Информация о компании
              </button>
            )}
            <button 
              className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Безопасность
            </button>
          </div>

          {/* Контент вкладок */}
          <div className={styles.tabContent}>
            {activeTab === 'profile' && (
              <div className={styles.tilesGrid}>
                {userTiles.map(tile => (
                  <ProfileTile
                    key={tile.id}
                    icon={getIcon(tile.icon)}
                    title={tile.label}
                    value={tile.value}
                    empty={tile.empty}
                    primary={PRIMARY}
                    hovered={hoveredTile === tile.id}
                    onHover={() => setHoveredTile(tile.id)}
                    onLeave={() => setHoveredTile(null)}
                  />
                ))}
              </div>
            )}

            {activeTab === 'company' && isSupplier && (
              <div className={styles.tilesGrid}>
                {companyTiles.map(tile => (
                  <ProfileTile
                    key={tile.id}
                    icon={getIcon(tile.icon)}
                    title={tile.label}
                    value={tile.value}
                    empty={tile.empty}
                    primary={PRIMARY}
                    hovered={hoveredTile === tile.id}
                    onHover={() => setHoveredTile(tile.id)}
                    onLeave={() => setHoveredTile(null)}
                  />
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.securitySection}>
                <div className={styles.securityCard}>
                  <h3 className={styles.securityTitle}>Смена пароля</h3>
                  <form className={styles.securityForm}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Текущий пароль</label>
                      <input type="password" className={styles.input} placeholder="••••••••" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Новый пароль</label>
                      <input type="password" className={styles.input} placeholder="••••••••" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Подтверждение пароля</label>
                      <input type="password" className={styles.input} placeholder="••••••••" />
                    </div>
                    <button className={styles.submitButton}>
                      Обновить пароль
                    </button>
                  </form>
                </div>

                <div className={styles.securityCard}>
                  <h3 className={styles.securityTitle}>Двухфакторная аутентификация</h3>
                  <p className={styles.securityDescription}>
                    Добавьте дополнительный уровень защиты к вашему аккаунту
                  </p>
                  <button className={styles.enableButton}>
                    Включить 2FA
                  </button>
                </div>

                <div className={styles.dangerZone}>
                  <h3 className={styles.dangerTitle}>Опасная зона</h3>
                  <p className={styles.dangerDescription}>
                    Удаление аккаунта приведет к потере всех данных
                  </p>
                  <button className={styles.deleteButton}>
                    Удалить аккаунт
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Модальное окно подтверждения выхода */}
      {showLogoutConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>👋</div>
            <h3 className={styles.modalTitle}>Выйти из аккаунта?</h3>
            <p className={styles.modalMessage}>Вы будете перенаправлены на страницу входа</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowLogoutConfirm(false)}>
                Отмена
              </button>
              <button className={styles.modalConfirm} onClick={confirmLogout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Компонент тайла профиля
function ProfileTile({ icon, title, value, empty, primary, hovered, onHover, onLeave }) {
  return (
    <div 
      className={`${styles.tile} ${hovered ? styles.tileHover : ''} ${empty ? styles.tileEmpty : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.tileTitle}>
        <span className={styles.tileIcon} style={{ color: primary }}>
          {icon}
        </span>
        {title}
      </div>
      <div className={styles.tileValue}>
        {value}
      </div>
    </div>
  )
}