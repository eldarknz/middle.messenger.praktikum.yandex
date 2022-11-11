import Block from "../../../core/block";
import template from "./Avatar.tmlp";
import "./Avatar.scss";

interface IAvatar {
    attr?: any;
    content?: Block | string;
}

class Avatar extends Block {
    constructor(props: IAvatar) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            content: this.props.content
        });
    }
}

export default Avatar


