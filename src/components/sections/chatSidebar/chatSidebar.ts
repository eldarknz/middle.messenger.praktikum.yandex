import Block from "../../../core/block";
import AuthController from "../../../core/controllers/authContorller";
import ChatController from "../../../core/controllers/chatController";
import connect, { Indexed } from "../../../core/store/connect";
import renderDOM from "../../../core/renderDom";

import ChatListSection from "../chatList/chatList";
import { Container } from "../../ui/grid";
import Modal, { modalCloseHandler } from "../../ui/modal";
import Button from "../../ui/button";
import Nav from "../../ui/nav";
import Form from "../../ui/form";
import Input from "../../ui/input";
import Logo from "../../ui/logo";
import { IconMessage, IconProfile, IconSettings, IconLogout } from "../../ui/icon";

import { ROUTES } from "../../../utils/constants";
import { formSubmissionsHandler } from "../../../utils/formHandler";

import template from "./chatSidebar.tmpl";
import "./chatSidebar.scss";

interface IChatSidebar {
    logoLink: Block;
    newMessageIcon: Block;
    inputSearch: Block;
    content: Block | string;
    nav: Block;
}

export const createNewChat = () => {
    const modal = new Modal({
        id: "createNewChatModal",
        title: "Создание нового чата",
        content: new Container({
            id: "createNewChatContainer",
            isFluid: true,
            content: new Form({
                className: "add-value__form",
                content: [
                    new Container({
                        isFluid: true,
                        className: "add-value__form__input-group",
                        content:  new Input({
                            id: "createNewChat",
                            name: "title",
                            placeholderText: "Название чата"
                        })
                    }),
                    new Button({
                        color: "primary",
                        isFluid: true,
                        size: "lg",
                        content: "Создать"
                    })
                ],
                events: {
                    submit: (event: Event) => {
                        formSubmissionsHandler({
                            event: event,
                            handler: ChatController.addChat,
                            selector: ".add-value__form__input-group",
                            action: () => modalCloseHandler()
                        });
                    }
                }
            })
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

class ChatSidebar extends Block {
    constructor(props: IChatSidebar) {

        const logoLink = new Logo({
            link: ROUTES.home.path
        });

        const newChatButton = new Button({
            size: "lg",
            isSquare: true,
            id: "dropdownMenuButton",
            content: new IconMessage(),
            events: {
                click: createNewChat
            }
        });

        const inputSearch = new Input({
            id: "search",
            name: "search",
            placeholderText: "Поиск",
            //placeholderPosition: "center",
            //placeholderIcon: new IconSearch({ className: "icon" })
        });

        const chatList = new ChatListSection({});

        const nav = new Nav({
            content: [
                new Button({
                    size: "lg",
                    isSquare: true,
                    content: new IconProfile(),
                    events: {
                        click: () => { window.router.go(ROUTES.profile.path); }
                    }
                }),
                new Button({
                    size: "lg",
                    isSquare: true,
                    content: new IconSettings(),
                    events: {
                        click: () => { window.router.go(ROUTES.profileEdit.path); }
                    }
                }),
                new Button({
                    size: "lg",
                    isSquare: true,
                    content: new IconLogout({
                        color: "secondary"
                    }),
                    events: {
                        click: async (e: Event) => {
                            e.preventDefault();
                            await AuthController.logout();
                        }
                    },
                })
            ]
            
        });

        super({ ...props, logoLink, inputSearch, chatList, newChatButton, nav })
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withPage = connect((state) => ({}));

const ChatSidebarSection = withPage(ChatSidebar);

export default ChatSidebarSection
