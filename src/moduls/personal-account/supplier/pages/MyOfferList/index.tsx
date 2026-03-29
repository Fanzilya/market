import { AccountHeader } from "@/moduls/personal-account/_layout/widgets/account-header";

export const MyOfferList = () => {
    return (
        <div>
            <AccountHeader
                title='Мои коммерческие предложения'
                breadcrumbs={{
                    current: "Мои коммерческие предложения",
                    linksBack: [{ text: "Главная", link: "/supplier/dashboard" }]
                }} />





        </div>
    );
}