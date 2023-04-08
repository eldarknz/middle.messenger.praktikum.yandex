// Core
import { Block } from "@core/block";
// Components
import { Button } from "@components/ui/button";
import { Logo } from "@components/ui/logo";
// Utils
import { ROUTES } from "@utils/constants";
// Template
import template from "./mainHeader.tmpl";
// Styles
import "./mainHeader.scss";

export class MainHeader extends Block {
    constructor(props?: {}) {

        const logoLink = new Logo({
            style: "white"
        });

        const siginLink = new Button({
            color: "light",
            shape: "rounded",
            view: "link",
            content: "Войти",
            events: {
                click: () => { window.router.go(ROUTES.login.path); }
            }
        });

        const signupLink = new Button({
            color: "primary",
            shape: "rounded",
            content: "Регистрация",
            events: {
                click: () => { window.router.go(ROUTES.register.path); }
            }
        });

        super({ ...props, logoLink, siginLink, signupLink });
    }

    render() {
        return this.compile(template, this.props);
    }
}
