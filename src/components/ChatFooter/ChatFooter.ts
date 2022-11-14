import Block from "../../core/block";
import template from "./chatFooter.tmpl";
import Dropdown from "../ui/dropdown";
import { IconAttachment, IconArrowRight, IconMedia, IconFile, IconLocation } from "../ui/icon";
import Input from "../ui/input";
import Button from "../ui/button";
import MediaActions from "./components/mediaActions/mediaActions";
import "./chatFooter.scss";
import { TBlockAttributes } from "../../../declarations";

interface IChatFooter {
    attr?: TBlockAttributes;
    dropdown?: Block;
    inputMessage?: Block;
    buttonSend?: Block;
}

class ChatFooter extends Block {
    constructor(props: IChatFooter) {
        super('div', props);
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
    attr: {
        class: "chat-footer"
    },
    dropdown: new Dropdown({
        attr: { class: "dropdown up" },
        dropdownButton: new Button({
            attr: { class: "btn btn-square btn-gray", id: "dropdownMenuButton" },
            content: new IconAttachment({ attr: { class: "icon icon-size-m" }})
        }),
        content: new MediaActions({
            addMediaIcon: new IconMedia({attr: { class: "icon icon-size-l icon-primary"}}),
            addFileIcon: new IconFile({attr: { class: "icon icon-size-l icon-primary"}}),
            addLocationIcon: new IconLocation({attr: { class: "icon icon-size-l icon-primary"}}),
        })
    }),
    inputMessage: new Input({
        attr: {
            class: "form-group"
        },
        alternative: false,
        id: "message",
        name: "message",
        placeholderText: "Сообщение"
    }),
    buttonSend: new Button({
        attr: {
            class:"btn btn-square btn-primary",
        },
        content: new IconArrowRight({ attr: { class: "icon icon-white icon-size-m"}})
    })
})

export default ChatFooterBlock
