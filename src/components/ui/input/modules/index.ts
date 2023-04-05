export const inputNewHandler = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const inputFields = document.querySelectorAll(".input-container__input");
        if (inputFields) {
            inputFields.forEach((input: HTMLInputElement) => {
                input.addEventListener('input', () => {
                    input.setAttribute('value', input.value);
                });
            });
        }
    });
};
