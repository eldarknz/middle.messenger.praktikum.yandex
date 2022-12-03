import Block from "../../core/block";
import template from "./error.tmpl";
import Link, { routerGo } from "../../components/ui/link";
import { ROUTES } from "../../utils/constants";

interface IErrorPage {
    title: string;
    text: string;
    link: Block;
}

class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super(props)
    }

    render() {
        return this.compile(template, {
            title: this.props.title,
            text: this.props.text,
            link: this.props.link
        });
    }
}

export const NotFoundErrorPage = new ErrorPage({
    title: "404",
    text: "Не туда попали",
    link: new Link({
        href: ROUTES.home.path,
        content: "Назад к чатам", 
        //events: {
        //    click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.home.path)
        //}
    })
});

export const ServerErrorPage = new ErrorPage({
    title: "500",
    text: "Мы уже фиксим",
    link: new Link({
        href: ROUTES.home.path,
        content: "Назад к чатам", 
        //events: {
        //    click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.home.path)
        //}
    })
});


