// language=hbs

export default `
    <div class="wrapper">
        {{{ sidebar }}}
        <div class="chat">
            <div class="chat-container empty">
                <span class="text-silver">Сообщения отсутствуют</span>
            </div>
            {{{ footer }}}
            {{{ header }}}
        </div>
    </div>
`
