import { useState } from "react";




export function useOfferCreate() {
    const TABS = [
        { id: 'main', label: 'Основная информация' },
        // { id: 'company', label: 'Информация о компании', component: CompanyInfoTab },
        { id: 'delivery', label: 'Условия поставки' },
        // { id: 'materials', label: 'Материалы и оборудование', component: MaterialsTab },
        { id: 'docs', label: 'Документы' }
    ]



    const [activeTab, setActiveTab] = useState<string>(TABS[0].id)

    return {
        TABS,
        activeTab,
        setActiveTab,
    }
}