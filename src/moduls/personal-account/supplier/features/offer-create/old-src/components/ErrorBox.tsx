// src/pages/supplier/CreateOfferPage/components/ErrorBox.tsx
import Icon from '@/shared/ui-kits/Icon'
import styles from '../CreateOfferPage.module.css'

interface Props {
  error: string
}

export default function ErrorBox({ error }: Props) {
  if (!error) return null

  return (
    <div className={styles.errorBox}>
      <Icon name='info' width={20} />
      {error}
    </div>
  )
}