// Core
import { Block } from '@core/block';
// Template
import template from '../grid.tmpl';
// Styles
import '../grid.scss';

interface IRowProps {
    className?: string;
    content: Block | Block[] | string;
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

export class Row extends Block {
    constructor(props: IRowProps) {
        super(props);
        this.rowClassName = this.rowClassName.bind(this);
    }

    rowClassName() {
        let className = 'row';
        if (this.props.justifyContent)
            className += ` justify-content-${this.props.justifyContent}`;
        if (this.props.alignItems)
            className += ` align-items-${this.props.alignItems}`;
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        // return this.compile(template, this.props);
        return this.compile(template, {
            id: this.props.id,
            className: this.rowClassName(),
            content: this.props.content,
        });
    }
}
