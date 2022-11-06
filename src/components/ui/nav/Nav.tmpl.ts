// language=hbs

const template = `
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

export default template