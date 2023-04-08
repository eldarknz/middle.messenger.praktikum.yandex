// Core
import { Block } from "@core/block";
import { WebSocketController } from "@core/controllers/wsController";
// Components
import { Grid } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Label } from "@components/ui/label";
import { Spinner } from "@components/ui/spinner";
import { Text } from "@components/ui/text";
import { ChatMessage } from "./components/chatMessage";
// Utils
import { dateConvert } from "@utils/dateConverter";
// Types
import { IUser } from "@custom_types/index";
// Template
import template from "./chatMessageArea.tmpl";
// Styles
import "./chatMessageArea.scss";

interface IChatMessage {
    id: number;
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    user?: boolean;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
}

interface IChatMessageArea {
    state: Indexed;
}

const getMessages = (state: Indexed) => {

    if (Object.keys(state).length !== 0 && state.user && state.messages && state.activeChat) {

        const user = state.user as IUser;
        const messages = state.messages;

        if (messages && (messages as IChatMessage[]).length !== 0) {
            const messages = state.messages as IChatMessage[];

            const getDateTime = (item: IChatMessage) => {
                return item.user_id ? new Label({
                    color: item.user_id == `${user.id}` ? "primary" : "light",
                    className: "chat-message__date-time",
                    content: dateConvert(item.time)
                }) : null;
            }
            
            return new Grid.Container({
                className: "chat-container",
                isFluid: true,
                content: [
                    new DivBlock({
                        className: "chat-container__messages",
                        content: messages.map((item) => {
                            return new ChatMessage({
                                id: item.id,
                                chat_id: item.chat_id,
                                user_id: item.user_id,
                                content: item.content,
                                datetime: getDateTime(item),
                                user: item.user_id && item.user_id == `${user.id}` ? true : false,
                            });
                        })
                    }),
                    new DivBlock({
                        id: "ahchor"
                    })
                ],
                events: {
                    scroll: (event: Event) => {
                        const target = event.currentTarget;
                        if (target && target instanceof HTMLElement) {
                            const scrollHeight = target.scrollHeight;
                            const scrollTop = target.scrollTop;
                            const offsetHeight = target.offsetHeight;
                            if (scrollTop + offsetHeight === scrollHeight) {
                                WebSocketController.getOldMessages();
                            }
                        }
                    }
                    
                }
            });
        } else {
            return new Grid.Container({
                className: "chat-container empty",
                isFluid: true,
                content: new Text({
                    className: "text-dark",
                    content: "Сообщения отсутствуют"
                })
            })
        }
    } else {
        return new Grid.Container({
            className: "chat-container empty",
            isFluid: true,
            content: new Spinner({ size: 36 })
        })
    }
};

export class ChatMessageAreaSection extends Block {
    constructor(props: IChatMessageArea) {
        const content = getMessages(props.state);
        super({ ...props, content });
    }
    
    render() {
        return this.compile(template, this.props);
    }
}
