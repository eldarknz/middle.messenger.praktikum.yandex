// Core
import { Block } from '@core/block';
// Components
import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
// Template
import template from './modal.tmpl';
// Styles
import './modal.scss';

interface IModal {
    className?: string;
    id: string;
    style?: string;
    iconClose?: Block | string;
    title?: string;
    content?: Block | string;
    events?: {
        click: (e: Event) => void;
    };
}

export const modalCloseHandler = () => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
        modalRoot.innerHTML = '';
    }
};

const defaultModalHandler = (event: Event) => {
    if (event.target === event.currentTarget) {
        modalCloseHandler();
    }
};

export class Modal extends Block {
    constructor(props: IModal) {
        const modalCloseButton = new Button({
            size: 'sm',
            shape: 'square',
            id: 'modalCloseButton',
            content: new Icon({ name: "close" }),
            events: {
                click: modalCloseHandler,
            },
        });

        super({
            ...props,
            modalCloseButton,
            events: { click: props.events?.click ?? defaultModalHandler },
        });
        this.modalClassName = this.modalClassName.bind(this);
    }

    modalClassName() {
        let className = 'modal';
        if (this.props.className !== undefined) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.modalClassName(),
            id: this.props.id,
            style: this.props.style !== undefined ? this.props.style : 'display: none',
            iconClose: this.props.iconClose,
            title: this.props.title,
            content: this.props.content,
        });
    }
}
