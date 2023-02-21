import ChatAPI from "../api/chatApi";
import { store } from "../store";
//import { TUserProfileData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
import Router from "../router";
import { ROUTES } from "../../utils/constants";

const chatAPI = new ChatAPI();

class ChatController {

    static async getChats(params?: ChatsQueryParams) {
        const { chats } = store.getState();
        if (chats) {
            console.log("chats from store", chats);
            return Promise.resolve(chats);
        }
        
        return chatAPI.getChatList(params)
        .then((response: XMLHttpRequest) => {
            const chatsResponse = response.response;
            console.log("CHATS: ", chatsResponse);
            store.set("chats", chatsResponse);
            return response;
        })
        .catch((error) => {
            console.log("Get chat list error: ", error);
            return error;
        });
    }
}

export default ChatController
