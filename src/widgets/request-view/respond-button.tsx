interface Props {
  freeClicksLeft: number | string,
  isClicksAvailable: boolean,
  onRespond: () => void
}

export default function RespondButton({ freeClicksLeft, isClicksAvailable, onRespond }: Props) {
  return (
    <div className="text-center p-8 bg-slate-50 rounded-2xl my-8">
      <button
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#4A85F6] to-[#3A6BC9] border-none rounded-xl text-white text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-[#4A85F6]/30 mb-4 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4A85F6]/40"
        onClick={onRespond}
        disabled={!isClicksAvailable}
      >
        <PlusIcon />
        {isClicksAvailable ? 'Откликнуться на заявку' : 'Бесплатные отклики закончились'}
      </button>
      <p className="m-0 text-sm text-slate-500">
        {isClicksAvailable
          ? `Останется ${Number(freeClicksLeft) - 1} бесплатных откликов`
          : 'Пополните счет, чтобы продолжить'}
      </p>
    </div>
  )
}

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19" stroke="white" strokeWidth="2" />
    <path d="M12 5L12 19" stroke="white" strokeWidth="2" />
  </svg>
)