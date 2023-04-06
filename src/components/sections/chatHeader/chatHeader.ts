// Core
import { Block } from "@core/block";
import { ChatController } from "@core/controllers/chatController";
// Components
import { DivBlock } from "@components/ui/div";
import { Dropdown } from "@components/ui/dropdown";
import { IconAdd, IconDelete, IconDots, IconTrash } from "@components/ui/icon";
import { modalCloseHandler } from "@components/ui/modal";
import { Text } from "@components/ui/text";
import { AddUserModal } from "./components/addUserModal";
import { ChatInfo } from "./components/chatInfo";
import { ChatInfoBlock } from "./components/chatInfoBlock";
import { DeleteUserModal } from "./components/deleteUserModal";
// Utils
import { formResponseErrorNotification } from "@utils/formHandler";
// Types
import { IUser, IChatUser, TChatItem } from "@custom_types/index";
// Template
import template from "./chatHeader.tmpl";
// Styles
import "./chatHeader.scss";

interface IChatHeader {
    state: Indexed;
}

// отрефакторил
const deleteChat = (activeChatId: number, ws: WebSocket) => {
    if (!activeChatId)
        return;

    let confirmDelete  = confirm("Вы уверены, что хотите удалить чат?");
    if (confirmDelete) {
        ChatController.deleteChat(activeChatId, ws)
        .then((res) => {
            if (res) {
                modalCloseHandler();
            } else {
                formResponseErrorNotification(res, ".modal-container__content", "Произошла ошибка, попробуйте еще раз");
            }
        })
    }
};

// отрефакторил
const getChatBlock = (state: Indexed) => {
    if (Object.keys(state).length === 0 || !state.user || !state.chats || !state.activeChat)
        return ChatInfoBlock();

    const chats = state.chats as TChatItem[];
    const activeChat = state.activeChat as { users: IChatUser[], id:  number };

    return ChatInfoBlock(
        chats,
        activeChat,
        { click: () => ChatInfo(chats, activeChat) }
    );
};

export class ChatHeaderSection extends Block {
    constructor(props: IChatHeader) {

        const state = props.state;
        const user = state.user as IUser;
        const activeChat = state.activeChat as { users: IChatUser[], id: number };
        const activeChatId = activeChat.id as number;
        const activeChatUsers = activeChat.users as IChatUser[];
        const ws = state.ws as WebSocket;

        const dropdown = new Dropdown({
            dropdownButtonIsCircle: true,
            dropdownButtonContent: new IconDots({ size: "m" }),
            dropdownMenuContent: new DivBlock({
                className: "dropdown-menu__content",
                content: [
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconAdd({
                                color: "primary",
                                size: "m"
                            }),
                            new Text({
                                content: "Добавить пользователя"
                            })
                        ],
                        events: {
                            click: AddUserModal
                        }
                    }),
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconDelete({
                                color: "primary",
                                size: "m"
                            }),
                            new Text({
                                content: "Удалить пользователя"
                            })
                        ],
                        events: {
                            click: () => DeleteUserModal(user, activeChatUsers, activeChatId)
                        }
                    }),
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconTrash({ 
                                color: "secondary",
                                size: "m"
                            }),
                            new Text({
                                content: "Удалить чат"
                            })
                        ],
                        events: {
                            click: () => deleteChat(activeChatId, ws)
                        }
                    }),
                ]
            })
        })

        const chatInfoBlock = getChatBlock(state)

        super({ ...props, dropdown, chatInfoBlock });
    }
    
    render() {
        return this.compile(template, this.props);
    }
}
