// Core
import { store } from "@core/store";
import { renderDOM } from "@core/renderDom";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Container, Row } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Form } from "@components/ui/form";
import { IconAddUser, IconPhoto } from "@components/ui/icon";
import { Image } from "@components/ui/image";
import { InputFile } from "@components/ui/inputFile";
import { List } from "@components/ui/list";
import { Modal } from "@components/ui/modal";
import { Text } from "@components/ui/text";
import { AddUserModal } from "../addUserModal";
import { ChatInfoBlock } from "../chatInfoBlock";
// Utils
import { formResponseErrorNotification } from "@utils/formHandler";
import { sortChatUsersByLogin } from "@utils/sortChatUsersByLogin";
import { API_RESOURCES_PATH } from "@utils/constants";
// Types
import { IChatUser, TChatItem } from "@custom_types/index";

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
                                        const { chats, activeChat } = store.getState();
                                        ChatInfo(chats, activeChat)
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

export const ChatInfo = (chats: TChatItem[], activeChat: { users: IChatUser[], id: number }) => {

    if (!chats || !activeChat)
        return;

    const activeChatUsers = activeChat.users;
    const activeChatId = activeChat.id;

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
                        ChatInfoBlock(chats, activeChat)
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
                                    click: AddUserModal
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
}
