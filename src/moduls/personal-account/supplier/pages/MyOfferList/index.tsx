import { AccountHeader } from "@/moduls/personal-account/_layout/widgets/account-header";
import { useMyOffersList } from "../../features/my-offers-list/use-my-offers-list";
import Loader from "@/shared/ui-kits/loader/loader";
import { OfferItem } from "@/widgets/offers/offer-item";

export const MyOfferList = () => {




    const { offerList, isLoader } = useMyOffersList()


    return (
        <div>
            <AccountHeader
                title='Мои коммерческие предложения'
                breadcrumbs={{
                    current: "Мои коммерческие предложения",
                    linksBack: [{ text: "Главная", link: "/supplier/dashboard" }]
                }} />


            {isLoader
                ? <Loader />
                : (
                    <div className="space-y-3">
                        {offerList.map((offer: any) => <OfferItem item={offer} url={`/supplier/offer/${offer.id}`} />)}
                    </div>
                )
            }
        </div>
    );
}