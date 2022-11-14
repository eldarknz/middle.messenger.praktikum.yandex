import Block from "../../core/block";
import template from "./chatList.tmpl";
import ChatCard from "./components/chatCard";
import Avatar from "../ui/avatar";
import Label from "../ui/label";
import { TBlockAttributes } from "../../../declarations";
import { data } from "../../data/data";
import "./chatList.scss";

interface IChatList {
    attr?: TBlockAttributes;
    content: Block[];
}

class ChatList extends Block {
    constructor(props: IChatList) {
        super("div", props)
    }

    render() {
        return this.compile(template, {
            content: this.props.content
        })
    }
}

const ChatListBlock = new ChatList({
    attr: {
        class: "chat-list"
    },
    content: data.map(item => (
        new ChatCard({
            attr: {
                class: "chat-card"
            },
            avatar: new Avatar({ attr: { class: "avatar avatar_size_m" }}),
            title: item.title,
            message: item.message.text,
            datetime: item.message.time_created,
            label: new Label({ attr: { class: "label label-circle label-primary" }, content: "99"})
        })
    ))
})

export default ChatListBlock
