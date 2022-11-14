import Block from "../../../core/block";
import template from "./avatar.tmlp";
import "./avatar.scss";
import { TBlockAttributes } from "../../../../declarations";

interface IAvatar {
    attr?: TBlockAttributes;
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
