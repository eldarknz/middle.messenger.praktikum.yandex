// language=hbs

export default `
    <div class="container">
        <div class="sign-container">
            <h3 class="sign-container__title">{{title}}</h3>
            <div style="display: flex">{{> label class="label_primary" content="21.01.2022" }}</div>
            <div>1</div>
            <form method="post" class="sign-container__form">
                <div class="sign-container__form__input-group">
                    {{> input type="text" placeholder="Логин" name="login" id="login" value="" }}
                    {{> input type="password" placeholder="Пароль" name="password" id="password" value="" }}
                </div>

                {{> button className="btn btn-primary btn-block" }}
            </form>
            <div class="sign-container__text-block">
                <span class="text-gray">Нет учётной записи? </span>
                <a href="/register">Создайте её сейчас</a>
            </div>
        </div>
    </div>
`;