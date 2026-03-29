import { Role } from "@/entities/user/role";
import { useAuth } from "@/features/user/context/context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from '@/shared/ui-kits/Icon'

export function getSadbarData() {
  const { user } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const isCustomer = user?.role === Role.Customer;

  // Загружаем количество непрочитанных уведомлений
  useEffect(() => {
    if (!user?.email) return;

    const loadUnreadCount = () => {
      const storageKey = `notifications_${user.email}`;
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        try {
          const notifications = JSON.parse(saved);
          const unread = notifications.filter((n) => !n.read).length;
          setUnreadNotifications(unread);
        } catch (e) {
          console.error("Ошибка загрузки уведомлений:", e);
        }
      }
    };

    loadUnreadCount();

    // Слушаем событие обновления уведомлений
    const handleStorageChange = (e) => {
      if (e.key === `notifications_${user.email}`) {
        loadUnreadCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Также можно добавить кастомное событие для обновления в реальном времени
    const handleNotificationsUpdate = () => loadUnreadCount();
    window.addEventListener("notifications-updated", handleNotificationsUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "notifications-updated",
        handleNotificationsUpdate,
      );
    };
  }, [user?.email]);

  // Определяем правильный путь для заявок в зависимости от роли
  const getRequestsPath = () => {
    if (user?.role === Role.Customer) return "/customer/request";
    if (user?.role === Role.Supplier) return "/supplier";
    return "/admin/requests"; // Для администратора своя страница заявок
  };

  // Базовые пункты меню для всех пользователей
  const baseMenuItems = [
    {
      path:
        user?.role === Role.Customer
          ? "/customer/dashboard"
          : user?.role === Role.Admin
            ? "/admin/dashboard"
            : "/supplier/dashboard",
      icon: (
        <Icon name="main" />
      ),
      label: "Главная",
    },
  ];

  // Пункты меню для заказчика
  const customerMenuItems = [
    {
      path: getRequestsPath(),
      icon: (
        <Icon name="requests" />
      ),
      label: "Заявки",
    },
  ];

  // Пункты меню для поставщика
  const supplierMenuItems = [
    {
      path: getRequestsPath(),
      icon: (
        <Icon name="requests" />
      ),
      label: "Заявки",
    },
    {
      path: getRequestsPath() + "/request/favorites",
      icon: (
        <Icon name="star-outline" />
      ),
      label: "Избранные заявки",
    },
    {
      path: "/supplier/offers",
      icon: (
        <Icon name="materials" />
      ),
      label: "Коммерческие предложения",
    },
    // {
    //   path: "/supplier/materials",
    //   icon: (
    //     <Icon name="materials" />
    //   ),
    //   label: "Подбор материалов",
    // },
    {
      path: "/supplier/balance",
      icon: (
        <Icon name="balance" />
      ),
      label: "Баланс",
    },
  ];

  // Пункты меню для администратора
  const adminMenuItems = [
    {
      path: "/admin",
      icon: (
        <Icon name="dashboard" />
      ),
      label: "Дашборд",
    },
    {
      path: "/admin/requests",
      icon: (
        <Icon name="requests" />
      ),
      label: "Заявки",
      badge: "3", // Количество заявок на модерацию
    },
    // {
    //   path: "/admin/offers",
    //   icon: (
    //     <Icon name="offers" />
    //   ),
    //   label: "Предложения",
    //   badge: "5", // Количество предложений на модерацию
    // },
    {
      path: "/admin/users",
      icon: (
        <Icon name="users" />
      ),
      label: "Пользователи",
    },
    {
      path: "/admin/companies",
      icon: (
        <Icon name="companies" />
      ),
      label: "Компании",
    },

    {
      path: "/admin/scheme-setting",
      icon: (
        <Icon name="scheme" />
      ),
      label: "Cхема",
    },
  ];

  // Инструменты (доступны всем)
  const toolsItems = [
    {
      link:
        user?.role === Role.Customer
          ? "/customer/notifications"
          : user?.role === Role.Admin
            ? "/admin/notifications"
            : "/supplier/notifications",
      icon: (
        <Icon name="notifications" />
      ),
      label: "Уведомления",
      badge: unreadNotifications > 0 ? unreadNotifications : null,
    },
    {
      link:
        user?.role === Role.Customer
          ? "/customer/profile"
          : user?.role === Role.Admin
            ? "/admin/profile"
            : "/supplier/profile",
      icon: (
        <Icon name="profile" />
      ),
      label: "Профиль",
    },
    {
      link:
        user?.role === Role.Customer
          ? "/customer/settings"
          : user?.role === Role.Admin
            ? "/admin/settings"
            : "/supplier/settings",
      icon: (
        <Icon name="settings" />
      ),
      label: "Настройки",
    },
  ];

  // Определяем меню в зависимости от роли
  return {
    baseMenuItems,
    customerMenuItems,
    supplierMenuItems,
    adminMenuItems,
    toolsItems,
  };
}
