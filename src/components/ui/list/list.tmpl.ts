// language=hbs

/*export default `
    {{#each content}}
        <li class="list-item">{{{this}}}</li>
    {{/each}}
`*/

export default `
    <ul class="{{ className }}">
        {{#each content}}
            <li class="list-item">{{{this}}}</li>
        {{/each}}
    </ul>
`
