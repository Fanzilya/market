// hooks/useRequestsQuery.js
import { requestArhivApi, requestsAllApi, requestStatusChangeApi } from '@/entities/admin/api'
import { offersByRequestsApi } from '@/entities/offer/api'
import { getPumpSingle } from '@/entities/pumps/api'
import { allByUserApi, requestArhivCustomerApi, requestSingleApi } from '@/entities/request/api'
import { configTypeKeys } from '@/entities/request/config'
import { RequestRes } from '@/entities/request/type'
import { useAuth } from '@/features/user/context/context'
import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'

// Ключи для кэширования
export const queryKeys = {
    requests: 'requests',
    offers: 'offers',
    users: 'users',
    stats: 'stats',
    requestDetail: 'request-detail',
}

// Хук для получения всех данных
export const useRequestsListData = () => {
    const queryClient = useQueryClient()

    const { user } = useAuth()

    const requestsQuery = useQuery({
        queryKey: ['customer-request-list'],
        queryFn: () => allByUserApi({ userId: user?.id?.toString()! }),
        staleTime: 5 * 60 * 1000,
    })


    const requests = requestsQuery.data?.data ?? []

    const offersQueries = useQueries({
        queries: requests.map((request: RequestRes) => ({
            queryKey: ['request-offers', request.requestId],
            queryFn: () => offersByRequestsApi({ requestId: request.requestId }),
            staleTime: 5 * 60 * 1000,
            enabled: !!request.requestId,
        })),
    })

    const requestsWithOffers = requests.map((request: RequestRes, index: number) => {
        const offersResult = offersQueries[index]

        if (offersResult.isLoading) {
            return null
        }

        if (offersResult.error) {
            console.error(`Ошибка при обработке request ${request.requestId}:`, {
                offersError: offersResult.error,
            })
            return null
        }

        return {
            data: request,
            offers: offersResult.data?.data ?? [],
        }
    })
        .filter((item) => item !== null)


    const archiveRequestMutation = useMutation({
        mutationFn: (requestId: string) => requestArhivCustomerApi({ userId: user?.id?.toString()!, requestId: requestId }),
        onSuccess: () => {
            // Инвалидируем все связанные запросы
            queryClient.invalidateQueries({ queryKey: [queryKeys.requests] })

            // Также инвалидируем детальные запросы для обновления статуса
            queryClient.invalidateQueries({ queryKey: [queryKeys.requestDetail] })

            // Можно также обновить кэш оптимистично (опционально)
            // updateCacheAfterArchive()
        },
        onError: (error) => {
            console.error('Ошибка при архивации:', error)
        },
    })

    const sortRequests = (requestsToSort) => {
        return [...requestsToSort].sort((a, b) => {
            // Сортировка по дате создания (новые сверху)
            return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
        })
    }


    return {
        requests: sortRequests(requestsWithOffers),
        isLoading: requestsQuery.isLoading || offersQueries.some(q => q.isLoading),
        isError: requestsQuery.isError || offersQueries.some(q => q.isError),
        errors: requestsQuery.error,
        archiveRequest: archiveRequestMutation.mutate,
        refetchAll: () => {
            requestsQuery.refetch()
        },
    }
}