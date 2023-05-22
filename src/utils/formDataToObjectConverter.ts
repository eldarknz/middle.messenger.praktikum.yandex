export const formDataToObjectConverter = (
    data: FormData
) => {
    const result: Record<string, any> = {};
    Array.from(data.keys()).forEach((key) => {
        result[key] = data.get(key);
    });
    return result;
};
