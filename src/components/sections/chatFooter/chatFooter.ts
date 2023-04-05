// Core
import { Block } from "@core/block";
import { store } from "@core/store";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Button } from "@components/ui/button";
import { DivBlock } from "@components/ui/div";
import { Dropdown } from "@components/ui/dropdown";
import { Form } from "@components/ui/form";
import { IconAttachment, IconArrowRight, IconMedia, IconFile, IconLocation } from "@components/ui/icon";
import { Input } from "@components/ui/input";
import { Text } from "@components/ui/text";
// Template
import template from "./chatFooter.tmpl";
// Styles
import "./chatFooter.scss";

export class ChatFooterSection extends Block {
    constructor(props: {}) {

        const dropdown = new Dropdown({
            className: "up",
            dropdownButtonIsSquare: true,
            dropdownButtonSize: "lg",
            dropdownButtonContent: new IconAttachment({
                size: "m"
            }),
            dropdownMenuContent: new DivBlock({
                className: "dropdown-menu__content",
                content: [
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconMedia({
                                color: "primary",
                                size: "m"
                            }),
                            new Text({
                                content: "Фото или видео"
                            })
                        ],
                        events: {
                            click: () => alert("Я скоро заработаю")
                        }
                    }),
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconFile({
                                color: "primary",
                                size: "m"
                            }),
                            new Text({
                                content: "Файл"
                            })
                        ],
                        events: {
                            click: () => alert("Я скоро заработаю")
                        }
                    }),
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconLocation({ 
                                color: "primary",
                                size: "m"
                            }),
                            new Text({
                                content: "Локация"
                            })
                        ],
                        events: {
                            click: () => alert("Я скоро заработаю")
                        }
                    }),
                ]
            })
        });

        const messageBlock = new Form({
            className: "chat-footer__form",
            content: [
                new Input({
                    id: "message",
                    name: "message",
                    placeholderText: "Сообщение"
                }),
                new Button({
                    color: "primary",
                    size: "lg",
                    isSquare: true,
                    content: new IconArrowRight({ size: "m" })
                })
            ],
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    const state = store.getState()
                    const target = event.target;
                    if (target && state.ws) {
                        const ws = state.ws as WebSocket;
                        const input = (target as HTMLFormElement).elements[0] as HTMLInputElement;
                        const value = input.value;
                        if (value.trim() !== "" && ws) {
                            ws.send(JSON.stringify({
                                content: value,
                                type: "message",
                            }));
                            ChatController.getChats();
                        }
                        input.value = "";
                    }
                }
            }
        });

        super({ ...props, dropdown, messageBlock });
    }
    
    render() {
        return this.compile(template, this.props);
    }
}
