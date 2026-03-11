export interface IRequestStats {
    all: number,
    news: number,
    moderation: number,
    rejected: number,
    published: number,
    archived: number,
}


export const tabsButton: { name: string, value: keyof IRequestStats }[] = [
    {
        name: "Все",
        value: "all",
    },
    {
        name: "Новые",
        value: "news",
    },
    {
        name: "На модерации",
        value: "moderation",
    },
    {
        name: "Отклонено",
        value: "rejected",
    },
    {
        name: "Опубликовано",
        value: "published",
    },
    {
        name: "Архив",
        value: "archived",
    },
]

