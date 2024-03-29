// Core
import { Block } from '@core/block';
// Handlers
import { inputHandler } from './modules';
// Template
import template from './input.tmpl';
// Styles
import './input.scss';

inputHandler();

interface IInput {
    alternative?: boolean;
    type?: string;
    id: string;
    name: string;
    value?: string;
    placeholderText: string;
    placeholderPosition?: string;
    placeholderIcon?: Block;
    events?: {
        blur?: (e: Event) => void;
        focus?: (e: Event) => void;
    };
}

export class Input extends Block {
    constructor(props: IInput) {
        super(props);
    }

    render() {
        return this.compile(template, {
            alternative: this.props.alternative
                ? this.props.alternative
                : false,
            type: this.props.type ? this.props.type : 'text',
            id: this.props.id,
            name: this.props.name,
            value: this.props.value,
            placeholderText: this.props.placeholderText,
            placeholderPosition: this.props.placeholderPosition,
            placeholderIcon: this.props.placeholderIcon,
            onblur: this.props.events,
        });
    }
}
