// language=hbs

/*export default `
    <a
        {{#if className}}class="{{className}}"{{/if}}
        href="{{href}}"
    >
        {{{content}}}
    </a>
`*/

export default `
    <a
        {{#if className}}class="{{ className }}"{{/if}}
        {{#if href}}href="{{ href }}"{{/if}}
    >
        {{{ content }}}
    </a>
`
