export const inputHandler = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
        let inputFields = document.querySelectorAll(".input-field");

        inputFields && inputFields.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", el.value);
            })
        });
    });
};