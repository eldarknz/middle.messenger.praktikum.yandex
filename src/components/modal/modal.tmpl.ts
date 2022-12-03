// language=hbs

export default `
    <div
        class="{{ className }}"
        id="{{ id }}"
        style="{{ style }}"
    >
        <div class="modal-container">
        <div class="modal-container__title">{{title}}</div>
        <div class="modal-container__close-button">
            {{{ iconClose }}}
        </div>
        <section class="modal-container__content">
            {{{ content }}}
        </section>
        </div>
    </div>
`
