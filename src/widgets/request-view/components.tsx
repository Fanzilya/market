export const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col gap-4">
        <span className="text-[12px] font-semibold text-[#64748B] uppercase tracking-[0.5px]">{label}</span>
        <span className="text-[16px] font-semibold text-[#1E293B]">{value}</span>
    </div>
)


export const SpecItem = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between px-4 py-3 bg-gray-50 rounded-[10px] border border-gray-200">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
)