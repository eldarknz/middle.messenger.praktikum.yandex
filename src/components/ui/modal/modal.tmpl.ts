// language=hbs

export default `
    <div
        class="{{ className }}"
        id="{{ id }}"
        style="{{ style }}"
    >
        <div class="modal-container">
        {{#if title}}<div class="modal-container__title">{{title}}</div>{{/if}}
        <div class="modal-container__close-button">
            {{{ modalCloseButton }}}
        </div>
        <section class="modal-container__content">
            {{{ content }}}
        </section>
        </div>
    </div>
`
