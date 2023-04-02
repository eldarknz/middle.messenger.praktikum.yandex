import Block from "../../../core/block";
import template from "./label.tmpl";
import "./label.scss";

interface ILabel {
    className?: string;
    isCircle?: boolean,
    color?: "primary" | "secondary" | "light",
    content: Block | string;
}

class Label extends Block {
    constructor(props: ILabel) {
        super(props)
        this.labelClassName = this.labelClassName.bind(this);
    }

    labelClassName() {
        let className = "label";
        if (this.props.className) className += ` ${this.props.className}`
        if (this.props.isCircle) className += " label-circle"
        if (this.props.color) className +=  ` label-${this.props.color}`
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.labelClassName(),
            content: this.props.content
        })
    }
}

export default Label
