import Block from "../../../core/block";
import template from "./chatList.tmpl";
import ChatCard from "./components/chatCard";
import Avatar from "../../ui/avatar";
import Label from "../../ui/label";
import { data } from "../../../mock/data";
import "./chatList.scss";

interface IChatList {
    content: Block[];
}

class ChatList extends Block {
    constructor(props: IChatList) {
        super(props)
    }

    render() {
        return this.compile(template, {
            content: this.props.content
        })
    }
}

const ChatListBlock = new ChatList({
    content: data.map(item => (
        new ChatCard({
            avatar: new Avatar(),
            title: item.title,
            message: item.message.text,
            datetime: item.message.time_created,
            label: new Label({ className: "label label-circle label-primary", content: "99" })
        })
    ))
})

export default ChatListBlock
