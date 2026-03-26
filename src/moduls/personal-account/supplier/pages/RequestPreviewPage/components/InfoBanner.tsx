// src/pages/supplier/SupplierPreviewPage/components/InfoBanner.tsx
import Icon from '@/shared/ui-kits/Icon'
import styles from '../RequestPreviewPage.module.css'

export default function InfoBanner({ hasResponded }) {

  if (hasResponded) {
    return (
      <div className={styles.infoBanner}>
        <Icon name='info' color='#F59E0B' />
        <div>
          <strong>Ограниченный доступ</strong>
          <p>Вы видите только технические характеристики. Чтобы увидеть контактную информацию заказчика и полные данные, необходимо откликнуться на заявку.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.successBanner}>
      <Icon name='info' color='#10B981' />
      <div>
        <strong>Вы откликнулись на заявку!</strong>
        <p>Теперь вам доступна полная информация. Можете создать коммерческое предложение.</p>
      </div>
    </div>
  )
}