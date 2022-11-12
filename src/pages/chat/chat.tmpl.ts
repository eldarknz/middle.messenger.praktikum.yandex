// language=hbs

export default `
    {{{ sidebar }}}
    <div class="chat">
        <div class="chat-container empty">
            <span class="text-silver">Сообщения отсутствуют</span>
        </div>
        {{{ footer }}}
        {{{ header }}}
    </div>
    {{{modal}}}
`
