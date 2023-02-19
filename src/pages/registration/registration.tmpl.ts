// language=hbs

export default `
    <div class="containerFluid sign-container">
        <div class="sign-container__content">
            <div class="sign-container__logo-container">
                {{{ logoLink }}}
            </div>
            <div class="sign-container__block">
                <h3 class="sign-container__title">{{ title }}</h3>
                {{{ form }}}
                <div class="sign-container__text-block">
                    <span class="text-gray">Уже есть учетная запись? </span>
                    {{{ link }}}
                </div>
            </div>
        </div>
    </div>
`

/*
export default `
    <div class="containerFluid sign-container">
        <div class="sign-container__content">
            <div class="sign-container__logo-container">
                {{{ logoLink }}}
            </div>
            <div class="sign-container__block">
                <h3 class="sign-container__title">{{ title }}</h3>
                <form onsubmit={{{events}}} class="sign-container__form">
                    <div class="sign-container__form__input-group">
                        {{{ emailInput }}}
                        {{{ loginInput }}}
                        {{{ firstNameInput }}}
                        {{{ secondNameInput }}}
                        {{{ phoneInput }}}
                        {{{ passwordInput }}}
                        {{{ passwordConfirmInput }}}
                    </div>

                    {{{ buttonSubmit }}}
                </form>
                <div class="sign-container__text-block">
                    <span class="text-gray">Уже есть учетная запись? </span>
                    {{{ link }}}
                </div>
            </div>
        </div>
    </div>
`
*/
