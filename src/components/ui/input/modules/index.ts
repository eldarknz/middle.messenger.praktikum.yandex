export const inputHandler = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const inputFields = document.querySelectorAll(".input");

        inputFields && inputFields.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", (<HTMLInputElement>el).value);
            })
        });
    });
};
