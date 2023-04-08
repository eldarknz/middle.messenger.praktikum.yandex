// Core
import { renderDOM } from "@core/renderDom";
import { ChatController } from "@core/controllers/chatController";
// Components
import { Avatar } from "@components/ui/avatar";
import { Grid } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { IconDelete } from "@components/ui/icon";
import { Image } from "@components/ui/image";
import { List } from "@components/ui/list";
import { Modal } from "@components/ui/modal";
import { Text } from "@components/ui/text";
// Utils
import { formResponseErrorNotification } from "@utils/formHandler";
import { sortChatUsersByLogin } from "@utils/sortChatUsersByLogin";
import { API_RESOURCES_PATH } from "@utils/constants";
// Types
import { IUser, IChatUser } from "@custom_types/index";

export const DeleteUserModal = (user: IUser, activeChatUsers: IChatUser[], activeChatId: number) => {

    if (!user || !activeChatUsers || !activeChatId)
        return;

    sortChatUsersByLogin(activeChatUsers);

    const modal = new Modal({
        id: "chatUserListModal",
        title: "Удалить пользователя",
        content: new Grid.Container({
            id: "chatUserListContainer",
            isFluid: true,
            content: [
                new Grid.Row({
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
                new Grid.Row({
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
