import Block from "../../core/block";
import template from "./chat.tmpl";
import { ChatHeader, ChatHeaderBlock } from "../../components/ChatHeader";
//import ChatFooter from "../../components/ChatFooter";
//import ChatSidebar from "../../components/ChatSidebar";
//import ChatList from "../../components/ChatList";
//import { dropdownHandler, modalHandler } from "../../modules"
//import { data as chats } from "../../data/data";
import "./styles.scss";

/*export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        header: ChatHeader(),
        footer: ChatFooter(),
        sidebar: ChatSidebar(ChatList(chats))
    });

    return html;
};*/

interface IChat {
    attr?: any;
    header: Block;
    footer?: Block;
    sidebar?: Block;
}

class Chat extends Block {
    constructor(props: IChat) {
        super('div', props);
    }
    
    render() {
        return this.compile(template, {
            header: this.props.header,
            footer: this.props.footer,
            sidebar: this.props.sidebar
        });
    }
}

const ChatPage = new Chat({
    attr: {
        class: "wrapper"
    },
    header: ChatHeaderBlock
    //footer: ChatFooter,
    //sidebar: ChatSidebar
})

export default ChatPage
