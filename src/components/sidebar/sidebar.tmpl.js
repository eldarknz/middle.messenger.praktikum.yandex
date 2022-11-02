// language=hbs

export default `
    <div class="sidebar">
        <div class="sidebar__header">
            <div class="logo-container">
                <div class="logo logo_size">
                    <a href="/" class="logo-link"></a>
                </div>
            </div>
            <a href="/profile">
                {{> icon_message className="icon-size-m" }}
            </a>
        </div>
        <div class="sidebar__search">
            {{{inputSearch}}}
        </div>
        <div class="sidebar__content">{{{content}}}</div>
        <div class="sidebar__footer">
            <div class="menu-actions">
                {{{nav}}}
            </div>
        </div>
    </div>
`
