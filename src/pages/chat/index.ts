import Block from "../../core/block";
import template from "./chat.tmpl";
import ChatHeaderBlock from "../../components/chatHeader/chatHeader";
import ChatFooterBlock from "../../components/chatFooter/chatFooter";
import ChatSidebarBlock from "../../components/chatSidebar/chatSidebar";
import { IconClose } from "../../components/ui/icon";
import AddUserFormBlock from "../../components/addUserForm/addUserForm";
import Modal from "../../components/modal";
import { dropdownHandler, modalHandler } from "../../modules"
import { TBlockAttributes } from "../../../declarations";
import "./styles.scss";

interface IChat {
    attr?: TBlockAttributes;
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
