// language=hbs

export default `
    <div
        class="label{{#if className}} {{className}}{{/if}}"
    >
        {{content}}
    </div>
`
