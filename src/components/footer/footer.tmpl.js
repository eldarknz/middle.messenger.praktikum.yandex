// language=hbs

export default `
    <div class="footer">
        <div class="footer__container">
            <div class="footer__container__content">
                {{{ dropdown }}}
                {{{ inputMessage }}}
                {{> button className="btn btn-square btn-primary" content=btnSend }}
            </div>
        </div>
    </div>
`