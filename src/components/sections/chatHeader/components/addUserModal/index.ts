// Core
import { store } from "@core/store";
import { renderDOM } from "@core/renderDom";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Grid } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Form } from "@components/ui/form";
import { IconAddUser, IconSuccess } from "@components/ui/icon";
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

const addUser = (event: Event, item: IChatUser) => {
    const { activeChat } = store.getState()
    if (activeChat.users.length < 10) {
        ChatController.addUserToChat(item.id, activeChat.id)
        .then((res) => {
            if (res) {
                if (res.status === 200) {
                    const target = event.target;
                    if (target) {
                        const listItem = (target as HTMLElement).closest('.list-item');
                        const infoItem = (target as HTMLElement).closest('.user-list__info-item__addition');
                        if (listItem && infoItem) {
                            const infoItemSuccess = new DivBlock({
                                className: "user-list__info-item__addition",
                                content: new IconSuccess({
                                    size: "m",
                                    color: "success"
                                })
                            }).getContent();
                            infoItem.replaceWith(infoItemSuccess);
                        }
                    }
                }
            } else {
                formResponseErrorNotification(res, ".user-list", "Произошла ошибка, попробуйте еще раз")
            }
        })
    } else {
        textNotification(".user-list", "В чат нельзя добавить больше 10 пользователей")
    }
};

const infoItemAdditionIcon = (chatUserEntries: boolean, item: IChatUser) => {
    return chatUserEntries ? new DivBlock({
        className: "user-list__info-item__addition",
        content: new IconSuccess({
            size: "m",
            color: "success"
        })
    }) : new DivBlock({
        className: "user-list__info-item__addition action-item",
        content: new IconAddUser({
            size: "m"
        }),
        events: {
            click: (event: Event) => addUser(event, item)
        }
    })
}

const getFoundUserList = (foundUsers: IUser[]) => {

    const { user, activeChat } = store.getState();

    let foundUserList = new DivBlock({
        className: "user-list-empty",
        content: "Пользователь не найден"
    })

    if (!user || !activeChat)
        return;

    if (foundUsers.length > 0) {
        sortChatUsersByLogin(foundUsers as IUser[]);
        
        foundUserList = new Grid.Container({
            isFluid: true,
            content: [
                new Grid.Container({
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
                new Grid.Container({
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

                            return new DivBlock({
                                className: "user-list__info-item",
                                content: [ ...userListInfoItem, infoItemAdditionIcon(chatUserEntries, item) ]
                            })
                        })
                    })
                })
            ]
        });
    }
    renderDOM("#foundUserList", foundUserList);
}

const searchUser = (event: Event) => {
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
};

export const AddUserModal = () => {
    const modal = new Modal({
        id: "addNewUserModal",
        title: "Добавление пользователя",
        content: new Grid.Container({
            id: "addNewUserContainer",
            isFluid: true,
            content: [
                new Form({
                    className: "add-value__form",
                    content: [
                        new Grid.Container({
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
                        submit: searchUser
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
