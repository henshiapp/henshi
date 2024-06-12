export const fromEnumToDropdownValues = <T = number>(enumeration: Object): { name: string; value: T }[] => {
    return Object.entries(enumeration)
        .filter(([key]) => isNaN(Number(key)))
        .map(([name, value]) => ({ name, value }));
};
