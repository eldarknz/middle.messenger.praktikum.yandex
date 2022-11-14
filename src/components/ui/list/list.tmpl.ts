// language=hbs

export default `
    {{#each content}}
        <li class="list-item">{{{this}}}</li>
    {{/each}}
`