// Core
import { Block } from "@core/block";
import { renderDOM } from "@core/renderDom";
import { store } from "@core/store";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Container, Row } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Dropdown } from "@components/ui/dropdown";
import { Form } from "@components/ui/form";
import { IconAdd, IconAddUser, IconDelete, IconDots, IconPhoto, IconTrash } from "@components/ui/icon";
import { Image } from "@components/ui/image";
import { Input } from "@components/ui/input";
import { InputFile } from "@components/ui/inputFile";
import { List } from "@components/ui/list";
import { Modal, modalCloseHandler } from "@components/ui/modal";
import { Skeleton } from "@components/ui/skeleton";
import { Text } from "@components/ui/text";
// Utils
import { API_RESOURCES_PATH } from "@utils/constants";
import { formResponseErrorNotification, textNotification } from "@utils/formHandler";
// Types
import { IUser, IChatUser, TChatItem } from "@custom_types/index";
// Template
import template from "./chatHeader.tmpl";
// Styles
import "./chatHeader.scss";

interface IChatHeader {
    state: Indexed;
}

const sortChatUsersByLogin = (activeChatUsers: IChatUser[] | IUser[]) => {
    activeChatUsers.sort((a: IChatUser, b: IChatUser) => {
        const loginA = a.login.toUpperCase();
        const loginB = b.login.toUpperCase();
        if (loginA < loginB) return -1;
        if (loginA > loginB) return 1;
        return 0;
    });
}

const getFoundUserList = (foundUsers: IUser[]) => {

    const state = store.getState()
    const user = state.user as IUser[];
    const activeChat = state.activeChat as { users: IChatUser[], id: number };

    let foundUserList = new DivBlock({
        className: "user-list-empty",
        content: "Пользователь не найден"
    })

    if (!user && !activeChat)
        return;

    if (foundUsers.length > 0) {

        sortChatUsersByLogin(foundUsers as IUser[]);
        
        foundUserList = new Container({
            isFluid: true,
            content: [
                new Container({
                    isFluid: true,
                    content: new DivBlock({
                        className: "user-list__header",
                        content: [
                            new DivBlock({
                                className: "user-list__header__title",
                                content: "Список пользователей"
                            })
                        ]
                    })
                }),
                new Container({
                    isFluid: true,
                    content: new List({
                        className: "user-list",
                        isFlush: true,
                        isFluid: true,
                        content: foundUsers.map((item: IChatUser) => {

                            let userListInfoItem = [
                                new DivBlock({
                                    className: "user-block",
                                    content: [
                                        item.avatar ? 
                                        new Avatar({
                                            content: new Image({
                                                src: API_RESOURCES_PATH + item.avatar
                                            })
                                        }) : new Avatar(),
                                        new DivBlock({
                                            className: "user-block__name",
                                            content: new Text({
                                                content: item.login
                                            })
                                        })
                                    ]
                                }),
                            ];

                            const chatUserEntries = activeChat.users.find((activeChatUser: IChatUser) => activeChatUser.id === item.id);
                            if (!chatUserEntries) {
                                userListInfoItem.push(new DivBlock({
                                    className: "user-list__info-item__addition action-item",
                                    content: new IconAddUser({
                                        size: "m"
                                    }),
                                    events: {
                                        click: (event) => {
                                            const { activeChat } = store.getState()
                                            if (activeChat.users.length < 10) {
                                                ChatController.addUserToChat(item.id, activeChat.id)
                                                .then((res) => {
                                                    if (res) {
                                                        if (res.status === 200) {
                                                            const target = event.target;
                                                            if (target) {
                                                                const parentNode = (target as HTMLElement).closest('.user-list__info-item__addition');
                                                                if (parentNode) parentNode.remove()
                                                            }
                                                        }
                                                    } else {
                                                        formResponseErrorNotification(res, ".user-list", "Произошла ошибка, попробуйте еще раз")
                                                    }
                                                })
                                            } else {
                                                textNotification(".user-list", "В чат нельзя добавить больше 10 пользователей")
                                            }
                                        }
                                    }
                                }))
                            }
                            
                            return new DivBlock({
                                className: "user-list__info-item",
                                content: userListInfoItem
                            })
                        })
                    })
                })
            ]
        });
    }
    renderDOM("#foundUserList", foundUserList);
}

const addNewUser = () => {
    const modal = new Modal({
        id: "addNewUserModal",
        title: "Добавление пользователя",
        content: new Container({
            id: "addNewUserContainer",
            isFluid: true,
            content: [
                new Form({
                    className: "add-value__form",
                    content: [
                        new Container({
                            isFluid: true,
                            className: "add-value__form__input-group",
                            content:  new Input({
                                id: "addNewUser",
                                name: "login",
                                placeholderText: "Логин пользователя",
                            })
                        }),
                        new Button({
                            color: "primary",
                            isFluid: true,
                            size: "lg",
                            content: "Найти"
                        })
                    ],
                    events: {
                        submit: (event: Event) => {
                            event.preventDefault();
                            const target = event.target;
                            if (target && target instanceof HTMLFormElement) {
                                const formData = new FormData(target);
                                const login = formData.get("login") as string;
                                if (login) {
                                    ChatController.getUsersByLogin(login)
                                    .then((res) => {
                                        if (res) {
                                            if (res.status === 200) {
                                                const foundUserList = document.querySelector("#foundUserList");
                                                if (foundUserList && foundUserList.innerHTML.trim() !== "") {
                                                    foundUserList.innerHTML = "";
                                                }
                                                getFoundUserList(res.response);
                                            }
                                        } else {
                                            formResponseErrorNotification(res, ".add-value__form__input-group", "Произошла ошибка, попробуйте еще раз");
                                        }
                                    })
                                }
                            }
                        }
                    }
                }),
                new DivBlock({
                    id: "foundUserList",
                    content: ""
                })
            ]
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

const uploadChatAvatar = (activeChatId: number) => {
    const modal = new Modal({
        id: "changeAvatar",
        title: "Загрузка файла",
        content: new Container({
            id: "changeAvatarContainer",
            isFluid: true,
            content: new Form({
                className: "change-avatar__form",
                content: [
                    new Container({
                        isFluid: true,
                        className: "change-avatar__form__input-group",
                        content: new InputFile({
                            id: "avatar",
                            name: "avatar",
                            placeholderText: "Выберите файл",
                            isAcceptImage: true
                        })
                    }),
                    new Button({
                        color: "primary",
                        isFluid: true,
                        size: "lg",
                        content: "Поменять"
                    })
                ],
                events: {
                    submit: (event: Event) => {
                        event.preventDefault();
                        const target = event.target;
                        if (target && target instanceof HTMLFormElement) {
                            if (activeChatId) {
                                const formData = new FormData(target);
                                formData.set("chatId", `${activeChatId}`)
                                ChatController.uploadChatAvatar(formData)
                                .then((res) => {
                                    if (res && res.status === 200) {
                                        getChatInfo(store.getState())
                                    } else {
                                        formResponseErrorNotification(res, ".change-avatar__form__input-group", "Произошла ошибка, попробуйте еще раз");
                                    }
                                })
                            }
                        }
                    }
                    
                }
            })
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

const getParticipantsCount = (users: IChatUser[]) => {  
    const userCount = users.length;
    if (userCount.toString().slice(-1) === "1") {
        return `${userCount} участник`
    } else if (userCount.toString().slice(-1) === "2" || userCount.toString().slice(-1) === "3" || userCount.toString().slice(-1) === "4") {
        return `${userCount} участника`
    } else {
        return `${userCount} участников`
    }
};

const getChatName = (chat: TChatItem[], activeChatId: number) => {
    const chatName = chat.find(item => item.id === activeChatId);
    return chatName ? chatName.title : "Без названия";
};

const getChatAvatar = (chat: TChatItem[], activeChatId: number) => {
    const selectedChat = chat.find((item) => {
        if (item.id === activeChatId) {
            return item.avatar
        }
    });

    return selectedChat ? new Avatar({
        size: "m",
        content: new Image({
            src: API_RESOURCES_PATH + selectedChat.avatar
        })
    }) : new Avatar({ size: "m" });
};

const getChatInfo = (state: Indexed) => {

    const user = state.user as IUser;
    const chats = state.chats as TChatItem[];
    const activeChat = state.activeChat as { users: IChatUser[], id: number };
    const activeChatId = activeChat.id;
    const activeChatUsers = activeChat.users;

    sortChatUsersByLogin(activeChatUsers);

    const modal = new Modal({
        id: "chatInfoModal",
        title: "Информация о чате",
        content: new Container({
            id: "chatInfoContainer",
            isFluid: true,
            content: [
                new Row({
                    alignItems: "center",
                    content: [
                        new DivBlock({
                            className: "chat-avatar",
                            content: [
                                getChatAvatar(chats, activeChatId),
                                new DivBlock({
                                    className: "chat-avatar__overlay",
                                    content: new IconPhoto({
                                        color: "white",
                                        size: "m"
                                    }),
                                    events: {
                                        click: () => uploadChatAvatar(activeChatId)
                                    }
                                })
                            ]
                        }),
                        new DivBlock({
                            className: "chat-info",
                            content: [
                                new DivBlock({
                                    className: "chat-info__title",
                                    content: new Text({
                                        content: getChatName(chats, activeChatId)
                                    })
                                }),
                                new DivBlock({
                                    className: "chat-info__subtitle text-dark",
                                    content: new Text({
                                        content: getParticipantsCount(activeChatUsers)
                                    })
                                })
                            ],
                        })
                    ]
                }),
                new Row({
                    content: new DivBlock({
                        className: "user-list__header",
                        content: [
                            new DivBlock({
                                className: "user-list__header__title",
                                content: "Список пользователей"
                            }),
                            new DivBlock({
                                className: "user-list__header__add-user",
                                content: new IconAddUser({
                                    size: "lg"
                                }),
                                events: {
                                    click: addNewUser
                                }
                            }),
                        ]
                    })
                }),
                new Row({
                    content: new List({
                        className: "user-list",
                        isFlush: true,
                        isFluid: true,
                        content: activeChatUsers.map((item: IChatUser) => {

                            let userListInfoItem = [
                                new DivBlock({
                                    className: "user-block",
                                    content: [
                                        item.avatar ? 
                                        new Avatar({
                                            content: new Image({
                                                src: API_RESOURCES_PATH + item.avatar
                                            })
                                        }) : new Avatar(),
                                        new DivBlock({
                                            className: "user-block__name",
                                            content: new Text({
                                                content: item.login
                                            })
                                        })
                                    ]
                                }),
                            ];

                            if (item.role === "admin") {
                                userListInfoItem.push(new DivBlock({
                                    className: "user-list__info-item__addition text-dark",
                                    content: "admin"
                                }))
                            }

                            return new DivBlock({
                                className: "user-list__info-item",
                                content: userListInfoItem
                            })
                        })
                    })
                })
            ]
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

const deleteUser = (user: IUser, activeChatUsers: IChatUser[], activeChatId: number) => {

    if (!user || !activeChatUsers || !activeChatId) {
        return;
    }

    sortChatUsersByLogin(activeChatUsers);

    const modal = new Modal({
        id: "chatUserListModal",
        title: "Удалить пользователя",
        content: new Container({
            id: "chatUserListContainer",
            isFluid: true,
            content: [
                new Row({
                    content: new DivBlock({
                        className: "user-list__header",
                        content: [
                            new DivBlock({
                                className: "user-list__header__title",
                                content: "Список пользователей"
                            })
                        ]
                    })
                }),
                new Row({
                    content: new List({
                        className: "user-list",
                        isFlush: true,
                        isFluid: true,
                        content: activeChatUsers.map((item: IChatUser) => {

                            let userListInfoItem = [
                                new DivBlock({
                                    className: "user-block",
                                    content: [
                                        item.avatar ? 
                                        new Avatar({
                                            content: new Image({
                                                src: API_RESOURCES_PATH + item.avatar
                                            })
                                        }) : new Avatar(),
                                        new DivBlock({
                                            className: "user-block__name",
                                            content: new Text({
                                                content: item.login
                                            })
                                        })
                                    ]
                                }),
                            ];

                            if (item.role !== "admin") {
                                userListInfoItem.push(new DivBlock({
                                    className: "user-list__info-item__addition action-item",
                                    content: new IconDelete({
                                        size: "m",
                                        color: "secondary"
                                    }),
                                    events: {
                                        click: (event) => {
                                            let confirmDelete  = confirm("Вы уверены, что хотите удалить пользователя из чата?");
                                            if (confirmDelete) {
                                                ChatController.deleteUserfromChat(item.id, activeChatId)
                                                .then((res) => {
                                                    if (res) {
                                                        if (res.status === 200) {
                                                            const target = event.target;
                                                            if (target) {
                                                                const parentNode = (target as HTMLElement).closest('.list-item');
                                                                if (parentNode) parentNode.remove()
                                                            }
                                                        }
                                                    } else {
                                                        formResponseErrorNotification(res, ".modal-container__content", "Произошла ошибка, попробуйте еще раз");
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }))
                            } else {
                                userListInfoItem.push(new DivBlock({
                                    className: "user-list__info-item__addition text-dark",
                                    content: "admin"
                                }))
                            }

                            return new DivBlock({
                                className: "user-list__info-item",
                                content: userListInfoItem
                            })
                        })
                    })
                })
            ]
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

const deleteChat = (activeChatId: number, ws: WebSocket) => {
    if (activeChatId) {
        let confirmDelete  = confirm("Вы уверены, что хотите удалить чат?");
        if (confirmDelete) {
            ChatController.deleteChat(activeChatId, ws)
            .then((res) => {
                if (res) {
                    modalCloseHandler();
                } else {
                    formResponseErrorNotification(res, ".modal-container__content", "Произошла ошибка, попробуйте еще раз");
                }
            })
        }
    }
};

const getChatBlock = (state: Indexed) => {
    const user = state.user as IUser;
    const chats = state.chats as TChatItem[];
    const activeChat = state.activeChat as { users: IChatUser[], id:  number };

    if (Object.keys(state).length !== 0 && user && chats && activeChat) {

        const activeChatId = activeChat.id;
        const activeChatUsers = activeChat.users;

        return new DivBlock({
            className: "chat-info",
            content: [
                new DivBlock({
                    className: "chat-info__title",
                    content: new Text({
                        content: getChatName(chats, activeChatId)
                    })
                }),
                new DivBlock({
                    className: "chat-info__subtitle text-dark",
                    content: new Text({
                        content: getParticipantsCount(activeChatUsers)
                    })
                })
            ],
            events: {
                click: () => getChatInfo(state)
            }
        });
    } else {
        return new DivBlock({
            className: "chat-info",
            content: [
                new DivBlock({
                    className: "chat-info__text-empty",
                    content: new Skeleton({
                        height: 16,
                        isAnimation: true
                    })
                }),
                new DivBlock({
                    className: "chat-info__text-empty",
                    content: new Skeleton({
                        height: 10,
                        isAnimation: true
                    })
                })
            ]
        });
    }
};

export class ChatHeaderSection extends Block {
    constructor(props: IChatHeader) {

        const state = props.state;
        const user = state.user as IUser;
        const activeChat = state.activeChat as { users: IChatUser[], id: number };
        const activeChatId = activeChat.id as number;
        const activeChatUsers = activeChat.users as IChatUser[];
        const ws = state.ws as WebSocket;

        const dropdown = new Dropdown({
            dropdownButtonIsCircle: true,
            dropdownButtonContent: new IconDots({ size: "m" }),
            dropdownMenuContent: new DivBlock({
                className: "dropdown-menu__content",
                content: [
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconAdd({
                                color: "primary",
                                size: "m"
                            }),
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
                            new IconDelete({
                                color: "primary",
                                size: "m"
                            }),
                            new Text({
                                content: "Удалить пользователя"
                            })
                        ],
                        events: {
                            click: () => deleteUser(user, activeChatUsers, activeChatId)
                        }
                    }),
                    new DivBlock({
                        className: "dropdown-item",
                        content: [
                            new IconTrash({ 
                                color: "secondary",
                                size: "m"
                            }),
                            new Text({
                                content: "Удалить чат"
                            })
                        ],
                        events: {
                            click: () => deleteChat(activeChatId, ws)
                        }
                    }),
                ]
            })
        })

        const chatInfoBlock = getChatBlock(state)

        super({ ...props, dropdown, chatInfoBlock });
    }
    
    render() {
        return this.compile(template, this.props);
    }
}
