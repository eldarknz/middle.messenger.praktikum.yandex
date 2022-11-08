// language=hbs

export default `
    <div class="wrapper">
        <div class="profile-sidebar">
            {{> Button href="/" className="btn btn-circle btn-primary" content=btnBackContent }}
        </div>
        <div class="profile">
            <div class="profile-container">
                <div class="profile-container__header">
                    <div class="user-avatar">
                        {{> Avatar className="avatar_size_l" content=userAvatarIcon }}
                        <div class="user-avatar__overlay">Поменять
                            аватар
                        </div>
                    </div>
                    <div class="user-name">{{userName}}</div>
                </div>
                <div class="profile-container__info">
                    <div class="list">
                        {{#each userDataList }}
                            <div class="info-item list-item">
                                <span class="info-item__title">{{this.title}}</span>
                                <span class="info-item__value">{{this.value}}</span>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="profile-container__actions">
                    <div class="list">
                        <div class="list-item">
                            <a href="">Изменить данные</a>
                        </div>
                        <div class="list-item">
                            <a href="">Изменить пароль</a>
                        </div>
                        <div class="list-item">
                            <a href="" class="link-red">Выйти</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
