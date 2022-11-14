import {
    TCheckFunction,
    TCheckLength,
    TCheckPasswordConfirm,
    TShowError,
    THideError
} from "../../declarations";

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

export const validateInput = (firstElement: HTMLInputElement, secondElement?: HTMLInputElement): boolean => {
    const validation = new ValidationForm;

    if (firstElement.name === 'login') {
        if (!validation.checkLogin(firstElement.value)) {
            validation.showError(firstElement, '.form-group');
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'password') {
        if (!validation.checkPassword(firstElement.value)) {
            validation.showError(firstElement, '.form-group', "Неверный формат, либо менее 8 символов");
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'password_2' && secondElement) {
        if (!validation.checkPassword(firstElement.value) || !validation.checkPasswordConfirm(firstElement.value, secondElement.value)) {
            validation.showError(firstElement, '.form-group', "Неверный формат, либо пароли не совпадают");
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'new_password') {
        if (!validation.checkPassword(firstElement.value)) {
            validation.showError(firstElement, '.form-group', "Неверный формат, либо менее 8 символов");
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'email') {
        if (!validation.checkEmail(firstElement.value)) {
            validation.showError(firstElement, '.form-group');
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'phone') {
        if (!validation.checkPhone(firstElement.value)) {
            validation.showError(firstElement, '.form-group');
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'first_name') {
        if (!validation.checkName(firstElement.value)) {
            validation.showError(firstElement, '.form-group', "Неверный формат, либо имя с маленькой буквы");
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'second_name') {
        if (!validation.checkName(firstElement.value)) {
            validation.showError(firstElement, '.form-group', "Неверный формат, либо фамилия с маленькой буквы");
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else if (firstElement.name === 'chat_name') {
        if (!validation.checkName(firstElement.value)) {
            validation.showError(firstElement, '.form-group', "Неверный формат");
            return false;
        } else {
            validation.hideError(firstElement, '.form-group');
            return true;
        }
    } else {
        return false;
    }

}
