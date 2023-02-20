import { responseErrorStatusHandling } from './responseErrorStatusHandling';
import { validateInput } from './validation';

export const clearForm = (form: HTMLFormElement) => {
  const formInputs = form.querySelectorAll('input');

  formInputs.forEach((input: HTMLInputElement) => {
      input.value = "";
      input.setAttribute('value', input.value);
  });
}

export const checkValidateInputs = (inputs: NodeList) => Array.from(inputs)
  .reduce((acc, input) => (acc && validateInput(input as HTMLInputElement)), true);

export const checkInputs = (form: HTMLFormElement) => {
  const formInputs = form.querySelectorAll('input');
  let isValidateInputs = checkValidateInputs(formInputs)
  return isValidateInputs;
}

export const errorFormNotification = (selector: string, message: string) => {
  const node = document.querySelector(selector);
  if (node) {
      const parentNode = node?.parentElement;
      if (parentNode) {
        let textNode = parentNode.querySelector(".text-error");
        if (!textNode) {
          textNode = document.createElement("p");
          textNode.classList.add("text-error");
            node.after(textNode);
        }
        textNode.innerHTML = message;
      }
  }
};

export const removeErrorFormNotification = (selector: string) => {
  const node = document.querySelector(selector);
  if (node) {
    const parentNode = node?.parentElement;
    if (parentNode) {
      let textNode = parentNode.querySelector(".text-error");
      if (textNode) {
        textNode.remove();
      }
    }
  }
}

export const formSubmissionsHandler = (
  params: {
    //target: HTMLFormElement,
    event: Event,
    handler: (data: FormData) => Promise<any>,
    selector: string,
    isCheckInputs?: boolean,
    action?: () => void
  }
) => {

  const { event, handler, selector, isCheckInputs, action } = params;

  event.preventDefault();
  const target = event.target;
  if (target && target instanceof HTMLFormElement) {
    if (isCheckInputs) {
      console.log('AAA');
      if (!checkInputs(target as HTMLFormElement)) {
        return;
      }
    }
    const formData = new FormData(target);
    handler(formData).then((res) => {
      if (res) {
        if (res.status === 200) {
          if (action) {
            //clearForm(target);
            //removeErrorFormNotification(selector);
            action();
          }
        } else {
          const responseErrorStatus = responseErrorStatusHandling(res);
          errorFormNotification(
            selector,
            responseErrorStatus ? responseErrorStatus : "Произошла ошибка, попробуйте еще раз",
          )
        }
      }
    });
  }

  /*const formData = new FormData(target);
  handler(formData).then((res) => {
    if (res) {
      if (res.status === 200) {
        if (action) {
          //clearForm(target);
          //removeErrorFormNotification(selector);
          action();
        }
      } else {
        const responseErrorStatus = responseErrorStatusHandling(res);
        errorFormNotification(
          selector,
          responseErrorStatus ? responseErrorStatus : "Произошла ошибка, попробуйте еще раз",
        )
      }
    }
  });*/
};
