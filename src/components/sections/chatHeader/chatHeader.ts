// Core
import { Block } from '@core/block';
import { TState } from '@core/store';
import { ChatController } from '@core/controllers/chatController';
// Components
import { DivBlock } from '@components/ui/div';
import { Dropdown } from '@components/ui/dropdown';
import { Icon } from '@components/ui/icon';
import { modalCloseHandler } from '@components/ui/modal';
import { Notification } from '@components/ui/notification';
import { Text } from '@components/ui/text';
import { formResponseErrorNotification } from '@utils/formHandler';
import { IUser, IChatUser, TChatItem, TActiveChat } from '@custom_types/index';
import { AddUserModal } from './components/addUserModal';
import { ChatInfo } from './components/chatInfo';
import { ChatInfoBlock } from './components/chatInfoBlock';
import { DeleteUserModal } from './components/deleteUserModal';
// Utils
// Types
// Template
import template from './chatHeader.tmpl';
// Styles
import './chatHeader.scss';

interface IChatHeader {
    state: TState;
}

const deleteChat = (activeChatId: number) => {
    if (!activeChatId) return;

    const confirmDelete = confirm('Вы уверены, что хотите удалить чат?');
    if (confirmDelete) {
        ChatController.deleteChat(activeChatId).then((res) => {
            if (res) {
                modalCloseHandler();
                if (res.status === 200) {
                    new Notification({
                        content: 'Чат удален',
                        view: 'success',
                    }).renderDOMElement('#notification-root');
                }
            } else {
                formResponseErrorNotification(
                    res,
                    '.modal-container__content',
                    'Произошла ошибка, попробуйте еще раз'
                );
            }
        });
    }
};

const getChatBlock = (state: TState) => {
    if (
        Object.keys(state).length === 0 ||
        !state.user ||
        !state.chats ||
        !state.activeChat
    )
        return ChatInfoBlock();

    const chats = state.chats as TChatItem[];
    const activeChat = state.activeChat as TActiveChat;

    return ChatInfoBlock(chats, activeChat, {
        click: () => ChatInfo(chats, activeChat),
    });
};

export class ChatHeaderSection extends Block {
    constructor(props: IChatHeader) {
        const { state } = props;
        const user = state.user as IUser;
        const activeChat = state.activeChat as TActiveChat;
        const activeChatId = activeChat.id as number;
        const activeChatUsers = activeChat.users as IChatUser[];

        const dropdown = new Dropdown({
            dropdownButtonShape: 'circle',
            dropdownButtonContent: new Icon({ name: "dots", size: 'm' }),
            dropdownMenuContent: new DivBlock({
                className: 'dropdown-menu__content',
                content: [
                    new DivBlock({
                        className: 'dropdown-item',
                        content: [
                            new Icon({
                                name: "add",
                                color: 'primary',
                                size: 'm',
                            }),
                            new Text({
                                content: 'Добавить пользователя',
                            }),
                        ],
                        events: {
                            click: AddUserModal,
                        },
                    }),
                    new DivBlock({
                        className: 'dropdown-item',
                        content: [
                            new Icon({
                                name: "delete",
                                color: 'primary',
                                size: 'm',
                            }),
                            new Text({
                                content: 'Удалить пользователя',
                            }),
                        ],
                        events: {
                            click: () =>
                                DeleteUserModal(
                                    user,
                                    activeChatUsers,
                                    activeChatId
                                ),
                        },
                    }),
                    new DivBlock({
                        className: 'dropdown-item',
                        content: [
                            new Icon({
                                name: "trash",
                                color: 'secondary',
                                size: 'm',
                            }),
                            new Text({
                                content: 'Удалить чат',
                            }),
                        ],
                        events: {
                            click: () => deleteChat(activeChatId),
                        },
                    }),
                ],
            }),
        });

        const chatInfoBlock = getChatBlock(state);

        super({ ...props, dropdown, chatInfoBlock });
    }

    render() {
        return this.compile(template, this.props);
    }
}
