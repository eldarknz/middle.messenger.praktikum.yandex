import Block from "../../core/block";
import template from "./ChatHeader.tmpl";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { IconAdd, IconDelete, IconDots } from "../ui/Icon";
import "./ChatHeader.scss";
import UserActions from "./components/UserActions/UserActions";
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
