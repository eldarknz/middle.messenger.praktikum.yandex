class ValidationForm {
    checkEmptyValue = (value: string): boolean => {
        return value !== '';
    }
  
    checkPassword = (value: string): boolean => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    }
  
    checkPasswordConfirm = (value_1: string, value_2: string): boolean => {
        return value_1 === value_2;
    }

    checkLength = (min: number, max: number, value: string): boolean => {
        return value.length >= min && value.length <= max;
    }
  
    checkName = (value: string): boolean => {
        return /^[A-ZА-Я]+[A-Za-zа-яА-Я-]+$/.test(value);
    }
  
    checkPhone = (value: string): boolean => {
        return this.checkLength(10, 15, value) && /^[+]?[0-9]+$/.test(value);
    }
  
    checkLogin = (value: string): boolean => {
        return this.checkLength(4, 18, value);
    }
  
    checkEmail = (value: string): boolean => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value);
    }
  
    showError = (input: HTMLElement, selector: string, message?: string): void => {
        const parent = input.closest(selector);
        let hint = parent.querySelector('[role="alert"]');
        if (!hint) {
            const hint = document.createElement('span');
            const text = document.createTextNode(message ? message : "Неверный формат");
            hint.appendChild(text);
            hint.classList.add("hint", "error");
            hint.setAttribute("role", "alert");
            parent.appendChild(hint);
        }
    };
  
    hideError = (input: HTMLElement, selector: string): void => {
        const parent = input.closest(selector);
        const hint = parent.querySelector('[role="alert"]');
        hint.remove()
    };
}

export default ValidationForm
