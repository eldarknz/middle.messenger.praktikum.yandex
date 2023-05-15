export const inputHandler = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const inputFields = document.querySelectorAll('.input');
        inputFields &&
            inputFields.forEach((el) => {
                el.addEventListener('keyup', () => {
                    el.setAttribute('value', (<HTMLInputElement>el).value);
                });
            });
    });
};

/* document.addEventListener('readystatechange', event => {
    switch (document.readyState) {
      case "loading":
        console.log("document.readyState: ", document.readyState,
         `- The document is still loading.`
         );
        break;
      case "interactive":
        console.log("document.readyState: ", document.readyState, 
          `- The document has finished loading DOM. `,
          `- "DOMContentLoaded" event`
          );
        break;
      case "complete":
        console.log("document.readyState: ", document.readyState, 
          `- The page DOM with Sub-resources are now fully loaded. `,
          `- "load" event`
          );
        break;
    }
}); */
