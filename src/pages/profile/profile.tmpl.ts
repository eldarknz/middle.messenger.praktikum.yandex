// language=hbs

export default `
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
                        <a href="/profile/edit">Изменить данные</a>
                    </div>
                    <div class="list-item">
                        <a href="/profile/password-edit">Изменить пароль</a>
                    </div>
                    <div class="list-item">
                        <a href="/" class="link-red">Выйти</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
