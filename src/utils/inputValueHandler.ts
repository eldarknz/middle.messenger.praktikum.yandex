import { validateInput } from "./validation";

export const inputValueHandler = (element: HTMLInputElement) => {
    if (element) {
        element.setAttribute('value', element.value);
        validateInput(element as HTMLInputElement);
    }
};
