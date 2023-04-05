// Core
import { store } from "@store/index";
import ChatController from "@core/controllers/chatController";
// Utils
import { WSS_PATH } from "@utils/constants";
// Types
import { IChatUser } from "@custom_types/index";

const PING_INTERVAL = 6000;

export const getDifference = (array1: any, array2: any, value: string) => {
    return array1.filter((object1: any) => {
        return !array2.some((object2: any) => {
            return object1[value] === object2[value];
        });
    });
};

class WebSocketTransport {
    private socket: WebSocket;

    private content_offset: number = 0;

    private wsRequestInterval;

    constructor(userId: number, chatId: number, token: string, data?: Record<string, any>) {

        this.socket = new WebSocket(`${WSS_PATH}/${userId}/${chatId}/${token}`);
    
        this.socket.addEventListener("open", () => {
            console.info("Соединение установлено");
        
            if (data) {
                this.socket.send(JSON.stringify(data));
            } else {
                this.getOldMessages(this.content_offset);
            }
        });
    
        this.socket.addEventListener("close", (event) => {
            if (event.wasClean) {
                console.info("Соединение закрыто чисто");
            } else {
                console.info("Обрыв соединения");
                store.delete(["ws", "messages"]);
                const state = store.getState(); 
                if (state && state.user && state.activeChat) {
                    const { id: chatId } = state.activeChat as { users: IChatUser[], id: number };
                    ChatController.getChatById(chatId)
                }
            }
    
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener("message", event => {
            const data = JSON.parse(event.data);
            const { messages } = store.getState();
            console.info("Получены данные");
            if (data instanceof Array) {
                if (data.length === 0) {
                    messages ? null : store.set("messages", []);
                }
                if (data.length > 0 && data[0].type === "message") {
                    if (messages) {
                        const difference = getDifference(data, messages, "id");
                        if (difference.length > 0) {
                            store.set("messages", [ ...messages, ...difference ]);
                            this.content_offset += difference.length;
                        }
                    } else {
                        store.set("messages", [ ...data ]);
                        this.content_offset += data.length;
                    }
                }
                ChatController.getChats();
            } else {
                if (data.type === "message") {
                    store.set("messages", messages ? [ data, ...messages ] : [ data ]);
                    ChatController.getChats();
                } else {
                    console.log(data);
                }
            }
        });

        this.socket.addEventListener("error", (event) => {
            console.log("Ошибка", event);
        });

        this.wsRequestInterval = setInterval(() => {
            const state = store.getState();
            this.socket.send(JSON.stringify({
                type: "ping"
            }))
            if (state && state.chats) {
                const chats = state.chats;
                const ws = state.ws;
                ChatController.getChatList()
                .then((res) => {
                    const chatsResponse = res.response;
                    if (chatsResponse && chats.length !== chatsResponse.length) {
                        ChatController.getChats();
                        this.clearRequestInterval();
                        if (ws) ws.close();
                        store.delete(["activeChat", "ws", "messages"]);
        
                    }
                })
            }
        }, PING_INTERVAL);

        this.getOldMessages = this.getOldMessages.bind(this);
    }

    clearRequestInterval() { clearInterval(this.wsRequestInterval) }

    getOldMessages(offset: number = this.content_offset) {
        this.socket.send(JSON.stringify({
            content: offset,
            type: "get old",
        }));
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.socket.send(data);
    }
    
    close() {
        this.socket.close();
    }
}

export default WebSocketTransport
