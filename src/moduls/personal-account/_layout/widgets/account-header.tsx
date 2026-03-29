import { Breadcrumbs, PropsBreadcrumbs } from "@/shared/ui-kits/breadcrumbs";
import { Button } from "@/shared/ui-kits/button";
import { PageTitle } from "@/shared/ui-kits/titles/h3";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";


interface Props {
    navBack?: string,
    title: string,
    rightBlock?: ReactNode
    breadcrumbs?: PropsBreadcrumbs
}

export const AccountHeader = ({ rightBlock, title, breadcrumbs, navBack }: Props) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-top mb-[24px] flex-wrap gap-4">
            <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-4">
                    {navBack &&
                        <Button
                            styleColor="blue"
                            className="px-2 py-1 flex items-center"
                            onClick={() => navigate(navBack)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                            <span className="mb-0.5">назад</span>
                        </Button>
                    }

                    <PageTitle text={title} className={navBack ? "mb-1" : ""} />
                </div>
                {breadcrumbs && <Breadcrumbs linksBack={breadcrumbs.linksBack} current={breadcrumbs.current} className="mt-1" />}
            </div>

            {rightBlock}
        </div>
    );
}