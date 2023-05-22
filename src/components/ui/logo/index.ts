// Core
import { Block } from '@core/block';
// Template
import template from './logo.tmpl';
// Styles
import './logo.scss';

interface ILogo {
    isSmall?: boolean;
    style?: 'white' | 'dark';
    link?: string;
    className?: string;
}

export class Logo extends Block {
    constructor(props?: ILogo) {
        super(props);
        this.logoClassName = this.logoClassName.bind(this);
    }

    logoClassName() {
        let className = 'logo';
        if (this.props.isSmall) className += ` logo-small`;
        if (!this.props.isSmall)
            className += this.props.style
                ? ` logo-${this.props.style}`
                : ` logo-dark`;
        if (this.props.link) className += ` logo-link`;
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            link: this.props.link,
            className: this.logoClassName(),
            content: this.props.content,
        });
    }
}
