// language=hbs

export default `
    <ul class="nav">
        {{#each list}}
            <li class="nav-item">
                <a href="{{this.link}}" class="nav-link">
                    {{{this.content}}}
                </a>
            </li>
        {{/each}}
    </ul>
`