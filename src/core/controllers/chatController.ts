import ChatAPI, { TChatsQueryParams } from "../api/chatApi";
import { store } from "../store";
import UserController from "./userController";
import { TChatTitleData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
import { IChatUser } from "../../types";
import WebSocketController from "./wsController";

const chatAPI = new ChatAPI();

class ChatController {

    static async getChats(params?: TChatsQueryParams) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChats");
        /*const { chats } = store.getState();
        if (chats) {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("chats from store", chats);
            return Promise.resolve(chats);
        }*/
        
        return chatAPI.getChatList(params)
        .then((response) => {
            const chatsResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHATS: ", chatsResponse);
            store.set("chats", chatsResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("Get chat list error: ", error);
            return error;
        });
    }

    static async getChatList(params?: TChatsQueryParams) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChatList");
        return chatAPI.getChatList(params)
        .then((response) => response )
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("Get chat list error: ", error);
            return error;
        });
    }

    static async addChat(formData: FormData) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::addChat");
        let data = formDataToObjectConverter(formData) as TChatTitleData;
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("AddChat: ", data);

        return chatAPI.createNewChat(data)
        .then(response => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("ADD CHAT: ", response);
            return chatAPI.getChatList();
        })
        .then((response) => {
            const chatsResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHATS: ", chatsResponse);
            store.set("chats", chatsResponse);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Add chat error: ', error);
            return error;
        });
    }

    static async deleteChat(chatId: number, ws: WebSocket) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::deleteChat");
        return chatAPI.deleteChatById(chatId)
        .then((response) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("DELETE CHAT: ", response);
            return chatAPI.getChatList();
        })
        .then((response) => {
            const chatsResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHATS: ", chatsResponse);
            ws && ws.close();
            store.set("chats", chatsResponse);
            store.delete(["activeChat", "ws", "messages"]);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Delete chat error: ', error);
            return error;
        });
    }

    static async getUsersByLogin(login: string) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getUsersByLogin");
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(login);
        return UserController.getUsersByLogin(login)
        .then((response) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(response);
            const foundUsersResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("FOUND USERS: ", foundUsersResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Search user err: ', error);
            return error;
        });
    }

    static async addUserToChat(id: number, chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::addUsersToChat");
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(id, chatId);
        return chatAPI.addUsersToChat([id], chatId)
        .then((response) => {
            const addUserResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("ADD USERS: ", addUserResponse);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            this.getChatUsersById(chatId)
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Add user err: ', error);
            return error;
        });
    }

    static async deleteUserfromChat(id: number, chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::deleteUserfromChat");
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(id, chatId);
        return chatAPI.deleteUsersFromChat([id], chatId)
        .then((response) => {
            const deleteUserResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("DELETE USERS: ", deleteUserResponse);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            this.getChatUsersById(chatId)
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Delete user err: ', error);
            return error;
        });
    }

    static async getChatById(chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChatById");
        let chatUsers: IChatUser[];
        return chatAPI.getChatUsersById(chatId)
        .then((response) => {
            const chatUsersResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHAT USERS: ", chatUsersResponse);
            chatUsers = chatUsersResponse;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return ChatController.getToken(chatId);
        })
        .then((response) => {
            const chatTokenResponse = response.response;
            const token = chatTokenResponse.token;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHAT TOKEN: ", chatTokenResponse);
            if (token) {
                store.set("activeChat", { users: chatUsers, id: chatId, token: token});
                WebSocketController.createNewWebSocket(token);
            }
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Get chat users error: ', error);
            return error;
        });
    }

    static async getChatUsersById(chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChatUsersById", chatId);
        return chatAPI.getChatUsersById(chatId)
        .then((response) => {
            const chatUsersResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHAT USERS: ", chatUsersResponse);
            store.set("activeChat", { users: chatUsersResponse, id: chatId} );
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Get chat users error: ', error);
            return error;
        });
    }

    static async uploadChatAvatar(formData: FormData) {
        globalThis.DEBUG?.ChatController && globalThis.LOG && console.info("ChatController::uploadChatAvatar");
        console.log(formData)
        return chatAPI.uploadChatAvatar(formData)
        .then((response) => {
            globalThis.DEBUG?.ChatController && globalThis.LOG && console.log("CHANGE AVATAR: ", response.status);
            const chatResponse = response.response;
            globalThis.DEBUG?.ChatController && globalThis.LOG && console.log("CHAT: ", chatResponse);
            //return response;
            return chatAPI.getChatList();
        })
        .then((response) => {
            const chatsResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHATS: ", chatsResponse);
            store.set("chats", chatsResponse);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController && globalThis.LOG && console.log('ChangeAvatar error: ', error);
            return error;
        });
    }

    static async getToken(chatId: number) {
        return chatAPI.getChatToken(chatId)
        .then((response) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("GET TOKEN: ", response);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Get token error: ', error);
            return error;
        });
    }
}

export default ChatController
