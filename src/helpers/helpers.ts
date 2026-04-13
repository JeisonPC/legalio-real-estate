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