// language=hbs

export default `
    <button
        {{#if className}}class="{{ className }}"{{/if}}
        {{#if id}}id="{{ id }}"{{/if}}
    >
        {{{ content }}}
    </button>
`;
