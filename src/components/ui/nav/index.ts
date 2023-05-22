// Core
import { Block } from '@core/block';
// Template
import template from './nav.tmpl';
// Styles
import './nav.scss';

interface INav {
    className?: string;
    content: Block[] | string[];
}

export class Nav extends Block {
    constructor(props: INav) {
        super(props);
        this.navClassName = this.navClassName.bind(this);
    }

    navClassName() {
        let className = 'nav';
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            className: this.navClassName(),
        });
    }
}
