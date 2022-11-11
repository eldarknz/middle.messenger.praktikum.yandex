import Block from "../../core/block";
import template from "./ChatHeader.tmpl";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import Modal from "../Modal";
import { IconAdd, IconDelete, IconDots, IconClose } from "../ui/Icon";
import "./ChatHeader.scss";
import { dropdownHandler, modalHandler } from "../../modules";
import AddUserFormBlock from "./components/AddUserForm/AddUserForm";

interface IChatHeader {
    attr?: any;
    userAvatar: Block;
    userName: string;
    dropdown: any;
    modal?: Block;
}

class ChatHeader extends Block {
    constructor(props: IChatHeader) {
        super('div', props);
    }
    
    render() {
        return this.compile(template, {
            userAvatar: this.props.userAvatar,
            userName: this.props.userName,
            dropdown: this.props.dropdown,
            modal: this.props.modal
        });
    }
}

const ChatHeaderBlock = new ChatHeader({
    attr: {
        class: "chat-header"
    },
    userAvatar: new Avatar({ attr: { class: "avatar" }}),
    userName: "Вадим",
    dropdown: new Dropdown({
        attr: { class: "dropdown" },
        dropdownButton: new Button({
            attr: { class: "btn btn-circle", id: "dropdownMenuButton" },
            content: new IconDots({ attr: { class: "icon icon-size-m" }})
        }),
        dataToggle: "modal",
        dataTarget: "addUserModal",
        addUserIcon: new IconAdd({attr: { class: "icon icon-size-l icon-primary"}}),
        deleteUserIcon: new IconDelete({attr: { class: "icon icon-size-l icon-primary"}})
    }),
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

export {
    ChatHeader,
    ChatHeaderBlock
}
