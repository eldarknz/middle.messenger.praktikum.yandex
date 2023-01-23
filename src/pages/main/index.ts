import Block from "../../core/block";
import { ROUTES } from "../../utils/constants";
import template from "./main.tmpl";
import List from "../../components/ui/list";
import Link, { routerGo } from "../../components/ui/link";

interface IMain {
    content?: Block | string;
    className?: string;
}

const pages: { title: string, path: string }[] = [
    { title: ROUTES.test.title, path: ROUTES.test.path },
    { title: ROUTES.login.title, path: ROUTES.login.path },
    { title: ROUTES.register.title, path: ROUTES.register.path },
    { title: ROUTES.chat.title, path: ROUTES.chat.path },
    { title: ROUTES.profile.title, path: ROUTES.profile.path },
    { title: ROUTES.error_404.title, path: ROUTES.error_404.path },
    { title: ROUTES.error_500.title, path: ROUTES.error_500.path }
];

//class Main extends Block {
class MainPage extends Block {
    constructor(props: IMain) {

        const content = new List({
            className: "list",
            content: pages.map(link => (
                new Link({
                    href: link.path,
                    content: link.title,
                    //events: {
                    //    click: (event: MouseEvent) => routerGo(event, window.router, link.path)
                    //}
                })
            )),
        })

        console.log("link", content);

        super({ ...props, content });
        
        /*this.setProps({
            content: new List({
                className: "list",
                content: pages.map(link => (
                    new Link({
                        href: link.path,
                        content: link.title,
                        //events: {
                        //    click: (event: MouseEvent) => routerGo(event, window.router, link.path)
                        //}
                    })
                )),
            })
        })*/
    
    }

    render() {
        return this.compile(template, this.props);
    }
    /*render() {
        return this.compile(template, {
            className: this.props.className,
            content: this.props.content,
        });
    }*/
}

/*const MainPage = new Main({
    content: new List({
        className: "list",
        content: pages.map(link => (
            new Link({
                href: link.path,
                content: link.title,
                //events: {
                //    click: (event: MouseEvent) => routerGo(event, window.router, link.path)
                //}
            })
        )),
    })
});*/
  
export default MainPage
