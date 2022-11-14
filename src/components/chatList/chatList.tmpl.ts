// language=hbs

export default `
    <div class="chat-list">
        {{#each content}}
            {{{this}}}
        {{/each}}
    </div>
`

/*//{{> ChatCard title=this.title message=this.message.text datetime=this.message.time_created }}*/
