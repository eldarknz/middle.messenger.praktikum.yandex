import Block from "../../../core/block";
import template from "./avatar.tmlp";
import "./avatar.scss";

interface IAvatar {
    className?: string;
    content?: Block | string;
}

class Avatar extends Block {
    constructor(props: IAvatar) {
        super(props);
    }

    render() {
        return this.compile(template, {
            className: this.props.className,
            content: this.props.content
        });
    }
}

export default Avatar
