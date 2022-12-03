// language=hbs

export default `
    <ul
        {{#if className}}class="{{ className }}"{{/if}}
    >
        {{#each content}}
            <li class="list-item">{{{this}}}</li>
        {{/each}}
    </ul>
`
