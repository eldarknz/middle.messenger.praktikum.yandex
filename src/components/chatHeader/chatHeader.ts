import Block from "../../core/block";
import template from "./chatHeader.tmpl";
import Dropdown from "../ui/dropdown";
import Button from "../ui/button";
import Avatar from "../ui/avatar";
import { IconAdd, IconDelete, IconDots } from "../ui/icon";
import "./chatHeader.scss";
import UserActions from "./components/userActions/userActions";
import { TBlockAttributes } from "../../../declarations";

interface IChatHeader {
    attr?: TBlockAttributes;
    userAvatar: Block;
    userName: string;
    dropdown: Block;
}

class ChatHeader extends Block {
    constructor(props: IChatHeader) {
        super('div', props);
    }
    
    render() {
        return this.compile(template, {
            userAvatar: this.props.userAvatar,
            userName: this.props.userName,
            dropdown: this.props.dropdown
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
        content: new UserActions({
            dataToggle: "modal",
            dataTarget: "addUserModal",
            addUserIcon: new IconAdd({attr: { class: "icon icon-size-l icon-primary"}}),
            deleteUserIcon: new IconDelete({attr: { class: "icon icon-size-l icon-primary"}})
        })
    })
})

export default ChatHeaderBlock
