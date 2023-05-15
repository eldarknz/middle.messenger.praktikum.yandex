// Core
import { Block } from '@core/block';
import { store } from '@core/store';
import { ChatController } from '@core/controllers/chatController';
// Components
import { Button } from '@components/ui/button';
import { DivBlock } from '@components/ui/div';
import { Dropdown } from '@components/ui/dropdown';
import { Form } from '@components/ui/form';
import {
    Icon
} from '@components/ui/icon';
import { Input } from '@components/ui/input';
import { Text } from '@components/ui/text';
// Template
import template from './chatFooter.tmpl';
// Styles
import './chatFooter.scss';

export class ChatFooterSection extends Block {
    constructor(props: Record<string, unknown>) {
        const dropdown = new Dropdown({
            className: 'up',
            dropdownButtonShape: 'square',
            dropdownButtonSize: 'lg',
            dropdownButtonContent: new Icon({
                name: "attachment",
                size: 'm',
            }),
            dropdownMenuContent: new DivBlock({
                className: 'dropdown-menu__content',
                content: [
                    new DivBlock({
                        className: 'dropdown-item',
                        content: [
                            new Icon({
                                name: "media",
                                color: 'primary',
                                size: 'm',
                            }),
                            new Text({
                                content: 'Фото или видео',
                            }),
                        ],
                        events: {
                            click: () => alert('Я скоро заработаю'),
                        },
                    }),
                    new DivBlock({
                        className: 'dropdown-item',
                        content: [
                            new Icon({
                                name: "file",
                                color: 'primary',
                                size: 'm',
                            }),
                            new Text({
                                content: 'Файл',
                            }),
                        ],
                        events: {
                            click: () => alert('Я скоро заработаю'),
                        },
                    }),
                    new DivBlock({
                        className: 'dropdown-item',
                        content: [
                            new Icon({
                                name: "location",
                                color: 'primary',
                                size: 'm',
                            }),
                            new Text({
                                content: 'Локация',
                            }),
                        ],
                        events: {
                            click: () => alert('Я скоро заработаю'),
                        },
                    }),
                ],
            }),
        });

        const messageBlock = new Form({
            className: 'chat-footer__form',
            content: [
                new Input({
                    id: 'message',
                    name: 'message',
                    placeholderText: 'Сообщение',
                }),
                new Button({
                    color: 'primary',
                    shape: 'square',
                    size: 'lg',
                    content: new Icon({
                        name: "arrowRight",
                        size: 'm'
                    }),
                }),
            ],
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    const state = store.getState();
                    const { target } = event;
                    if (target && (Boolean(state.ws))) {
                        const ws = state.ws as WebSocket;
                        const input = (target as HTMLFormElement)
                            .elements[0] as HTMLInputElement;
                        const { value } = input;
                        if (value.trim() !== '' && ws !== null && ws !== undefined) {
                            ws.send(
                                JSON.stringify({
                                    content: value,
                                    type: 'message',
                                })
                            );
                            ChatController.getChats();
                        }
                        input.value = '';
                    }
                },
            },
        });

        super({ ...props, dropdown, messageBlock });
    }

    render() {
        return this.compile(template, this.props);
    }
}
