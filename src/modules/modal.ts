export const modalHandler = () => {
    const modalClose = () => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => {
            if (modal instanceof HTMLElement) {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            }
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        const modalButtons: NodeListOf<HTMLElement> = document.querySelectorAll(
            '[data-toggle="modal"]'
        );

        modalButtons.forEach((button) => {
            if (button instanceof HTMLElement) {
                button.onclick = () => {
                    if (button.hasAttribute('data-toggle')) {
                        const dataTarget = button.getAttribute('data-target');
                        if (dataTarget) {
                            const modal = <HTMLElement>(
                                document.querySelector(`#${dataTarget}`)
                            );
                            const buttonClose = <HTMLElement>(
                                modal.querySelector(
                                    '.modal-container__close-button'
                                )
                            );
                            modal.onclick = (event) => {
                                const target = event.target as HTMLElement;
                                if (target.closest('.modal-container')) return;
                                modalClose();
                            };
                            buttonClose.onclick = () => modalClose();
                            modal.style.display = 'block';
                        }
                    }
                };
            }
        });

        window.onkeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                modalClose();
            }
        };
    });
};
