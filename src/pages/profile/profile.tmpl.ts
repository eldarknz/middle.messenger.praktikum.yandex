// language=hbs

export default `
    <div class="wrapper">
        <div class="profile-sidebar">
            {{{ buttonBack }}}
        </div>
        <div class="profile">
            <div class="profile-container">
                <div class="profile-container__header">
                    <div class="user-avatar">
                        {{{ userAvatar }}}
                        <div class="user-avatar__overlay">Поменять
                            аватар
                        </div>
                    </div>
                    <div class="user-name">{{userName}}</div>
                </div>
                <div class="profile-container__info">
                    {{{ userDataList }}}
                </div>
                <div class="profile-container__actions">
                    <div class="list list-flush">
                        <div class="list-item">
                            {{{ profileEdit }}}
                        </div>
                        <div class="list-item">
                            {{{ passwordEdit }}}
                        </div>
                        <div class="list-item link-red">
                            {{{ logout }}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
