// language=hbs

export default `
    <div class="wrapper">
        {{{sidebar}}}
        <div class="chat">
            {{{header}}}
            {{{footer}}}
            <div class="chat-container empty">
                <span class="text-silver">Сообщения отсутствуют</span>
            </div>
        </div>
    </div>
`
