//import Handlebars from "handlebars";
import Block from "../../../core/block";
import template from "./Label.tmpl";
import "./Label.scss";

interface ILabel {
    attr?: any;
    content: Block | string;
}

class Label extends Block {
    constructor(props: ILabel) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            content: this.props.content
        })
    }
}

export default Label
