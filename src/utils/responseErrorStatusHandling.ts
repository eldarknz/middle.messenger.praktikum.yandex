export function responseErrorStatusHandling(response: XMLHttpRequest) {
    console.log(response);
    if (response.status === 400) {
        console.log("AAA");
        return "Не удалось выполнить запрос";
    }

    if (response.status === 401) {
        return "Не удалось пройти авторизацию";
    }

    if (response.status === 404) {
        return "Ресурс не найден. 404";
    }

    if (response.status >= 405 && response.status < 600) {
        return "Возникла ошибка работы сервиса";
    }
}
