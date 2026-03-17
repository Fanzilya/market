// components/FreeClicksModal.tsx
import styles from './FreeClicksModal.module.css'



interface Props {
  clicksLeft: any,
  onConfirm: any,
  onClose: any,
  onGoToBilling: any,
}

export default function FreeClicksModal({ clicksLeft, onConfirm, onClose, onGoToBilling }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
            <path d="M12 8V12L15 15" stroke="#4A85F6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className={styles.title}>Отклик на заявку</h2>

        <p className={styles.message}>
          У вас осталось <strong>{clicksLeft}</strong> {getClicksWord(clicksLeft)}.
          Сейчас будет использован 1 отклик для просмотра контактной информации заказчика.
        </p>

        <div className={styles.infoBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
            <path d="M12 16V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="8" r="1" fill="#F59E0B" />
          </svg>
          <span>
            После отклика вы сможете создать коммерческое предложение и увидеть все контактные данные заказчика.
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Продолжить бесплатно
          </button>
        </div>

        <button className={styles.billingLink} onClick={onGoToBilling}>
          Перейти к тарифам и оплате →
        </button>
      </div>
    </div>
  )
}

function getClicksWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'откликов';
  if (lastDigit === 1) return 'отклик';
  if (lastDigit >= 2 && lastDigit <= 4) return 'отклика';

  return 'откликов';
}