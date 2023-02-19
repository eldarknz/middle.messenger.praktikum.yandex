import Block from "../../../core/block";
import template from "./passwordEdit.tmpl";
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
import { IUser } from "../../../types";
import "../styles.scss";

interface IPasswordEdit {
    buttonBack: Block;
    userAvatar: Block;
    userName: string;
    oldPasswordInput: Block;
    newPasswordInput: Block;
    passwordConfirmInput: Block;
    buttonSubmit: Block;
    events: { submit: (e: Event) => void };
}

const passwordFields: { [key: string]: string } = {
    new_password: "Новый пароль",
    password: "Пароль",
    confirm_password: "Пароль (еще раз)"
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
    console.log("IS_EMPTY: ", Object.keys(state).length === 0);
    if (Object.keys(state).length === 0) {
        return new Container({
            isFluid: true,
            className: "profile-container__form__input-group",
            content: Object.keys(passwordFields).map(() => {
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
                    content: Object.keys(passwordFields).map((key: Key) => {
                        const title = passwordFields[key];
                        const value = state.user?.[key] ? `${state.user?.[key]}` : "";
                        return new Input({
                            id: key,
                            type: "password",
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
                submit: formSubmissionsHandler(UserController.changeUserPassword)
            }
        });
    }
};

class PasswordEdit extends Block {
    constructor(props: IPasswordEdit) {

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
        return this.compile(template, this.props)
    }
};

const withPage = connect((state) => ({
    userAvatar: getUserAvatar(state),
    userName: getUserName(state),
    form: getForm(state)
}));

const PasswordEditPage = withPage(PasswordEdit);

export default PasswordEditPage
