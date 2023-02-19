import Block from "../../core/block";
import template from "./profile.tmpl";
import renderDOM from "../../core/renderDom";
import Avatar from "../../components/ui/avatar";
import Button from "../../components/ui/button";
import Link from "../../components/ui/link";
import List from "../../components/ui/list";
import Modal, { modalCloseHandler } from "../../components/ui/modal";
import { IconArrowLeft, IconMedia } from "../../components/ui/icon";
import DivBlock from "../../components/ui/div";
import Form from "../../components/ui/form";
import { Container } from "../../components/ui/grid";
import InputFile from "../../components/ui/inputFile";
import Text from "../../components/ui/text";
import { Skeleton } from "../../components/ui/skeleton";
import Image from "../../components/ui/image";
import AuthController from "../../core/controllers/authContorller";
import UserController from "../../core/controllers/userController";
import connect, { Indexed } from "../../core/store/connect";
import { IUser } from "../../types";
import { responseErrorStatusHandling } from "../../utils/responseErrorStatusHandling";
import { API_RESOURCES_PATH, ROUTES } from "../../utils/constants";

import "./styles.scss";

const profileFields: { [key: string]: string } = {
    email: "Почта",
    login: "Логин",
    first_name: "Имя",
    second_name: "Фамилия",
    display_name: "Имя в чате",
    phone: "Телефон"
};

interface IProfile {
    buttonBack: Block;
    userAvatar?: Block;
    userName: string;
    userDataList: Block;
    profileEdit: Block;
    passwordEdit: Block;
    logout: Block;
}

const changeAvatar = () => {
    const modal = new Modal({
        id: "changeAvatar",
        title: "Загрузка файла",
        content: new Container({
            id: "changeAvatarContainer",
            isFluid: true,
            content: new Form({
                className: "change-avatar__form",
                content: [
                    new InputFile({
                        id: "avatar",
                        name: "avatar",
                        placeholderText: "Выберите файл",
                        isAcceptImage: true
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
                            //const input = document.getElementById("avatar") as HTMLInputElement;
                            //const file = input.files![0];
                            const formData = new FormData(target);
                            //formData.append("avatar", file);
                            console.log(formData);
                            UserController.changeAvatar(formData).then((res) => {
                                console.log(res);
                                if (res) {
                                    if (res.status === 200) {
                                        modalCloseHandler();
                                    } else {
                                        const container = document.getElementById("changeAvatarContainer");
                                        if (container) {
                                            let text = container.querySelector(".text-error");
                                            if (!text) {
                                                text = document.createElement("p");
                                                text.classList.add("text-error");
                                                container.appendChild(text);
                                            }
                                            const responseErrorStatus = responseErrorStatusHandling(res);
                                            if (responseErrorStatus) {
                                                text.innerHTML = responseErrorStatus;
                                            }
                                        }
                                    }
                                }                  
                            });
                        }
                    }
                }
            })
        })
    });

    renderDOM("#modal-root", modal);
    modal.show();
};

const getUserAvatar = (state: Indexed) => {
    if (Object.keys(state).length !== 0) {
        if ((state.user as IUser).avatar != null) {
            return new Avatar({
                size: "lg",
                content: new Image({
                    src: API_RESOURCES_PATH + (state.user as IUser).avatar
                })
            });
        } else {
            return new Avatar({
                size: "lg",
                content: new IconMedia({
                    color: "white",
                    size: "xxl",
                })
            });
        }
    } else {
        return new Skeleton({
            width: 130,
            isAnimation: true,
            isCircle: true
        });
    }
}

const getUserName = (state: Indexed) => {
    if (Object.keys(state).length !== 0) {
        return new Text({
            content: (state.user as IUser).first_name
        });
    } else {
        return new Skeleton({
            height: 20,
            isAnimation: true
        });
    }
}

const getUserDataList = (state: Indexed) => {
    console.log("IS_EMPTY: ", Object.keys(state).length === 0);
    if (Object.keys(state).length === 0) {
        return new Container({
            isFluid: true,
            className: "profile-container__form__input-group",
            content: Object.keys(profileFields).map(() => {
                return new Skeleton({
                    height: 30,
                    isAnimation: true
                });
            })
        });
    } else {
        return new List({
            isFlush: true,
            isFluid: true,
            content: Object.keys(profileFields).map((key: Key) => {
                const title = profileFields[key];
                const value = state.user?.[key] ? state.user?.[key] : "-";
                return new DivBlock({
                    className: "info-item",
                    content: `<span class="info-item__title">${title}</span><span class="info-item__value">${value}</span>`
                })
            })
        });
    }
};

class Profile extends Block {
    constructor(props: IProfile) {

        const buttonBack = new Button({
            color: "primary",
            isCircle: true,
            content: new IconArrowLeft({}),
            events: {
                click: () => { window.router.go(ROUTES.chat.path); }
            }
        });

        const userAvatarOverlay = new DivBlock({
            className: "user-avatar__overlay",
            content: "<p>Поменять</p><p>аватар</p>",
            events: {
                click: changeAvatar
            }
        })

        const profileActions = new List({
            isFlush: true,
            isFluid: true,
            content: [
                new Link({
                    href: ROUTES.profileEdit.path,
                    content: "Изменить данные"
                }),
                new Link({
                    href: ROUTES.passwordEdit.path,
                    content: "Изменить пароль"
                }),
                new Link({
                    className: "link-red",
                    content: "Выйти",
                    events: {
                        click: async (e: Event) => {
                            await AuthController.logout();
                            e.preventDefault();
                        }
                      },
                })
            ]
        });

        super({ ...props, buttonBack, userAvatarOverlay, profileActions });

        AuthController.getUserInfo();
    }
    
    render() {
        return this.compile(template, this.props);
    }
};

const withPage = connect((state) => ({
    userAvatar: getUserAvatar(state),
    userName: getUserName(state),
    userDataList: getUserDataList(state)
}));

const ProfilePage = withPage(Profile);

export default ProfilePage
