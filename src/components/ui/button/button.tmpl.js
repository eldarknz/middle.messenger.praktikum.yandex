// language=hbs

export default ` 
    <button class="{{className}}" {{#if id}} id="{{id}}"{{/if}}>{{{content}}}</button>
`;