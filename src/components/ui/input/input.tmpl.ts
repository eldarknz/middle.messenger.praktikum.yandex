// language=hbs

export default `
    <div class="form-group">
        <div class="{{className}}">
            <div class="input-container__field"></div>
            {{{passwordVisibilityToggler}}}
            <input
                class="input-container__input"
                type="{{type}}"
                id="{{id}}"
                name="{{name}}"
                value="{{value}}"
                aria-labelledby="label-{{id}}"
            />
            <label class="input-container__label" for="{{id}}" id="label-{{id}}">
                <div class="input-container__label-text">{{placeholderText}}</div>
            </label>
        </div>
    </div>
`;
