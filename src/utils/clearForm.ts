export const clearForm = (form: HTMLFormElement) => {
    const inputFields = form.querySelectorAll(".input-container__input");

    inputFields.forEach((input: HTMLInputElement) => {
        input.value = "";
        input.setAttribute('value', input.value);
    });
}
