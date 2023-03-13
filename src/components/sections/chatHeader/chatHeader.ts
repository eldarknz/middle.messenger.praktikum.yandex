import Block from "../../../core/block";
import AuthController from "../../../core/controllers/authContorller";
import ChatController from "../../../core/controllers/chatController";
import { store } from "../../../core/store";
import connect, { Indexed } from "../../../core/store/connect";
import renderDOM from "../../../core/renderDom";

import Dropdown from "../../ui/dropdown";
import Button from "../../ui/button";
import Avatar from "../../ui/avatar";
import { IconAdd, IconDelete, IconDots } from "../../ui/icon";
import Skeleton from "../../ui/skeleton";
import Image from "../../ui/image";
import Text from "../../ui/text";
import DivBlock from "../../ui/div";
import Modal,  { modalCloseHandler } from "../../ui/modal";
import { Container } from "../../ui/grid";
import Form from "../../ui/form";
import Input from "../../ui/input";
import List from "../../ui/list";

import { API_RESOURCES_PATH } from "../../../utils/constants";
import { formSubmissionsHandler, errorFormNotification } from "../../../utils/formHandler";
import { responseErrorStatusHandling } from "../../../utils/responseErrorStatusHandling";

import { TBlockAttributes } from "../../../../declarations";
import { IUser, IChatUser } from "../../../types";

import template from "./chatHeader.tmpl";
import "./chatHeader.scss";

interface IChatHeader {
    attr?: TBlockAttributes;
    userAvatar: Block;
    userName: string;
    dropdown: Block;
}


const getUserList = () => {
    const { user, activeChatId, activeChatUsers } = store.getState();

    if (user && activeChatId && activeChatUsers) {

        activeChatUsers.sort((a: IChatUser, b: IChatUser) => {
            const loginA = a.login.toUpperCase();
            const loginB = b.login.toUpperCase();
            if (loginA < loginB) return -1;
            if (loginA > loginB) return 1;
            return 0;
        });


        const modal = new Modal({
            id: "chatUserListModal",
            title: "Список пользователей",
            content: new List({
                className: "user-list",
                isFlush: true,
                isFluid: true,
                content: activeChatUsers.map((item: IChatUser) => {
                    return new DivBlock({
                        className: "user-list__info-item",
                        content: new DivBlock({
                            className: "user-block",
                            content: [
                                (item as IChatUser).avatar ? 
                                new Avatar({
                                    content: new Image({
                                        src: API_RESOURCES_PATH + (item as IChatUser).avatar
                                    })
                                }) : new Avatar(),
                                new DivBlock({
                                    className: "user-block__name",
                                    content: new Text({
                                        content: (item as IChatUser).login
                                    })
                                })
                            ]
                        })
                    })
                })
            })
        });

        renderDOM("#modal-root", modal);
        modal.show();
    }
}

const addNewUser = () => {
    const modal = new Modal({
        id: "addNewUserModal",
        title: "Добавление пользователя",
        content: new Container({
            id: "addNewUserContainer",
            isFluid: true,
            content: new Form({
                className: "add-value__form",
                content: [
                    new Container({
                        isFluid: true,
                        className: "add-value__form__input-group",
                        content:  new Input({
                            id: "addNewUser",
                            name: "login",
                            placeholderText: "Логин пользователя"
                        })
                    }),
                    new Button({
                        color: "primary",
                        isFluid: true,
                        size: "lg",
                        content: "Добавить"
                    })
                ],
                events: {
                    submit: (event: Event) => {
                        event.preventDefault();
                        const target = event.target;
                        if (target && target instanceof HTMLFormElement) {
                            const { activeChatId } = store.getState();
                            if (!activeChatId) {
                                errorFormNotification(
                                    ".add-value__form__input-group",
                                    "Выберите чат",
                                )
                            } else {
                                const formData = new FormData(target);
                                const login = formData.get("login") as string;
                                if (login) {
                                    ChatController.addUserToChat(login, activeChatId)
                                    .then((res) => {
                                        if (res) {
                                            if (res.status === 200) {
                                                modalCloseHandler()
                                            }
                                        } else {
                                            const responseErrorStatus = responseErrorStatusHandling(res);
                                            errorFormNotification(
                                                ".add-value__form__input-group",
                                                responseErrorStatus ? responseErrorStatus : "Произошла ошибка, попробуйте еще раз",
                                            )
                                        }
                                    })
                                }
                            }
                        }
                        /*formSubmissionsHandler({
                            event: event,
                            handler: ChatController.addUserToChat,
                            selector: ".add-value__form__input-group",
                            action: () => modalCloseHandler()
                        });*/
                    }
                }
            })
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

const deleteUser = () => {
    const modal = new Modal({
        id: "deleteUserModal",
        title: "Удаление пользователя",
        content: new Container({
            id: "deleteUserContainer",
            isFluid: true,
            content: new Form({
                className: "add-value__form",
                content: [
                    new Container({
                        isFluid: true,
                        className: "add-value__form__input-group",
                        content:  new Input({
                            id: "deleteUser",
                            name: "title",
                            placeholderText: "Логин пользователя"
                        })
                    }),
                    new Button({
                        color: "primary",
                        isFluid: true,
                        size: "lg",
                        content: "Удалить"
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
}

function getUserBlock(state: Indexed) {
    const { user, activeChatId, activeChatUsers } = state;

    if (Object.keys(state).length !== 0 && user && activeChatId && activeChatUsers) {

        let userNumber = 2;
        let userListString = (activeChatUsers as IChatUser[]).slice(0, userNumber).map((item: IChatUser) => {
            return item.login;
        }).join(",");
        let userListAvatar = (activeChatUsers as IChatUser[]).map((item: IChatUser) => {
            return (item as IUser).avatar ? 
            new Avatar({
                content: new Image({
                    src: API_RESOURCES_PATH + (item as IUser).avatar
                })
            }) : new Avatar()
        })

        if ((activeChatUsers as IChatUser[]).length > userNumber) {
            let restUserNumber = (activeChatUsers as IChatUser[]).length - userNumber
            let userMaxNUmber = 99;
            userListString += ` + ${restUserNumber}`;
            userListAvatar = [ new Avatar({
                content: `+${restUserNumber < userMaxNUmber ? restUserNumber: userMaxNUmber}` 
            }), ...userListAvatar];
            
        } 

        return new DivBlock({
            className: "user-group-block",
            content: [
                new DivBlock({
                    className: "avatar-group",
                    content: userListAvatar
                }),
                new DivBlock({
                    className: "user-block__name",
                    content: new Text({
                        content: userListString
                    })
                })
            ],
            events: {
                click: getUserList
            }
        })

        /*return activeChatUsers.map((item: IChatUser) => {
            const chatAvatar = item.avatar ? 
                new Avatar({ 
                    content: new Image({ src: API_RESOURCES_PATH + item.avatar })
                }) : new Avatar();

            const chatLabel = item.unread_count ? 
                new Label({
                    className: "label label-circle label-primary",
                    content: `${item.unread_count}` 
                }) : null

            return new ChatCard({
                chatId: item.id,
                avatar: chatAvatar,
                title: item.title,
                message: item.last_message &&  item.last_message.content ? item.last_message.content : "Нет сообщений",
                datetime: item.last_message && item.last_message.time ? dateConvert(item.last_message.time) : "",
                label: chatLabel,
                isActive: activeChatId && activeChatId === item.id ? true : false,
                events: {
                    click: (event: Event) => {
                        const target = event.currentTarget;
                        if (target && target instanceof HTMLElement) {
                            const activeCard = document.querySelector(".chat-card.active");
                            if (activeCard) {
                                activeCard.classList.remove("active");
                            }
                            target.classList.add("active");
                            const targetId = target.getAttribute("data-chat-id");
                            if (targetId) 
                                ChatController.getChatById(parseInt(targetId));
                        }
                    }
                }
            })
        });*/

        /*return new DivBlock({
            className: "user-block",
            content: [
                (state.user as IUser).avatar ? 
                new Avatar({
                    content: new Image({
                        src: API_RESOURCES_PATH + (state.user as IUser).avatar
                    })
                }) : new Avatar(),
                new DivBlock({
                    className: "user-block__name",
                    content: new Text({
                        content: (state.user as IUser).first_name
                    })
                })
            ]
        });*/
    } else {
        return new DivBlock({
            className: "user-block",
            content: [
                new Skeleton({
                    width: 34,
                    isAnimation: true,
                    isCircle: true
                }),
                new DivBlock({
                    className: "user-block__name-empty",
                    content: new Skeleton({
                        height: "100%",
                        width: 40,
                        isAnimation: true
                    })
                })
            ]
        });
    }
};

class ChatHeader extends Block {
    constructor(props?: IChatHeader) {

        const dropdown = new Dropdown({
            dropdownButtonIsCircle: true,
            dropdownButtonContent: new IconDots(),
            dropdownMenuContent: new DivBlock({
                className: "dropdown-menu__content",
                content: [
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconAdd({ color: "primary" }),
                            new Text({
                                content: "Добавить пользователя"
                            })
                        ],
                        events: {
                            click: addNewUser
                        }
                    }),
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconDelete({ color: "primary" }),
                            new Text({
                                content: "Удалить пользователя"
                            })
                        ],
                        events: {
                            click: getUserList
                        }
                    }),
                ]
            })
        })

        super({ ...props, dropdown });
    }
    
    render() {
        return this.compile(template, this.props);
    }
}

const withPage = connect((state) => ({
    userBlock: getUserBlock(state)
}));

const ChatHeaderSection = withPage(ChatHeader);

export default ChatHeaderSection
