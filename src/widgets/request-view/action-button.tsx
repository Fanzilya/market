import { Button } from "@/shared/ui-kits/button"
import { Link } from "react-router-dom"

export function OfferButton({ onCreateOffer }: { onCreateOffer: string }) {
  return (
    <div className="text-center p-8 bg-slate-50 rounded-2xl my-8 border-2 border-dashed border-[#4A85F6] animate-pulse">
      <Link className="inline-flex items-center gap-3 px-9 py-[18px] bg-gradient-to-br from-emerald-500 to-emerald-700 border-none rounded-xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-500/30 mb-4 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40" to={onCreateOffer} >
        <StarIcon />
        Создать коммерческое предложение
      </Link>
      <p className="m-0 text-sm text-slate-500">
        После создания КП заказчик сможет увидеть ваше предложение
      </p>
    </div>
  )
}


export function RespondButton({ freeClicksLeft, isClicksAvailable, onRespond }: { freeClicksLeft: number | string, isClicksAvailable: boolean, onRespond: () => void }) {
  return (
    <div className="text-center p-8 rounded-2xl bg-slate-50">
      <Button
        className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br border-none rounded-xl text-white text-base 
          font-semibold cursor-pointer transition-all duration-300 mb-4
          ${isClicksAvailable && "shadow-lg shadow-[#4A85F6]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4A85F6]/40"}
          `}
        onClick={onRespond}
        disabled={!isClicksAvailable}
        styleColor={!isClicksAvailable ? "gray" : "blue"}
      >
        {isClicksAvailable && <PlusIcon />}
        {isClicksAvailable ? 'Откликнуться на заявку' : 'Пополните счёт'}
      </Button>
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

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-white">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)