function extractEntityData(data: Data): { type: EntityType; data: Record<string, unknown> } | null {
    if (!data?.items?.length) {
        return null;
    }

    const firstItem = data.items[0];
    const entityTypes: EntityType[] = ['ЮЛ', 'ИП', 'НР', 'ИН'];

    for (const type of entityTypes) {
        if (firstItem[type] && typeof firstItem[type] === 'object') {
            return {
                type: type,
                data: firstItem[type] as Record<string, unknown>
            };
        }
    }

    return null;
}

