import { offersByRequestsApi } from "@/entities/offer/api";
import { requestSingleApi } from "@/entities/request/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react"; // ← заменили useState на useMemo

export function useOffersList(requestId: string) {

    const [viewMode, setViewMode] = useState<"table" | "view">("table")


    // Запрос заявок
    const requestQuery = useQuery({
        queryKey: ['offers-list', requestId], // ← добавил requestId в key!
        queryFn: () => requestSingleApi({ id: requestId }),
        staleTime: 5 * 60 * 1000,
    })

    const offersQuery = useQuery({
        queryKey: ['offers-offers', requestId], // ← добавил requestId в key!
        queryFn: () => offersByRequestsApi({ requestId: requestId }),
        staleTime: 5 * 60 * 1000,
    })

    // Формирование запроса (чистая функция, без сайд-эффектов)
    const formingRequest = (data: any) => {
        if (!data) return null;
        return {
            objectName: data.objectName,
            govCustomerName: data.customerName,
            regionId: data.locationRegion,
            configType: data.configTypeId,
            contactPerson: data.contactName,
            contactPhone: data.phoneNumber,
            contactEmail: "",
            projectOrganizationName: data.projectOrganizationName,
            regionName: data.locationRegion,
            innerId: data.innerId,
            schemeFileId: data.schemeFileId,
        }
    }

    // ✅ Вычисляем stats через useMemo - без setStats!
    const stats = useMemo(() => {
        const data = offersQuery.data?.data;
        if (!data || !Array.isArray(data)) {
            return { total: 0, minPrice: 0, maxPrice: 0, avgPrice: 0 };
        }

        const prices = data
            .map(o => parseFloat(o.currentPriceNDS) || 0)
            .filter(p => p > 0);

        if (!prices.length) {
            return { total: 0, minPrice: 0, maxPrice: 0, avgPrice: 0 };
        }

        const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

        return {
            total: data.length,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
            avgPrice: Number(avg.toFixed(2)), // ← вернём число, а не строку
        };
    }, [offersQuery.data?.data]); // ← пересчитываем только при изменении данных

    // Формирование офферов (просто возвращаем данные)
    const offers = useMemo(() => {
        const data = offersQuery.data?.data;
        if (!data || !Array.isArray(data)) return [];
        return data;
    }, [offersQuery.data?.data]);

    return {
        request: formingRequest(requestQuery.data?.data),
        offers,
        isLoader: (requestQuery.isLoading || offersQuery.isLoading),
        stats, // ← готовый объект из useMemo,
        viewMode,
        setViewMode
    }
}