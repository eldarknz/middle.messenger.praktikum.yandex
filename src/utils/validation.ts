type TCheckFunction = (value: string) => boolean;
type TCheckLength = (min: number, max: number, value: string) => boolean;
type TCheckPasswordConfirm = (value_1: string, value_2: string) => boolean;
type TShowError = (input: HTMLElement, selector: string, message?: string) => void;
type THideError = (input: HTMLElement, selector: string) => void;

class ValidationForm {
    checkEmptyValue: TCheckFunction = (value) => {
        return value !== '';
    }
  
    checkPassword: TCheckFunction = (value) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    }
  
    checkPasswordConfirm: TCheckPasswordConfirm = (value_1, value_2) => {
        return value_1 === value_2;
    }

    checkLength: TCheckLength = (min, max, value) => {
        return value.length >= min && value.length <= max;
    }
  
    checkName: TCheckFunction = (value) => {
        return /^[A-ZА-Я]+[A-Za-zа-яА-Я-]+$/.test(value);
    }
  
    checkPhone: TCheckFunction = (value) => {
        return this.checkLength(10, 15, value) && /^[+]?[0-9]+$/.test(value);
    }
  
    checkLogin: TCheckFunction = (value) => {
        return this.checkLength(4, 18, value);
    }
  
    checkEmail: TCheckFunction = (value) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value);
    }
  
    showError: TShowError = (input, selector, message = "Неверный формат"): void => {
        const parent = input.closest(selector);
        let hint = parent?.querySelector('[role="alert"]');
        if (!hint && parent) {
            const hint = document.createElement('span');
            const text = document.createTextNode(message);
            hint.appendChild(text);
            hint.classList.add("hint", "error");
            hint.setAttribute("role", "alert");
            parent.appendChild(hint);
        }
    };
  
    hideError: THideError = (input, selector) => {
        const parent = input.closest(selector);
        const hint = parent?.querySelector('[role="alert"]');
        hint?.remove()
    };
}

export default ValidationForm
