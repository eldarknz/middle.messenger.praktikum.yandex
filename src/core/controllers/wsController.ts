// Core
import { store } from "@core/store";
import { WebSocketTransport } from "@core/api/wsTransport";

export class WebSocketController {

    static createNewWebSocket(token: string) {
        const state = store.getState();
        if (state) {
            this.deleteWebSocket();

            if (state.user && state.activeChat) {
                store.set("ws", new WebSocketTransport(state.user.id, state.activeChat.id, token));
            }
        }
    }

    static deleteWebSocket() {
        const state = store.getState();
        if (state && state.ws) {
            state.ws.close();
            store.delete(["ws", "messages"]);
        }
    }

    static getOldMessages(offset?: number) {
        const state = store.getState();

        if (state && state.ws) {
            state.ws.getOldMessages(offset);
        }
    }
}
