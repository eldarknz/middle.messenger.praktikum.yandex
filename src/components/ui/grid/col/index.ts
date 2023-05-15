// Core
import { Block } from '@core/block';
// Template
import template from '../grid.tmpl';
// Styles
import '../grid.scss';

interface IColProps {
    className?: string;
    content: Block | Block[] | string;
    col?: string;
}

export class Col extends Block {
    constructor(props: IColProps) {
        super(props);
    }

    render() {
        return this.compile(template, {
            className: this.props.className,
            content: this.props.content,
        });
    }
}
