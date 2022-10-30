// language=hbs

export default `
    <div class="container">
        <div class="sign-container">
            <h3 class="sign-container__title">{{title}}</h3>
            <form method="post" class="sign-container__form">
                <div class="sign-container__form__input-group">
                    {{{loginInput}}}
                    {{{passwordInput}}}
                </div>

                {{> button className="btn btn-primary btn-block" content="Авторизоваться" }}
            </form>
            <div class="sign-container__text-block">
                <span class="text-gray">Нет учётной записи? </span>
                <a href="/register">Создайте её сейчас</a>
            </div>
        </div>
    </div>
`;