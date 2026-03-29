import { businessaccApi } from "@/entities/offer/api"
import { useAuth } from "@/features/user/context/context"
import { useQuery } from "@tanstack/react-query"

export function useMyOffersList() {

    const { accountData } = useAuth()

    const offersQuery = useQuery({
        queryKey: ['offers-offers'],
        queryFn: () => businessaccApi({ acc: accountData.id }),
        staleTime: 5 * 60 * 1000,
    })

    return {
        offerList: offersQuery.data?.data,
        isLoader: (offersQuery.isLoading),
    }
}