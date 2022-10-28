export const modalHandler = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
        let modal = document.querySelectorAll(".modal");

        inputFields && inputFields.forEach((el) => {
            el.addEventListener("keyup", () => {
                el.setAttribute("value", el.value);
            })
        });
    });
};