import Block from "../../core/block";
import template from "./main.tmpl";
import MainHeaderBlock from "../../components/mainHeader/mainHeader";
import MainFooterBlock from "../../components/mainFooter/mainFooter";
import MainHeroBlock from "../../components/mainHero/mainHero";
import { Container } from "../../components/ui/grid";
import "./main.scss";


interface IMain {
    content?: Block | string;
    className?: string;
}

const sections = [
    MainHeaderBlock,
    MainHeroBlock,
    MainFooterBlock
];

class MainPage extends Block {
    constructor(props: IMain) {

        const content = new Container({
            isFluid: true,
            className: "main-container",
            content: new Container({
                className: "main-container__content",
                content: sections.map((section) => section),
            })
        })

        super({ ...props, content });
    }

    render() {
        return this.compile(template, this.props);
    }
};
  
export default MainPage
