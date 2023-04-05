// Core
import { Block } from "@core/block";
// Template
import template from "./chatMessage.tmpl";
// Styles
import "./chatMessage.scss";

export interface IChatMessage {
    id: number;
    chat_id: number;
    user_id: string;
    content: string;
    datetime: Block | null;
    user?: boolean;
}

export class ChatMessage extends Block {
    constructor(props: IChatMessage) {

        super(props);
    }

    render() {
        return this.compile(template, {
            id: this.props.id,
            chatId: this.props.chat_id,
            userId: this.props.user_id,
            content: this.props.content,
            datetime: this.props.datetime,
            user: this.props.user
        })
    }
}
