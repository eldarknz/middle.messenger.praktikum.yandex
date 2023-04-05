export type TCheckFunction = (value: string) => boolean;
export type TCheckLength = (min: number, max: number, value: string) => boolean;
export type TCheckPasswordConfirm = (value_1: string, value_2: string) => boolean;
export type TShowError = (input: HTMLElement, selector: string, message?: string) => void;
export type THideError = (input: HTMLElement, selector: string) => void;

export class ValidationForm {
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

export const validateInput = (firstElement: HTMLInputElement): boolean => {
    const validation = new ValidationForm;

    const checkHandler = (condition: boolean, message?: string) => {
        if (condition) {
            validation.showError(firstElement, '.form-group', message);
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    }

    if (firstElement.name === 'login') {
        return checkHandler(!validation.checkLogin(firstElement.value));
    } else if (firstElement.name === 'password') {
        return checkHandler(!validation.checkPassword(firstElement.value), "Неверный формат, либо менее 8 символов");
    } else if (firstElement.name === 'confirm_password') {
        const form = firstElement.form;
        const password = form?.querySelector("#password") as HTMLInputElement;
        return checkHandler(
            !validation.checkPassword(firstElement.value) || !validation.checkPasswordConfirm(firstElement.value, password.value),
            "Неверный формат, либо пароли не совпадают"
        );
    } else if (firstElement.name === 'new_password') {
        return checkHandler(!validation.checkPassword(firstElement.value), "Неверный формат, либо менее 8 символов");
    } else if (firstElement.name === 'email') {
        return checkHandler(!validation.checkEmail(firstElement.value));
    } else if (firstElement.name === 'phone') {
        return checkHandler(!validation.checkPhone(firstElement.value));
    } else if (firstElement.name === 'first_name') {
        return checkHandler(!validation.checkName(firstElement.value), "Неверный формат, либо имя с маленькой буквы");
    } else if (firstElement.name === 'second_name') {
        return checkHandler(!validation.checkName(firstElement.value), "Неверный формат, либо фамилия с маленькой буквы");
    } else if (firstElement.name === 'display_name') {
        return checkHandler(!validation.checkName(firstElement.value));
    } else {
        return false;
    }

}
