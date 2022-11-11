import Block from "../../core/block";
import { ROUTES } from "../../utils/constants";
import template from "./main.tmpl";
import List from "../../components/ui/List";
import Link from "../../components/ui/Link";

interface IMain {
    attr?: any;
    content?: any;
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

const pages = [
    { title: ROUTES.login.title, url: ROUTES.login.path },
    { title: ROUTES.register.title, url: ROUTES.register.path },
    { title: ROUTES.chat.title, url: ROUTES.chat.path },
    { title: ROUTES.profile.title, url: ROUTES.profile.path },
    { title: ROUTES.error_404.title, url: ROUTES.error_404.path },
    { title: ROUTES.error_500.title, url: ROUTES.error_500.path }
];

const MainPage = new Main({
    attr: {
        class: "container"
    },
    content: new List({
        attr: {
            class: "list"
        },
        content: pages.map(link => (
            new Link({
                attr: { href: link.url },
                content: link.title
            })    
        ))
    })
});
  
export default MainPage
