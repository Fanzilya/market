// src/pages/supplier/SupplierBalancePage/components/BalanceTab/PackageCard.jsx
import styles from '../../SupplierBalancePage.module.css'
import { formatPrice } from '../../utils/formatters'

export default function PackageCard({ pkg, isSelected, onSelect }) {
  return (
    <div
      className={`${styles.packageCard} 
        ${isSelected ? styles.packageSelected : ''} 
        ${pkg.popular ? styles.packagePopular : ''}`}
      onClick={() => onSelect(pkg)}
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
  )
}