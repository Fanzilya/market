import { useState } from "react"

interface Props {
  title: string,
  items: {
    is?: boolean
    label: string,
    value: string | number
  }[]
}


export default function BasicInformationViewContainer({ title, items }: Props) {
  const currentItems = items.filter((item => ('is' in item) ? item.is : true)).map(item => item)

  const isValuePresent = (value: any) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== "";
    return false;
  };

  const buildItems = (items: { label: string; value: any }[]) => items && items.filter(item => isValuePresent(item.value));
  const filteredItems = buildItems(items);
  if (filteredItems && !filteredItems.length) return null;


  return (
    <div className="mb-[24px] p-5 bg-white rounded-2xl border border-[#e2e8f0]">
      <h3 className="text-[18px] font-semibold text-[#1E293B] mb-[16px]">{title}</h3>
      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[24px] mb-[16px]">
        {filteredItems.length > 0 && filteredItems.map((item, key) => (
          <ContactItem key={key} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}

const ContactItem = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.5px]">{label}</span>
    <span className="text-[15px] font-semibold text-slate-800">{value}</span>
  </div>
)


