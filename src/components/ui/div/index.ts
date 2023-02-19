import Block from "../../../core/block";

interface IDivBlock {
    className?: string;
    content: Block | string;
    events?: {
        click: (e: Event) => void;
    }
}

class DivBlock extends Block {
    constructor(props: IDivBlock) {
        super(props);
    }
    
    render() {
        return this.compile(
            `<div {{#if className}}class="{{ className }}"{{/if}}>{{{content}}}</div>`, 
            {
                className: this.props.className,
                content: this.props.content
            }
        );
    }
}

export default DivBlock
