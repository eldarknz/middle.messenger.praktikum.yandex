// language=hbs

export default `
    <div
        {{#if className}}class="{{ className }}"{{/if}}
        {{#if id}}id="{{ id }}"{{/if}}
    >
        {{{ dropdownButton }}}
        <div class="dropdown-menu">
            {{{ dropdownMenuContent }}}
        </div>
    </div>
`
