// language=hbs

export default `
    {{{ dropdownButton }}}
    <div class="dropdown-menu">
        <div
            class="dropdown-item"
            data-toggle="{{dataToggle}}"
            data-target="{{dataTarget}}"
        >
            {{{addUserIcon}}}
            Добавить пользователя
        </div>
        <div
            class="dropdown-item"
        >
            {{{deleteUserIcon}}}
            Удалить пользователя
        </div>
    </div>
`

/*export default `
    {{{ dropdownButton }}}
    <div class="dropdown-menu">
        {{#each dropdownMenuList}}
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
`*/
