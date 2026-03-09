import { useAuth } from "@/features/user/context/context"
import { useState } from "react"

export function getNotidicationsData() {
    const { user } = useAuth()
    const [notifications, setNotifications] = useState([])
    const [filter, setFilter] = useState('all')

    const loadNotifications = () => {
        if (!user?.email) return

        const storageKey = `notifications_${user.email}`
        const saved = localStorage.getItem(storageKey)

        if (saved) {
            try {
                setNotifications(JSON.parse(saved))
            } catch (e) {
                console.error('Ошибка загрузки уведомлений:', e)
            }
        } else {
            // Генерируем демо-уведомления
            generateDemoNotifications()
        }
    }

    const generateDemoNotifications = () => {
        const isCustomer = user?.role === Role.Customer
        const now = new Date()
        const demoNotifications = []

        if (isCustomer) {
            // Уведомления для заказчика
            for (let i = 1; i <= 15; i++) {
                demoNotifications.push({
                    id: `notif${i}`,
                    type: i % 3 === 0 ? 'offer_updated' : 'new_offer',
                    title: i % 3 === 0 ? 'Обновление предложения' : 'Новое коммерческое предложение',
                    message: i % 3 === 0
                        ? `Исполнитель ${i} обновил свое предложение по заявке REQ-2024-00${i}`
                        : `ООО "Компания ${i}" откликнулся на вашу заявку REQ-2024-00${i}`,
                    requestId: `REQ-2024-00${i}`,
                    timestamp: new Date(now - i * 3600000).toISOString(),
                    read: i > 5,
                    important: i <= 2
                })
            }
        } else {
            // Уведомления для исполнителя
            for (let i = 1; i <= 15; i++) {
                demoNotifications.push({
                    id: `notif${i}`,
                    type: i % 4 === 0 ? 'request_updated' : 'new_request',
                    title: i % 4 === 0 ? 'Заявка обновлена' : 'Новая заявка',
                    message: i % 4 === 0
                        ? `Заказчик уточнил параметры в заявке REQ-2024-00${i}`
                        : `Опубликована новая заявка REQ-2024-00${i} от ${i % 2 === 0 ? 'ГУИС' : 'Мосводоканал'}`,
                    requestId: `REQ-2024-00${i}`,
                    timestamp: new Date(now - i * 3600000).toISOString(),
                    read: i > 5,
                    important: i <= 2
                })
            }
        }

        setNotifications(demoNotifications)
        saveNotifications(demoNotifications)
    }

    const saveNotifications = (notifs) => {
        if (!user?.email) return
        const storageKey = `notifications_${user.email}`
        localStorage.setItem(storageKey, JSON.stringify(notifs))
    }

    const markAsRead = (notificationId) => {
        const updated = notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        )
        setNotifications(updated)
        saveNotifications(updated)
    }

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }))
        setNotifications(updated)
        saveNotifications(updated)
    }

    const deleteNotification = (notificationId) => {
        const updated = notifications.filter(n => n.id !== notificationId)
        setNotifications(updated)
        saveNotifications(updated)
    }

    const deleteAllRead = () => {
        const updated = notifications.filter(n => !n.read)
        setNotifications(updated)
        saveNotifications(updated)
    }

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read
        if (filter === 'important') return n.important
        return true
    })

    const unreadCount = notifications.filter(n => !n.read).length
    const importantCount = notifications.filter(n => n.important).length

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now - date
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffDays === 0) {
            return `Сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
        } else if (diffDays === 1) {
            return `Вчера в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
        } else {
            return date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }
    }


    return ({
        loadNotifications,
        generateDemoNotifications,
        saveNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllRead,
        filteredNotifications,
        unreadCount,
        importantCount,
        formatDate,
        notifications,
        filter,
        setFilter
    })
}