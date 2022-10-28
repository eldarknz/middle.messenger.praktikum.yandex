// language=hbs

export default `
    <div class="form-group{{#if className}} {{className}}{{/if}}">
        <input class="input-search" type="text" id="{{id}}" name="{{name}}" value="{{#if value}}{{value}}{{/if}}">
        <label class="input-search-placeholder{{#if placeholderPosition}} {{placeholderPosition}}{{/if}}" for="{{name}}" id="placeholder-{{id}}">
            <div class="input-search-placeholder__content">
                {{# if placeholderIcon}}
                    <div class="input-search-placeholder__icon">{{{placeholderIcon}}}</div>
                {{/if}}
                <div class="input-search-placeholder__text">{{placeholderText}}</div>
            </div>
        </label>
    </div>
`