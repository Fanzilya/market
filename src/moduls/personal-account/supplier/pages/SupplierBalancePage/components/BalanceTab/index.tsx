// src/pages/supplier/SupplierBalancePage/components/BalanceTab/index.tsx
import React from 'react'
import PackageCard from './PackageCard'
import PaymentMethods from './PaymentMethods'
import InfoBlock from './InfoBlock'
import styles from '../../SupplierBalancePage.module.css'
import { formatPrice } from '../../utils/formatters'

export default function BalanceTab({ packages, selectedPackage, onSelectPackage, onPayment }) {
  return (
    <div className={styles.balanceSection}>
      <h3 className={styles.sectionTitle}>Выберите пакет монет</h3>

      <div className={styles.packagesGrid}>
        {packages.map(pkg => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isSelected={selectedPackage?.id === pkg.id}
            onSelect={onSelectPackage}
          />
        ))}
      </div>

      <PaymentMethods />

      <button
        className={styles.payButton}
        onClick={onPayment}
        disabled={!selectedPackage}
      >
        <PaymentIcon />
        Оплатить {selectedPackage ? formatPrice(selectedPackage.price) : ''}
      </button>

      <InfoBlock />
    </div>
  )
}

const PaymentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
)