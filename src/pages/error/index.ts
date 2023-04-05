// Core
import Block from "@core/block";
// Components
import Link from "@components/ui/link";
// Utils
import { ROUTES } from "@utils/constants";
// Template
import template from "./error.tmpl";

interface IErrorPage {
    title: string;
    text: string;
    link: Block;
}

export class NotFoundErrorPage extends Block {
    constructor(props: IErrorPage) {

        const title = "404";
        const text = "Не туда попали";
        const link = new Link({
            href: ROUTES.home.path,
            content: "Назад к чатам"
        });

        super({ ...props, title, text, link })
    }

    render() {
        return this.compile(template, this.props);
    }
}

export class ServerErrorPage extends Block {
    constructor(props: IErrorPage) {

        const title = "500";
        const text = "Мы уже фиксим";
        const link = new Link({
            href: ROUTES.home.path,
            content: "Назад к чатам"
        });

        super({ ...props, title, text, link })
    }

    render() {
        return this.compile(template, this.props);
    }
}
