// Core
import { Block } from '@core/block';
// Template
import template from './form.tmpl';
// Styles
import './form.scss';

interface IFormProps {
    className?: string;
    content: Block | Block[] | string | string[];
    events?: {
        submit?: (e: Event) => void;
    };
}

const defaultSubmitHandler = (e: Event) => {
    e.preventDefault();
};

export class Form extends Block {
    constructor(props: IFormProps) {
        super({
            ...props,
            events: { submit: props.events?.submit ?? defaultSubmitHandler },
        });
        this.formClassName = this.formClassName.bind(this);
    }

    formClassName() {
        let className = 'form';
        if (this.props.className) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.formClassName(),
            content: this.props.content,
        });
    }
}
