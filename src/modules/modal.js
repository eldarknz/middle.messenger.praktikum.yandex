export const modalHandler = () => {
    const modalClose = () => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
    }
    
    window.addEventListener('DOMContentLoaded', () => {
        const modalButtons = document.querySelectorAll('[data-toggle="modal"]');
  
        modalButtons.forEach(button => {
            button.onclick = () => {
                if (button.hasAttribute('data-toggle')) {
                    let dataTarget = button.getAttribute('data-target');
                    if (dataTarget) {
                        let modal = document.querySelector(`#${dataTarget}`);
                        let buttonClose = modal.querySelector('.modal-container__close-button');
                        modal.onclick = (event) => {
                            if (event.target.closest('.modal-container')) return;
                            modalClose();
                        }
                        buttonClose.onclick = () => modalClose();
                        modal.style.display = "block";
                    }
                }
            };
        });

        window.onkeydown = (event) => {
            if (event.key === "Escape") {
                modalClose();
            }
        }
    });
};
