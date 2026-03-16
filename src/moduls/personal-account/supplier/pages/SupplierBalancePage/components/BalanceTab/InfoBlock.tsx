// src/pages/supplier/SupplierBalancePage/components/BalanceTab/InfoBlock.tsx
import Icon from '@/shared/ui-kits/Icon'
import styles from '../../SupplierBalancePage.module.css'

export default function InfoBlock() {
  return (
    <div className={styles.infoBlock}>

      <Icon name='info' color='#4A85F6' />

      <div>
        <strong>Как это работает</strong>
        <p>1 монета = 1 отклик на заявку. Бонусные монеты начисляются автоматически при пополнении. Срок действия монет не ограничен.</p>
      </div>
    </div>
  )
}