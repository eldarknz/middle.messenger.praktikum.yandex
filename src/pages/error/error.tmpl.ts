// language=hbs

export default `
    <div class="container">
        <div class="error-container">
            <div class="error-container__text-block">
                <h3 class="error-container__text-block__title">{{ title }}</h3>
                <p class="error-container__text-block__text">{{ text }}</p>
            </div>
            {{{ link }}}
        </div>
    </div>
`
