// language=hbs

export default `
    {{#each content}}
        <li class="nav-item">{{{this}}}</li>
    {{/each}}
`