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
                {{> icon_profile className="icon-size-l" }}
            </a>
        </div>
        <div class="sidebar__search">
            {{> input_search type="text" placeholder="Поиск" name="search" id="search" value="" }}
        </div>
        <div class="sidebar__content">{{{content}}}</div>
    </div>
`