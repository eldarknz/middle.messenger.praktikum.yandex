import Block from "../../core/block";
import template from "./mainFooter.tmpl";
import Link from "../ui/link";
import { TBlockAttributes } from "../../../declarations";
import "./mainFooter.scss";

interface IMainFooter {
    attr?: TBlockAttributes;
    link: Block;
}

export class MainFooter extends Block {
    constructor(props: IMainFooter) {
        super(props);
    }

    render() {
        return this.compile(template, {
            logoLink: this.props.logoLink,
            buttonSigin: this.props.buttonSigin  
        });
    }
}

const MainFooterBlock = new MainFooter({
    link: new Link({
        href: "https://github.com/eldarknz",
        content: "@eldarknz"
    })
})

export default MainFooterBlock
