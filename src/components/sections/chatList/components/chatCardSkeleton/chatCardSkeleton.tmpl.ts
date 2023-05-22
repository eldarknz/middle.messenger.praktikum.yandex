// language=hbs

export default `
    <div class="chat-card-skeleton skeleton-animation">
        <div class="chat-card-skeleton__avatar">
            {{{ avatar }}}
        </div>
        <div class="chat-card-skeleton__chat-content">
            <div class="chat-content-skeleton__title">{{{ title }}}</div>
            <div class="chat-content-skeleton__text">
            {{#each message}}
                {{{this}}}
            {{/each}}
            </div>
        </div>
        <div class="chat-card-skeleton__chat-info">
            {{{ datetime }}}
        </div>
    </div>
`;
