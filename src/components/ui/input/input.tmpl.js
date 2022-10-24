// language=hbs

export default `
    <div class="form-group">
        <input class="input-field" type="{{type}}" id="{{id}}" name="{{name}}" value="{{value}}">
        <label class="placeholder-text" for="{{name}}" id="placeholder-{{id}}">
            <div class="text">{{placeholder}}</div>
        </label>
    </div>
`