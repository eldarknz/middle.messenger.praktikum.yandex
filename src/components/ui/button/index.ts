// Core
import { Block } from '@core/block';
// Templates
import template from './button.tmpl';
// Styles
import './button.scss';

interface IButton {
    className?: string;
    id?: string;
    size?: 'sm' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'light';
    shape?: 'rounded' | 'circle' | 'square';
    view?: 'outline' | 'link';
    isFluid?: boolean;
    content?: Block | string;
    events?: {
        click?: (e: Event) => void;
    };
}

export class Button extends Block {
    constructor(props: IButton) {
        super(props);
        this.buttonClassName = this.buttonClassName.bind(this);
    }

    buttonClassName() {
        let className = 'btn';
        if (this.props.size) className += ` btn-${this.props.size}`;
        if (this.props.isFluid) className += ' btn-fluid';
        if (this.props.shape) {
            if (this.props.shape === 'rounded') {
                className += ` btn-${this.props.shape}`;
            } else if (!this.props.isFluid)
                className += ` btn-${this.props.shape}`;
        }
        if (this.props.view) className += ` btn-${this.props.view}`;
        if (this.props.color) className += ` btn-${this.props.color}`;
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            className: this.buttonClassName(),
            id: this.props.id,
        });
    }
}
