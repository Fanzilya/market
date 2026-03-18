interface Props {
  govCustomerName: string,
  contactPerson: string,
  contactPhone: string,
  contactEmail?: string,
}


export default function ({ govCustomerName, contactPerson, contactPhone, contactEmail }: Props) {
  return (
    <div className="p-3 bg-white mb-[24px] rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
      <h3 className="text-[18px] font-semibold text-[#1E293B] mb-[16px]">Контактная информация</h3>
      <div className="grid grid-cols-4 gap-[16px] mb-[16px]">
        {govCustomerName && <ContactItem label="Заказчик:" value={govCustomerName} />}
        {contactPerson && <ContactItem label="Контактное лицо:" value={contactPerson} />}
        {contactPhone && <ContactItem label="Телефон:" value={contactPhone || '—'} />}
        {contactEmail && <ContactItem label="Email:" value={contactEmail} />}
      </div>
    </div>
  )
}

const ContactItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.5px]">{label}</span>
    <span className="text-[15px] font-semibold text-slate-800">{value}</span>
  </div>
) 