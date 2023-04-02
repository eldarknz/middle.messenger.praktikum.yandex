import Block from "../../core/block";
import AuthController from "../../core/controllers/authContorller";
import ChatController from "../../core/controllers/chatController";
import connect, { Indexed } from "../../core/store/connect";

import { Container } from "../../components/ui/grid";
import DivBlock from "../../components/ui/div";
import Text from "../../components/ui/text";
import ChatHeaderSection from "../../components/sections/chatHeader/chatHeader";
import ChatSidebarSection from "../../components/sections/chatSidebar/chatSidebar";
import ChatMessageAreaSection from "../../components/sections/chatMessageArea/chatMessageArea";
import ChatFooterSection from "../../components/sections/chatFooter/chatFooter";

import template from "./chat.tmpl";
import "./styles.scss";

interface IChat {
    header?: Block;
    footer?: Block;
    sidebar?: Block;
}

const getHeader = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.activeChat) {
        return new ChatHeaderSection({ state });
    } else {
        return new DivBlock({ content: "" })
    }
};

const getFooter = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.activeChat) {
        return new ChatFooterSection({});
    } else {
        return new DivBlock({ content: "" })
    }
};

const getChatMessageArea = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.activeChat) {
        return new ChatMessageAreaSection({ state });
    } else {
        return new Container({
            className: "chat-container empty",
            isFluid: true,
            content: [
                new Text({
                    className: "text-dark",
                    content: "Выберите чат, чтобы начать общение"
                })
            ]
        })
    }
};

class Chat extends Block {
    constructor(props: IChat) {
        super(props);
        AuthController.getUserInfo();
        ChatController.getChats();
    }
    
    render() {
        return this.compile(template, this.props);
    }
};

const withPage = connect((state) => ({
    sidebar: new ChatSidebarSection({ state }),
    header: getHeader(state),
    footer: getFooter(state),
    messageArea: getChatMessageArea(state)
}));

const ChatPage = withPage(Chat);

export default ChatPage
