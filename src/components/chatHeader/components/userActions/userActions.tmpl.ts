// language=hbs

export default `
    <div>
        <div
            class="dropdown-item"
            {{#if dataToggle}}data-toggle="{{dataToggle}}"{{/if}}
            {{#if dataTarget}}data-target="{{dataTarget}}"{{/if}}
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
