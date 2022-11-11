//import Handlebars from "handlebars";
import Block from "../../../core/block";
import template from "./Input.tmpl";
import { inputHandler } from "./modules/index"
import "./Input.scss";

inputHandler();

/*const Input = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        alternative: props.alternative,
        className: props.className,
        type: props.type ? props.type : "text",
        id: props.id,
        name: props.name,
        value: props.value,
        placeholderText: props.placeholderText,
        placeholderPosition: props.placeholderPosition,
        placeholderIcon: props.placeholderIcon
    });

    return html;
};*/

interface IInput {
    attr?: any;
    alternative?: boolean;
    type?: string;
    id: string;
    name: string;
    value?: string;
    placeholderText: string,
    placeholderPosition?: string,
    placeholderIcon?: Block;
}
  
class Input extends Block {
    constructor(props: IInput) {
        super('div', props);
    }
    
    render() {
        return this.compile(template, {
            alternative: this.props.alternative ? this.props.alternative : false,
            type: this.props.type ? this.props.type : "text",
            id: this.props.id,
            name: this.props.name,
            value: this.props.value,
            placeholderText: this.props.placeholderText,
            placeholderPosition: this.props.placeholderPosition,
            placeholderIcon: this.props.placeholderIcon
        });
    }
}

export default Input
