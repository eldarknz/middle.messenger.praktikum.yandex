// language=hbs

export default `
    <a
        {{#if className}}{{className}}{{/if}}
        href={{href}}
    >
        {{{content}}}
    </a>
`