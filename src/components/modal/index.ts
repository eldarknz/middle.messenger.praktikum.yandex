import Block from "../../core/block";
import template from "./modal.tmpl";
import "./modal.scss";
import { TBlockAttributes } from "../../../declarations";

interface IModal {
    attr?: TBlockAttributes;
    iconClose: Block | string;
    title?: string;
    content?: Block | string;
}

class Modal extends Block {
    constructor(props: IModal) {
        super("div", props)
    }

    render() {
        return this.compile(template, {
            iconClose: this.props.iconClose,
            title: this.props.title,
            content: this.props.content
        })
    }
}

export default Modal
