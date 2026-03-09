import { Sidebar } from "@/shared/components/Sidebar";
import styles from "./layout.module.css";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ScrollToTop } from "@/shared/components/ScrollToTop";

export const Layout = observer(() => {
    return (
        <div className={`${styles.page}`}>
            <ScrollToTop />
            <Sidebar />
            <div className={styles.mainContent}>
                <Outlet />
            </div>
        </div>
    );
})