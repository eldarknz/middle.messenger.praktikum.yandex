import { store } from "../store";
import WebSocketTransport from "../api/wsTransport";

class WebSocketController {

    static createNewWebSocket(token: string) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("WebSocketController::createNewWebSocket");

        const state = store.getState();

        if (state) {
            if (state.ws) {
                state.ws.close();
                store.delete(["ws", "messages"]);
            }

            if (state.user && state.activeChat) {
                store.set("ws", new WebSocketTransport(state.user.id, state.activeChat.id, token));
            }
        }
        
    }

    static getOldMessages(offset?: number) {
        globalThis.DEBUG?.ChatController&& globalThis.LOG && console.info("WebSocketController::createNewWebSocket");

        const state = store.getState();

        if (state && state.ws) {
            const ws = state.ws;
            if (ws) {
                (ws as WebSocketTransport).getOldMessages(offset);
            }
        }
    }
}

export default WebSocketController
