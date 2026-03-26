export interface Item {
    label: string,
    value: string,
}


interface ContainerProps {
    title: string,
    items?: Item[],
    classNames?: {
        title?: string,
        items?: string,
        list?: string,
    },
    list?: any
}


export const FormViewContainer = ({ title, items, classNames, list }: ContainerProps) => {
    return (
        <>
            <h3 className={`text-sm font-semibold text-[#1e293b] mb-4 uppercase tracking-[0.5px] ${classNames?.title}`}>{title}</h3>
            {items &&
                <div className={`grid grid-cols-2 gap-4 mb-6 ${classNames?.items}`}>
                    {items.map((item: Item, key: number) => {
                        return <ViewItem key={key} item={item} />
                    })}
                </div>
            }

            {list &&
                <div className={`flex flex-wrap gap-2`}>
                    {list.map((item, key) => (
                        <span key={key} className={'py-[4px] px-[12px] bg-gray-200 border-[1px_solid_#e2e8f0] rounded-[20px] text-[12px] text-[#1e293b]'}>
                            {item.name}
                        </span>
                    ))}
                </div>
            }
        </>
    );
}

const ViewItem = ({ item }: { item: Item }) => {
    return (
        <div className="flex flex-col gap-[4px]">
            <span className="text-[11px] font-medium text-[#64748b] uppercase tracking-[0.5px]">{item.label}</span>
            <span className="text-[14px] font-medium text-[#1e293b]">{item.value}</span>
        </div>
    )
}