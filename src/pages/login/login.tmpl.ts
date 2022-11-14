// language=hbs

export default `
    <div class="sign-container">
        <h3 class="sign-container__title">{{ title }}</h3>
        <form onsubmit={{{events}}} class="sign-container__form">
            <div class="sign-container__form__input-group">
                {{{ loginInput }}}
                {{{ passwordInput }}}
            </div>
            {{{ buttonSubmit }}}
        </form>
        <div class="sign-container__text-block">
            <span class="text-gray">Нет учётной записи? </span>
            {{{ link }}}
        </div>
    </div>
`;
