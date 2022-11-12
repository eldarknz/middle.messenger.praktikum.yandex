import Block from "../../core/block";
import template from "./chat.tmpl";
import ChatHeaderBlock from "../../components/ChatHeader";
import ChatFooterBlock from "../../components/ChatFooter";
import ChatSidebarBlock from "../../components/ChatSidebar";
import { IconClose } from "../../components/ui/Icon";
import AddUserFormBlock from "../../components/AddUserForm/AddUserForm";
//import ChatListBlock from "../../components/ChatList";
import { dropdownHandler, modalHandler } from "../../modules"
//import { data as chats } from "../../data/data";
import "./styles.scss";
import Modal from "../../components/Modal";

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
    modal?: Block;
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
    header: ChatHeaderBlock,
    footer: ChatFooterBlock,
    sidebar: ChatSidebarBlock,
    modal: new Modal({
        attr: {
            class: "modal",
            id: "addUserModal",
            style: "display: none",
        },
        iconClose: new IconClose({ attr: { class: "icon" }}),
        title: "Добавить пользователя",
        content: AddUserFormBlock
    })
})

dropdownHandler();
modalHandler();

export default ChatPage
