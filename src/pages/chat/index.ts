import Block from "../../core/block";
import template from "./chat.tmpl";
import ChatHeaderBlock from "../../components/ChatHeader/ChatHeader";
import ChatFooterBlock from "../../components/ChatFooter/ChatFooter";
import ChatSidebarBlock from "../../components/ChatSidebar/ChatSidebar";
import AddUserFormBlock from "../../components/AddUserForm/AddUserForm";
import Modal from "../../components/Modal";
import { IconClose } from "../../components/ui/Icon/index";
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
