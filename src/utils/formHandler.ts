//import { clearForm } from './clearForm';
import { validateInput } from './validation';

const isValidateInputs = (inputs: NodeList) => Array.from(inputs)
  .reduce((acc, input) => (acc && validateInput(input as HTMLInputElement)), true);

export const formSubmissionsHandler = (
  handler: (data: FormData) => Promise<any>,
  //additionChecks: (data: FormData) => boolean = (data) => Boolean(data),
) => (event: Event) => {
    event.preventDefault();
    const target = event.target;
    if (target && target instanceof HTMLFormElement) {
        const formData = new FormData(target);
        const formInputs = target.querySelectorAll('input');
        if (isValidateInputs(formInputs)) { //&& additionChecks(formData)) {
            handler(formData);
            //clearForm(target);
        } else {
            console.log('Введены некорректные данные');
        }
    }
};
