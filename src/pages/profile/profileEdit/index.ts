import Block from "../../../core/block";
import template from "./profileEdit.tmpl";
import Avatar from "../../../components/ui/avatar";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Form from "../../../components/ui/form";
import { Container } from "../../../components/ui/grid";
import { IconArrowLeft, IconMedia } from "../../../components/ui/icon";
import { Skeleton } from "../../../components/ui/skeleton";
import Text from "../../../components/ui/text";
import Image from "../../../components/ui/image";
import { validateInput } from "../../../utils/validation";
import { formSubmissionsHandler } from "../../../utils/formHandler";
import { API_RESOURCES_PATH, ROUTES } from "../../../utils/constants";
import AuthController from "../../../core/controllers/authContorller";
import UserController from "../../../core/controllers/userController";
import { inputValueHandler } from "../../../utils/inputValueHandler";
import connect, { Indexed } from "../../../core/store/connect";
import Router from "../../../core/router";
import { IUser } from "../../../types";
import "../styles.scss";

interface IProfileEdit {
    buttonBack: Block;
    userAvatar: Block;
    userName: string;
    emailInput: Block;
    loginInput: Block;
    firstNameInput: Block;
    secondNameInput: Block;
    chatNameInput: Block;
    phoneInput: Block;
    buttonSubmit: Block;
    events: { submit: (e: Event) => void };
}

const profileFields: { [key: string]: string } = {
    email: "Почта",
    login: "Логин",
    first_name: "Имя",
    second_name: "Фамилия",
    display_name: "Имя в чате",
    phone: "Телефон"
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

const getForm = (state: Indexed) => {
    if (Object.keys(state).length === 0) {
        return new Container({
            isFluid: true,
            className: "profile-container__form__input-group",
            content: Object.keys(profileFields).map(() => {
                return new Skeleton({
                    height: 48,
                    isAnimation: true
                });
            })
        });
    } else {
        return new Form({
            className: "profile-container__form",
            content: [
                new Container({
                    isFluid: true,
                    className: "profile-container__form__input-group",
                    content: Object.keys(profileFields).map((key: Key) => {
                        const title = profileFields[key];
                        const value = state.user?.[key] ? `${state.user?.[key]}` : "";
                        return new Input({
                            id: key,
                            name: key,
                            style: "flush",
                            placeholderText: title,
                            value: value,
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        })
                    })
                }),
                new Button({
                    color: "primary",
                    size: "lg",
                    isFluid: true,
                    content: "Сохранить изменения"
                })
            ],
            events: {
                submit: (event: Event) => {
                    formSubmissionsHandler({
                        event: event,
                        handler: UserController.changeProfile,
                        selector: ".profile-container__form__input-group",
                        isCheckInputs: true,
                        action: () => Router.getInstanse().go(ROUTES.profile.path)
                    });
                }
            }
        });
    }
};

class ProfileEdit extends Block {
    constructor(props: IProfileEdit) {

        const buttonBack = new Button({
            color: "primary",
            isCircle: true,
            content: new IconArrowLeft({}),
            events: {
                click: () => { window.router.go(ROUTES.profile.path); }
            }
        });

        super({ ...props, buttonBack });

        AuthController.getUserInfo();
    }

    render() {
        return this.compile(template, this.props);
    }
};

const withPage = connect((state) => ({
    userAvatar: getUserAvatar(state),
    userName: getUserName(state),
    form: getForm(state)
}));

const ProfileEditPage = withPage(ProfileEdit);

export default ProfileEditPage
