// Core
import { Block } from "@core/block";
import { Router } from "@core/router";
import { TState } from "@core/store";
import { connect } from "@core/store/connect";
import { AuthController } from "@core/controllers/authContorller";
import { UserController } from "@core/controllers/userController";
// Components
import { Grid } from "@components/ui/grid";
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
import { AppRouter } from "../../../../src/index";
// Template
import template from "./profileEdit.tmpl";
// Styles
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

const getForm = (state: TState) => {
    if (Object.keys(state).length === 0) {
        return new Grid.Container({
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
                new Grid.Container({
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
                    formDataSubmissionsHandler({
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
            shape: "circle",
            content: new IconArrowLeft({}),
            events: {
                click: () => { AppRouter.go(ROUTES.profile.path); }
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
    userAvatar: ProfileUserAvatar(state),
    userName: ProfileUserName(state),
    form: getForm(state)
}));

export const ProfileEditPage = withPage(ProfileEdit);
