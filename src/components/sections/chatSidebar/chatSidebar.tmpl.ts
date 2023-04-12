// language=hbs

export default `
    <div class="chat-sidebar">
        <div class="chat-sidebar__header">
            {{{ logoLink }}}
            {{{ newChatButton }}}
        </div>
        <div class="chat-sidebar__search">
            {{{ inputSearch }}}
        </div>
        <div class="chat-sidebar__content">{{{ chatList }}}</div>
        <div class="chat-sidebar__footer">
            <div class="menu-actions">
                {{{ nav }}}
            </div>
        </div>
    </div>
`
