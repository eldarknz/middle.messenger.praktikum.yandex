import Block from "../../../core/block";
import template from "./button.tmpl";
import { TBlockAttributes } from "../../../../declarations";
import "./button.scss";

interface IButton {
    attr?: TBlockAttributes;
    content: Block | string;
    onClick?: () => void;
}
  
class Button extends Block {
    constructor(props: IButton) {
        super('button', props);
    }
    
    render() {
        return this.compile(template, {
            content: this.props.content
        });
    }
}
  
export default Button
