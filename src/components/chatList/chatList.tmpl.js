// language=hbs

export default `
    <div class="chat-list">
        {{#each list}}
            {{> ChatCard title=this.title message=this.message.text datetime=this.message.time_created }}
        {{/each}}
    </div>
`
