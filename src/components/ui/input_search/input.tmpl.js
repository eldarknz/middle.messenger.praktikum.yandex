// language=hbs

export default `
    <div class="form-group">
        <input class="input-search" type="text" id="{{id}}" name="{{name}}" value="{{value}}">
        <label class="input-search-placeholder{{#if placeholderPosition}} {{placeholderPosition}}{{/if}}" for="{{name}}" id="placeholder-{{id}}">
            <div class="input-search-placeholder__content">
                <div class="input-search-placeholder__icon">{{> icon_search }}</div>
                <div class="input-search-placeholder__text">{{placeholder}}</div>
            </div>
        </label>
    </div>
`