import HTTPTransport from "./httpTransport";
import { API_ENDPOINTS } from "../../utils/constants";

export type TChatsQueryParams = {
    offset?: number,
    limit?: number,
    title?: string,
};

class ChatAPI extends HTTPTransport {
    contentType = "application/json; charset=utf-8";

    /**
     * Получение списка чатов
     * @returns {Promise<XMLHttpRequest>}
     */
    public getChatList(): Promise<XMLHttpRequest> {
        console.info("ChatAPI::getChatList");
        return this.get(API_ENDPOINTS.chats.chats);
    }

    /**
     * Создание нового чат
     * @param {string} title 
     * @returns {Promise<XMLHttpRequest>}
     */
    public createNewChat(title: string): Promise<XMLHttpRequest> {
        console.info("ChatAPI::createNewChat: ", title);
        return this.post(API_ENDPOINTS.chats.chats, { data: JSON.stringify({ title }), headers: { "Content-Type": this.contentType } });
      }
    
    /**
     * Удаление чата по номеру chatId
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public deleteChatById(chatId: number): Promise<XMLHttpRequest> {
        console.info("ChatAPI::deleteChatById: ", chatId);
        return this.delete(API_ENDPOINTS.chats.chats, { data: JSON.stringify({ chatId }), headers: { "Content-Type": this.contentType } });
    }

    /**
     * Получение пользователей чата по chatId
     * @param {string} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getChatUserById(chatId: string): Promise<XMLHttpRequest> {
        console.info("UserAPI::getChatUserById: ", chatId);
        return this.get(API_ENDPOINTS.chats.chatUsersById(chatId));
    }

    /**
     * Получение количества новых сообщений чата по chatId
     * @param {string} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getNewMessagesCount(chatId: string): Promise<XMLHttpRequest> {
        console.info("UserAPI::getNewMessagesCount: ", chatId);
        return this.get(API_ENDPOINTS.chats.newMessagesCount(chatId));
    }

    /**
     * Добавление аватара чата
     * @param {string} chatId 
     * @param {FormData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public uploadChatAvatar(chatId: string, data: FormData): Promise<XMLHttpRequest> {
        console.info("ChatAPI::uploadChatAvatar: ", chatId, data);
        return this.put(API_ENDPOINTS.chats.chatAvatar, { data: { chatId, data } });
    }

    /**
     * Добавление пользователей в чат
     * @param {string[]} users 
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public addUsersToChat(users: string[], chatId: number): Promise<XMLHttpRequest> {
        console.info("ChatAPI::addUsersToChat: ", users, chatId);
        return this.put(API_ENDPOINTS.chats.chatsUsers, { data: JSON.stringify({ users, chatId }), headers: { "Content-Type": this.contentType } });
    }
    
    /**
     * Удаление пользователей из чата
     * @param {string[]} users 
     * @param {number} chatId 
     * @returns {Promise<XMLHttpRequest>}
     */
    public deleteUsersFromChat(users: string[], chatId: number): Promise<XMLHttpRequest> {
        console.info("ChatAPI::deleteUsersFromChat: ", users, chatId);
        return this.delete(API_ENDPOINTS.chats.chats, { data: JSON.stringify({ users, chatId }), headers: { "Content-Type": this.contentType } });
    }

}

export default ChatAPI
