// hooks/useRequestsQuery.js
import { requestArhivApi, requestStatusChangeApi, usersAllApi } from '@/entities/admin/api'
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
export const useUsersListData = () => {
    // Запрос заявок
    const userList = useQuery({
        queryKey: ['admin-user-list'],
        queryFn: usersAllApi,
        staleTime: 5 * 60 * 1000,
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


    return {
        // Данные
        list: userList.data?.data,

        // Состояния загрузки
        isLoading: userList.isLoading,
        isError: userList.isError,
        errors: userList.error,

        // Методы для рефетча
        refetchAll: () => {
            userList.refetch()
        },
    }
}