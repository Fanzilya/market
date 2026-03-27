import { useState } from "react"

interface Props {
  title: string,
  items: {
    is?: boolean
    label: string,
    value: string | number
  }[]
}


export default function  BasicInformationViewContainer({ title, items }: Props) {
  const currentItems = items.filter((item => ('is' in item) ? item.is : true)).map(item => item)

  return (
    <div className="mb-[24px] p-5 bg-slate-50 rounded-2xl">
      <h3 className="text-[18px] font-semibold text-[#1E293B] mb-[16px]">{title}</h3>
      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[24px] mb-[16px]">
        {currentItems.length > 0 && currentItems.map((item, key) => (
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


