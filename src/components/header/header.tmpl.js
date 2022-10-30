// language=hbs

export default `
    <div class="header">
        <div class="header__container">
            <div class="header__container__content">
                <div class="user-block">
                    {{> avatar }}
                    <span class="user-block__name">Вадим</span>
                </div>
                <div class="action-block">
                    {{{ dropdown }}}
                </div>
            </div>
        </div>
    </div>
    {{{modal}}}
`