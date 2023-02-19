import Block from "../../../core/block";
import template from "./modal.tmpl";
import "./modal.scss";
import Button from "../button";
import { IconClose } from "../icon";

interface IModal {
    className?: string,
    id: string,
    style?: string,
    iconClose?: Block | string;
    title?: string;
    content?: Block | string;
    events?: {
        click: (e: Event) => void
    }
}

export const modalCloseHandler = () => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
        modalRoot.innerHTML = "";
    }
};

const defaultModalHandler = (e: Event) => {
    if (e.target === e.currentTarget) {
        modalCloseHandler();
    }
};

class Modal extends Block {
    constructor(props: IModal) {
        const modalCloseButton = new Button({
            size: "sm",
            isSquare: true,
            id: "modalCloseButton",
            content: new IconClose({}),
            events: {
                click: modalCloseHandler
            }
        })

        super({...props, modalCloseButton, events: { click: props.events?.click ?? defaultModalHandler }});
        this.modalClassName = this.modalClassName.bind(this);
    }

    modalClassName() {
        let className = "modal";
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.modalClassName(),
            id: this.props.id,
            style: this.props.style ? this.props.style : "display: none",
            iconClose: this.props.iconClose,
            title: this.props.title,
            content: this.props.content
        })
    }
}

export default Modal
