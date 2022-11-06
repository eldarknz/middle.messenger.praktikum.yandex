import Handlebars from "handlebars";
import template from "./NavItem.tmpl";
import "../nav.scss";

interface TNavItem {
    link?: string;
    children: HTMLElement | string;
}

export const NavItem = ({ link, children }: TNavItem) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        link: link,
        children: children,
    });

    return html;
};
