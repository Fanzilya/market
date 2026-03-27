import { SpecItem } from "./components";
import { TitleBlock } from "./request-titles";

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


export const ParametersViewContainer = ({ title, items, classNames, list }: ContainerProps) => {
    return (
        <>
            <TitleBlock title={title} className={classNames?.title} />


            {items && items?.filter((item => ('is' in item) ? item.is : true)).map(item => item).length > 0 &&
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {items?.filter((item => ('is' in item) ? item.is : true)).map(item => (
                        <SpecItem label={item.label} value={item.value} />
                    ))}
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