// Core
import { Block } from "@core/block";
// Template
import template from "./grid.tmpl";
// Styles
import "./grid.scss";

interface IGrid {
  className?: string;
  content: Block | Block[] | string;
};

interface IContainerProps extends IGrid {
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

interface IRowProps extends IGrid {
    justifyContent?:  'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
};

export class Row extends Block {
    constructor(props: IRowProps) {
        super(props);
        this.rowClassName = this.rowClassName.bind(this);
    }

    rowClassName() {
        let className = "row";
        if (this.props.justifyContent) className += ` justify-content-${this.props.justifyContent}`
        if (this.props.alignItems) className += ` align-items-${this.props.alignItems}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        //return this.compile(template, this.props);
        return this.compile(template, {
            id: this.props.id,
            className: this.rowClassName(),
            content: this.props.content
        });
    }
}

interface IColProps extends IGrid {
    col?: string;
};

export class Col extends Block {
    constructor(props: IColProps) {
      super(props);
    }
  
    render() {
      return this.compile(template, {
        className: this.props.className,
        content: this.props.content
      });
    }
}
