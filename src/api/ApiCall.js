import { getChatListRequest } from "../data/data";

export function getChats() {
    getChatListRequest().then(res => {
        if (res && res.success) {
            return res.data
        } else {
            console.error('Ошибка: невозможно получить данные, попробуйте еще раз.');
        }
    }).catch((error) => {
        console.error('Ошибка:', error);
    });
};
