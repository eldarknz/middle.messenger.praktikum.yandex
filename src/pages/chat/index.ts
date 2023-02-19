import Block from "../../core/block";
import template from "./chat.tmpl";
import ChatHeaderBlock from "../../components/sections/chatHeader/chatHeader";
import ChatFooterBlock from "../../components/sections/chatFooter/chatFooter";
import ChatSidebarBlock from "../../components/sections/chatSidebar/chatSidebar";
import { IconClose } from "../../components/ui/icon";
import AddUserFormBlock from "../../components/sections/addUserForm/addUserForm";
import Modal from "../../components/ui/modal";
import { dropdownHandler, modalHandler } from "../../modules"
import "./styles.scss";

interface IChat {
    header: Block;
    footer?: Block;
    sidebar?: Block;
    modal?: Block;
}

class ChatPage extends Block {
    constructor(props: IChat) {

        const header = ChatHeaderBlock;
        const footer = ChatFooterBlock;
        const sidebar = ChatSidebarBlock;
        const modal = new Modal({
            className: "modal",
            id: "addUserModal",
            //style: "display: none",
            iconClose: new IconClose({ className: "icon" }),
            title: "Добавить пользователя",
            content: AddUserFormBlock
        });

        super({ ...props, header, footer, sidebar, modal });
    }
    
    render() {
        return this.compile(template, this.props);
        /*return this.compile(template, {
            header: this.props.header,
            footer: this.props.footer,
            sidebar: this.props.sidebar
        });*/
    }
};

/*const ChatPage = new Chat({
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
})*/

dropdownHandler();
modalHandler();

export default ChatPage
