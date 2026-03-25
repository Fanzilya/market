import { useEffect, useState } from "react"
import styles from "./LayoutPage.module.css"



interface Props {
    formBlock: React.ReactNode,
    informationBlock: React.ReactNode,
    title: string,
    subtitle: string,
}

export const AuthLayout = ({ formBlock, informationBlock, title, subtitle }: Props) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {

        setIsMounted(true)
    }, [])

    return (
        <div className={`${styles.page} ${isMounted ? styles.pageMounted : ''}`}>
            <div className={styles.container}>
                {/* Левая колонка - форма регистрации */}
                <div className={styles.formColumn}>
                    <div className={styles.formContainer}>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.subtitle}>{subtitle}</p>
                        <div className={styles.form}>
                            {formBlock}
                        </div>
                    </div>
                </div>

                <div className={styles.promoColumn}>
                    <div className={styles.promoContent}>

                        {informationBlock}

                    </div>
                </div>
            </div>
        </div>
    );
}