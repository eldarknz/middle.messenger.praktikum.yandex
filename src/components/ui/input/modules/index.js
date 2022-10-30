export const inputHandler = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
        let inputFieldsBase = document.querySelectorAll(".input-base");
        let inputFieldsAlt = document.querySelectorAll(".input-alt");

        inputFieldsBase && inputFieldsBase.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", el.value);
            })
        });

        inputFieldsAlt && inputFieldsAlt.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", el.value);
            })
        });
    });
};