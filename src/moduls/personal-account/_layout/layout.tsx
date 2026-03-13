import { Sidebar } from "@/shared/components/Sidebar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

export const Layout = observer(() => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

    // Отслеживание размера экрана
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <ScrollToTop />

            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            
            {/* На мобильных устройствах отступ не применяется */}
            <div
                className="flex-1 p-8 transition-all duration-200 max-md:p-5"
                style={{ 
                    marginLeft: isMobile ? 0 : (isCollapsed ? '80px' : '280px')
                }}
            >
                <Outlet />
            </div>
        </div>
    );
})