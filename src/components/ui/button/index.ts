import Block from "../../../core/block";
import template from "./button.tmpl";
import "./button.scss";

interface IButton {
    className?: string;
    id?: string;
    content?: Block | string;
    events?: { 
      click?: (e: Event) => void;
    }
}
  
class Button extends Block {
    constructor(props: IButton) {
        super(props);
    }
    
    render() {
        return this.compile(template, {
            className: this.props.className,
            id: this.props.id,
            content: this.props.content
        });
    }
}
  
export default Button
