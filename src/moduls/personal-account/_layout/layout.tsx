import { Sidebar } from "@/shared/components/Sidebar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
import { useState, useEffect, useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";

const MOBILE_QUERY = "(max-width: 1024px)";

export const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

    useEffect(() => {
        const media = window.matchMedia(MOBILE_QUERY);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, []);

    const marginLeft = useMemo(() => {
        if (isMobile) return 0;
        return isCollapsed ? 80 : 280;
    }, [isMobile, isCollapsed]);

    const handleCollapse = useCallback((value: boolean) => {
        setIsCollapsed(value);
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <ScrollToTop />
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={handleCollapse} />
            <main className="flex-1 p-8 transition-[margin] duration-200 max-md:p-5" style={{ marginLeft }}>
                <Outlet />
            </main>
        </div>
    );
};