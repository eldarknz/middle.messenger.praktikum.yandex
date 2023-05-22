// language=hbs

export default `
    <a
        {{#if className}}class="{{ className }}"{{/if}}
        {{#if href}}href="{{ href }}"{{/if}}
    >
        {{{ content }}}
    </a>
`;
