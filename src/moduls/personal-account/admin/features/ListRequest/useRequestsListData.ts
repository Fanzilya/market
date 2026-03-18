// hooks/useRequestsQuery.js
import { requestArhivApi, requestsAllApi, requestStatusChangeApi } from '@/entities/admin/api'
import { offersByRequestsApi } from '@/entities/offer/api'
import { requestSingleApi } from '@/entities/request/api'
import { RequestRes } from '@/entities/request/type'
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

    // Запрос заявок
    const requestsQuery = useQuery({
        queryKey: ['admin-request-list'],
        queryFn: requestsAllApi,
        staleTime: 5 * 60 * 1000,
    })


    const requests = requestsQuery.data?.data ?? []

    const requestDetailsQueries = useQueries({
        queries: requests.map((request: RequestRes) => ({
            queryKey: [queryKeys.requestDetail, request.id],
            queryFn: () => requestSingleApi({ id: request.id }),
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


    // Мутация для архивации
    const archiveRequestMutation = useMutation({
        mutationFn: (requestId: string) => requestArhivApi({ id: requestId }),
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

    const statusChandeRequestMutation = useMutation({
        mutationFn: ({ requestId, newStatus }: { requestId: string, newStatus: number }) => requestStatusChangeApi({ requestId: requestId, newStatus: Number(newStatus) }),
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


    // Мутация для удаления
    // const deleteRequestMutation = useMutation({
    //     mutationFn: deleteRequest,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeys.requests] })
    //     },
    // })

    // Bulk мутации
    // const bulkDeleteMutation = useMutation({
    //     mutationFn: (ids) => Promise.all(ids.map(id => deleteRequest(id))),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: [queryKeys.requests] })
    //     },
    // })


    const sortRequests = (requestsToSort) => {
        return [...requestsToSort].sort((a, b) => {
            // Сортировка по дате создания (новые сверху)
            return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
        })
    }


    return {
        // Данные
        requests: sortRequests(requestsWithOffers),


        // Состояния загрузки
        isLoading: requestsQuery.isLoading,
        isError: requestsQuery.isError,
        errors: requestsQuery.error,

        // Методы для рефетча
        refetchAll: () => {
            requestsQuery.refetch()
        },
        archiveRequest: archiveRequestMutation.mutate,
        statusChandeRequest: statusChandeRequestMutation.mutate


        // Мутации
        // publishRequest: publishRequestMutation.mutateAsync,
        // archiveRequest: archiveRequestMutation.mutateAsync,
        // deleteRequest: deleteRequestMutation.mutateAsync,
        // bulkDelete: bulkDeleteMutation.mutateAsync,

        // Состояния мутаций
        // isPublishing: publishRequestMutation.isLoading,
        // isArchiving: archiveRequestMutation.isLoading,
        // isDeleting: deleteRequestMutation.isLoading,
    }
}