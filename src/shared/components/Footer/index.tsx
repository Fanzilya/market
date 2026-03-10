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
            
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Компания</h4>
            <Link to="https://smkhydrig.ru" className={styles.footerLink}>О нас</Link>
            {/* <Link to="/blog" className={styles.footerLink}>Блог</Link>
            <Link to="/career" className={styles.footerLink}>Карьера</Link> */}
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
            {/* <Link to="/faq" className={styles.footerLink}>FAQ</Link> */}
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