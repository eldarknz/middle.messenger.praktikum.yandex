const formDataToObjectConverter = (data: FormData, handler?: Function) => {
    let result: Record<string, any> = {};
    Array.from(data.keys()).forEach((key) => {
        result[key] = data.get(key);
    });
    if (handler) {
        result = handler(result);
    }
    return result;
};

export default formDataToObjectConverter
