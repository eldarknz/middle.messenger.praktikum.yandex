// Core
import { Block } from "@core/block";
import { Router } from "@core/router";
import { connect } from "@core/store/connect";
import { AuthController } from "@core/controllers/authContorller";
import { UserController } from "@core/controllers/userController";
// Components
import { Container } from "@components/ui/grid";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { IconArrowLeft } from "@components/ui/icon";
import { Skeleton } from "@components/ui/skeleton";
import { ProfileUserAvatar } from "@components/sections/profileUserAvatar/profileUserAvatar";
import { ProfileUserName } from "@components/sections/profileUserName/profileUserName";
// Utils
import { formDataSubmissionsHandler } from "@utils/formHandler";
import { validateInput } from "@utils/validation";
import { inputValueHandler } from "@utils/inputValueHandler";
import { ROUTES } from "@utils/constants";
// Template
import template from "./passwordEdit.tmpl";
// Styles
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

const getForm = (state: Indexed) => {
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
                submit: (event: Event) => {
                    formDataSubmissionsHandler({
                        event: event,
                        handler: UserController.changeUserPassword,
                        selector: ".profile-container__form__input-group",
                        isCheckInputs: true,
                        action: () => Router.getInstanse().go(ROUTES.profile.path)
                    });
                }
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
    userAvatar: ProfileUserAvatar(state),
    userName: ProfileUserName(state),
    form: getForm(state)
}));

export const PasswordEditPage = withPage(PasswordEdit);
