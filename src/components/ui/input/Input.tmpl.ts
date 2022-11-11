// language=hbs

export default `
    {{# if alternative }}
        <input class="input-alt" type="{{type}}" id="{{id}}" name="{{name}}" value="{{value}}">
        <label class="input-alt-placeholder" for="{{name}}" id="placeholder-{{id}}">
            <div class="input-alt-placeholder__text">{{placeholderText}}</div>
        </label>
    {{else}}
        <input class="input-base" type="{{type}}" id="{{id}}" name="{{name}}" value="{{value}}">
        <label class="input-base-placeholder{{#if placeholderPosition}} {{placeholderPosition}}{{/if}}" for="{{name}}" id="placeholder-{{id}}">
            <div class="input-base-placeholder__content">
                {{# if placeholderIcon}}
                    <div class="input-base-placeholder__icon">{{{placeholderIcon}}}</div>
                {{/if}}
                <div class="input-base-placeholder__text">{{placeholderText}}</div>
            </div>
        </label>
    {{/if}}
`
