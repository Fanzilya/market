interface Props {
  govCustomerName: string,
  contactPerson: string,
  contactPhone: string,
  contactEmail?: string,
}


export default function ({ govCustomerName, contactPerson, contactPhone, contactEmail }: Props) {

  return (
    <div className="mb-[24px] p-5 bg-slate-50 rounded-2xl">
      <h3 className="text-[18px] font-semibold text-[#1E293B] mb-[16px]">Контактная информация</h3>
      <div className="grid grid-cols-4 gap-[16px] mb-[16px]">
        {govCustomerName && <ContactItem label="" value={govCustomerName} />}
        {contactPerson && <ContactItem label="" value={contactPerson} />}
        {contactPhone && <ContactItem label="" value={contactPhone || '—'} />}
        {contactEmail && <ContactItem label="" value={contactEmail} />}
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


// items={[
//     {
//         label: "Объект:",
//         value: formData.objectName,
//     },
//     {
//         label: "Заказчик:",
//         value: formData.govCustomerName,
//     },
//     {
//         label: "Тип:",
//         value: "КНС (Канализационная насосная станция)",
//     },
//     {
//         label: "Контакт:",
//         value: formData.contactPerson,
//     },
// ]}