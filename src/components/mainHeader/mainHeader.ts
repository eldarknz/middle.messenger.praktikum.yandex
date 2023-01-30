import Block from "../../core/block";
import template from "./mainHeader.tmpl";
import Link from "../ui/link";
import Button from "../ui/button";
import { ROUTES } from "../../utils/constants";
import { TBlockAttributes } from "../../../declarations";
import { routerGo } from "../ui/link";
import "./mainHeader.scss";

interface IMainHeader {
    attr?: TBlockAttributes;
    logoLink: Block;
    nav?: Block;
    siginLink: Block;
    signupLink: Block;
}

export class MainHeader extends Block {
    constructor(props: IMainHeader) {
        super(props);
    }

    render() {
        return this.compile(template, {
            logoLink: this.props.logoLink,
            buttonSigin: this.props.buttonSigin  
        });
    }
}

const MainHeaderBlock = new MainHeader({
    logoLink: new Link({
        href: ROUTES.home.path
    }),
    siginLink: new Button({
        color: "light",
        isLink: true,
        isRound: true,
        content: "Войти",
        events: {
            click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.login.path)
        }
    }),
    signupLink: new Button({
        color: "primary",
        isRound: true,
        content: "Регистрация",
        events: {
            click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.register.path)
        }
    }),
})

export default MainHeaderBlock
