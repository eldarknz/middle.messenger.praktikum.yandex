// Core
import Block from "@core/block";
// Templates
import template from "./avatar.tmlp";
// Styles
import "./avatar.scss";

interface IAvatar {
    size?: "m" | "lg";
    className?: string;
    content?: Block | string;
}

class Avatar extends Block {
    constructor(props?: IAvatar) {
        super(props);
        this.avatarClassName = this.avatarClassName.bind(this);
    }

    avatarClassName() {
        let className = "avatar";
        if (this.props.size) className += ` avatar-${this.props.size}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.avatarClassName(),
            content: this.props.content
        });
    }
}

export default Avatar
