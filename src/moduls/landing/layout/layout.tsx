import Footer from "@/shared/components/Footer"
import Header from "@/shared/components/Header"
import { ScrollToTop } from "@/shared/components/ScrollToTop"
import { Outlet } from "react-router-dom"
import styles from "./layout.module.css"

export const Layout = () => {

    return (
        <div className={`${styles.page}`}>
            <Header />
            <ScrollToTop />
            <Outlet />
            <Footer />
        </div>
    )
}