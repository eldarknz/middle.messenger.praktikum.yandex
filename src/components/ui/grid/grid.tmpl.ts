// language=hbs

export default `
    <div
        {{#if className}}class="{{ className }}"{{/if}}
    >
        {{#each content}}
            {{{this}}}
        {{/each}}
    </div>
`
