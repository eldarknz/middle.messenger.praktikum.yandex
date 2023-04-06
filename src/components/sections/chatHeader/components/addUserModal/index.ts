// Core
import { store } from "@core/store";
import { renderDOM } from "@core/renderDom";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Container } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Form } from "@components/ui/form";
import { IconAddUser } from "@components/ui/icon";
import { Image } from "@components/ui/image";
import { Input } from "@components/ui/input";
import { List } from "@components/ui/list";
import { Modal } from "@components/ui/modal";
import { Text } from "@components/ui/text";
// Utils
import { formResponseErrorNotification, textNotification } from "@utils/formHandler";
import { sortChatUsersByLogin } from "@utils/sortChatUsersByLogin";
import { API_RESOURCES_PATH } from "@utils/constants";
// Types
import { IUser, IChatUser } from "@custom_types/index";

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

export const AddUserModal = () => {
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
