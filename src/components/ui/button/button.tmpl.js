// language=hbs

export default ` 
    <button
        class="{{className}}"
        {{#if id}} id="{{id}}"{{/if}}
        {{#each attributes}}
            {{this}}
        {{/each}}
    >
        {{{content}}}
    </button>
`;