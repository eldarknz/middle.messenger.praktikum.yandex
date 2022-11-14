// language=hbs

export default `
    <div class="chat-header">
        <div class="chat-header__container">
            <div class="chat-header__container__content">
                <div class="user-block">
                    {{{ userAvatar }}}
                    <span class="user-block__name">{{{ userName }}}</span>
                </div>
                <div class="action-block">
                    {{{ dropdown }}}
                </div>
            </div>
        </div>
    </div>
`
