import Block from "../../core/block";
import template from "./error404.tmpl";
import Link from "../../components/ui/Link";
import { TBlockAttributes } from "../../../declarations";

interface INotFoundError {
    attr?: TBlockAttributes;
    title: string;
    text: string;
    link: Block;
}

class NotFoundError extends Block {
    constructor(props: INotFoundError) {
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

const NotFoundErrorPage = new NotFoundError({
    attr: {
        class: "container"
    },
    title: "404",
    text: "Не туда попали",
    link: new Link({
        attr: { href: "/" },
        content: "Назад к чатам"
    })
});

export default NotFoundErrorPage
