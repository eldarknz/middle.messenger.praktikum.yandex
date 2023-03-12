import Block from "../../../core/block";
import ChatController from "../../../core/controllers/chatController";
import connect, { Indexed } from "../../../core/store/connect";
import { store } from "../../../core/store";

import { Container } from "../../ui/grid";
import Text from "../../ui/text";
import Spinner from "../../ui/spinner";

import template from "./chatMessageArea.tmpl";
import "./chatMessageArea.scss";

interface TChatMessage {
    date: number;
    text: string;
}

interface IChatMessageArea {}

const getMessages = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.activeChatId) {
        if (state.messages && (state.messages as TChatMessage[]).length !== 0) {
            //const messages = state.messages as TChatMessage[];
            //const { activeChatId } = store.getState();
            return new Container({
                className: "chat-container",
                isFluid: true,
                content: [
                    new Text({
                        className: "text-silver",
                        content: "Сообщение"
                    })
                ]
            })
            /*return chats.map(item => {
                const chatAvatar = item.avatar ? 
                    new Avatar({ 
                        content: new Image({ src: API_RESOURCES_PATH + item.avatar })
                    }) : new Avatar();

                const chatLabel = item.unread_count ? 
                    new Label({
                        className: "label label-circle label-primary",
                        content: `${item.unread_count}` 
                    }) : null

                return new ChatCard({
                    chatId: item.id,
                    avatar: chatAvatar,
                    title: item.title,
                    message: item.last_message &&  item.last_message.content ? item.last_message.content : "Нет сообщений",
                    datetime: item.last_message && item.last_message.time ? dateConvert(item.last_message.time) : "",
                    label: chatLabel,
                    isActive: activeChatId && activeChatId === item.id ? true : false,
                    events: {
                        click: (event: Event) => {
                            const target = event.currentTarget;
                            if (target && target instanceof HTMLElement) {
                                const activeCard = document.querySelector(".chat-card.active");
                                if (activeCard) {
                                    activeCard.classList.remove("active");
                                }
                                target.classList.add("active");
                                const targetId = target.getAttribute("data-chat-id");
                                if (targetId) 
                                    ChatController.getChatById(parseInt(targetId));
                            }
                        }
                    }
                })
            });*/
        } else {
            return new Container({
                className: "chat-container empty",
                isFluid: true,
                content: [
                    new Text({
                        className: "text-silver",
                        content: "Сообщения отсутствуют"
                    })
                ]
            })
        }
    } else {
        return new Container({
            className: "chat-container empty",
            isFluid: true,
            content: [
                new Text({
                    className: "text-silver",
                    content: "Выберите чат, чтобы начать общение"
                })
            ]
        })
    }
}

class ChatMessageArea extends Block {
    constructor(props: IChatMessageArea) {
        super(props);
    }
    
    render() {
        return this.compile(template, this.props);
    }
}

const withPage = connect((state) => ({
    messages: getMessages(state)
}));

const ChatMessageAreaSection = withPage(ChatMessageArea);

export default ChatMessageAreaSection
