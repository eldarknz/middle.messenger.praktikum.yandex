// Components
import { DivBlock } from "@components/ui/div";
import { Skeleton } from "@components/ui/skeleton";
import { Text } from "@components/ui/text";
// Types
import { IChatUser, TChatItem } from "@custom_types/index";

const getParticipantsCount = (users: IChatUser[]) => {  
    const userCount = users.length;
    if (userCount.toString().slice(-1) === "1") {
        return `${userCount} участник`
    } else if (userCount.toString().slice(-1) === "2" || userCount.toString().slice(-1) === "3" || userCount.toString().slice(-1) === "4") {
        return `${userCount} участника`
    } else {
        return `${userCount} участников`
    }
};

const getChatName = (chat: TChatItem[], activeChatId: number) => {
    const chatName = chat.find(item => item.id === activeChatId);
    return chatName ? chatName.title : "Без названия";
};

export const ChatInfoBlock = (
    chats?: TChatItem[],
    activeChat?: { users: IChatUser[], id: number },
    events?: { click: (e: Event) => void }
) => {
    
    return new DivBlock({
        className: chats && activeChat && events ? "chat-info" : "chat-info empty",
        content: [
            new DivBlock({
                className: chats && activeChat ? "chat-info__title" : "chat-info__text-empty",
                content: chats && activeChat ? new Text({ content: getChatName(chats, activeChat.id) }) : new Skeleton({ height: 16, isAnimation: true })
            }),
            new DivBlock({
                className: activeChat ? "chat-info__subtitle text-dark": "chat-info__text-empty",
                content: activeChat ? new Text({
                    content: getParticipantsCount(activeChat.users)
                }) : new Skeleton({ height: 10, isAnimation: true })
            })
        ],
        events: events
    });
};
