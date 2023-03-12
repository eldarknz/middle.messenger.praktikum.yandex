import Block from "../../../core/block";

import MediaActions from "./components/mediaActions/mediaActions";
import Dropdown from "../../ui/dropdown";
import { IconAttachment, IconArrowRight, IconMedia, IconFile, IconLocation } from "../../ui/icon";
import Input from "../../ui/input";
import Button from "../../ui/button";

import template from "./chatFooter.tmpl";
import "./chatFooter.scss";

interface IChatFooter {
    dropdown?: Block;
    inputMessage?: Block;
    buttonSend?: Block;
}

class ChatFooter extends Block {
    constructor(props: IChatFooter) {
        super(props);
    }
    
    render() {
        return this.compile(template, {
            dropdown: this.props.dropdown,
            inputMessage: this.props.inputMessage,
            buttonSend: this.props.buttonSend
        });
    }
}

const ChatFooterBlock = new ChatFooter({
    dropdown: new Dropdown({
        className: "up",
        dropdownButtonSize: "lg",
        dropdownButtonIsSquare: true,
        dropdownButtonContent: new IconAttachment(),
        dropdownMenuContent: new MediaActions({
            addMediaIcon: new IconMedia({ className: "icon icon-size-l icon-primary" }),
            addFileIcon: new IconFile({ className: "icon icon-size-l icon-primary" }),
            addLocationIcon: new IconLocation({ className: "icon icon-size-l icon-primary" }),
        })
    }),
    inputMessage: new Input({
        id: "message",
        name: "message",
        placeholderText: "Сообщение"
    }),
    buttonSend: new Button({
        color: "primary",
        size: "lg",
        isSquare: true,
        content: new IconArrowRight({ className: "icon icon-size-m" })
    })
})

export default ChatFooterBlock
