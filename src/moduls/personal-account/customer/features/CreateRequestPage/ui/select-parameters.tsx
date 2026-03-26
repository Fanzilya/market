interface Props {
    label: string,
    value: string,
    required?: boolean,
    onChange: (value: string) => void,
    items: {
        value: any,
        text: any,
    }[]
}

export const SelectParameters = ({ required = false, label, value, onChange, items }: Props) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-[#1e293b] flex items-center gap-1">{label} {required && <span className="text-[#ef4444]">*</span>}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-3 border-2 border-[#e2e8f0] rounded-lg text-sm transition-all duration-200 bg-white text-[#1e293b] w-full focus:outline-none focus:border-[#4A85F6] focus:ring-2 focus:ring-[#4A85F6]/10"
            >

                {items.map((item, key) =>
                    <option value={item.value} key={key}>
                        {item.text}
                    </option>
                )}
            </select>
        </div>
    );
}