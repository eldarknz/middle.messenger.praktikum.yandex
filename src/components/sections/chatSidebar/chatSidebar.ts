// Core
import Block from "@core/block";
import renderDOM from "@core/renderDom";
import AuthController from "@core/controllers/authContorller";
import ChatController from "@core/controllers/chatController";
// Components
import Button from "@components/ui/button";
import { Container } from "@components/ui/grid";
import Form from "@components/ui/form";
import { IconProfile, IconSettings, IconLogout, IconWrite } from "@components/ui/icon";
import Input from "@components/ui/input";
import Logo from "@components/ui/logo";
import Modal, { modalCloseHandler } from "@components/ui/modal";
import Nav from "@components/ui/nav";
import ChatListSection from "@components/sections/chatList/chatList";
// Utils
import { formDataSubmissionsHandler } from "@utils/formHandler";
import { ROUTES } from "@utils/constants";
// Template
import template from "./chatSidebar.tmpl";
// Styles
import "./chatSidebar.scss";

interface IChatSidebar {
    state: Indexed;
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
                        formDataSubmissionsHandler({
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

const searchChat = () => {
    console.log('searchChat');
}

class ChatSidebarSection extends Block {
    constructor(props: IChatSidebar) {

        const logoLink = new Logo({
            link: ROUTES.home.path
        });

        const newChatButton = new Button({
            size: "lg",
            isSquare: true,
            id: "dropdownMenuButton",
            content: new IconWrite({
                size: "m"
            }),
            events: {
                click: createNewChat
            }
        });

        const inputSearch = new Input({
            id: "search",
            name: "search",
            placeholderText: "Поиск",
            events: {
                input: searchChat
            }
            //placeholderPosition: "center",
            //placeholderIcon: new IconSearch({ className: "icon" })
        });

        const chatList = new ChatListSection({
            state: props.state
        });

        const nav = new Nav({
            content: [
                new Button({
                    size: "lg",
                    isSquare: true,
                    content: new IconProfile({
                        size: "m"
                    }),
                    events: {
                        click: () => { window.router.go(ROUTES.profile.path); }
                    }
                }),
                new Button({
                    size: "lg",
                    isSquare: true,
                    content: new IconSettings({
                        size: "m"
                    }),
                    events: {
                        click: () => { window.router.go(ROUTES.profileEdit.path); }
                    }
                }),
                new Button({
                    size: "lg",
                    isSquare: true,
                    content: new IconLogout({
                        color: "secondary",
                        size: "m"
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
        return this.compile(template, this.props);
    }
}

export default ChatSidebarSection
