import Block from "../../../core/block";
import template from "./label.tmpl";
import "./label.scss";

interface ILabel {
    className?: string;
    content: Block | string;
}

class Label extends Block {
    constructor(props: ILabel) {
        super(props)
    }

    render() {
        return this.compile(template, {
            className: this.props.className,
            content: this.props.content
        })
    }
}

export default Label
