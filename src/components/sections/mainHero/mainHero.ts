// Core
import { Block } from "@core/block";
// Components
import { Button } from "@components/ui/button";
// Utils
import { ROUTES } from "@utils/constants";
// Templates
import template from "./mainHero.tmpl";
// Styles
import "./mainHero.scss";

export class MainHero extends Block {
    constructor(props?: {}) {

        const callToActionButton = new Button({
            size: "xl",
            isLink: true,
            isRound: true,
            className: "main-hero__btn",
            content: "Попробовать бесплатно",
            events: {
                click: () => { window.router.go(ROUTES.register.path); }
            }
        });

        super({ ...props, callToActionButton });
    }

    render() {
        return this.compile(template, this.props);
    }
}
