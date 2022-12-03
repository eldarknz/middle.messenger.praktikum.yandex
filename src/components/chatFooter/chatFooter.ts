import Block from "../../core/block";
import template from "./chatFooter.tmpl";
import Dropdown from "../ui/dropdown";
import { IconAttachment, IconArrowRight, IconMedia, IconFile, IconLocation } from "../ui/icon";
import Input from "../ui/input";
import Button from "../ui/button";
import MediaActions from "./components/mediaActions/mediaActions";
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
        className: "dropdown up",
        dropdownButton: new Button({
            className: "btn btn-square btn-gray",
            id: "dropdownMenuButton",
            content: new IconAttachment({ className: "icon icon-size-m" })
        }),
        content: new MediaActions({
            addMediaIcon: new IconMedia({ className: "icon icon-size-l icon-primary" }),
            addFileIcon: new IconFile({ className: "icon icon-size-l icon-primary" }),
            addLocationIcon: new IconLocation({ className: "icon icon-size-l icon-primary" }),
        })
    }),
    inputMessage: new Input({
        alternative: false,
        id: "message",
        name: "message",
        placeholderText: "Сообщение"
    }),
    buttonSend: new Button({
        className:"btn btn-square btn-primary",
        content: new IconArrowRight({ className: "icon icon-white icon-size-m" })
    })
})

export default ChatFooterBlock
