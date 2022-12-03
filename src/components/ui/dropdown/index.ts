import Block from "../../../core/block";
import template from "./dropdown.tmpl";
import "./dropdown.scss";

interface IDropdown {
    className?: string;
    id?: string;
    dropdownButton: Block;
    content?: Block | string;
}

class Dropdown extends Block {
    constructor(props: IDropdown) {
        super(props)
    }

    render() {
        return this.compile(template, {
            className: this.props.className,
            id: this.props.id,
            dropdownButton: this.props.dropdownButton,
            content: this.props.content
        })
    }
}

export default Dropdown
