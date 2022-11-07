// language=hbs

export default `
    <div class="container">
        <div class="sign-container">
            <h3 class="sign-container__title">{{title}}</h3>
            <form method="post" class="sign-container__form">
                <div class="sign-container__form__input-group">
                    {{{emailInput}}}
                    {{{loginInput}}}
                    {{{firstNameInput}}}
                    {{{secondNameInput}}}
                    {{{phoneInput}}}
                    {{{passwordInput}}}
                    {{{passwordConfirmInput}}}
                </div>

                {{{buttonSubmit}}}
            </form>
            <div class="sign-container__text-block">
                <span class="text-gray">Уже есть учетная запись? </span>
                <a href="/login">Войдите в аккаунт</a>
            </div>
        </div>
    </div>
`
