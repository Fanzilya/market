interface Props {
  freeClicksLeft: string | number
}

export default function ClicksInfo({ freeClicksLeft }: Props) {
  return (
    <div className="flex items-center gap-5 p-5 bg-blue-50 border border-[#4A85F6] rounded-xl my-6">
      <div className="flex-shrink-0">
        <ClockIcon />
      </div>
      <div className="flex-1">
        <span className="block text-base text-slate-800 mb-1">
          У вас осталось <strong className="text-[#4A85F6] text-lg">{freeClicksLeft}</strong> бесплатных откликов
        </span>
        <p className="m-0 text-sm text-slate-500 leading-relaxed">
          После отклика вы сможете отправить коммерческое предложение и увидеть полную информацию о заказчике.
        </p>
      </div>
    </div>
  )
}

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4A85F6" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="#4A85F6" strokeWidth="2" />
  </svg>
)