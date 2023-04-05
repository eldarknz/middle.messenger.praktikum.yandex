// Core
import Block from "@core/block";
// Templates
import template from "./button.tmpl";
// Styles
import "./button.scss";

interface IButton {
    className?: string;
    id?: string;
    size?: "sm" | "lg" | "xl";
    color?: "primary" | "secondary" | "light";
    isOutline?: boolean;
    isLink?: boolean;
    isFluid?: boolean;
    isRound?: boolean;
    isCircle?: boolean;
    isSquare?: boolean;
    content?: Block | string;
    events?: { 
        click?: (e: Event) => void;
    }
}

class Button extends Block {
    constructor(props: IButton) {
        super(props);
        this.buttonClassName = this.buttonClassName.bind(this);
    }
    
    buttonClassName() {
        let className = "btn";
        if (this.props.size) className += ` btn-${this.props.size}`
        if (this.props.isFluid) className += " btn-fluid"
        if (this.props.isRound) className += " btn-rounded"
        if (!this.props.isFluid && !this.props.isRound && this.props.isCircle) className += " btn-circle"
        if (!this.props.isFluid && !this.props.isRound && !this.props.isCircle && this.props.isSquare) className += " btn-square"
        if (this.props.isOutline) className += " btn-outline"
        if (!this.props.isOutline && this.props.isLink) className += " btn-link"
        if (this.props.color) className +=  ` btn-${this.props.color}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            className: this.buttonClassName(),
            id: this.props.id
        });
    }
}
  
export default Button
