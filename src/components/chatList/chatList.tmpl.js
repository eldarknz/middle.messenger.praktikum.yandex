// language=hbs

export default `
    <div class="chat-list">
        {{#each list}}
            {{> chatCard title=this.title }}
        {{/each}}
    </div>
`