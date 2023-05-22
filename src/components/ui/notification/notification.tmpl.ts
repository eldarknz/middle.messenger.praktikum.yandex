// language=hbs

export default `
    <div
        class="{{ className }}"
    >
        <div class="notification-container">
            <div class="notification-container__close-button">
                {{{ notificationCloseButton }}}
            </div>
            <div class="notification-container__content">
                {{{ content }}}
            </div>
        </div>
    </div>
`;
