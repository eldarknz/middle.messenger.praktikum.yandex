export const inputHandler = () => {
    window.addEventListener('DOMContentLoaded', () => {
        let inputFieldsBase = document.querySelectorAll(".input-base");
        let inputFieldsAlt = document.querySelectorAll(".input-alt");

        inputFieldsBase && inputFieldsBase.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", (<HTMLInputElement>el).value);
            })
        });

        inputFieldsAlt && inputFieldsAlt.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", (<HTMLInputElement>el).value);
            })
        });
    });
};
