// src/pages/SupplierPage/components/EmptyState.tsx
import Icon from '@/shared/ui-kits/Icon'

export default function EmptyState() {
  return (
    <div className="text-center py-16 px-5 bg-white rounded-2xl border border-slate-200">
      <Icon name='info' width={64} height={64} className='"mb-5 opacity-50 mx-auto"' />
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Нет доступных заявок</h3>
      <p className="text-sm text-slate-500">В данный момент нет опубликованных заявок</p>
    </div>
  )
}