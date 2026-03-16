import { Breadcrumbs, PropsBreadcrumbs } from "@/shared/ui-kits/breadcrumbs";
import { PageTitle } from "@/shared/ui-kits/titles/h3";
import { ReactNode } from "react";


interface Props {
    title: string,
    rightBlock?: ReactNode
    breadcrumbs?: PropsBreadcrumbs
}

export const AccountHeader = ({ rightBlock, title, breadcrumbs }: Props) => {
    return (
        <div className="flex items-top mb-[24px] flex-wrap gap-4">
            <div className="flex flex-col gap-1 flex-1">
                <PageTitle text={title} />
                {breadcrumbs && <Breadcrumbs linksBack={breadcrumbs.linksBack} current={breadcrumbs.current} />}
            </div>

            {rightBlock}
        </div>
    );
}