import Block from "../../../../../core/block";
import template from "./chatCard.tmpl";
import "./chatCard.scss";

interface IChardCard {
    avatar: Block;
    title: string;
    message: string;
    datetime: string;
    label: Block;
}

class ChatCard extends Block {
    constructor(props: IChardCard) {
        super(props);
    }

    render() {
        return this.compile(template, {
            avatar: this.props.avatar,
            title: this.props.title,
            message: this.props.message,
            datetime: this.props.datetime,
            label: this.props.label,
        })
    }
}

export default ChatCard
