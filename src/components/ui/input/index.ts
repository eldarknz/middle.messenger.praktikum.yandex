// Core
import { Block } from '@core/block';
// Template
import template from './input.tmpl';
// Styles
import './input.scss';

interface IInput {
    style?: 'flush' | 'outlined' | 'filled';
    type?: string;
    id: string;
    name: string;
    value?: string | (() => void);
    placeholderText: string;
    passwordVisibilityToggler?: boolean;
    events?: {
        blur?: (e: Event) => void;
        focus?: (e: Event) => void;
        input?: (e: Event) => void;
        change?: (e: Event) => void;
    };
}

const defaultInputHandler = (event: Event, props: IInput) => {
    if (props.events?.input) {
        props.events?.input(event);
    }

    const target = event.target as HTMLInputElement;
    if (target) target.setAttribute('value', target.value);
};

export class Input extends Block {
    constructor(props: IInput) {
        super({
            ...props,
            events: {
                ...props.events,
                input: (event: Event) => defaultInputHandler(event, props),
            },
        });
        this.inputClassName = this.inputClassName.bind(this);
    }

    inputClassName() {
        let className = 'input-container';
        if (this.props.style) className += ` input-${this.props.style}`;
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.inputClassName(),
            type: this.props.type ? this.props.type : 'text',
            id: this.props.id,
            name: this.props.name,
            value: this.props.value,
            placeholderText: this.props.placeholderText,
        });
    }
}
