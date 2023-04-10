// language=hbs

export default `
    <div class="chat-message{{#if user}} right{{/if}}" data-chat-id="{{chatId}}" data-user-id="{{userId}}" data-message-id="{{id}}">
        <p class="chat-message__text">{{content}}</p>
        {{{ datetime }}}
    </div>
`
