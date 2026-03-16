import { Link } from "react-router-dom";



interface LinkType {
    text: string,
    link: string,
}

export interface PropsBreadcrumbs {
    linksBack?: LinkType[],
    current: string,
    className?: string,
}

export const Breadcrumbs = ({ linksBack, current, className }: PropsBreadcrumbs) => {
    return (
        <div className={`flex items-center gap-2 text-[14px] text-[#64748B] ${className}`}>
            {linksBack && linksBack.map((item: LinkType, key: number) => {
                return (
                    <>
                        <Link to={item.link} key={key} className=" text-[#64748B] hover:text-[#4A85F6]">
                            {item.text}
                        </Link>
                        <span className="text-[#CBD5E1] ">›</span>
                    </>
                )
            })}
            <span className="text-[#4A85F6] font-medium ">
                {current}
            </span>
        </div>
    );
}