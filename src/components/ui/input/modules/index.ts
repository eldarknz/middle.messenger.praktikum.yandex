export const inputNewHandler = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const inputFields = document.querySelectorAll(".input-container__input");
        console.log(inputFields);
        if (inputFields) {
            inputFields.forEach((input: HTMLInputElement) => {
                console.log(input.value);
                input.addEventListener('input', () => {
                    console.log(input.value);
                    input.setAttribute('value', input.value);
                });
            });
        }
    });
};
