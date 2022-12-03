import Block from "../../core/block";
import template from "./modal.tmpl";
import "./modal.scss";

interface IModal {
    className: string,
    id: string,
    style?: string,
    iconClose: Block | string;
    title?: string;
    content?: Block | string;
}

class Modal extends Block {
    constructor(props: IModal) {
        super(props)
    }

    render() {
        return this.compile(template, {
            className: this.props.className,
            id: this.props.id,
            style: this.props.style ? this.props.style : "display: none",
            iconClose: this.props.iconClose,
            title: this.props.title,
            content: this.props.content
        })
    }
}

export default Modal
