// Core
import { HTTPTransport } from "./httpTransport";
// Utils
import { API_ENDPOINTS } from "@utils/constants";
// Types
import { TChatTitleData } from "@custom_types/index";

export type TChatsQueryParams = {
    offset?: number,
    limit?: number,
    title?: string,
};

export class ChatAPI extends HTTPTransport {
    contentType = "application/json; charset=utf-8";

    /**
     * Получение списка чатов
     * @param {string} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getChatList(data?: TChatsQueryParams): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.chats.chats, { data });
    }

    /**
     * Создание нового чат
     * @param {TChatTitleData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public createNewChat(data: TChatTitleData): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.chats.chats, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }
    
    /**
     * Удаление чата по номеру chatId
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public deleteChatById(chatId: number): Promise<XMLHttpRequest> {
        return this.delete(API_ENDPOINTS.chats.chats, { data: JSON.stringify({ chatId }), headers: { "Content-Type": this.contentType } });
    }

    /**
     * Получение пользователей чата по chatId
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getChatUsersById(chatId: number): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.chats.chatUsersById(chatId));
    }

    /**
     * Получение количества новых сообщений чата по chatId
     * @param {string} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getNewMessagesCount(chatId: string): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.chats.newMessagesCount(chatId));
    }

    /**
     * Добавление аватара чата
     * @param {string} chatId 
     * @param {FormData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public uploadChatAvatar(data: FormData): Promise<XMLHttpRequest> {
        return this.put(API_ENDPOINTS.chats.chatAvatar, { data });
    }

    /**
     * Добавление пользователей в чат
     * @param {string[]} users 
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public addUsersToChat(users: number[], chatId: number): Promise<XMLHttpRequest> {
        return this.put(API_ENDPOINTS.chats.chatsUsers, { data: JSON.stringify({ users, chatId }), headers: { "Content-Type": this.contentType } });
    }
    
    /**
     * Удаление пользователей из чата
     * @param {string[]} users 
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public deleteUsersFromChat(users: number[], chatId: number): Promise<XMLHttpRequest> {
        return this.delete(API_ENDPOINTS.chats.chatsUsers, { data: JSON.stringify({ users, chatId }), headers: { "Content-Type": this.contentType } });
    }

    /**
     * Получение списка токенов пользователей чата
     * @param {number} id 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getChatToken(id: number): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.chats.getChatUsers(id));
    }

}
