// language=hbs

/*export default `
    <ul
        class="list{{#if className}} {{className}}{{/if}}"
    >
        {{#each list}}
            {{> ListItem content=this.content }}
        {{/each}}
    </ul>
`*/

export default `
    {{#each content}}
        <li class="list-item">{{{this}}}</li>
    {{/each}}
`