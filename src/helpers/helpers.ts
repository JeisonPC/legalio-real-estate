export const bytesToMBFormatted = (
    bytes: number | null | undefined,
    decimals = 2
): string => {
    if (!bytes) return "0 MB";
    return `${(bytes / (1024 * 1024)).toFixed(decimals)} MB`;
};

export function isPopulatedDoc<T extends object>(
    value: number | T | null | undefined
): value is T {
    return typeof value === "object" && value !== null;
}

type UserDisplayNameSource = {
    name?: string | null;
    lastname?: string | null;
    email?: string | null;
};

export function getUserDisplayName(
    user: UserDisplayNameSource | null | undefined,
    fallback = "Sin nombre"
) {
    const name = [user?.name, user?.lastname]
        .filter(Boolean)
        .join(" ")
        .trim();

    return name || user?.email || fallback;
}
