import Block from "../../core/block";
import template from "./modal.tmpl";
import "./modal.scss";

interface IModal {
    attr?: any;
    iconClose: Block | string;
    title?: string;
    content?: any;
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
