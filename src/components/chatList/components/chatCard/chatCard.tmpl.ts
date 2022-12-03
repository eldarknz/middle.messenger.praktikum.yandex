// language=hbs

export default `
    <div class="chat-card">
        <div class="chat-card__avatar">
            {{{ avatar }}}
        </div>
        <div class="chat-card__chat-content">
            <div class="chat-content__title">{{title}}</div>
        <div class="chat-content__text">{{message}}</div>
        </div>
        <div class="chat-card__chat-info">
            <span class="chat-info__date-time">{{datetime}}</span>
            {{{ label }}}
        </div>
    </div>
`
