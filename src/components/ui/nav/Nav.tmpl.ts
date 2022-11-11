// language=hbs

export default `
    {{#each content}}
        <li class="nav-item">
            <a href="{{this.link}}" class="nav-link">
                {{{this.content}}}
            </a>
        </li>
    {{/each}}
`