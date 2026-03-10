// src/components/Footer.tsx
import { Link, useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'
import Logo from "../../../../public/logo.svg"

export default function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <div className={styles.logo} onClick={() => navigate('/')}>
              <img
                src={Logo}
                alt="КликПроект"
                className={styles.logoImage}
              />
              <span className={styles.logoText}>КликПроект</span>
            </div>
            <p className={styles.footerDescription}>
              Платформа для автоматизации сбора коммерческих предложений
              и поиска инженерного оборудования
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 4.01C21 4.5 20.02 4.81 19 4.92C20.05 3.88 20.85 2.57 21.23 1.07C20.24 1.69 19.16 2.14 18 2.39C16.96 1.25 15.52 0.61 14 0.61C11 0.61 8.56 3.05 8.56 6.05C8.56 6.53 8.61 7 8.7 7.46C5.85 7.32 3.27 5.99 1.5 3.91C0.96 4.87 0.67 5.96 0.67 7.11C0.67 9.31 1.79 11.27 3.52 12.38C2.81 12.36 2.12 12.18 1.5 11.86C1.5 11.88 1.5 11.91 1.5 11.94C1.5 14.6 3.37 16.8 5.89 17.36C5.36 17.5 4.81 17.57 4.25 17.57C3.85 17.57 3.46 17.53 3.08 17.46C3.87 19.6 5.89 21.16 8.25 21.2C6.39 22.63 4.06 23.45 1.67 23.45C1.18 23.45 0.69 23.42 0.21 23.35C2.62 24.86 5.45 25.69 8.48 25.69C14 25.69 19.01 21.98 19.01 15.86C19.01 15.67 19.01 15.48 18.99 15.29C19.99 14.57 20.86 13.67 21.57 12.63C20.57 13.08 19.5 13.38 18.41 13.51C19.55 12.82 20.42 11.76 20.98 10.49C19.92 11.13 18.77 11.6 17.57 11.86C18.57 10.86 19.28 9.58 19.57 8.16C19.57 8.05 19.58 7.95 19.58 7.84C18.87 8.21 18.09 8.49 17.27 8.66C18.27 7.96 19.03 6.94 19.43 5.76C18.42 6.41 17.31 6.88 16.15 7.14C15.11 6.04 13.64 5.39 12 5.39C9.89 5.39 8.08 7.2 8.08 9.31C8.08 9.79 8.14 10.26 8.25 10.71C6.69 10.61 5.2 10.15 3.89 9.36C3.41 10.04 3.15 10.84 3.15 11.7C3.15 13.32 4 14.77 5.29 15.63C4.83 15.62 4.38 15.51 3.97 15.3C3.97 15.32 3.97 15.34 3.97 15.36C3.97 17.35 5.4 19.01 7.27 19.53C6.83 19.66 6.37 19.73 5.9 19.73C5.56 19.73 5.22 19.7 4.89 19.63C5.58 21.26 7.13 22.41 8.96 22.44C7.54 23.48 5.8 24.06 4 24.06C3.52 24.06 3.04 24.03 2.57 23.96C4.34 25.07 6.41 25.69 8.62 25.69C14.31 25.69 18.29 21.22 18.29 15.8C18.29 15.63 18.29 15.46 18.28 15.29C19.28 14.57 20.15 13.68 20.86 12.64C19.86 13.09 18.79 13.4 17.7 13.53C18.84 12.84 19.71 11.78 20.27 10.51C19.21 11.15 18.06 11.62 16.86 11.88C17.86 10.88 18.57 9.6 18.86 8.18C18.86 8.07 18.87 7.97 18.87 7.86C18.16 8.23 17.38 8.51 16.56 8.68C17.56 7.98 18.32 6.96 18.72 5.78C17.71 6.43 16.6 6.9 15.44 7.16C14.4 6.06 12.93 5.41 11.29 5.41C9.18 5.41 7.37 7.22 7.37 9.33C7.37 9.81 7.43 10.28 7.54 10.73C5.98 10.63 4.49 10.17 3.18 9.38C2.7 10.06 2.44 10.86 2.44 11.72C2.44 13.34 3.29 14.79 4.58 15.65C4.12 15.64 3.67 15.53 3.26 15.32C3.26 15.34 3.26 15.36 3.26 15.38C3.26 17.37 4.69 19.03 6.56 19.55C6.12 19.68 5.66 19.75 5.19 19.75C4.85 19.75 4.51 19.72 4.18 19.65C4.87 21.28 6.42 22.43 8.25 22.46C6.83 23.5 5.09 24.08 3.29 24.08C2.81 24.08 2.33 24.05 1.86 23.98" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.46 6.01C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10 2.38 10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.4 4.53 14.45 3.88 14.38C4.43 16.09 6 17.34 7.89 17.37C6.41 18.53 4.57 19.18 2.69 19.18C2.33 19.18 1.97 19.16 1.62 19.11C3.52 20.33 5.76 21 8.13 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6.01Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Компания</h4>
            <Link to="/about" className={styles.footerLink}>О нас</Link>
            <Link to="/blog" className={styles.footerLink}>Блог</Link>
            <Link to="/career" className={styles.footerLink}>Карьера</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Продукты</h4>
            <Link to="/brands" className={styles.footerLink}>Производители</Link>
            <Link to="/catalog" className={styles.footerLink}>Каталог</Link>
            <Link to="/pricing" className={styles.footerLink}>Тарифы</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Поддержка</h4>
            <Link to="/help" className={styles.footerLink}>Помощь</Link>
            <Link to="/faq" className={styles.footerLink}>FAQ</Link>
            <Link to="/contacts" className={styles.footerLink}>Контакты</Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© {currentYear} КликПроект. Все права защищены.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/privacy" className={styles.footerBottomLink}>Политика конфиденциальности</Link>
            <Link to="/terms" className={styles.footerBottomLink}>Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}