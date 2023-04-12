// language=hbs

export default `
    <div class="logo-container">
        <div class="{{ className }}">
            {{#if link}}
                <a href="{{link}}"></a>
            {{/if}}
        </div>
    </div>
`
