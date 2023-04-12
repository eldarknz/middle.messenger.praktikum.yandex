// Core
import { Block } from "@core/block";
// Template
import template from "../grid.tmpl";
// Styles
import "../grid.scss";

interface IContainerProps {
    className?: string;
    content: Block | Block[] | string;
    id?: string;
    isFluid?: boolean;
    events?: { 
        scroll?: (e: Event) => void;
    }
};

export class Container extends Block {
    constructor(props: IContainerProps) {
        super(props);
        this.containerClassName = this.containerClassName.bind(this);
    }

    containerClassName() {
        let className = `${this.props.isFluid ? "container-fluid" : "container"}`;
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            id: this.props.id,
            className: this.containerClassName(),
            content: this.props.content
        });
    }
}
