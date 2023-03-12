import ChatAPI, { TChatsQueryParams } from "../api/chatApi";
import { store } from "../store";
import UserController from "./userController";
import { TChatTitleData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
import { IChatUser } from "../../types";
//import Router from "../router";
//import { ROUTES } from "../../utils/constants";

const chatAPI = new ChatAPI();

class ChatController {

    static async getChats(params?: TChatsQueryParams) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChats");
        const { chats } = store.getState();
        if (chats) {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("chats from store", chats);
            return Promise.resolve(chats);
        }

        return chatAPI.getChatList(params)
        .then((response: XMLHttpRequest) => {
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

    static async addChat(formData: FormData) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::addChat");
        let data = formDataToObjectConverter(formData) as TChatTitleData;
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("AddChat: ", data);

        //return chatAPI.createNewChat(title)
        return chatAPI.createNewChat(data)
        .then(response => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("ADD CHAT: ", response);
            return chatAPI.getChatList();
        })
        .then((response: XMLHttpRequest) => {
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

    static async deleteChat(chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::deleteChat");
        return chatAPI.deleteChatById(chatId)
        .then((response: XMLHttpRequest) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("DELETE CHAT: ", response);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Delete chat error: ', error);
            return error;
        });
    }

    //static async addUserToChat(formData: FormData) {
    static async addUserToChat(login: string, chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::addUsersToChat");
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(login, chatId);
        return UserController.getUsersByLogin(login)
        .then((response: XMLHttpRequest) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(response);
            const usersResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("SEARCH USERS: ", usersResponse);
            const userIds = usersResponse.map((user: any) => user.id);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("SEARCH USERS IDs: ", userIds);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("ChatID: ", chatId);
            return chatAPI.addUsersToChat(userIds, chatId);
        })
        .then((response: XMLHttpRequest) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log(`Add new users to chat: ${chatId}`);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Add user err: ', error);
            return error;
        });
    }

    static async getChatById(chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChatById");
        return chatAPI.getChatUserById(chatId)
        .then((response: XMLHttpRequest) => {
            const chatUsersResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHAT USERS: ", chatUsersResponse);
            store.set("activeChatUsers", chatUsersResponse as IChatUser[]);
            store.set("activeChatId", chatId);
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Get chat users error: ', error);
            return error;
        });
    }

    static async getChatUsersById(chatId: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("ChatController::getChatUsersById");
        return chatAPI.getChatUserById(chatId)
        .then((response: XMLHttpRequest) => {
            const chatUsersResponse = response.response;
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("CHAT USERS: ", chatUsersResponse);
            //store.set("activeChatUsers", chatUsersResponse);
            //store.set("activeChatId", chatId);
            //globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log("store", store.getState());
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.ChatController&& globalThis.LOG && console.log('Get chat users error: ', error);
            return error;
        });
    }

}

export default ChatController
