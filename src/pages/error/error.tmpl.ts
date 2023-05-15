// language=hbs

export default `
    <div class="container error-container">
        <div class="row justify-content-center align-items-center">
            <div class="error-block">
                <div class="error-block__text-block">
                    <h3 class="error-block__text-block__title">{{ title }}</h3>
                    <p class="error-block__text-block__text">{{ text }}</p>
                </div>
                {{{ link }}}
            </div>
        </div>
    </div>
`;
