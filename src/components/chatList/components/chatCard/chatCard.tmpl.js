// language=hbs

export default `
    <div class="chat-card">
        <div class="chat-card__avatar">
            {{> avatar className="avatar_size_m" }}
        </div>
        <div class="chat-card__chat-content">
            <div class="chat-content__title">{{title}}</div>
            <div class="chat-content__text">Миллионы россиян ежедневно проводят де...</div>
        </div>
        <div class="chat-card__chat-info">
            <span class="chat-info__date-time">09:09</span>
            {{> label class="label-circle label-primary" content="99" }}
        </div>
    </div>
`