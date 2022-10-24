// language=hbs

export default `
    <div class="dropdown">
        {{> button className=btnClassName id="dropdownMenuButton" content=btnContent }}
        <div class="dropdown-menu">
            {{#each menuList}}
                <a class="dropdown-item" href="{{this.link}}">{{{this.content}}}</a>
            {{/each}}
        </div>
    </div>
`