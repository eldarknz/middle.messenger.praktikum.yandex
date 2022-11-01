// language=hbs

export default `
    <div class="dropdown{{#if dropdownClassName}} {{dropdownClassName}}{{/if}}">
        {{> button className=btnClassName id="dropdownMenuButton" content=btnContent }}
        <div class="dropdown-menu">
            {{#each menuList}}
                {{# if this.link}}
                    <a
                        class="dropdown-item"
                        {{#if this.onClick}}onClick="{{this.onClick}}"{{/if}}
                        {{#if this.dataToggle}}data-toggle="{{this.dataToggle}}"{{/if}}
                        {{#if this.dataTarget}}data-target="{{this.dataTarget}}"{{/if}}
                        href="{{this.link}}"
                    >
                        {{{this.content}}}
                    </a>
                {{else}}
                    <div
                        class="dropdown-item"
                        {{#if this.onClick}}onClick="{{this.onClick}}"{{/if}}
                        {{#if this.dataToggle}}data-toggle="{{this.dataToggle}}"{{/if}}
                        {{#if this.dataTarget}}data-target="{{this.dataTarget}}"{{/if}}
                    >
                        {{{this.content}}}
                    </div>
                {{/if}}
            {{/each}}
        </div>
    </div>
`
