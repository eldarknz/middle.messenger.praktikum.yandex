// Core
import { store } from '@core/store';
import { WebSocketTransport } from '@core/api/wsTransport';
import { IUser, TActiveChat } from '@custom_types/index';

export class WebSocketController {
    static createNewWebSocket(token: string) {
        const state = store.getState();
        if (state) {
            this.deleteWebSocket();

            if (state.user && state.activeChat) {
                store.set(
                    'ws',
                    new WebSocketTransport(
                        (state.user as IUser).id,
                        (state.activeChat as TActiveChat).id,
                        token
                    )
                );
            }
        }
    }

    static deleteWebSocket() {
        const state = store.getState();
        if (state && state.ws) {
            (state.ws as WebSocketTransport).close();
            store.delete(['ws', 'messages']);
        }
    }

    static getOldMessages(offset?: number) {
        const state = store.getState();

        if (state && state.ws) {
            (state.ws as WebSocketTransport).getOldMessages(offset);
        }
    }
}
