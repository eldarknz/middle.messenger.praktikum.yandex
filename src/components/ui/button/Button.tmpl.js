// language=hbs

export default `
    {{# if href}}
        <a
            href="{{href}}"
            class="{{className}}"
            {{#if id}} id="{{id}}"{{/if}}
            {{#each attributes}}
                {{this}}
            {{/each}}
        >
            {{{content}}}
        </a>
    {{else}}
        <button
            class="{{className}}"
            {{#if id}} id="{{id}}"{{/if}}
            {{#each attributes}}
                {{this}}
            {{/each}}
        >
            {{{content}}}
        </button>
    {{/ if}}
`
