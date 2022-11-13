import Block from "../../../core/block";
import template from "./Label.tmpl";
import "./Label.scss";
import { TBlockAttributes } from "../../../../declarations";

interface ILabel {
    attr?: TBlockAttributes;
    content: Block | string;
}

class Label extends Block {
    constructor(props: ILabel) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            content: this.props.content
        })
    }
}

export default Label
