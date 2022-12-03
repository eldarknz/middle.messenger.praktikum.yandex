import Block from "../../core/block";
import template from "./chat.tmpl";
import ChatHeaderBlock from "../../components/chatHeader/chatHeader";
import ChatFooterBlock from "../../components/chatFooter/chatFooter";
import ChatSidebarBlock from "../../components/chatSidebar/chatSidebar";
import { IconClose } from "../../components/ui/icon";
import AddUserFormBlock from "../../components/addUserForm/addUserForm";
import Modal from "../../components/modal";
import { dropdownHandler, modalHandler } from "../../modules"
import "./styles.scss";

interface IChat {
    header: Block;
    footer?: Block;
    sidebar?: Block;
    modal?: Block;
}

class Chat extends Block {
    constructor(props: IChat) {
        super(props);
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
    header: ChatHeaderBlock,
    footer: ChatFooterBlock,
    sidebar: ChatSidebarBlock,
    modal: new Modal({
        className: "modal",
        id: "addUserModal",
        //style: "display: none",
        iconClose: new IconClose({ className: "icon" }),
        title: "Добавить пользователя",
        content: AddUserFormBlock
    })
})

dropdownHandler();
modalHandler();

export default ChatPage
