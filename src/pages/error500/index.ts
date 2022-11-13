import Block from "../../core/block";
import template from "./error500.tmpl";
import Link from "../../components/ui/Link";
import { TBlockAttributes } from "../../../declarations";

interface IServerError {
    attr?: TBlockAttributes;
    title: string;
    text: string;
    link: Block;
}

class ServerError extends Block {
    constructor(props: IServerError) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            title: this.props.title,
            text: this.props.text,
            link: this.props.link
        });
    }
}

const ServerErrorPage = new ServerError({
    attr: {
        class: "container"
    },
    title: "500",
    text: "Мы уже фиксим",
    link: new Link({
        attr: { href: "/" },
        content: "Назад к чатам"
    })
});

export default ServerErrorPage
