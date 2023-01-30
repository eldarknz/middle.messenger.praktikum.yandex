import Block from "../../core/block";
import template from "./mainHero.tmpl";
import Button from "../ui/button";
import { ROUTES } from "../../utils/constants";
import { routerGo } from "../ui/link";
import { TBlockAttributes } from "../../../declarations";
import "./mainHero.scss";

interface IMainHero {
    attr?: TBlockAttributes;
    callToAtionButton: Block;
}

export class MainHero extends Block {
    constructor(props: IMainHero) {
        super(props);
    }

    render() {
        return this.compile(template, {
            logoLink: this.props.logoLink,
            buttonSigin: this.props.buttonSigin  
        });
    }
}

const MainHeroBlock = new MainHero({
    callToAtionButton: new Button({
        size: "xl",
        isLink: true,
        isRound: true,
        className: "main-hero__btn",
        content: "Попробовать бесплатно",
        events: {
            click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.register.path)
        }
    })
})

export default MainHeroBlock
