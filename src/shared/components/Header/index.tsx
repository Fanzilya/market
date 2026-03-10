// src/components/Header.tsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/user/context/context'
import styles from './Header.module.css'
import { Role } from '@/entities/user/role'
import Logo from "../../../../public/logo.svg"

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [user])

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
  const accountLink = user?.role == Role.Customer ? "customer/dashboard" : (user?.role == Role.Admin ? "admin" : "supplier/dashboard")

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            
            <img
              src={Logo}
              alt="КликПроект"
              className={styles.logoImage}
            />
            <span className={styles.logoText}>КликПроект</span>
          </div>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              Главная
            </Link>

            <Link
              to="/brands"
              className={`${styles.navLink} ${isActive('/brands') ? styles.active : ''}`}
            >
              Производителям
            </Link>
          </nav>

          <div className={styles.headerRight}>
            {user ? (
              <div className={styles.userMenu}>
                <Link to={accountLink} className={styles.userProfile}>
                  <div className={styles.avatar}>{initials}</div>
                  <span className={styles.userName}>{user.fullName}</span>
                </Link>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Выйти</span>
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login" className={styles.authButton}>
                  Войти
                </Link>
                <Link to="/register" className={styles.authButtonFilled}>
                  Регистрация
                </Link>
              </div>
            )}
          </div>

          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke="#4A85F6" strokeWidth="2" />
              ) : (
                <>
                  <path d="M3 12H21" stroke="#4A85F6" strokeWidth="2" />
                  <path d="M3 6H21" stroke="#4A85F6" strokeWidth="2" />
                  <path d="M3 18H21" stroke="#4A85F6" strokeWidth="2" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
              Главная
            </Link>
            <Link to="/brands" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
              Производители
            </Link>
            <Link to="/catalog" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
              Каталог
            </Link>
            {!user ? (
              <>
                <Link to="/login" className={styles.mobileAuthButton} onClick={() => setIsMobileMenuOpen(false)}>
                  Войти
                </Link>
                <Link to="/register" className={styles.mobileAuthButtonFilled} onClick={() => setIsMobileMenuOpen(false)}>
                  Регистрация
                </Link>
              </>
            ) : (
              <>
                <Link to={accountLink} className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
                  Личный кабинет
                </Link>
                <button className={styles.mobileLogoutButton} onClick={handleLogout}>
                  Выйти
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}