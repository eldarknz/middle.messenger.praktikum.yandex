// Core
import { Block } from "@core/block";
// Components
import { Link } from "@components/ui/link";
// Utils
import { AppRouter } from "src";
// Template
import template from "./error.tmpl";
// Styles
import "./styles.scss";

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
            content: "Вернуться назад",
            events: {
                click: () => { AppRouter.back(); }
            }
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
            content: "Вернуться назад",
            events: {
                click: () => { AppRouter.back(); }
            }
        });

        super({ ...props, title, text, link })
    }

    render() {
        return this.compile(template, this.props);
    }
}
