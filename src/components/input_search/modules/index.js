export const inputHandler = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
        let inputFields = document.querySelectorAll(".input-search");

        inputFields && inputFields.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", el.value);
            })
        });
    });
};