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
                        {{{ userAvatarOverlay }}}
                    </div>
                    <div class="user-name">{{{ userName }}}</div>
                </div>
                <div class="profile-container__info">
                    {{{ userDataList }}}
                </div>
                <div class="profile-container__actions">
                    {{{ profileActions }}}
                </div>
            </div>
        </div>
    </div>
`;
