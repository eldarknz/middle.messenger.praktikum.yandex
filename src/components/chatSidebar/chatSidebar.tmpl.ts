// language=hbs

export default `
    <div class="chat-sidebar">
        <div class="chat-sidebar__header">
            <div class="logo-container">
                <div class="logo logo_size logo-link">
                    {{{ logoLink }}}
                </div>
            </div>
            <a href="/profile">
                {{{ newMessageIcon }}}
            </a>
        </div>
        <div class="chat-sidebar__search">
            {{{ inputSearch }}}
        </div>
        <div class="chat-sidebar__content">{{{ content }}}</div>
        <div class="chat-sidebar__footer">
            <div class="menu-actions">
                {{{ nav }}}
            </div>
        </div>
    </div>
`
