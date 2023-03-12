import Block from "../../core/block";
import AuthController from "../../core/controllers/authContorller";
import ChatController from "../../core/controllers/chatController";
import { store } from "../../core/store";
import connect, { Indexed } from "../../core/store/connect";

import ChatHeaderSection from "../../components/sections/chatHeader/chatHeader";
import ChatSidebarSection from "../../components/sections/chatSidebar/chatSidebar";
import ChatMessageAreaSection from "../../components/sections/chatMessageArea/chatMessageArea";
import ChatFooterBlock from "../../components/sections/chatFooter/chatFooter";

import template from "./chat.tmpl";
import "./styles.scss";

interface IChat {
    header?: Block;
    footer?: Block;
    sidebar?: Block;
}

const getHeader = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.activeChatId) {

        const { activeChatId } = store.getState();
        console.log(activeChatId);

        return new ChatHeaderSection({});
    } else {
        return ""
    }
};

const getFooter = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.activeChatId) {

        const { activeChatId } = store.getState();
        console.log(activeChatId);

        return ChatFooterBlock;
    } else {
        return ""
    }
};

class Chat extends Block {
    constructor(props: IChat) {

        const sidebar = new ChatSidebarSection({});
        super({ ...props, sidebar });

        AuthController.getUserInfo();
        ChatController.getChats();
    }
    
    render() {
        return this.compile(template, this.props);
    }
};

const withPage = connect((state) => ({
    header: getHeader(state),
    footer: getFooter(state),
    messageArea: new ChatMessageAreaSection({})
}));

const ChatPage = withPage(Chat);

export default ChatPage
