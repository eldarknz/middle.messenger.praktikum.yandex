// language=hbs

export default `
    <form
        {{#if className}}class="{{ className }}"{{/if}}
    >
        {{#each content}}
            {{{this}}}
        {{/each}}
    </form>
`
