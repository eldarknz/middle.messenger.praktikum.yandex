import Block from "../../../core/block";

interface IDivBlock {
    id?: string;
    className?: string;
    content?: Block | Block[] | string;
    events?: {
        click: (e: Event) => void;
    }
}

class DivBlock extends Block {
    constructor(props: IDivBlock) {
        const isArray = Array.isArray(props.content);
        super({ ...props, isArray });
    }
    
    render() {
        return this.compile(
            `<div
                {{#if id}}id="{{ id }}"{{/if}}
                {{#if className}}class="{{ className }}"{{/if}}
            >
                {{#if isArray}}
                    {{#each content}}
                        {{{this}}}
                    {{/each}}
                {{else}}
                    {{{content}}}
                {{/if}}
            </div>`, 
            this.props
        );
    }
}

export default DivBlock
