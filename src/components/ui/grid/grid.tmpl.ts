// language=hbs

export default `
    <div
        {{#if id}}id="{{id}}"{{/if}}
        {{#if className}}class="{{ className }}"{{/if}}
    >
        {{#each content}}
            {{{this}}}
        {{/each}}
    </div>
`
