import Block from "../../../core/block";
import template from "./Dropdown.tmpl";
import "./Dropdown.scss";

interface IDropdown {
    attr?: any;
    dropdownButton: Block;
    content?: Block | string;
}

class Dropdown extends Block {
    constructor(props: IDropdown) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            dropdownButton: this.props.dropdownButton,
            content: this.props.content
        })
    }
}

export default Dropdown
