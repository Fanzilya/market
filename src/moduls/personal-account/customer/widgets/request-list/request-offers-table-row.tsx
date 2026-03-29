import { configTypeKeys } from "@/entities/request/config"
import { Role } from "@/entities/user/role"
import { formatDate } from "@/utils/get-form-data"
import { Link, useNavigate } from "react-router-dom"

interface Props {
    item: any
    user?: any
}


export const RequestOffersTableRow = ({ item, user }: Props) => {
    return item.offers && item.offers.length > 0 ?
        (item.offers.map((offer: any) => {

            const linkTo = (!user ? `/customer` : (user?.role == Role.Customer ? `/customer` : "/admin")) + `/offer/` + offer.id

            return <Link to={linkTo} key={offer.id} className="py-3  px-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 grid grid-cols-6 items-center justify-items-center ">
                {/* Данные */}
                <div className="">
                    <span className=" text-left text-sm font-medium text-gray-600">{offer.warehouseLocation}</span>
                </div>

                <div className="">
                    <span className=" text-left text-sm font-medium text-gray-600">{offer.supplierSiteURL}</span>
                </div>

                <div className="">
                    <span className=" text-left text-sm font-medium text-gray-600">
                        {new Date(offer.supportingDocumentDate).toLocaleDateString('ru-RU')}
                    </span>
                </div>

                <div className="">
                    <span className=" text-left text-sm font-medium text-gray-600">{offer.manufacturerCountry}</span>
                </div>

                <div className="">
                    <span className=" text-left text-sm font-medium text-gray-600">{offer.currentPriceNoNDS} ₽</span>
                </div>

                <div className="">
                    <span className=" text-left text-sm font-medium text-gray-600">{offer.currentPriceNDS} ₽</span>
                </div>
            </Link>
        })
        ) : (
            <div className="p-4 text-center text-gray-500">
                Нет коммерческих предложений
            </div>
        )
}