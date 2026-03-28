// hooks/useRequestsQuery.js
import { requestArhivApi, requestsAllApi, requestStatusChangeApi } from '@/entities/admin/api'
import { offersByRequestsApi } from '@/entities/offer/api'
import { getPumpSingle } from '@/entities/pumps/api'
import { allByUserApi, requestArhivCustomerApi, requestSingleApi } from '@/entities/request/api'
import { configTypeKeys } from '@/entities/request/config'
import { RequestRes } from '@/entities/request/type'
import { useAuth } from '@/features/user/context/context'
import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query'

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

    const requestDetailsQueries = useQueries({
        queries: requests.map((request: RequestRes) => ({
            queryKey: [queryKeys.requestDetail, request.id],
            queryFn: () => request.configTypeId == configTypeKeys.pupm ? getPumpSingle({ requestId: request.id }) : requestSingleApi({ id: request.id }),
            staleTime: 5 * 60 * 1000,
            enabled: !!request.id,
        })),
    })

    const offersQueries = useQueries({
        queries: requests.map((request: RequestRes) => ({
            queryKey: ['request-offers', request.id],
            queryFn: () => offersByRequestsApi({ requestId: request.id }),
            staleTime: 5 * 60 * 1000,
            enabled: !!request.id,
        })),
    })

    const requestsWithOffers = requests
        .map((request: RequestRes, index: number) => {
            const detailResult = requestDetailsQueries[index]
            const offersResult = offersQueries[index]

            // Пропускаем, если какой-то из запросов еще загружается или содержит ошибку
            if (detailResult.isLoading || offersResult.isLoading) {
                return null
            }

            // Если есть ошибка в одном из запросов, логируем и пропускаем
            if (detailResult.error || offersResult.error) {
                console.error(`Ошибка при обработке request ${request.id}:`, {
                    detailError: detailResult.error,
                    offersError: offersResult.error,
                })
                return null
            }

            return {
                data: detailResult.data?.data ?? request,
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
        isLoading: requestsQuery.isLoading || requestDetailsQueries.some(q => q.isLoading) || offersQueries.some(q => q.isLoading),
        isError: requestsQuery.isError || requestDetailsQueries.some(q => q.isError) || offersQueries.some(q => q.isError),
        errors: requestsQuery.error,
        archiveRequest: archiveRequestMutation.mutate,
        refetchAll: () => {
            requestsQuery.refetch()
        },
    }
}