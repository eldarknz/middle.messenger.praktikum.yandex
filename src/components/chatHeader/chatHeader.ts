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
        super(props);
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
    userAvatar: new Avatar({ className: "avatar" }),
    userName: "Вадим",
    dropdown: new Dropdown({
        className: "dropdown",
        dropdownButton: new Button({
            className: "btn btn-circle",
            id: "dropdownMenuButton",
            content: new IconDots({ className: "icon icon-size-m" })
        }),
        content: new UserActions({
            dataToggle: "modal",
            dataTarget: "addUserModal",
            addUserIcon: new IconAdd({ className: "icon icon-size-l icon-primary" }),
            deleteUserIcon: new IconDelete({ className: "icon icon-size-l icon-primary" })
        })
    })
})

export default ChatHeaderBlock
