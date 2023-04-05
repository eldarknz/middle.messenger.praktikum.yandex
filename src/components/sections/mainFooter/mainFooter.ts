// Core
import Block from "@core/block";
// Components
import Link from "@components/ui/link";
// Template
import template from "./mainFooter.tmpl";
// Styles
import "./mainFooter.scss";

export class MainFooter extends Block {
    constructor(props?: {}) {

        const link = new Link({
            href: "https://github.com/eldarknz",
            content: "@eldarknz"
        });

        super({ ...props, link });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MainFooter
