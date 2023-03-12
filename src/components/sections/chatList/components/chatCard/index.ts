import Block from "../../../../../core/block";
import template from "./chatCard.tmpl";
import "./chatCard.scss";

interface IChardCard {
    chatId: number;
    avatar: Block;
    title: string;
    message: string;
    datetime: string;
    label?: Block | null;
    isActive?: boolean;
    events?: { 
        click?: (e: Event) => void;
    }
}

class ChatCard extends Block {
    constructor(props: IChardCard) {
        super(props);
    }

    render() {
        return this.compile(template, {
            chatId: this.props.chatId,
            avatar: this.props.avatar,
            title: this.props.title,
            message: this.props.message,
            datetime: this.props.datetime,
            label: this.props.label,
            isActive: this.props.isActive
        })
    }
}

export default ChatCard
