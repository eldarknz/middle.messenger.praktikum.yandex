
// language=hbs

export default `
    <div class="form-group">
        <div class="{{className}}">
            <input
                class="input-file-container__input"
                type="file"
                id="{{id}}"
                name="{{name}}"
                aria-labelledby="label-{{id}}"
                {{#if acceptImage}}accept="image/*"{{/if}}
            />
            <label class="input-file-container__label" for="{{id}}" id="label-{{id}}">{{placeholderText}}</label>
        </div>
    </div>
`
