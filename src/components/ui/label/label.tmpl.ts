// language=hbs

export default `
    <div
        {{#if className}}class="{{ className }}"{{/if}}
    >
        {{{content}}}
    </div>
`;
