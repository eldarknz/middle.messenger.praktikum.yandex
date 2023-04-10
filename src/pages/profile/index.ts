// Core
import { Block } from "@core/block";
import { renderDOM } from "@core/renderDom";
import { TState } from "@core/store";
import { connect } from "@core/store/connect";
import { AuthController } from "@core/controllers/authContorller";
import { UserController } from "@core/controllers/userController";
// Components
import { Button } from "@components/ui/button";
import { Grid } from "@components/ui/grid";
import { DivBlock } from "@components/ui/div";
import { Form } from "@components/ui/form";
import { IconArrowLeft, IconPhoto } from "@components/ui/icon";
import { InputFile } from "@components/ui/inputFile";
import { Link } from "@components/ui/link";
import { List } from "@components/ui/list";
import { Modal, modalCloseHandler } from "@components/ui/modal";
import { Skeleton } from "@components/ui/skeleton";
import { ProfileUserAvatar } from "@components/sections/profileUserAvatar/profileUserAvatar";
import { ProfileUserName } from "@components/sections/profileUserName/profileUserName";
// Utils
import { formDataSubmissionsHandler } from "@utils/formHandler";
import { ROUTES } from "@utils/constants";
import { AppRouter } from "src";
// Template
import template from "./profile.tmpl";
// Styles
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
        content: new Grid.Container({
            id: "changeAvatarContainer",
            isFluid: true,
            content: new Form({
                className: "change-avatar__form",
                content: [
                    new Grid.Container({
                        isFluid: true,
                        className: "change-avatar__form__input-group",
                        content:  new InputFile({
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
                        formDataSubmissionsHandler({
                            event: event,
                            handler: UserController.changeAvatar,
                            selector: ".change-avatar__form__input-group",
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

const getUserDataList = (state: TState) => {
    if (Object.keys(state).length !== 0 && state.user) {
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
    } else {
        return new Grid.Container({
            isFluid: true,
            className: "profile-container__form__input-group",
            content: Object.keys(profileFields).map(() => {
                return new Skeleton({
                    height: 30,
                    isAnimation: true
                });
            })
        });
    }
};

class Profile extends Block {
    constructor(props: IProfile) {

        const buttonBack = new Button({
            color: "primary",
            shape: "circle",
            content: new IconArrowLeft({}),
            events: {
                click: () => { AppRouter.go(ROUTES.chat.path); }
            }
        });

        const userAvatarOverlay = new DivBlock({
            className: "user-avatar__overlay",
            content: new IconPhoto({
                color: "white",
                size: "xxl"
            }),
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
                            e.preventDefault();
                            await AuthController.logout();
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
    userAvatar: ProfileUserAvatar(state),
    userName: ProfileUserName(state),
    userDataList: getUserDataList(state)
}));

export const ProfilePage = withPage(Profile);
