// Core
import { Block } from '@core/block';
import { TState } from '@core/store';
import { ChatController } from '@core/controllers/chatController';
// Components
import { Avatar } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Grid } from '@components/ui/grid';
import { Image } from '@components/ui/image';
import { Label } from '@components/ui/label';
import { Text } from '@components/ui/text';
import { createNewChat } from '@components/sections/chatSidebar/chatSidebar';
// Utils
import { dateConvert } from '@utils/dateConverter';
import { API_RESOURCES_PATH } from '@utils/constants';
// Types
import { TChatItem, TActiveChat } from '@custom_types/index';
import { ChatCardSkeleton } from './components/chatCardSkeleton';
import { ChatCard } from './components/chatCard';
// Template
import template from './chatList.tmpl';
// Styles
import './chatList.scss';

interface IChatList {
    state: TState;
}

const getChatList = (state: TState) => {
    if (Object.keys(state).length === 0 || !state.user || !state.chats)
        return new ChatCardSkeleton();

    if (state.chats && (state.chats as TChatItem[]).length !== 0) {
        const chats = state.chats as TChatItem[];
        const activeChat = state.activeChat as TActiveChat;
        let activeChatId: number;
        if (activeChat) {
            activeChatId = activeChat.id;
        }
        return chats.map((item) => {
            const chatAvatar = item.avatar
                ? new Avatar({
                      content: new Image({
                          src: API_RESOURCES_PATH + item.avatar,
                      }),
                  })
                : new Avatar();

            const chatLabel = item.unread_count
                ? new Label({
                      color: 'primary',
                      isCircle: true,
                      content: `${item.unread_count}`,
                  })
                : null;

            return new ChatCard({
                chatId: item.id,
                avatar: chatAvatar,
                title: item.title,
                message:
                    item.last_message && item.last_message.content
                        ? item.last_message.content
                        : 'Нет сообщений',
                datetime:
                    item.last_message && item.last_message.time
                        ? dateConvert(item.last_message.time)
                        : '',
                label: chatLabel,
                isActive: !!(activeChatId && activeChatId === item.id),
                events: {
                    click: (event: Event) => {
                        const target = event.currentTarget;
                        if (target && target instanceof HTMLElement) {
                            const targetId =
                                target.getAttribute('data-chat-id');
                            if (
                                targetId &&
                                activeChatId !== parseInt(targetId)
                            ) {
                                ChatController.getChatById(parseInt(targetId));
                            }
                        }
                    },
                },
            });
        });
    }
    return new Grid.Container({
        className: 'chat-list__empty-message',
        content: [
            new Text({
                className: 'text-extra-dark',
                content: 'У вас нет ни одного чата',
            }),
            new Button({
                color: 'light',
                size: 'sm',
                content: 'Создать чат',
                events: {
                    click: createNewChat,
                },
            }),
        ],
    });
};

export class ChatList extends Block {
    constructor(props: IChatList) {
        const content = getChatList(props.state);
        super({ ...props, content });
    }

    render() {
        return this.compile(template, this.props);
    }
}
