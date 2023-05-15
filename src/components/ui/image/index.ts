// Core
import { Block } from '@core/block';
// Template
import template from './image.tmpl';
// Styles
import './image.scss';

interface IImage {
    className?: string;
    src: string;
    alt?: Block | string;
}

export class Image extends Block {
    constructor(props?: IImage) {
        super(props);
        this.imageClassName = this.imageClassName.bind(this);
    }

    imageClassName() {
        let className = 'img';
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.imageClassName(),
            src: this.props.src,
            alt: this.props.alt ?? 'image',
        });
    }
}
