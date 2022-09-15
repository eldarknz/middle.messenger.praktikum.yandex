// language=hbs

export default `
    <div class="wrapper">
        <div class="sidebar">
            <div class="sidebar__header">
                <div class="logo-container">
                    <div class="logo logo_size">
                        <a href="/" class="logo-link"></a>
                    </div>
                </div>
                <a href="/profile">
                    {{> icon iconType="icon-profile" size="icon_size_l" }}
                    {{ getIconElement iconType="+" }}
                </a>
            </div>
            <div class="sidebar__search">
                {{> input_search type="text" placeholder="Поиск" name="search" id="search" value="" }}
            </div>
            <div class="sidebar__content">Content</div>
        </div>
        <div class="header">
            <div class="header__content">Header</div>
        </div>
        <div class="footer">
            <div class="footer__content">Footer</div>
        </div>
        <div class="chat empty">
            <span class="text-silver">Выберите чат чтобы отправить сообщение</span>
        </div>
    </div>
`