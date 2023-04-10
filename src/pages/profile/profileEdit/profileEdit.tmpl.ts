// languages=hbs

export default `
    <div class="wrapper">
        <div class="profile-sidebar">
            {{{ buttonBack }}}
        </div>
        <div class="profile">
            <div class="profile-container edit-form">
                <div class="profile-container__header">
                    <div class="user-avatar">
                        {{{ userAvatar }}}
                    </div>
                    <div class="user-name">
                        {{{ userName }}}
                    </div>
                </div>
                {{{ form }}}
            </div>
        </div>
    </div>
`
