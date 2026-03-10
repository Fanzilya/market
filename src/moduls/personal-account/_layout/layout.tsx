import { Sidebar } from "@/shared/components/Sidebar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
import { useState } from "react";
import { observer } from "mobx-react-lite";

export const Layout = observer(() => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={`flex min-h-screen bg-[#f8fafc]`}>
            <ScrollToTop />

            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div
                className="flex-1 p-8 transition-[margin] duration-200 max-md:ml-0 max-md:p-5"
                style={{ marginLeft: isCollapsed ? '80px' : '280px' }}
            >
                <Outlet />
            </div>
        </div>
    );
})