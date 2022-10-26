// language=hbs

export default `
    <div class="dropdown{{#if dropdownClassName}} {{dropdownClassName}}{{/if}}">
        {{> button className=btnClassName id="dropdownMenuButton" content=btnContent }}
        <div class="dropdown-menu">
            {{#each menuList}}
                <a class="dropdown-item" href="{{this.link}}">{{{this.content}}}</a>
            {{/each}}
        </div>
    </div>
`