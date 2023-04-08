// Core
import { Block } from "@core/block";
import { connect } from "@core/store/connect";
import { AuthController } from "@core/controllers/authContorller";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Grid } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Text } from "@components/ui/text";
import { ChatHeaderSection } from "@components/sections/chatHeader/chatHeader";
import { ChatSidebarSection } from "@components/sections/chatSidebar/chatSidebar";
import { ChatMessageAreaSection } from "@components/sections/chatMessageArea/chatMessageArea";
import { ChatFooterSection } from "@components/sections/chatFooter/chatFooter";
// Template
import template from "./chat.tmpl";
// Styles
import "./styles.scss";

interface IChat {}

const getHeader = (state: Indexed) => {
    return Object.keys(state).length !== 0 && state.activeChat ?
        new ChatHeaderSection({ state }) :
        new DivBlock({});
};

const getFooter = (state: Indexed) => {
    return Object.keys(state).length !== 0 && state.activeChat ?
        new ChatFooterSection({ state }) :
        new DivBlock({});
};

const getChatMessageArea = (state: Indexed) => {
    return Object.keys(state).length !== 0 && state.activeChat ?
        new ChatMessageAreaSection({ state }) :
        new Grid.Container({
            className: "chat-container empty",
            isFluid: true,
            content: [
                new Text({
                    className: "text-dark",
                    content: "Выберите чат, чтобы начать общение"
                })
            ]
        });
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

export const ChatPage = withPage(Chat);
