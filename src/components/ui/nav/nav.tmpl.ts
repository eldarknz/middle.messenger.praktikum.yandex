// language=hbs

export default `
    <nav
        {{#if className}}class="{{ className }}"{{/if}}
    >
        {{#each content}}
            <div class="nav-item">{{{this}}}</div>
        {{/each}}
    </nav>
`;
