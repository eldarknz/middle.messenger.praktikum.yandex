//import Handlebars from "handlebars";
import Block from "../../../core/block";
import template from "./Dropdown.tmpl";
//import Button from "../Button";
//import { IconDots } from "../Icon";
import "./Dropdown.scss";

/*const Dropdown = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        dropdownClassName: props.dropdownClassName,
        dropdownButton: Button({
            className: props.btnClassName,
            id: "dropdownMenuButton",
            content: props.btnContent
        }),
        menuList: props.menuList
    });

    return html;
};*/

interface IDropdown {
    attr?: any;
    dropdownButton: Block;
    dataToggle: string,
    dataTarget: string,
    addUserIcon: Block,
    deleteUserIcon: Block
}

class Dropdown extends Block {
    constructor(props: IDropdown) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            dropdownButton: this.props.dropdownButton,
            dataToggle: this.props.dataToggle,
            dataTarget: this.props.dataTarget,
            addUserIcon: this.props.addUserIcon,
            deleteUserIcon: this.props.deleteUserIcon
        })
    }
}

export default Dropdown
