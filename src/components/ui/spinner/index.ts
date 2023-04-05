// Core
import Block from "@core/block";
// Template
import template from "./spinner.tmpl";
// Styles
import "./spinner.scss";

interface ISpinnerProps {
    type?: "simple" | "usual";
    color?: "primary" | "secondary" | "gray";
    size?: number;
    strokeWidth?: number;
    center?: boolean;
}

export class Spinner extends Block {
    constructor(props?: ISpinnerProps) {
        super(props);
        this.spinnerClassName = this.spinnerClassName.bind(this);
        this.spinnerSize = this.spinnerSize.bind(this);
        this.spinnerStyle = this.spinnerStyle.bind(this);
        this.spinnerRadius = this.spinnerRadius.bind(this);
        this.spinnerCX = this.spinnerCX.bind(this);
        this.spinnerCY = this.spinnerCY.bind(this);
        this.spinnerStrokeWidth = this.spinnerStrokeWidth.bind(this);
    }

    spinnerClassName() {
        let className = "spinner"; 
        if (this.props.center) className += " spinner-center"
        className += ` spinner-${this.props.type ?? "simple"}`
        className += ` spinner-${this.props.color ?? "gray"}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    spinnerSize() { return this.props.size ?? 20 }
    spinnerStyle() { return `width: ${this.spinnerSize()}px;, height: ${this.spinnerSize()}px`; }
    spinnerRadius() { return (this.spinnerSize() - this.spinnerStrokeWidth()) / 2; }
    spinnerCX() { return this.spinnerSize() / 2 }
    spinnerCY() { return this.spinnerSize() / 2 }
    spinnerStrokeWidth() { return this.spinnerSize() / 6 }

    render(): DocumentFragment {
        return this.compile(template, {
            className: this.spinnerClassName(),
            size: this.spinnerSize(),
            style: this.spinnerStyle(),
            radius: this.spinnerRadius(),
            cx: this.spinnerCX(),
            cy: this.spinnerCY(),
            strokeWidth: this.spinnerStrokeWidth()
        });
    }

}

export default Spinner
