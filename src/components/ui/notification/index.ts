// Core
import { Block } from '@core/block';
// Components
import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
// Template
import template from './notification.tmpl';
// Styles
import './notification.scss';

const NOTIFICATION_CLOSE_TIEMOUT = 3000;

interface INotification {
    className?: string;
    iconClose?: Block | string;
    content: string;
    view?: 'success' | 'error';
}

export const notificationCloseHandler = (element: Element) => {
    element.remove();
};

export class Notification extends Block {
    private setTimeout;

    constructor(props: INotification) {
        const notificationCloseButton = new Button({
            size: 'sm',
            shape: 'square',
            id: 'notificationCloseButton',
            content: new Icon({ name: "close" }),
            events: {
                click: (event: Event) => {
                    const { currentTarget } = event;
                    if (currentTarget) {
                        const notification = (currentTarget as HTMLElement).closest('.notification');
                        notification ? notificationCloseHandler(notification) : false;
                    }
                },
            },
        });

        super({ ...props, notificationCloseButton });
        this.notificationClassName = this.notificationClassName.bind(this);
        this.setTimeout = setTimeout(() => {
            notificationCloseHandler(this.getContent() as HTMLElement);
            this.clearTimeout();
        }, NOTIFICATION_CLOSE_TIEMOUT);
    }

    clearTimeout() {
        clearTimeout(this.setTimeout);
    }

    notificationClassName() {
        let className = 'notification';
        if (this.props.view) className += ` notification-${this.props.view}`;
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    renderDOMElement(query: string) {
        const root = document.querySelector(query) as HTMLElement;
        const blockContent = this.getContent();
        if (root) {
            if (root.childElementCount === 5) {
                root.removeChild(root.children[0]);
            }
            root.appendChild(blockContent);
        }
    }

    render() {
        return this.compile(template, {
            className: this.notificationClassName(),
            iconClose: this.props.iconClose,
            content: this.props.content,
        });
    }
}
