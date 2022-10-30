// language=hbs

export default `
    <div class="modal"
        {{# if id}}id="{{id}}"{{/if}}
        {{# if style}}style="{{style}}"{{/if}}
    >
        <div class="modal-container">
        <div class="modal-container__title">{{title}}</div>
        <div class="modal-container__close-button">
            {{{icon_close}}}
        </div>
        <section class="modal-container__content">
            {{{content}}}
        </section>
        </div>
    </div>
`