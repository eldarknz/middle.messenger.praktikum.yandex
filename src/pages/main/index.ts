import Block from "../../core/block";
import { ROUTES } from "../../utils/constants";
import { TBlockAttributes } from "../../../declarations";
import template from "./main.tmpl";
import List from "../../components/ui/List";
import Link from "../../components/ui/Link";

interface IMain {
    attr?: TBlockAttributes;
    content?: Block;
}

class Main extends Block {
    constructor(props: IMain) {
      super('div', props);
    }
  
    render() {
        return this.compile(template, {
            content: this.props.content,
        });
    }
}

const pages: { title: string, path: string }[] = [
    { title: ROUTES.login.title, path: ROUTES.login.path },
    { title: ROUTES.register.title, path: ROUTES.register.path },
    { title: ROUTES.chat.title, path: ROUTES.chat.path },
    { title: ROUTES.profile.title, path: ROUTES.profile.path },
    { title: ROUTES.error_404.title, path: ROUTES.error_404.path },
    { title: ROUTES.error_500.title, path: ROUTES.error_500.path }
];

const MainPage = new Main({
    attr: {
        class: "container",
        id: "sss"
    },
    content: new List({
        attr: {
            class: "list",
            id: "aaa"
        },
        content: pages.map(link => (
            new Link({
                attr: { href: link.path },
                content: link.title
            })    
        ))
    })
});
  
export default MainPage
